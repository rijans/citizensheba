# BD Digital Services Directory (Sheba) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a Mobile-First Astro SSG Directory on Cloudflare Pages with Instant Directory search, SEO hop Service Pages (`/services/bd-*`), Category Pages, agent/AI signals, and Link Health ops.

**Architecture:** Git-managed Astro Content Collections drive static HTML for Service/Category pages. Home hydrates a React island for fuzzy search/filter. Build emits sitemap, `/llms.txt`, and search index data. CI validates content schema and Outbound Links. Brand placeholder: **Sheba**.

**Tech Stack:** Astro (SSG) · React (`@astrojs/react`) · Tailwind CSS · Zod content schemas · Vitest · Playwright (smoke) · Cloudflare Pages · GitHub Actions

**Spec:** `docs/superpowers/specs/2026-08-06-bd-digital-services-directory-design.md`  
**Glossary:** `CONTEXT.md`

---

## File structure (create)

```text
package.json
astro.config.mjs
tsconfig.json
vitest.config.ts
playwright.config.ts
public/
  favicon.svg
  icons/icon-192.png          # generate simple placeholder PNGs
  icons/icon-512.png
  manifest.webmanifest
  .well-known/ai.txt
src/
  content.config.ts
  content/
    categories/
      central.yaml
      identity.yaml
      tax.yaml
      transport.yaml
      land.yaml
      education.yaml
      health.yaml
    services/                 # one .md per Service (frontmatter)
      nid.md
      … (seed from Fable5/services.json)
  lib/
    urls.ts                   # slug → path helpers
    search.ts                 # fuzzy score (pure; unit-tested)
    buildSearchIndex.ts       # map collections → island props
    site.ts                   # site name, origin, disclaimer blurb
  components/
    layout/
      BaseLayout.astro
      Header.astro
      Footer.astro
    directory/
      InstantDirectory.tsx    # React island
      NoscriptDirectory.astro # JS-off fallback list
    service/
      OutboundCta.astro
      StatusBadge.astro
      ServiceFaq.astro
    ui/
      ServiceCardLink.astro   # card → Service Page (static)
  pages/
    index.astro
    about.astro
    disclaimer.astro
    404.astro
    categories/[slug].astro
    services/[slug].astro
    llms.txt.ts               # build-time text route
    robots.txt.ts
  styles/
    global.css
scripts/
  check-links.mjs
tests/
  unit/search.test.ts
  e2e/home.spec.ts
.github/workflows/
  ci.yml
  link-health.yml
```

---

### Task 1: Scaffold Astro project with React + Tailwind + Vitest

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `src/styles/global.css`, `src/pages/index.astro` (temporary)

- [ ] **Step 1: Create Astro app in repo root**

Run from `/home/jaber/www/Sheba` (keep existing `docs/`, `CONTEXT.md`, POCs):

```bash
npm create astro@latest . -- --template minimal --typescript strict --install --no-git --yes
npx astro add react tailwind --yes
npm install -D vitest @vitest/coverage-v8 happy-dom
```

If the create wizard refuses a non-empty dir, scaffold in a temp folder and move `package.json`, `astro.config.mjs`, `src/`, `public/` into the repo root without deleting `docs/` or `CONTEXT.md`.

- [ ] **Step 2: Configure Astro for static output + site URL**

`astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://sheba.example.com', // replace when domain exists
  output: 'static',
  integrations: [react(), tailwind()],
});
```

- [ ] **Step 3: Add Vitest config**

`vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['tests/unit/**/*.test.ts'],
  },
});
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "check:links": "node scripts/check-links.mjs"
  }
}
```

- [ ] **Step 4: Verify scaffold builds**

```bash
npm run build
```

