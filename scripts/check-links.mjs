/**
 * Outbound link health check for service content.
 *
 * Exit codes:
 *   0 — no hard failures (404/410); warnings may be printed
 *   1 — at least one outbound URL returned 404 or 410
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const servicesDir = join(__dirname, '../src/content/services');

const FETCH_TIMEOUT_MS = 15_000;
const STALE_DAYS = 90;

const hardFailures = [];
const softWarnings = [];
const staleWarnings = [];

function daysSince(date) {
  const ms = Date.now() - date.getTime();
  return ms / (1000 * 60 * 60 * 24);
}

async function checkUrl(url, slug) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'Sheba-LinkHealth/1.0 (+https://sheba.example.com)' },
    });

    if (response.status === 404 || response.status === 410) {
      hardFailures.push({ slug, url, reason: `HTTP ${response.status}` });
      return;
    }

    if (!response.ok) {
      softWarnings.push({ slug, url, reason: `HTTP ${response.status}` });
      return;
    }

    console.log(`OK  ${slug} → ${url}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const isAbort = err instanceof Error && err.name === 'AbortError';
    softWarnings.push({
      slug,
      url,
      reason: isAbort ? `timeout after ${FETCH_TIMEOUT_MS}ms` : message,
    });
  } finally {
    clearTimeout(timer);
  }
}

const serviceFiles = readdirSync(servicesDir).filter((f) => f.endsWith('.md'));

for (const file of serviceFiles) {
  const raw = readFileSync(join(servicesDir, file), 'utf8');
  const { data } = matter(raw);
  const slug = data.slug ?? file.replace(/\.md$/, '');
  const url = data.url;

  if (!url || typeof url !== 'string') {
    hardFailures.push({ slug, url: String(url), reason: 'missing url in frontmatter' });
    continue;
  }

  if (data.last_verified) {
    const verified = new Date(data.last_verified);
    if (!Number.isNaN(verified.getTime()) && daysSince(verified) > STALE_DAYS) {
      staleWarnings.push({
        slug,
        days: Math.floor(daysSince(verified)),
        last_verified: verified.toISOString().slice(0, 10),
      });
    }
  }

  await checkUrl(url, slug);
}

if (staleWarnings.length > 0) {
  console.warn('\n⚠ Stale last_verified (>90 days):');
  for (const s of staleWarnings) {
    console.warn(`  ${s.slug}: ${s.last_verified} (${s.days} days ago)`);
  }
}

if (softWarnings.length > 0) {
  console.warn('\n⚠ Soft warnings (network/timeout/non-404 HTTP — not failing CI):');
  for (const w of softWarnings) {
    console.warn(`  ${w.slug}: ${w.url} — ${w.reason}`);
  }
}

if (hardFailures.length > 0) {
  console.error('\n✗ Hard failures (404/410 or missing url):');
  for (const f of hardFailures) {
    console.error(`  ${f.slug}: ${f.url} — ${f.reason}`);
  }
  process.exit(1);
}

console.log('\nLink health check passed (no 404/410 failures).');
process.exit(0);
