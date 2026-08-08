#!/usr/bin/env node
/**
 * One-shot: expand opaque Service slugs + append 301s to public/_redirects.
 * Helpers mirrored from src/lib/serviceSlug.ts — keep in sync.
 *
 * Usage:
 *   node scripts/migrate-elaborated-slugs.mjs --dry-run
 *   node scripts/migrate-elaborated-slugs.mjs --write
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const SOFT_SLUG_MAX_CHARS = 80;

const READABLE_SLUG_ALLOWLIST = new Set([
  'bd-beautiful-bangladesh',
  'bd-bangladesh-post',
  'bd-bangladesh-visa',
  'bd-bangladesh-museum',
  'bd-dhaka-wasa',
  'bd-chattogram-wasa',
  'bd-khulna-wasa',
  'bd-police-staff-college',
  'bd-xi-admission',
  'bd-dss-bhata',
  'bd-ansar-vdp-bank',
  'bd-basic-bank',
  'bd-titas-gas',
  'bd-padma-oil',
  'bd-jamuna-oil',
  'bd-parjatan-hotels',
  'bd-btb-registration',
  'bd-tourism-board',
  'bd-tourist-police',
  'bd-land-portal',
  'bd-national-portal',
  'bd-national-university',
  'bd-teachers-portal',
  'bd-online-gd',
  'bd-fire-service',
  'bd-election-commission',
  'bd-attorney-general',
  'bd-milk-vita',
]);

const READABLE_HINTS = [
  'wasa',
  'admission',
  'post',
  'bank',
  'gas',
  'oil',
  'board',
  'museum',
  'portal',
  'police',
  'staff',
  'college',
  'bhata',
  'visa',
  'hotels',
  'registration',
  'beautiful',
  'national',
  'teachers',
  'online',
  'fire-service',
  'election',
  'attorney',
  'milk',
  'parjatan',
  'tourism',
  'tourist',
  'land-portal',
  'academy',
  'barishal',
  'rajshahi',
  'sylhet',
  'khulna',
  'rangpur',
  'mymensingh',
  'chattogram',
  'comilla',
  'habiganj',
  'netrokona',
  'pabna',
  'division',
];

function isOpaqueServiceSlug(slug) {
  if (!slug.startsWith('bd-')) return false;
  if (READABLE_SLUG_ALLOWLIST.has(slug)) return false;
  const body = slug.slice(3);
  if (READABLE_HINTS.some((h) => body.includes(h))) return false;
  const parts = body.split('-').filter(Boolean);
  if (parts.length === 0) return false;
  if (parts.length >= 3 && parts.slice(1).some((p) => p.length >= 5)) return false;
  return parts.length <= 2 && parts.every((p) => p.length <= 8);
}

function kebabizeExpansion(officialEnglish) {
  let s = officialEnglish.trim();
  const paren = s.match(/\(([^)]+)\)\s*$/);
  if (paren && paren[1].trim().split(/\s+/).length >= 2) {
    s = paren[1].trim();
  }
  s = s
    .normalize('NFKD')
    .replace(/[^\x00-\x7F]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const parts = s.split('-').filter(Boolean);
  return parts
    .filter((p) => p !== 'ltd' && p !== 'limited' && p !== 'plc' && p !== 'the' && p !== 'co')
    .join('-');
}

function buildElaboratedServiceSlug({ currentSlug, officialEnglish }) {
  const body = currentSlug.startsWith('bd-') ? currentSlug.slice(3) : currentSlug;
  const token = body;
  let expansion = kebabizeExpansion(officialEnglish);
  while (expansion === token || expansion.startsWith(`${token}-`)) {
    expansion = expansion.slice(token.length).replace(/^-+/, '');
  }
  let slug = `bd-${token}-${expansion}`.replace(/-+/g, '-').replace(/-$/, '');
  if (slug.length <= SOFT_SLUG_MAX_CHARS) return slug;
  const bits = slug.split('-');
  const minParts = token.split('-').length + 1;
  while (bits.length > minParts && bits.join('-').length > SOFT_SLUG_MAX_CHARS) bits.pop();
  return bits.join('-');
}

function pickOfficialEnglish(fields) {
  const serp = (fields.serp_title || '').trim();
  if (serp) return serp;
  const title = String(fields.title || '').trim();
  const enAliases = (fields.aliases || [])
    .filter((a) => a.lang === 'en' && a.name?.trim())
    .map((a) => a.name.trim());
  const isThin = (s) => {
    const words = s.split(/\s+/).filter(Boolean);
    return words.length <= 1 && s.replace(/[^a-z0-9]/gi, '').length <= 12;
  };
  if (title && !isThin(title)) return title;
  const rich = enAliases.filter((n) => !isThin(n)).sort((a, b) => b.length - a.length);
  if (rich[0]) return rich[0];
  if (title) return title;
  return enAliases[0] || '';
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const servicesDir = join(root, 'src/content/services');
const redirectsPath = join(root, 'public/_redirects');
const write = process.argv.includes('--write');

const files = readdirSync(servicesDir).filter((f) => f.endsWith('.md'));
const used = new Set();
const rows = [];
const skips = [];

for (const f of files) {
  const path = join(servicesDir, f);
  const raw = readFileSync(path, 'utf8');
  const { data } = matter(raw);
  const oldSlug = String(data.slug);
  used.add(oldSlug);
  if (!isOpaqueServiceSlug(oldSlug)) continue;

  const officialEnglish = pickOfficialEnglish({
    serp_title: data.serp_title ? String(data.serp_title) : undefined,
    title: String(data.title),
    aliases: data.aliases,
  });
  let next = buildElaboratedServiceSlug({ currentSlug: oldSlug, officialEnglish });

  const body = oldSlug.slice(3);
  if (next === `bd-${body}` || next === oldSlug || next.length <= oldSlug.length + 2) {
    skips.push({ oldSlug, officialEnglish, next });
    continue;
  }

  let n = 2;
  const base = next;
  while (used.has(next) && next !== oldSlug) {
    next = `${base}-${n}`;
    n += 1;
  }

  rows.push({ file: f, id: data.id, oldSlug, next, officialEnglish });
  used.add(next);
}

console.log(`opaque renames: ${rows.length}; weak skips: ${skips.length}`);
for (const r of rows.slice(0, 15)) {
  console.log(`  ${r.oldSlug} → ${r.next}`);
}
if (rows.length > 15) console.log(`  … +${rows.length - 15} more`);
if (skips.length) {
  console.log('weak skips (need serp_title / richer EN alias):');
  for (const s of skips.slice(0, 25)) {
    console.log(`  ${s.oldSlug} ← "${s.officialEnglish}" → ${s.next}`);
  }
  if (skips.length > 25) console.log(`  … +${skips.length - 25} more`);
}

for (const key of ['bd-rab', 'bd-dpdc', 'bd-du']) {
  const row = rows.find((r) => r.oldSlug === key);
  console.log(`GATE ${key}: ${row ? row.next : 'MISSING'}`);
}

if (!write) {
  console.log('dry-run only; pass --write to apply');
  process.exit(0);
}

for (const r of rows) {
  const path = join(servicesDir, r.file);
  const raw = readFileSync(path, 'utf8');
  const updated = raw.replace(new RegExp(`^slug:\\s*${r.oldSlug}\\s*$`, 'm'), `slug: ${r.next}`);
  if (updated === raw) throw new Error(`slug replace failed: ${r.file}`);
  writeFileSync(path, updated);
}

const existing = readFileSync(redirectsPath, 'utf8').trimEnd();
const block = [
  '',
  '# Elaborated Service Slug legacy redirects (ADR-0014) — do not remove',
  ...rows.flatMap((r) => [
    `/services/${r.oldSlug}    /services/${r.next}/    301`,
    `/services/${r.oldSlug}/   /services/${r.next}/    301`,
  ]),
  '',
].join('\n');
writeFileSync(redirectsPath, `${existing}\n${block}`);
console.log(`wrote ${rows.length} slug updates + ${rows.length * 2} redirect lines`);
if (skips.length) {
  console.warn(`WARNING: ${skips.length} opaque slugs left unexpanded (thin EN names)`);
}