Expected: `dist/` created without errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts src public
git commit -m "chore: scaffold Astro SSG with React, Tailwind, Vitest"
```

---

### Task 2: Site constants and URL helpers

**Files:**
- Create: `src/lib/site.ts`, `src/lib/urls.ts`
- Test: `tests/unit/urls.test.ts`

- [ ] **Step 1: Write failing URL tests**

`tests/unit/urls.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { categoryPath, servicePath, assertServiceSlug } from '../../src/lib/urls';

describe('urls', () => {
  it('builds service paths with bd- slug', () => {
    expect(servicePath('bd-nid')).toBe('/services/bd-nid');
  });

  it('builds category paths', () => {
    expect(categoryPath('identity-registration')).toBe('/categories/identity-registration');
  });

  it('rejects service slugs without bd- prefix', () => {
    expect(() => assertServiceSlug('nid')).toThrow(/bd-/);
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm test -- tests/unit/urls.test.ts
```

Expected: FAIL (module not found).

- [ ] **Step 3: Implement helpers**

`src/lib/urls.ts`:

```ts
const SERVICE_SLUG = /^bd-[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function servicePath(slug: string): string {
  assertServiceSlug(slug);
  return `/services/${slug}`;
}

export function categoryPath(slug: string): string {
  return `/categories/${slug}`;
}

export function assertServiceSlug(slug: string): void {
  if (!SERVICE_SLUG.test(slug)) {
    throw new Error(`Service slug must match ${SERVICE_SLUG}: got "${slug}"`);
  }
}

export function officialDomainFromUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0] ?? url;
}
```

`src/lib/site.ts`:

```ts
export const SITE_NAME = 'Sheba';
export const SITE_NAME_BN = 'সেবা';
export const SITE_TAGLINE =
  'Find Bangladesh government and utility digital services — then open the official site.';
export const DISCLAIMER_SHORT =
  'Sheba is not a government entity and is not an official portal. We only help you discover official services.';
export const REPORT_EMAIL = 'rijans.x@gmail.com'; // change if needed
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test -- tests/unit/urls.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/site.ts src/lib/urls.ts tests/unit/urls.test.ts
git commit -m "feat: add site constants and URL helpers"
```

---

### Task 3: Fuzzy search scorer (port from Fable5 POC)

**Files:**
- Create: `src/lib/search.ts`
- Test: `tests/unit/search.test.ts`

- [ ] **Step 1: Write failing search tests**

`tests/unit/search.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { scoreService, type SearchableService } from '../../src/lib/search';

const nid: SearchableService = {
  id: 'nid',
  title: 'NID Services',
  titleBn: 'জাতীয় পরিচয়পত্র',
  description: 'New voter registration and NID corrections.',
  tags: ['nid', 'voter', 'identity', 'পরিচয়পত্র'],
  categoryName: 'Identity & Registration',
  categoryNameBn: 'পরিচয় ও নিবন্ধন',
  domain: 'services.nidw.gov.bd',
};

describe('scoreService', () => {
  it('returns 0 for empty query', () => {
    expect(scoreService(nid, '')).toBe(0);
  });

  it('ranks exact title prefix highly', () => {
    expect(scoreService(nid, 'nid')).toBeGreaterThan(80);
  });

  it('matches Bengali tags', () => {
    expect(scoreService(nid, 'পরিচয়পত্র')).toBeGreaterThan(0);
  });

  it('returns -1 when a token matches nothing', () => {
    expect(scoreService(nid, 'passport xyzzy')).toBe(-1);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npm test -- tests/unit/search.test.ts
```

- [ ] **Step 3: Implement scorer**

`src/lib/search.ts` (logic aligned with `Fable5/.../bd-services-directory.jsx`):

```ts
export type SearchableService = {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  tags: string[];
  categoryName: string;
  categoryNameBn: string;
  domain: string;
};

const norm = (s: string) => (s || '').toString().toLowerCase().normalize('NFC');

function subseq(q: string, s: string): boolean {
  let i = 0;
  for (let j = 0; j < s.length && i < q.length; j++) if (s[j] === q[i]) i++;
  return i === q.length;
}

export function scoreService(sv: SearchableService, rawQuery: string): number {
  const q = norm(rawQuery).trim();
  if (!q) return 0;

  const title = norm(sv.title);
  const desc = norm(sv.description);
  const bn = `${norm(sv.titleBn)} ${norm(sv.categoryNameBn)}`;
  const tags = sv.tags.map(norm);
  const catName = norm(sv.categoryName);
  const dom = norm(sv.domain);
  const hay = [title, bn, desc, catName, tags.join(' '), dom].join(' | ');

  let total = 0;
  for (const t of q.split(/\s+/)) {
    let best = -1;
    if (title.startsWith(t)) best = 100;
    else if (title.split(/\s+/).some((w) => w.startsWith(t))) best = 90;
    else if (title.includes(t)) best = 82;
    else if (tags.some((g) => g.startsWith(t))) best = 76;
    else if (bn.includes(t)) best = 74;
    else if (tags.some((g) => g.includes(t))) best = 66;
    else if (catName.includes(t)) best = 56;
    else if (desc.includes(t)) best = 50;
    else if (dom.includes(t)) best = 46;
    else if (t.length >= 3 && subseq(t, title.replace(/\s+/g, ''))) best = 28;
    else if (t.length >= 4 && subseq(t, hay)) best = 12;
    if (best < 0) return -1;
    total += best;
  }
  return total;
}

export function filterAndSort(
  services: SearchableService[],
  query: string,
  categoryId: string | null,
): SearchableService[] {
  const scored = services
    .filter((s) => (categoryId ? (s as SearchableService & { categoryId?: string }).categoryId === categoryId : true))
    .map((s) => ({ s, score: scoreService(s, query) }))
    .filter((x) => x.score >= 0);

  if (!query.trim()) return scored.map((x) => x.s);
  return scored.sort((a, b) => b.score - a.score).map((x) => x.s);
}
```

Extend `SearchableService` with `categoryId: string` and `slug: string` before island work — update the type and tests in the same commit if you add fields now:

```ts
export type SearchableService = {
  id: string;
  slug: string;
  categoryId: string;
  title: string;
  titleBn: string;
  description: string;
  tags: string[];
  categoryName: string;
  categoryNameBn: string;
  domain: string;
  status: 'ACTIVE' | 'MAINTENANCE' | 'DEPRECATED';
};
```

Update the test fixture accordingly. Fix `filterAndSort` to use `s.categoryId` directly (no cast).

- [ ] **Step 4: Run — expect PASS**

```bash
npm test -- tests/unit/search.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/search.ts tests/unit/search.test.ts
git commit -m "feat: port fuzzy service search scorer with tests"
```

---

### Task 4: Content collections schema + seed data

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/categories/*.yaml`
- Create: `src/content/services/*.md` (all POC services)
- Create: `src/lib/buildSearchIndex.ts`

- [ ] **Step 1: Define collections**

`src/content.config.ts`:

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const category = defineCollection({
  loader: glob({ base: './src/content/categories', pattern: '**/*.{yaml,yml}' }),
  schema: z.object({
    id: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    name: z.string(),
    name_bn: z.string(),
    description: z.string(),
    icon: z.string(),
    sort_order: z.number().int(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
  }),
});

const faqItem = z.object({ q: z.string(), a: z.string() });

const service = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.md' }),
  schema: z.object({
    id: z.string(),
    slug: z.string().regex(/^bd-[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string(),
    title_bn: z.string(),
    description: z.string(),
    url: z.string().url(),
    official_domain: z.string().optional(),
    category: z.string(), // category.id
    tags: z.array(z.string()),
    status: z.enum(['ACTIVE', 'MAINTENANCE', 'DEPRECATED']),
    audience: z.string(),
    faq: z.array(faqItem).min(3).max(5),
    related: z.array(z.string()).optional(),
    last_verified: z.coerce.date(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    logo: z.string().optional(),
  }),
});

export const collections = { categories: category, services: service };
```

Note: with `glob` loaders, entry `id` often comes from filename — still keep explicit `id` in frontmatter for stable refs. If Astro warns about duplicate `id`, rename the schema field to `service_id` / `category_id` and update all references consistently (prefer keeping `id` in data and using filename = `id`).

- [ ] **Step 2: Seed one category + one service first**

`src/content/categories/identity.yaml`:

```yaml
id: identity
slug: identity-registration
name: Identity & Registration
name_bn: পরিচয় ও নিবন্ধন
description: National ID, birth registration, and passport services.
icon: fingerprint
sort_order: 2
```

`src/content/services/nid.md`:

```md
---
id: nid
slug: bd-nid
title: NID Services
title_bn: জাতীয় পরিচয়পত্র
description: Portal for new voter registration, NID correction, and downloading NID copies.
url: https://services.nidw.gov.bd/nid-pub/
official_domain: services.nidw.gov.bd
category: identity
tags: [nid, voter, identity, smart card, পরিচয়পত্র]
status: ACTIVE
audience: Bangladeshi citizens who need to register, correct, or download a National ID.
faq:
  - q: Is this the official NID website?
    a: No. This page helps you find the official portal. Use the Open official site button to go to services.nidw.gov.bd.
  - q: What can I do on the official portal?
    a: New voter registration, NID corrections, and downloading NID copies (as offered by the government portal).
  - q: Do I need to create an account on Sheba?
    a: No. Sheba only lists services. You complete everything on the official site.
last_verified: 2026-08-06
meta_title: NID Services Bangladesh — official portal link | Sheba
meta_description: Find the official Bangladesh NID services portal for registration, correction, and NID copy download.
---
```

- [ ] **Step 3: Build search index helper**

`src/lib/buildSearchIndex.ts`:

```ts
import { getCollection } from 'astro:content';
import { officialDomainFromUrl } from './urls';
import type { SearchableService } from './search';

export async function buildSearchIndex(): Promise<{
  categories: { id: string; slug: string; name: string; nameBn: string; sortOrder: number }[];
  services: SearchableService[];
}> {
  const categories = (await getCollection('categories'))
    .map((c) => ({
      id: c.data.id,
      slug: c.data.slug,
      name: c.data.name,
      nameBn: c.data.name_bn,
      sortOrder: c.data.sort_order,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const catById = Object.fromEntries(categories.map((c) => [c.id, c]));

  const services: SearchableService[] = (await getCollection('services')).map((s) => {
    const cat = catById[s.data.category];
    if (!cat) throw new Error(`Service ${s.data.id} references missing category ${s.data.category}`);
    return {
      id: s.data.id,
      slug: s.data.slug,
      categoryId: s.data.category,
      title: s.data.title,
      titleBn: s.data.title_bn,
      description: s.data.description,
      tags: s.data.tags,
      categoryName: cat.name,
      categoryNameBn: cat.nameBn,
      domain: s.data.official_domain ?? officialDomainFromUrl(s.data.url),
      status: s.data.status,
    };
  });

  return { categories, services };
}
```

- [ ] **Step 4: Seed remaining categories + services**

Copy all entries from `Fable5/bd_portals_fable_5_jaber_vai/services.json` into YAML/MD. Every service needs `slug: bd-…`, `audience`, `faq` (3 items min), `last_verified`. Categories: `central`, `identity`, `tax`, `transport`, `land`, `education`, `health` with slugs like `central-portals`, `identity-registration`, `tax-finance`, `transport-travel`, `land-property`, `education-results`, `health-welfare`.

- [ ] **Step 5: Verify content loads**

```bash
npm run build
```

Expected: build succeeds; schema rejects bad slugs/URLs if you introduce a deliberate error.

- [ ] **Step 6: Commit**

```bash
git add src/content.config.ts src/content src/lib/buildSearchIndex.ts
git commit -m "feat: add content collections schema and seed Official Services"
```

---

### Task 5: Base layout, global CSS, Header, Footer (Mobile-First)

**Files:**
- Create: `src/styles/global.css`, `src/components/layout/BaseLayout.astro`, `Header.astro`, `Footer.astro`

- [ ] **Step 1: Global tokens + mobile base**

`src/styles/global.css` — CSS variables for green/red flag-inspired palette, Hind Siliguri + display font via `@import` or `astro` font load; `body` 16px; focus-visible rings; sticky-friendly header height ~56–64px.

- [ ] **Step 2: BaseLayout**

`src/components/layout/BaseLayout.astro` accepts `title`, `description`, optional `canonicalPath`. Renders `<html lang="en">`, meta, link to manifest, Header, `<slot />`, Footer. Include Cloudflare Web Analytics beacon placeholder comment (enable after CF project exists).

- [ ] **Step 3: Header + Footer**

Header: brand `Sheba` / `সেবা`, Home link, theme toggle (localStorage `data-theme`, small inline script or tiny island).  
Footer: 3 columns — Categories (from `getCollection`), About/Disclaimer, `DISCLAIMER_SHORT`.

- [ ] **Step 4: Visual check**

```bash
npm run dev
```

Open phone width (DevTools 390px): header/footer usable, no horizontal page scroll.

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css src/components/layout
git commit -m "feat: add Mobile-First base layout, header, and footer"
```

---

### Task 6: Shared ServiceCardLink + StatusBadge

**Files:**
- Create: `src/components/ui/ServiceCardLink.astro`, `src/components/service/StatusBadge.astro`

- [ ] **Step 1: StatusBadge**

Renders nothing for `ACTIVE`; otherwise a visible badge (`MAINTENANCE` / `DEPRECATED`).

- [ ] **Step 2: ServiceCardLink**

Props: `href`, `title`, `titleBn`, `description`, `status`. Entire card is an `<a href={servicePath}>` (internal). No outbound URL on the card.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/ServiceCardLink.astro src/components/service/StatusBadge.astro
git commit -m "feat: add service card link and status badge"
```

---

### Task 7: Instant Directory React island + Home page

**Files:**
- Create: `src/components/directory/InstantDirectory.tsx`, `src/components/directory/NoscriptDirectory.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Implement InstantDirectory**

Props: `{ categories, services, initialCategoryId: string | null }`.

Behavior:
- Read `initialCategoryId` from prop (Home passes `Astro.url.searchParams.get('cat')`)
- Search input + clear
- Chips: All + each category → set `categoryId` filter in state
- When a category is active, show text link `View all in category` → `categoryPath(slug)`
- Filter via `filterAndSort` from `src/lib/search.ts`
- Empty state with clear action
- Results: links to `servicePath(slug)` (reuse card styles via classNames matching CSS)

Use `client:load` on Home.

- [ ] **Step 2: NoscriptDirectory**

Static lists of categories and services as links for JS-off users.

- [ ] **Step 3: Home page**

`src/pages/index.astro`:

```astro
---
import BaseLayout from '../components/layout/BaseLayout.astro';
import InstantDirectory from '../components/directory/InstantDirectory';
import NoscriptDirectory from '../components/directory/NoscriptDirectory.astro';
import { buildSearchIndex } from '../lib/buildSearchIndex';
import { SITE_NAME, SITE_TAGLINE } from '../lib/site';

const index = await buildSearchIndex();
const initialCategoryId = Astro.url.searchParams.get('cat');
---
<BaseLayout title={`${SITE_NAME} — BD Digital Services`} description={SITE_TAGLINE}>
  <section class="hero">
    <h1>{SITE_NAME} <span lang="bn">সেবা</span></h1>
    <p>{SITE_TAGLINE}</p>
  </section>
  <InstantDirectory
    client:load
    categories={index.categories}
    services={index.services}
    initialCategoryId={initialCategoryId}
  />
  <NoscriptDirectory categories={index.categories} services={index.services} />
</BaseLayout>
```

- [ ] **Step 4: Manual test**

```bash
npm run dev
```

Search `nid`, filter Identity, open card → `/services/bd-nid` (404 until Task 8 — link path must be correct).

- [ ] **Step 5: Commit**

```bash
git add src/components/directory src/pages/index.astro
git commit -m "feat: add Instant Directory island and Home page"
```

---

### Task 8: Service Pages (SEO hop)

**Files:**
- Create: `src/pages/services/[slug].astro`, `src/components/service/OutboundCta.astro`, `ServiceFaq.astro`

- [ ] **Step 1: OutboundCta**

```astro
---
const { url, domain } = Astro.props;
---
<a class="cta" href={url} target="_blank" rel="noopener noreferrer">
  Open official site
</a>
<p class="domain">{domain}</p>
```

- [ ] **Step 2: ServiceFaq**

Render `<section>` with `<h2>FAQ</h2>` and each `q`/`a` as heading+paragraph (static HTML for SEO).

- [ ] **Step 3: Dynamic route**

`src/pages/services/[slug].astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../components/layout/BaseLayout.astro';
import OutboundCta from '../../components/service/OutboundCta.astro';
import ServiceFaq from '../../components/service/ServiceFaq.astro';
import StatusBadge from '../../components/service/StatusBadge.astro';
import ServiceCardLink from '../../components/ui/ServiceCardLink.astro';
import { categoryPath, servicePath, officialDomainFromUrl } from '../../lib/urls';

export async function getStaticPaths() {
  const services = await getCollection('services');
  return services.map((s) => ({ params: { slug: s.data.slug }, props: { service: s } }));
}

const { service } = Astro.props;
const categories = await getCollection('categories');
const category = categories.find((c) => c.data.id === service.data.category);
if (!category) throw new Error('missing category');

const all = await getCollection('services');
const relatedIds = service.data.related ?? all.filter((s) => s.data.category === service.data.category && s.data.id !== service.data.id).map((s) => s.data.id).slice(0, 4);
const related = all.filter((s) => relatedIds.includes(s.data.id));

const domain = service.data.official_domain ?? officialDomainFromUrl(service.data.url);
const title = service.data.meta_title ?? `${service.data.title} (${service.data.title_bn}) | Sheba`;
const description = service.data.meta_description ?? service.data.description;
---
<BaseLayout title={title} description={description} canonicalPath={servicePath(service.data.slug)}>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="/">Home</a> /
    <a href={categoryPath(category.data.slug)}>{category.data.name}</a> /
    <span>{service.data.title}</span>
  </nav>
  <StatusBadge status={service.data.status} />
  <h1>{service.data.title} <span lang="bn">{service.data.title_bn}</span></h1>
  <p>{service.data.description}</p>
  <OutboundCta url={service.data.url} domain={domain} />
  {service.data.status !== 'ACTIVE' && (
    <p class="caution">The official site may be unavailable or changing. Verify on the government domain above.</p>
  )}
  <p><strong>Last verified:</strong> <time datetime={service.data.last_verified.toISOString()}>{service.data.last_verified.toISOString().slice(0, 10)}</time></p>
  <section>
    <h2>Who is this for</h2>
    <p>{service.data.audience}</p>
  </section>
  <ServiceFaq items={service.data.faq} />
  <section>
    <h2>Related services</h2>
    <div class="grid">
      {related.map((r) => (
        <ServiceCardLink
          href={servicePath(r.data.slug)}
          title={r.data.title}
          titleBn={r.data.title_bn}
          description={r.data.description}
          status={r.data.status}
        />
      ))}
    </div>
  </section>
  <p>
    <a href={`mailto:rijans.x@gmail.com?subject=${encodeURIComponent('Report: ' + service.data.slug)}`}>Report a problem</a>
  </p>
</BaseLayout>
```

Use `REPORT_EMAIL` from `site.ts` instead of hardcoding in the final file.

- [ ] **Step 4: Build + open `/services/bd-nid`**

```bash
npm run build && npm run preview
```

Expected: full HTML contains FAQ text and outbound CTA with `target="_blank"`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/services src/components/service
git commit -m "feat: add SEO hop Service Pages with CTA, FAQ, report link"
```

---

### Task 9: Category Pages

**Files:**
- Create: `src/pages/categories/[slug].astro`

- [ ] **Step 1: Implement route**

`getStaticPaths` from categories. List services where `category === id` using `ServiceCardLink`. Include link `Browse on Home` → `/?cat={id}`.

- [ ] **Step 2: Build verify**

```bash
npm run build
```

Expected: `/categories/identity-registration/index.html` (or equivalent) exists.

- [ ] **Step 3: Commit**

```bash
git add src/pages/categories
git commit -m "feat: add indexable Category Pages"
```

---

### Task 10: About, Disclaimer, 404

**Files:**
- Create: `src/pages/about.astro`, `src/pages/disclaimer.astro`, `src/pages/404.astro`

- [ ] **Step 1: About** — explain Directory purpose, Non-Official nature, link to disclaimer.  
- [ ] **Step 2: Disclaimer** — fuller Non-Official Disclaimer; no legal theater beyond clear wording.  
- [ ] **Step 3: 404** — message + link Home + optional search prompt.  
- [ ] **Step 4: Commit**

```bash
git add src/pages/about.astro src/pages/disclaimer.astro src/pages/404.astro
git commit -m "feat: add about, disclaimer, and 404 pages"
```

---

### Task 11: robots.txt, llms.txt, ai.txt, manifest, sitemap

**Files:**
- Create: `src/pages/robots.txt.ts`, `src/pages/llms.txt.ts`, `public/manifest.webmanifest`, `public/.well-known/ai.txt`, `public/favicon.svg`, icons
- Modify: `astro.config.mjs` (add `@astrojs/sitemap` if used)

- [ ] **Step 1: Install sitemap**

```bash
npx astro add sitemap --yes
```

- [ ] **Step 2: robots.txt.ts**

```ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const body = `User-agent: *
Allow: /

# Content Signals (Cloudflare-oriented preferences)
# search=yes, ai-input=yes, ai-train=no

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Disallow: /

Sitemap: ${site}sitemap-index.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
```

Tune bot rules to match ADR 0002 (`ai-train=no`). Prefer documenting Content-Signal comment block per [contentsignals.org](https://contentsignals.org/) syntax Cloudflare expects; if CF managed robots will override, keep this file as the baseline for non-CF previews.

- [ ] **Step 3: llms.txt.ts**

Build Markdown: H1 site name, blockquote summary (include Non-Official note), H2 Categories with absolute links, H2 Services with absolute links + one-line descriptions. Cap to curated lists (all v1 services is fine while small).

- [ ] **Step 4: `public/.well-known/ai.txt`**

Short advisory mirroring: search allowed, AI input/citation allowed, training not allowed; contact email; link to `/disclaimer`.

- [ ] **Step 5: manifest.webmanifest**

`name`/`short_name` Sheba, `start_url` `/`, `display` `standalone`, icons 192/512, theme colors from palette. **No service worker.**

- [ ] **Step 6: Build and curl outputs**

```bash
npm run build
grep -n "Sheba" dist/llms.txt | head
cat dist/robots.txt | head
```

- [ ] **Step 7: Commit**

```bash
git add astro.config.mjs src/pages/robots.txt.ts src/pages/llms.txt.ts public
git commit -m "feat: add sitemap, robots, llms.txt, ai.txt, and installable manifest"
```

---

### Task 12: Link Health script + GitHub Actions

**Files:**
- Create: `scripts/check-links.mjs`, `.github/workflows/ci.yml`, `.github/workflows/link-health.yml`

- [ ] **Step 1: check-links.mjs**

Read all `src/content/services/*.md` frontmatter `url` fields (use `gray-matter` or simple YAML parse). `fetch` each with HEAD/GET, timeout 15s, collect non-2xx/3xx. Exit `1` if any fail. Also warn (exit 0 with stderr) if `last_verified` older than 90 days.

```bash
npm install -D gray-matter
```

- [ ] **Step 2: ci.yml**

On PR/push: `npm ci`, `npm test`, `npm run build`.

- [ ] **Step 3: link-health.yml**

Cron weekly + `workflow_dispatch`: `npm ci`, `npm run check:links`.

- [ ] **Step 4: Run locally**

```bash
npm run check:links
```

Expected: mostly pass; note any known flaky gov HTTP sites — document allowlist only if necessary (prefer fixing URLs).

- [ ] **Step 5: Commit**

```bash
git add scripts .github package.json package-lock.json
git commit -m "ci: add build tests and Outbound Link health checks"
```

---

### Task 13: Playwright smoke + Cloudflare Pages config

**Files:**
- Create: `playwright.config.ts`, `tests/e2e/home.spec.ts`, `public/_headers` (optional CF), `wrangler.toml` or CF dashboard notes in README

- [ ] **Step 1: Install Playwright**

```bash
npm install -D @playwright/test
npx playwright install chromium
```

- [ ] **Step 2: Smoke test**

`tests/e2e/home.spec.ts`: start from `npm run preview` after build — search box visible, type `nid`, click through to Service Page, assert CTA `Open official site` has `target="_blank"`.

- [ ] **Step 3: Add `README.md`**

Document: brand placeholder, `npm run dev/build/test`, content editing workflow, Cloudflare Pages setup (build `npm run build`, output `dist`), domain later, analytics enablement.

- [ ] **Step 4: Commit**

```bash
git add playwright.config.ts tests/e2e README.md public/_headers
git commit -m "test: add Playwright smoke and Cloudflare deploy notes"
```

---

### Task 14: Polish Mobile-First UX + final verification

**Files:**
- Modify: CSS/components as needed from checklist

- [ ] **Step 1: Checklist against spec**

- [ ] Home search above fold on 390px width  
- [ ] Chips scroll horizontally without page scroll trap  
- [ ] Cards 1-col mobile / multi-col desktop  
- [ ] Service CTA thumb-friendly  
- [ ] Footer disclaimer visible  
- [ ] Theme toggle works  
- [ ] `npm test && npm run build` green  

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "fix: Mobile-First polish for Directory launch bar"
```

---

## Spec coverage self-review

| Spec requirement | Task(s) |
|---|---|
| Astro SSG + React island + CF Pages | 1, 7, 13 |
| Mixed UI, English/`bd-` slugs | 2, 4, 8 |
| Instant Directory | 3, 7 |
| Service SEO hop (FAQ, audience, verified, CTA new tab) | 8 |
| Category Pages + Home filters | 7, 9 |
| Git content, schema validation | 4, 12 |
| About/Disclaimer/Non-Official | 5, 10 |
| Installable Shell only | 11 |
| llms.txt + robots signals + ai.txt | 11 |
| Link Health report + CI | 8, 12 |
| Mobile-First | 5, 14 |
| Analytics simple | 5 (beacon hook), 13 README |
| Noscript / JS-off | 7 |
| 404 | 10 |

**Deferred (intentionally, per spec):** Guides, CMS, offline SW, ads, final domain/brand, GA.

**Placeholder scan:** No TBD implementation steps; domain stays `sheba.example.com` until purchased (called out in config/README).

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-06-bd-digital-services-directory.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — run tasks in this session with executing-plans checkpoints  

Which approach?
