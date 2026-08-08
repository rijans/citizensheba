# Elaborated Service Slugs — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand opaque Service public slugs to `bd-{token}-{english-expansion}`, keep short content ids stable, and 301 old short paths via `public/_redirects`.

**Architecture:** Public `slug` in Service markdown remains the path SSOT. A small pure helper builds kebab expansions from official English names (`serp_title` / title / EN alias). A one-shot migration script rewrites opaque `slug:` fields and appends paired 301 lines to `public/_redirects`. Cloudflare static redirects need no Worker. CI integrity tests prevent bare acronym regressions.

**Tech Stack:** Astro SSG · gray-matter · Vitest · Cloudflare `public/_redirects` · existing `src/lib/urls.ts`

**Spec:** [`docs/superpowers/specs/2026-08-08-elaborated-service-slugs-design.md`](../specs/2026-08-08-elaborated-service-slugs-design.md)

---

## File map

| File | Responsibility |
|------|----------------|
| `src/lib/serviceSlug.ts` | Pure helpers: detect opaque slugs, kebabize expansion, build `bd-{token}-{expansion}`, soft length trim |
| `tests/unit/serviceSlug.test.ts` | Lock formula + skip/opaque heuristics + examples (RAB, DPDC, DU) |
| `scripts/migrate-elaborated-slugs.mjs` | One-shot: rewrite opaque Service `slug:` + emit `_redirects` pairs; dry-run flag |
| `public/_redirects` | Legacy short Service paths → expanded paths (301); keep existing sitemap rule |
| `src/content/services/*.md` | Update `slug:` only for opaque set; never rename `id` / filename |
| `tests/unit/content-integrity.test.ts` | Duplicate slug guard; opaque-without-expansion guard; redirect target coverage |
| `docs/adr/0014-elaborated-service-slugs.md` | Decision ADR |
| `docs/specs/TRAPS.md` | Trap #19 |
| `CONTEXT.md` | Revise **Service Slug** |
| `docs/guides/new-service.md` | Checklist step for elaborated slugs |
| `AGENTS.md`, `docs/agent/INDEX.md` | Point agents at ADR-0014 / Trap #19 |
| `docs/guides/display-names.md` | Optional one-line cross-link (slug ≠ Display Name) |

**Locked formula:** `bd-{token}-{expansion}`  
**Locked examples:** `bd-rab-rapid-action-battalion`, `bd-dpdc-dhaka-power-distribution-company`, `bd-du-university-of-dhaka`

---

### Task 1: Slug helper + unit tests (TDD)

**Files:**
- Create: `src/lib/serviceSlug.ts`
- Create: `tests/unit/serviceSlug.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `tests/unit/serviceSlug.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import {
  isOpaqueServiceSlug,
  kebabizeExpansion,
  buildElaboratedServiceSlug,
  SOFT_SLUG_MAX_CHARS,
} from '../../src/lib/serviceSlug';

describe('isOpaqueServiceSlug', () => {
  it('flags bare acronym slugs', () => {
    expect(isOpaqueServiceSlug('bd-rab')).toBe(true);
    expect(isOpaqueServiceSlug('bd-dpdc')).toBe(true);
    expect(isOpaqueServiceSlug('bd-du')).toBe(true);
    expect(isOpaqueServiceSlug('bd-a2i')).toBe(true);
  });

  it('skips already human-readable English slugs', () => {
    expect(isOpaqueServiceSlug('bd-beautiful-bangladesh')).toBe(false);
    expect(isOpaqueServiceSlug('bd-dhaka-wasa')).toBe(false);
    expect(isOpaqueServiceSlug('bd-police-staff-college')).toBe(false);
    expect(isOpaqueServiceSlug('bd-chattogram-wasa')).toBe(false);
    expect(isOpaqueServiceSlug('bd-xi-admission')).toBe(false);
    expect(isOpaqueServiceSlug('bd-bangladesh-post')).toBe(false);
  });
});

describe('kebabizeExpansion', () => {
  it('lowercases and hyphenates official English names', () => {
    expect(kebabizeExpansion('Rapid Action Battalion')).toBe('rapid-action-battalion');
    expect(kebabizeExpansion('Dhaka Power Distribution Company Ltd.')).toBe(
      'dhaka-power-distribution-company',
    );
  });

  it('strips parenthetical acronym echoes', () => {
    expect(kebabizeExpansion('RAB (Rapid Action Battalion)')).toBe('rapid-action-battalion');
    expect(kebabizeExpansion('DPDC (Dhaka Power Distribution Company)')).toBe(
      'dhaka-power-distribution-company',
    );
  });
});

