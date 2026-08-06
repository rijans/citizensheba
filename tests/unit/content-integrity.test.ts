/**
 * Cheap content integrity: category / related id refs (no Astro, no network).
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import matter from 'gray-matter';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const categoriesDir = join(root, 'src/content/categories');
const servicesDir = join(root, 'src/content/services');

function loadYamlFile(path: string): Record<string, unknown> {
  const raw = readFileSync(path, 'utf8');
  const { data } = matter(`---\n${raw}\n---\n`);
  return data as Record<string, unknown>;
}

function loadService(path: string): Record<string, unknown> {
  const { data } = matter(readFileSync(path, 'utf8'));
  return data as Record<string, unknown>;
}

describe('content integrity', () => {
  const categoryFiles = readdirSync(categoriesDir).filter((f) => /\.ya?ml$/i.test(f));
  const serviceFiles = readdirSync(servicesDir).filter((f) => f.endsWith('.md'));

  const categories = categoryFiles.map((f) => loadYamlFile(join(categoriesDir, f)));
  const services = serviceFiles.map((f) => loadService(join(servicesDir, f)));

  const categoryIds = new Set(categories.map((c) => String(c.id)));
  const serviceIds = new Set(services.map((s) => String(s.id)));

  it('has unique category ids', () => {
    expect(categories.map((c) => c.id).sort()).toEqual([...categoryIds].sort());
  });

  it('has unique service ids', () => {
    expect(services.map((s) => s.id).sort()).toEqual([...serviceIds].sort());
  });

  it('every service.category points at a real category', () => {
    const missing = services
      .filter((s) => !categoryIds.has(String(s.category)))
      .map((s) => `${s.id} → ${s.category}`);
    expect(missing).toEqual([]);
  });

  it('every service.related id points at a real service', () => {
    const missing: string[] = [];
    for (const s of services) {
      const related = s.related;
      if (!related) continue;
      expect(Array.isArray(related)).toBe(true);
      for (const id of related as string[]) {
        if (!serviceIds.has(id)) missing.push(`${s.id} → related:${id}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it('no service lists itself in related', () => {
    const selfRefs = services
      .filter((s) => Array.isArray(s.related) && (s.related as string[]).includes(String(s.id)))
      .map((s) => s.id);
    expect(selfRefs).toEqual([]);
  });

  it('every service has Name Aliases with EN and BN coverage', () => {
    type Alias = { name?: string; lang?: string; kind?: string };
    const problems: string[] = [];
    for (const s of services) {
      const aliases = s.aliases as Alias[] | undefined;
      if (!Array.isArray(aliases) || aliases.length < 2) {
        problems.push(`${s.id}: need aliases[] with at least 2 entries`);
        continue;
      }
      const langs = new Set(aliases.map((a) => a.lang));
      if (!langs.has('en')) problems.push(`${s.id}: missing lang: en alias`);
      if (!langs.has('bn')) problems.push(`${s.id}: missing lang: bn alias`);
      for (const a of aliases) {
        if (!a.name?.trim()) problems.push(`${s.id}: empty alias name`);
        if (a.lang !== 'en' && a.lang !== 'bn') problems.push(`${s.id}: alias "${a.name}" needs lang en|bn`);
        if (a.kind !== 'former' && a.kind !== 'informal' && a.kind !== 'alt') {
          problems.push(`${s.id}: alias "${a.name}" needs kind former|informal|alt`);
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it('every service has body and body_bn Markdown', () => {
    const missing = services
      .filter((s) => String(s.body || '').trim().length < 40 || String(s.body_bn || '').trim().length < 40)
      .map((s) => String(s.id));
    expect(missing).toEqual([]);
  });

  it('every service has audience_bn and bilingual FAQ', () => {
    const problems: string[] = [];
    for (const s of services) {
      if (!String(s.audience_bn || '').trim()) problems.push(`${s.id}: missing audience_bn`);
      const faq = s.faq as Array<Record<string, unknown>> | undefined;
      if (!Array.isArray(faq) || faq.length < 3) {
        problems.push(`${s.id}: faq needs 3–5 items`);
        continue;
      }
      faq.forEach((item, i) => {
        if (!String(item.q || '').trim() || !String(item.a || '').trim()) {
          problems.push(`${s.id}: faq[${i}] missing q/a`);
        }
        if (!String(item.q_bn || '').trim() || !String(item.a_bn || '').trim()) {
          problems.push(`${s.id}: faq[${i}] missing q_bn/a_bn`);
        }
      });
    }
    expect(problems).toEqual([]);
  });
});
