# Service Page hop structure (CitizenSheba)

> **SSOT for Service Page layout and hop copy.** Read this before changing `/services/bd-*` UI, schema fields that render on the hop, or Service Markdown shape. Decisions that are hard to reverse stay in ADRs; this guide is the living structure + editorial rules.

**Adding a Service?** Use the checklist [`new-service.md`](new-service.md) first (fields, icons, ranks, cards), then this file for hop structure/copy rules.

**When to read:** any task touching Service Pages, `src/pages/services/[slug].astro`, `HopDisclose` / `BilingualPanes` / `ServiceFaq` / `OutboundCta`, `body` / `audience` / FAQ content, or hop-related CSS.

**When to update:** any change to page section order, bilingual layout rules, required content fields on the hop, FAQ policy, SERP/`serp_title` rules, or verified-link labeling — update **this file first**, then ADRs / CONTEXT / INDEX / Trap #9 as needed (see [DOC_ARCHITECTURE](../specs/DOC_ARCHITECTURE.md)).

## Role

Thin **SEO hop**: help citizens reach the official portal fast, with enough honest context for search and humans. Not a full Guide (requirements/fees essays) and not a doorway spam page (Trap #9).

Non-Official stance lives in site chrome (CTA, About, Disclaimer) — **not** repeated in `body` or FAQ.

**Content regions:** About (primary), Who, and FAQ use `HopDisclose` + `BilingualPanes` (FAQ via `ServiceFaq`); **expanded by default** (`<details open>`) — collapse is optional. Regions span the full `site-main` width (no 42rem reading column). Related stays card-grid only (no outer panel). Implementation map: [`code-structure.md`](code-structure.md). Design: [`docs/superpowers/specs/2026-08-08-service-page-content-regions-design.md`](../superpowers/specs/2026-08-08-service-page-content-regions-design.md).

## Page order (top → bottom)

Implementation: `src/pages/services/[slug].astro` + `HopDisclose` / `BilingualPanes` / `ServiceFaq` (see [`code-structure.md`](code-structure.md)).

| # | Block | Source | Notes |
|---|--------|--------|--------|
| — | Document Title (`<title>`) | `serp_title_bn`/`serp_title` or `title_bn`/`title` | `বাংলা — English \| CitizenSheba Bangladesh` (ADR-0003); expand short acronyms for SERP |
| — | Open Graph / Twitter image | brand default or future Service OG | `resolveOgImage()` — brand `og-default.png` until per-Service raster exists |
| — | JSON-LD | composed in page + BaseLayout | Sitewide Organization + WebSite; hop adds BreadcrumbList + WebPage (`last_verified` → `dateModified`). Not GovernmentService. |
| 1 | Breadcrumb | Category + Service | Lucide home icon + Home → Category → title (`Breadcrumb.astro`); schema mirrors visible trail |
| 2 | Status badge | `status` | When not `ACTIVE` |
| 3 | Icon + H1 | Service `icon` ?? Category `icon`; `title` + `title_bn` | Same Lucide + Category accent as cards (ADR-0004); EN then BN on one line |
| 4 | Formerly … | `aliases` where `kind: former` | Quiet line only |
| 5 | Short description | `description` | EN only under H1 today; cards + Meta Description also use short fields |
| 5b | Capability capsules | optional `capabilities[]` | 2–4 EN+BN soft capsules (muted gray EN, subtler gray BN); hop only — ADR-0011 |
| 6 | Outbound CTA | `url` + domain + `last_verified` | Green button left; right = white meta well: domain + `Verified on {date}` stacked, **Copy link** vertically centered beside them; stacks under on phone; bilingual toast |
| 7 | Status caution | if not `ACTIVE` | Short warning |
| 8 | About (primary) | `body_bn` then `body` | `HopDisclose` + `BilingualPanes`; primary panel; BN→EN Markdown via `set:html` |
| 9 | Who is this for (support) | `audience_bn` then `audience` | Same modules; support strip; plain text panes |
| 10 | FAQ (support) | `faq[]` with `q`/`a`/`q_bn`/`a_bn` | `ServiceFaq` wraps `HopDisclose`; Q EN+BN one line; answers via `BilingualPanes` |
| 11 | Related services | related cards | Heading EN+BN; cards already show `title` + `title_bn` |
| 12 | Report a problem | mailto | **Temporarily disabled** (commented out in `[slug].astro`) |

Shared section heading strings: `src/lib/servicePageCopy.ts` (not per-service).

## Bilingual layout rules

| Surface | Pattern |
|---------|---------|
| H1, section headings, FAQ questions | **EN + BN on one line** (BN in `lang="bn"`, green accent) |
| Body, audience, FAQ answers | **Labeled panes:** বাংলা block then English block (both in DOM); hairline between. `.lang-label` is a **uniform muted** cue on About / Who / FAQ (small caps, weight 500 — do not let support-prose rules enlarge labels) |
| SERP Document Title / Meta Description | BN→EN (ADR-0003); brand `CitizenSheba Bangladesh`; optional `serp_title*` when Display Names are opaque |

CSS: `.hop-region--primary`, `.hop-region--support`, `.hop-disclose`, `.bilingual-panes`, `.lang-label` in `src/styles/global.css`. Support/FAQ body selectors must use `p:not(.lang-label)` (Trap #15).

## Content fields (required on every Service)

Schema: `src/content.config.ts`. Integrity: `tests/unit/content-integrity.test.ts`.

| Field | Role |
|-------|------|
| `title` / `title_bn` | Display Name for H1 / cards (ADR-0005) |
| `serp_title` / `serp_title_bn` | Optional SERP expansions when Display Names are too short/opaque (e.g. A2I → A2I (Aspire to Innovate)) |
| `description` / `description_bn` | Short — cards + Meta Description; keep SERP-sized. EN `description` ≥ **90** chars (ADR-0012; card clamps to 2 lines) |
| `body` / `body_bn` | Longer hop Markdown (min length enforced) |
| `audience` / `audience_bn` | Who the Service is for |
| `faq[]` | 1–5 items; each needs `q`, `a`, `q_bn`, `a_bn` |
| `aliases` | ≥2 with both `en` and `bn` (ADR-0006) |
| `directory_global_rank` / `directory_category_rank` | Browse order on Home All / Category (ADR-0010); living table [`directory-ranking.md`](directory-ranking.md) |
| `icon` | Optional Lucide Service Icon (ADR-0004); [`service-icons.md`](service-icons.md) |
| `capabilities` | Optional hop-only tasks (2–4 `{ en, bn }`) as soft capsules before Outbound CTA (ADR-0011) |
| `url`, `official_domain`, `last_verified`, `category`, `slug` (`bd-…`) | Hop + Link Health |

## Editorial do-nots (hop copy)

**Do not put in `body` / `body_bn` or FAQ:**

- “CitizenSheba lists this Service…” / “we don’t process applications here”
- “Is this the official … website?”
- “Do I need to create an account on CitizenSheba?”

The **Open official site** button + domain already answer the hop. FAQ must be **service-useful** (what you can do on the portal, who should use a related portal, etc.).

**Do:** describe the government Service; keep practical tips; match Display Name casing in EN copy.

## Decisions (ADRs) — do not fork here

| Topic | ADR |
|-------|-----|
| Body Markdown EN+BN | [0008](../adr/0008-service-page-body-markdown.md) |
| Bilingual audience / FAQ / related | [0009](../adr/0009-service-page-bilingual-sections.md) |
| Display Name casing | [0005](../adr/0005-display-name-casing.md) |
| Name Aliases | [0006](../adr/0006-name-aliases.md) |
| Directory ranks + pagination | [0010](../adr/0010-directory-ranking-and-pagination.md) |
| SERP title / meta order | [0003](../adr/0003-bilingual-document-title-and-meta-description.md) |

Design snapshots (history): `docs/superpowers/specs/2026-08-07-service-page-bilingual-sections-design.md` — prefer this guide + ADRs for current truth.

## Checklist — changing the hop

1. Read this guide + Trap #9.
2. Change UI (`[slug].astro` / components / CSS) and/or content schema together.
3. Update **this guide** if section order, bilingual rules, or FAQ policy change.
4. Update ADRs only for irreversible decision shifts; slim `CONTEXT.md` § Service Page if the glossary definition drifts.
5. Refresh `docs/agent/INDEX.md` keywords if naming/routing changes.
6. Run `npm run ci`; spot-check one Service Page in the browser.
