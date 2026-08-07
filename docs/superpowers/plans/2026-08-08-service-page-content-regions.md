# Service Page content regions — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Service hop mid-page content scannable: About as a primary article panel with labeled BN/EN panes, quiet Who/FAQ support strips, verified inside About — without hiding bilingual content or thickening the SEO hop.

**Architecture:** Pure Astro + CSS on existing hop markup. Shared heading/lang strings in `servicePageCopy.ts`; shared pane markup classes in `global.css`. No new React island, no schema/content Markdown changes, no accordion/TOC/language toggle.

**Tech Stack:** Astro SSG · existing Lucide/hop CSS tokens · Vitest · `docs/guides/service-page.md` as living SSOT

**Spec:** [`docs/superpowers/specs/2026-08-08-service-page-content-regions-design.md`](../specs/2026-08-08-service-page-content-regions-design.md)

---

## File map

| File | Responsibility |
|------|----------------|
| `src/lib/servicePageCopy.ts` | Add `about` heading + shared `servicePageLangLabels` (`বাংলা` / `English`) |
| `tests/unit/servicePageCopy.test.ts` | Lock heading + lang label strings |
| `src/styles/global.css` | `.hop-region--primary`, `.hop-region--support`, `.lang-label`, `.bilingual-panes` / `.bilingual-pane`; adjust body/verified/FAQ |
| `src/pages/services/[slug].astro` | About primary region (body + verified); Who support strip |
| `src/components/service/ServiceFaq.astro` | FAQ support strip + labeled answer panes |
| `docs/guides/service-page.md` | Page order + bilingual presentation rules |
| `docs/guides/frontend.md` | One-line hop content-region note |
| `CONTEXT.md` | Slim Service Page glossary note on content regions |

**Class names (locked for this plan):**

- `hop-region hop-region--primary` — About article panel
- `hop-region hop-region--support` — Who / FAQ strips
- `bilingual-panes` — stack of language panes with hairline between
- `bilingual-pane` — one language block
- `lang-label` — visible `বাংলা` / `English` label
- Keep `service-page__prose` for Markdown body HTML
- Keep `service-page__verified` for the verified line (now inside primary)

---

### Task 1: Copy constants + unit test

**Files:**
- Modify: `src/lib/servicePageCopy.ts`
- Create: `tests/unit/servicePageCopy.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/unit/servicePageCopy.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { servicePageHeadings, servicePageLangLabels } from '../../src/lib/servicePageCopy';

describe('servicePageCopy', () => {
  it('exposes About heading EN+BN', () => {
    expect(servicePageHeadings.about.en).toBe('About this service');
    expect(servicePageHeadings.about.bn).toBe('এই সেবা সম্পর্কে');
  });

  it('exposes language pane labels', () => {
    expect(servicePageLangLabels.bn).toBe('বাংলা');
    expect(servicePageLangLabels.en).toBe('English');
  });

  it('keeps existing section headings', () => {
    expect(servicePageHeadings.audience.en).toBe('Who is this for');
    expect(servicePageHeadings.faq.en).toBe('FAQ');
    expect(servicePageHeadings.related.en).toBe('Related services');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/servicePageCopy.test.ts`

Expected: FAIL (missing `about` and/or `servicePageLangLabels`)

- [ ] **Step 3: Implement copy constants**

Replace `src/lib/servicePageCopy.ts` with:

```ts
/** Shared EN+BN section headings for Service Pages (ADR-0009). */
export const servicePageHeadings = {
  about: {
    en: 'About this service',
    bn: 'এই সেবা সম্পর্কে',
  },
  audience: {
    en: 'Who is this for',
    bn: 'এই সেবা কাদের জন্য',
  },
  faq: {
    en: 'FAQ',
    bn: 'প্রশ্নোত্তর',
  },
  related: {
    en: 'Related services',
    bn: 'সংশ্লিষ্ট সেবা',
  },
} as const;

/** Visible language labels for hop bilingual panes (content regions design 2026-08-08). */
export const servicePageLangLabels = {
  bn: 'বাংলা',
  en: 'English',
} as const;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/servicePageCopy.test.ts`

Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/lib/servicePageCopy.ts tests/unit/servicePageCopy.test.ts
git commit -m "$(cat <<'EOF'
feat(hop): add About heading and language pane labels