describe('buildElaboratedServiceSlug', () => {
  it('builds bd-{token}-{expansion} for RAB / DPDC / DU', () => {
    expect(
      buildElaboratedServiceSlug({
        currentSlug: 'bd-rab',
        officialEnglish: 'Rapid Action Battalion',
      }),
    ).toBe('bd-rab-rapid-action-battalion');

    expect(
      buildElaboratedServiceSlug({
        currentSlug: 'bd-dpdc',
        officialEnglish: 'Dhaka Power Distribution Company',
      }),
    ).toBe('bd-dpdc-dhaka-power-distribution-company');

    expect(
      buildElaboratedServiceSlug({
        currentSlug: 'bd-du',
        officialEnglish: 'University of Dhaka',
      }),
    ).toBe('bd-du-university-of-dhaka');
  });

  it('does not duplicate token when expansion already starts with it', () => {
    expect(
      buildElaboratedServiceSlug({
        currentSlug: 'bd-du',
        officialEnglish: 'DU University of Dhaka',
      }),
    ).toBe('bd-du-university-of-dhaka');
  });

  it('respects soft max length by trimming trailing tokens', () => {
    const long = buildElaboratedServiceSlug({
      currentSlug: 'bd-xyz',
      officialEnglish:
        'Extraordinarily Long Official English Institutional Name Of Bangladesh Authority Board',
    });
    expect(long.startsWith('bd-xyz-')).toBe(true);
    expect(long.length).toBeLessThanOrEqual(SOFT_SLUG_MAX_CHARS);
  });
});
```

- [ ] **Step 2: Run tests — expect FAIL (module missing)**

```bash
npm test -- tests/unit/serviceSlug.test.ts
```

Expected: FAIL — cannot find module `../../src/lib/serviceSlug`

- [ ] **Step 3: Implement `src/lib/serviceSlug.ts`**

```ts
/** Elaborated Service Slug helpers (ADR-0014 / Trap #19). */

export const SOFT_SLUG_MAX_CHARS = 80;

/** Slugs that already carry readable English beyond a naked acronym — never auto-expand. */
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

/** Token hints that mean the slug is already descriptive (substring match on slug body). */
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
];

const LEGAL_FLUFF = new Set(['ltd', 'limited', 'plc', 'the', 'co', 'company']); // company kept when meaningful — see kebabize

export function isOpaqueServiceSlug(slug: string): boolean {
  if (!slug.startsWith('bd-')) return false;
  if (READABLE_SLUG_ALLOWLIST.has(slug)) return false;
  const body = slug.slice(3);
  if (READABLE_HINTS.some((h) => body.includes(h))) return false;
  const parts = body.split('-').filter(Boolean);
  if (parts.length === 0) return false;
  // Already elaborated: token + ≥2 expansion parts with a longish word
  if (parts.length >= 3 && parts.slice(1).some((p) => p.length >= 5)) return false;
  // Opaque: 1–2 short tokens
  return parts.length <= 2 && parts.every((p) => p.length <= 8);
}

export function kebabizeExpansion(officialEnglish: string): string {
  let s = officialEnglish.trim();
  // Prefer parenthetical expansion when present: "RAB (Rapid Action Battalion)"
  const paren = s.match(/\(([^)]+)\)\s*$/);
  if (paren && paren[1].trim().split(/\s+/).length >= 2) {
    s = paren[1].trim();
  }
  s = s
    .normalize('NFKD')
    .replace(/[^\x00-\x7F]/g, '') // drop non-ASCII
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const parts = s.split('-').filter(Boolean);
  // Drop legal fluff tokens; keep "company" (spec examples include it for DPDC)
  const cleaned = parts.filter((p) => p !== 'ltd' && p !== 'limited' && p !== 'plc' && p !== 'the' && p !== 'co');
  return cleaned.join('-');
}