Lock shared copy for Service Page content regions before markup/CSS.
EOF
)"
```

---

### Task 2: CSS — primary / support / bilingual panes

**Files:**
- Modify: `src/styles/global.css` (Service Page / FAQ / bilingual-stack area ~1495–1574)

- [ ] **Step 1: Add region + pane styles; update body/verified/FAQ**

Near existing `.service-page__body` / `.bilingual-stack` / `.service-faq` rules, **add** (and adjust as noted):

```css
/* Hop content regions (2026-08-08) */
.hop-region {
  max-width: 42rem;
}

.hop-region--primary {
  margin: 1.75rem 0 0;
  padding: 1.25rem 1.25rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 8px 22px -16px rgba(16, 42, 34, 0.28);
}

.hop-region--support {
  margin: 1rem 0 0;
  padding: 0.875rem 1rem;
  background: var(--surface-muted);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.hop-region h2 {
  margin: 0 0 0.875rem;
  font-family: "Bricolage Grotesque Variable", "Bricolage Grotesque", "Hind Siliguri", sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
}

.hop-region--support h2 {
  margin-bottom: 0.625rem;
  font-size: 1.125rem;
}

.hop-region h2 span[lang="bn"] {
  color: var(--green);
  font-weight: 600;
}

.lang-label {
  margin: 0 0 0.35rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ink-subtle);
}

.bilingual-panes {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.bilingual-pane + .bilingual-pane {
  margin-top: 0.875rem;
  padding-top: 0.875rem;
  border-top: 1px solid var(--border);
}

.hop-region--support .bilingual-pane + .bilingual-pane {
  margin-top: 0.625rem;
  padding-top: 0.625rem;
}

.hop-region--support .service-page__prose,
.hop-region--support .bilingual-pane p {
  font-size: 0.9375rem;
}

.hop-region--primary .service-page__verified {
  margin: 1rem 0 0;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
}
```

**Also change:**

1. Remove or stop relying on `.service-page__prose--secondary` language divider (panes replace it). Keep the class harmless or delete its `border-top` / `margin-top` rules so EN prose inside `.bilingual-pane` does not double-divide.
2. Soften standalone `.service-page__verified` top margin if unused outside primary (verified moves inside About).
3. Update `.service-faq`:

```css
.service-faq.hop-region--support {
  margin-top: 1rem;
}

.service-faq__item + .service-faq__item {
  margin-top: 0.875rem;
  padding-top: 0.875rem;
  border-top: 1px solid var(--border);
}

.service-faq__item h3 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.service-faq__item .bilingual-pane p {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--ink-muted);
  max-width: 42rem;
}
```

4. Dark theme: no new hex — tokens already flip via `[data-theme="dark"]`. If primary shadow looks muddy on dark, add under dark block:

```css
html[data-theme="dark"] .hop-region--primary {
  box-shadow: 0 10px 24px -16px rgba(0, 0, 0, 0.55);
}
```

- [ ] **Step 2: Spot-check tokens exist**

Confirm `:root` already defines `--surface`, `--surface-muted`, `--border`, `--ink-subtle`, `--green` (they do in `global.css`).

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "$(cat <<'EOF'
style(hop): add primary/support regions and bilingual pane chrome

CSS foundation for About article vs quiet Who/FAQ strips.
EOF
)"
```

---

### Task 3: About + Who markup on Service Page

**Files:**
- Modify: `src/pages/services/[slug].astro`

- [ ] **Step 1: Import lang labels**

In the frontmatter import from `servicePageCopy`, ensure:

```ts
import { servicePageHeadings, servicePageLangLabels } from '../../lib/servicePageCopy';
```

(If only `servicePageHeadings` is imported today, extend the import.)

- [ ] **Step 2: Replace body + verified + audience blocks**

Replace the current body section, verified `<p>`, and audience `<section class="content-section">` (everything between status caution and `<ServiceFaq … />`) with:

```astro
    <section class="hop-region hop-region--primary" aria-labelledby="service-about-heading">
      <h2 id="service-about-heading">
        {servicePageHeadings.about.en}{' '}
        <span lang="bn">{servicePageHeadings.about.bn}</span>
      </h2>
      <div class="bilingual-panes">
        <div class="bilingual-pane">
          <p class="lang-label">{servicePageLangLabels.bn}</p>
          <div class="service-page__prose" lang="bn" set:html={bodyBnHtml} />
        </div>
        <div class="bilingual-pane">
          <p class="lang-label">{servicePageLangLabels.en}</p>
          <div class="service-page__prose" set:html={bodyHtml} />
        </div>
      </div>
      <p class="service-page__verified">
        <strong>Official link last verified:</strong>
        <time datetime={verifiedIso}>{verifiedLabel}</time>
      </p>
    </section>

    <section class="hop-region hop-region--support" aria-labelledby="service-audience-heading">
      <h2 id="service-audience-heading">
        {servicePageHeadings.audience.en}{' '}
        <span lang="bn">{servicePageHeadings.audience.bn}</span>
      </h2>
      <div class="bilingual-panes">
        <div class="bilingual-pane">
          <p class="lang-label">{servicePageLangLabels.bn}</p>
          <p lang="bn">{service.data.audience_bn}</p>
        </div>
        <div class="bilingual-pane">
          <p class="lang-label">{servicePageLangLabels.en}</p>
          <p>{service.data.audience}</p>
        </div>
      </div>
    </section>
```

Do **not** wrap Related in `hop-region`. Leave Related as `content-section` (or keep its existing classes).

- [ ] **Step 3: Browser check**

Run: `npm run dev` → open `/services/bd-e-passport` (or the live e-Passport slug) and a short hop.

Expected:
- About has H2 + white/surface panel + বাংলা/English labels + verified inside panel
- Who is quieter muted strip
- Related unchanged

- [ ] **Step 4: Commit**

```bash
git add src/pages/services/[slug].astro
git commit -m "$(cat <<'EOF'
feat(hop): render About primary panel and Who support strip

Labeled BN/EN panes; move last-verified into About.
EOF
)"
```

---

### Task 4: FAQ support strip + labeled answers

**Files:**
- Modify: `src/components/service/ServiceFaq.astro`

- [ ] **Step 1: Rewrite FAQ component**

Replace file contents with:

```astro
---
import { servicePageHeadings, servicePageLangLabels } from '../../lib/servicePageCopy';

interface FaqItem {
  q: string;
  a: string;
  q_bn: string;
  a_bn: string;
}

interface Props {
  items: FaqItem[];
}

const { items } = Astro.props;
const { faq: heading } = servicePageHeadings;
---

<section class="service-faq hop-region hop-region--support" aria-labelledby="service-faq-heading">
  <h2 id="service-faq-heading">
    {heading.en}{' '}
    <span lang="bn">{heading.bn}</span>
  </h2>
  {
    items.map((item) => (
      <div class="service-faq__item">
        <h3>
          {item.q} <span lang="bn">{item.q_bn}</span>
        </h3>
        <div class="bilingual-panes">
          <div class="bilingual-pane">
            <p class="lang-label">{servicePageLangLabels.bn}</p>
            <p lang="bn">{item.a_bn}</p>
          </div>
          <div class="bilingual-pane">
            <p class="lang-label">{servicePageLangLabels.en}</p>
            <p>{item.a}</p>
          </div>
        </div>
      </div>
    ))
  }
</section>
```

- [ ] **Step 2: Browser check FAQ**

Same hop URL — FAQ sits in a support strip; each answer shows বাংলা then English labels; questions still EN+BN one line; items not accordion.

- [ ] **Step 3: Commit**

```bash
git add src/components/service/ServiceFaq.astro
git commit -m "$(cat <<'EOF'
feat(hop): FAQ support strip with labeled bilingual answers

Match Who/FAQ to content-regions hierarchy; keep Q EN+BN one line.
EOF
)"
```

---

### Task 5: Docs SSOT