export function buildElaboratedServiceSlug(input: {
  currentSlug: string;
  officialEnglish: string;
}): string {
  const body = input.currentSlug.startsWith('bd-') ? input.currentSlug.slice(3) : input.currentSlug;
  const token = body.split('-')[0] ?? body;
  let expansion = kebabizeExpansion(input.officialEnglish);

  // Strip leading token echo: "du-university-of-dhaka" or "rab-rapid-…"
  while (expansion === token || expansion.startsWith(`${token}-`)) {
    expansion = expansion.slice(token.length).replace(/^-+/, '');
  }

  let slug = `bd-${token}-${expansion}`.replace(/-+/g, '-').replace(/-$/, '');

  if (slug.length <= SOFT_SLUG_MAX_CHARS) return slug;

  // Trim trailing tokens until under soft max (keep at least token + one expansion word)
  const bits = slug.split('-');
  while (bits.length > 3 && bits.join('-').length > SOFT_SLUG_MAX_CHARS) {
    bits.pop();
  }
  return bits.join('-');
}

export function pickOfficialEnglish(fields: {
  serp_title?: string;
  title: string;
  aliases?: Array<{ name?: string; lang?: string; kind?: string }>;
}): string {
  const serp = (fields.serp_title || '').trim();
  if (serp) return serp;
  const enAlias = (fields.aliases || []).find((a) => a.lang === 'en' && a.name?.trim());
  if (enAlias?.name) return enAlias.name.trim();
  return fields.title.trim();
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test -- tests/unit/serviceSlug.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/serviceSlug.ts tests/unit/serviceSlug.test.ts
git commit -m "$(cat <<'EOF'
feat(slugs): add elaborated Service Slug helpers

Pure helpers for opaque detection and bd-{token}-{expansion} builds (ADR-0014).
EOF
)"
```

---

### Task 2: Integrity tests for opaque slugs + duplicates (TDD)

**Files:**
- Modify: `tests/unit/content-integrity.test.ts`

- [ ] **Step 1: Add failing integrity assertions**

Append inside the existing `describe('content integrity', …)` block (after ranks test):

```ts
  it('service slugs are unique', () => {
    const slugs = services.map((s) => String(s.slug));
    const dupes = slugs.filter((slug, i) => slugs.indexOf(slug) !== i);
    expect(dupes).toEqual([]);
  });

  it('opaque service slugs are elaborated (bd-token-expansion)', () => {
    // Dynamic import keeps this test aligned with serviceSlug.ts heuristic.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { isOpaqueServiceSlug } = require('../../src/lib/serviceSlug') as typeof import('../../src/lib/serviceSlug');
    const bare = services
      .filter((s) => isOpaqueServiceSlug(String(s.slug)))
      .map((s) => `${s.id} → ${s.slug}`);
    expect(bare).toEqual([]);
  });
```

Prefer ESM import at top of file instead of require:

```ts
import { isOpaqueServiceSlug } from '../../src/lib/serviceSlug';
```

- [ ] **Step 2: Run integrity test — expect FAIL on opaque list**

```bash
npm test -- tests/unit/content-integrity.test.ts
```

Expected: FAIL — many `id → bd-…` opaque slugs listed (until migration). Duplicate test should PASS.

- [ ] **Step 3: Do not “fix” by weakening the test** — leave failing until Task 4 migration. If you need a green main branch mid-work, skip this commit until after Task 4, or commit the test as part of the migration commit (preferred: one commit after migration turns it green).

**Plan note:** Land Task 2’s test in the **same commit as Task 4** if local CI must stay green; otherwise keep the red test on a feature branch only.

---

### Task 3: Policy docs (ADR-0014, Trap #19, glossary, checklists)

**Files:**
- Create: `docs/adr/0014-elaborated-service-slugs.md`
- Modify: `docs/specs/TRAPS.md`
- Modify: `CONTEXT.md` (Service Slug section)
- Modify: `docs/guides/new-service.md`
- Modify: `AGENTS.md`
- Modify: `docs/agent/INDEX.md`
- Modify: `docs/README.md` (ADR index row if present)

- [ ] **Step 1: Write ADR-0014**

Create `docs/adr/0014-elaborated-service-slugs.md` (single-paragraph ADR style like 0013):

```markdown
# Elaborated Service Slugs (SEO)