**Files:**
- Modify: `docs/guides/service-page.md`
- Modify: `docs/guides/frontend.md`
- Modify: `CONTEXT.md` (Service Page glossary paragraph only)

- [ ] **Step 1: Update `service-page.md` page order rows 8–11**

Replace body/verified/audience/FAQ notes roughly as:

| # | Block | Source | Notes |
|---|--------|--------|--------|
| 8 | About (primary) | `body_bn` then `body` | H2 About EN+BN; primary `--surface` panel; labeled বাংলা / English panes; Markdown |
| 9 | Official link last verified | `last_verified` | Inside About panel footer |
| 10 | Who is this for (support) | `audience_bn` then `audience` | Quiet `--surface-muted` strip; labeled panes |
| 11 | FAQ (support) | `faq[]` | Quiet strip; Q EN+BN one line; answers labeled BN→EN |

- [ ] **Step 2: Update bilingual layout rules table**

Change Body/audience/FAQ answers row to:

| Body, audience, FAQ answers | **Labeled panes:** বাংলা block then English block (both in DOM); hairline between |

Update CSS mention: `.hop-region--primary`, `.hop-region--support`, `.bilingual-panes`, `.lang-label` (`.bilingual-stack` may remain unused or for legacy — prefer panes on hop).

Add a short **Content regions** note under Role or after page order:

> About is the primary article; Who and FAQ are quieter support strips. Related stays card-grid only (no outer panel). Design: `docs/superpowers/specs/2026-08-08-service-page-content-regions-design.md`.

- [ ] **Step 3: `frontend.md` Components table**

Add a bullet under Typography/tokens or Components:

- **Service hop content regions:** About = primary surface panel; Who/FAQ = muted support strips; labeled BN/EN panes — see `service-page.md`.

- [ ] **Step 4: Slim `CONTEXT.md` Service Page (v1 content)**

Append to the glossary sentence (do not rewrite the whole entry):

> Mid-page **content regions**: About (primary panel) → Who / FAQ (support strips) with labeled BN/EN panes; verified sits in About; Related cards unchanged.

- [ ] **Step 5: Commit**

```bash
git add docs/guides/service-page.md docs/guides/frontend.md CONTEXT.md
git commit -m "$(cat <<'EOF'
docs: record Service Page content regions in hop SSOT

Update service-page guide, frontend note, and CONTEXT glossary.
EOF
)"
```

---

### Task 6: CI + acceptance

**Files:** none new

- [ ] **Step 1: Run unit tests**

Run: `npx vitest run tests/unit/servicePageCopy.test.ts tests/unit/content-integrity.test.ts`

Expected: PASS

- [ ] **Step 2: Run full CI**

Run: `npm run ci`

Expected: exit 0 (`astro check`, Vitest, build)

- [ ] **Step 3: Manual acceptance (light + dark)**

On `/services/bd-e-passport` (or equivalent) and one short hop:

- [ ] About reads as main article (surface panel + H2)
- [ ] Who + FAQ quieter than About
- [ ] Labels `বাংলা` / `English` visible; both languages in View Source without click
- [ ] Verified inside About
- [ ] Related cards unchanged (no outer panel)
- [ ] Dark theme: panels use tokens; labels readable on muted

- [ ] **Step 4: Final commit only if polish tweaks landed**

If CSS padding/shadow tuned during acceptance:

```bash
git add src/styles/global.css
git commit -m "$(cat <<'EOF'
style(hop): tune content-region spacing after live check
EOF
)"
```

If no polish: skip.

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Labeled BN/EN panes, both in DOM | 1, 3, 4 |
| About H2 + primary panel | 2, 3 |
| Verified inside About | 3 |
| Who/FAQ support strips | 2, 3, 4 |
| Related unchanged | 3 (explicit non-wrap) |
| No toggle/TOC/accordion | Non-goals; not in tasks |
| Docs / CONTEXT | 5 |
| CI + spot-check | 6 |

## Out of scope (do not implement in this plan)

- Language toggle, side-by-side columns, jump nav, accordion FAQ
- Content Markdown rewrites
- New ADR (guide update only unless bilingual *presentation* hardens later)
- Astro design-preview routes