Short acronym Service paths (`/services/bd-rab`) are weak for SEO and for humans reading the URL. We require **elaborated** public slugs for opaque Services: `bd-{token}-{official-english-expansion}` (e.g. `bd-rab-rapid-action-battalion`), while keeping the internal content `id` / filename short and stable. Already human-readable slugs (`bd-dhaka-wasa`, `bd-beautiful-bangladesh`, …) stay as-is. Old short paths get permanent **301** redirects in `public/_redirects` (slash + non-slash) — no Worker rewrite layer. Expansion uses official English (prefer `serp_title` / EN aliases), ASCII kebab, light legal-fluff cleanup, soft ~60–80 char whole-slug length. Do not churn expansions for minor gov wording tweaks; if a rare rename is required, add another 301 and keep prior redirects. Agents must not ship bare acronym slugs when expansion is possible (Trap #19).

**Glossary:** [`CONTEXT.md`](../../CONTEXT.md) → **Service Slug**. **Trap:** [`TRAPS.md`](../specs/TRAPS.md) #19. **Design:** [`docs/superpowers/specs/2026-08-08-elaborated-service-slugs-design.md`](../superpowers/specs/2026-08-08-elaborated-service-slugs-design.md). **Helpers:** `src/lib/serviceSlug.ts`.
```

- [ ] **Step 2: Add Trap #19 to `docs/specs/TRAPS.md`**

Index row:

```markdown
| 19 | Bare acronym Service slugs (`bd-rab` without expansion) |
```

Body:

```markdown
## 19. Bare acronym Service slugs

### Pitfall

Shipping `/services/bd-rab` (or similar opaque acronym-only paths) when an official English expansion exists — weak SEO and unclear URLs.

### Rule

Opaque Services use `bd-{token}-{expansion}` (ADR-0014). Keep short `id`. Skip already-readable slugs. Add `_redirects` 301s when renaming. See `src/lib/serviceSlug.ts` + design spec `2026-08-08-elaborated-service-slugs-design.md`.
```

- [ ] **Step 3: Update `CONTEXT.md` Service Slug**

Replace the Service Slug glossary block with:

```markdown
**Service Slug**:
Public URL path segment for a Service Page, English kebab-case with a `bd-` prefix. Opaque / acronym Services use an **elaborated** form `bd-{token}-{official-english-expansion}` (e.g. `/services/bd-rab-rapid-action-battalion`). Already human-readable English slugs stay short-descriptive (e.g. `/services/bd-dhaka-wasa`). The internal content id may omit the prefix and stays stable when the public slug expands. Legacy short paths 301 via `public/_redirects`. Decision: ADR-0014.
_Avoid_: Bangla slugs, unprefixed public service paths (v1), bare acronym-only slugs when an official English expansion exists, renaming content ids to match long slugs, Worker URL rewrites for this concern
```

- [ ] **Step 4: Checklist + AGENTS + INDEX**

In `docs/guides/new-service.md` “Before you write content”, add after slug preference:

```markdown
5. **Service Slug:** `bd-…` English kebab. If the name is an opaque acronym, use elaborated form `bd-{token}-{official-english-expansion}` (ADR-0014, Trap #19). Keep content `id` short. Skip elaboration when the slug is already human-readable.
```

Renumber following items if needed.

In `AGENTS.md` Content section, replace “Prefer English public slugs…” with:

```markdown
- Prefer English public slugs with `bd-` prefix; **opaque acronyms must be elaborated** `bd-{token}-{expansion}` (ADR-0014, Trap #19). Stable short content `id`. Legacy short URLs → `public/_redirects` 301
```

In `docs/agent/INDEX.md`, extend the content-catalog / Display Name rows (or add):

```markdown
| Service Slug, elaborated slug, `bd-rab`, SEO URL, `_redirects` 301 | ADR-0014, Trap #19, `CONTEXT.md` (Service Slug), `src/lib/serviceSlug.ts`, design `2026-08-08-elaborated-service-slugs-design.md`, `public/_redirects` |
```

- [ ] **Step 5: Commit docs**

```bash
git add docs/adr/0014-elaborated-service-slugs.md docs/specs/TRAPS.md CONTEXT.md docs/guides/new-service.md AGENTS.md docs/agent/INDEX.md docs/README.md
git commit -m "$(cat <<'EOF'
docs: ADR-0014 elaborated Service Slugs + Trap #19

Lock opaque bd-{token}-{expansion} policy, stable ids, and static 301 redirects.
EOF
)"
```

---

### Task 4: Migration script + run (content + `_redirects`)

**Files:**
- Create: `scripts/migrate-elaborated-slugs.mjs`
- Modify: `src/content/services/*.md` (opaque set only)
- Modify: `public/_redirects`
- Modify: `tests/unit/content-integrity.test.ts` (land opaque guard if deferred from Task 2)

- [ ] **Step 1: Write `scripts/migrate-elaborated-slugs.mjs`**

```js
#!/usr/bin/env node
/**
 * One-shot: expand opaque Service slugs + append 301s to public/_redirects.
 * Usage:
 *   node scripts/migrate-elaborated-slugs.mjs --dry-run
 *   node scripts/migrate-elaborated-slugs.mjs --write
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import {
  isOpaqueServiceSlug,
  buildElaboratedServiceSlug,
  pickOfficialEnglish,
} from '../src/lib/serviceSlug.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const servicesDir = join(root, 'src/content/services');
const redirectsPath = join(root, 'public/_redirects');
const write = process.argv.includes('--write');

const files = readdirSync(servicesDir).filter((f) => f.endsWith('.md'));
const used = new Set();
const rows = [];

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

  // Collision: append -alt / numeric if needed (should be rare)
  let n = 2;
  while ([...used].includes(next) && next !== oldSlug) {
    next = `${buildElaboratedServiceSlug({ currentSlug: oldSlug, officialEnglish })}-${n}`;
    n += 1;
  }

  if (next === oldSlug) continue;
  rows.push({ file: f, id: data.id, oldSlug, next, officialEnglish });
}

console.log(`opaque renames: ${rows.length}`);
for (const r of rows.slice(0, 15)) {
  console.log(`  ${r.oldSlug} → ${r.next}`);
}
if (rows.length > 15) console.log(`  … +${rows.length - 15} more`);

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
  used.add(r.next);
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
```

**Note:** If the repo’s Vitest/Node setup cannot import `.ts` from a plain `.mjs` script, either:
- duplicate the three pure functions into the script (keep tests on `serviceSlug.ts` as SSOT), or
- run via `npx tsx scripts/migrate-elaborated-slugs.mjs`. Prefer **tsx** if already available; otherwise inline a minimal copy of the helpers in the script and comment “keep in sync with serviceSlug.ts”.

- [ ] **Step 2: Dry-run and spot-check expansions**

```bash
node scripts/migrate-elaborated-slugs.mjs --dry-run
# or: npx tsx scripts/migrate-elaborated-slugs.mjs --dry-run
```

Manually verify at least:

| id | expected slug contains |
|----|------------------------|
| `rab` | `bd-rab-rapid-action-battalion` |
| `dpdc` | `bd-dpdc-dhaka-power-distribution-company` |
| `du` | `university-of-dhaka` |

Fix `pickOfficialEnglish` / alias data for any garbage expansions (e.g. expansion === token only) **before** `--write`. For disputed brands, set/correct `serp_title` on the Service markdown first, then re-dry-run.

- [ ] **Step 3: Apply write**

```bash
node scripts/migrate-elaborated-slugs.mjs --write
```

- [ ] **Step 4: Sanity counts**

```bash
rg -c '^slug: bd-[a-z0-9]+$' src/content/services || true
# Prefer near-zero single-token-after-bd bare forms that are still opaque
npm test -- tests/unit/serviceSlug.test.ts tests/unit/content-integrity.test.ts
```

Expected: integrity opaque list empty; duplicates empty.

- [ ] **Step 5: Spot-check `_redirects`**

Confirm `public/_redirects` still starts with sitemap rule and contains:

```
/services/bd-rab    /services/bd-rab-rapid-action-battalion/    301
/services/bd-rab/   /services/bd-rab-rapid-action-battalion/    301
```

- [ ] **Step 6: Commit migration**

```bash
git add src/content/services public/_redirects scripts/migrate-elaborated-slugs.mjs tests/unit/content-integrity.test.ts
git commit -m "$(cat <<'EOF'
feat(catalog): elaborate opaque Service Slugs + 301 redirects

Expand acronym paths to bd-{token}-{expansion} and map legacy short URLs in public/_redirects.
EOF
)"
```

---

### Task 5: Redirect coverage test + URL fixture updates

**Files:**
- Modify: `tests/unit/content-integrity.test.ts`
- Modify: `tests/unit/search.test.ts` (fixture slugs if still short and now invalid under opaque rule — fixtures are synthetic; update examples to elaborated forms for realism)

- [ ] **Step 1: Redirect coverage test**

Add:

```ts
  it('every legacy Service redirect target matches a current service slug', () => {
    const redirects = readFileSync(join(root, 'public/_redirects'), 'utf8');
    const current = new Set(services.map((s) => String(s.slug)));
    const missing: string[] = [];
    for (const line of redirects.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const parts = trimmed.split(/\s+/);
      if (parts.length < 3) continue;
      const [from, to, code] = parts;
      if (code !== '301' || !from.startsWith('/services/')) continue;
      if (from.includes('sitemap')) continue;
      const toSlug = to.replace(/^\/services\//, '').replace(/\/$/, '');
      if (!current.has(toSlug)) missing.push(`${from} → ${to}`);
    }
    expect(missing).toEqual([]);
  });
```

- [ ] **Step 2: Update search fixtures** (optional realism)

In `tests/unit/search.test.ts`, change fixture slugs e.g. `bd-nid` → `bd-nid-national-id` only if those fixtures are meant to look like production; **not required** for CI if fixtures are synthetic and not run through `isOpaqueServiceSlug`. Leave synthetic fixtures short if they never hit the opaque guard.

- [ ] **Step 3: Run tests**

```bash
npm test -- tests/unit/content-integrity.test.ts tests/unit/serviceSlug.test.ts
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add tests/unit/content-integrity.test.ts tests/unit/search.test.ts
git commit -m "$(cat <<'EOF'
test: assert Service slug redirects target live slugs

Keep ADR-0014 legacy _redirects from pointing at missing hops.
EOF
)"
```

---

### Task 6: Full CI + manual redirect smoke

**Files:** none new (verification)

- [ ] **Step 1: CI**

```bash
npm run ci
```

Expected: `astro check` + Vitest + `astro build` PASS. Build emits pages under `/services/bd-rab-rapid-action-battalion/` etc., not bare `/services/bd-rab/`.

- [ ] **Step 2: Confirm dist paths**

```bash
ls dist/services | rg 'bd-rab' | head
# expect: bd-rab-rapid-action-battalion/
# expect absent: bare bd-rab/ as a built directory
```

- [ ] **Step 3: Local redirect smoke (after deploy or `wrangler pages`/assets preview if used)**

On production or CF preview, curl:

```bash
curl -sI https://www.citizensheba.com/services/bd-rab | rg -i 'HTTP/|location'
# expect: 301 + Location …/services/bd-rab-rapid-action-battalion/
```

(If verifying only locally before push, rely on `_redirects` file correctness + CI; CF applies redirects on deploy.)

- [ ] **Step 4: Final commit only if docs/examples still cite old paths**

Search and fix stale public path examples:

```bash
rg -n '/services/bd-rab[^-]|/services/bd-dpdc[^-]|/services/bd-du[^-]' docs AGENTS.md CONTEXT.md || true
```

Update any hits to elaborated examples, then commit:

```bash
git add docs AGENTS.md CONTEXT.md
git commit -m "$(cat <<'EOF'
docs: update Service Slug examples to elaborated forms

Align guide examples with ADR-0014 public paths.
EOF
)"
```

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Opaque-only elaborated formula | Task 1, 4 |
| Stable short `id` | Task 4 (slug-only replace) |
| Skip readable slugs | Task 1 `isOpaqueServiceSlug` + allowlist/hints |
| Soft length ~60–80 | Task 1 `SOFT_SLUG_MAX_CHARS` |
| Permanent `_redirects` 301 (slash + non-slash) | Task 4 |
| One migration wave | Task 4 |
| ADR-0014 + Trap #19 + CONTEXT + checklists | Task 3 |
| Integrity: opaque + duplicates + redirect targets | Tasks 2, 5 |
| No Worker redirects | Non-goal; Task 4 uses `public/_redirects` only |
| Examples RAB / DPDC / DU | Task 1 tests + Task 4 dry-run gate |

## Out of scope (do not do in this plan)

- Category slug changes
- Renaming markdown filenames / `related` ids
- BN orthography (separate WIP)
- Category/pager CSS spacing (separate WIP)
- Push to `main` without explicit user ask
