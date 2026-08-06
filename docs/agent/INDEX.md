# Agent documentation router

> **Tier 0** — read with root `AGENTS.md` and `CONTEXT.md`.  
> **Rule:** every row below that matches your task must be **read** or **explicitly skipped with a one-line reason**.  
> **Traps:** scan titles in `docs/specs/TRAPS.md` when the topic matches; open bodies on demand.

Doc map: [`docs/README.md`](../README.md). Layout: [`docs/specs/DOC_ARCHITECTURE.md`](../specs/DOC_ARCHITECTURE.md).

---

## Tier 0 — always (compact)

| File | Purpose |
|------|---------|
| `AGENTS.md` | Anchor — do-nots, bilingual/SERP/visual guardrails, deploy smoke |
| `docs/agent/INDEX.md` | This router |
| `CONTEXT.md` | Domain glossary (Directory, Service, Category Icon, Document Title, …) |

**On demand:** `README.md`; `docs/README.md`; `docs/guides/agent-workflow.md`; `docs/specs/TRAPS.md` (scan titles).

---

## Tier 1 — conditional SSOTs (match task → read)

| Triggers / keywords | Read |
|---------------------|------|
| agent workflow, stop-and-ask, parallel session, foreign dirty, finalization, redesign | `docs/guides/agent-workflow.md`, `docs/specs/TRAPS.md` (#10) |
| trap, pitfall, regression, known mistake | `docs/specs/TRAPS.md` (scan index, open matching bodies) |
| UI, CSS, card, chip, Mobile-First, design token, Lucide, jargon in copy, logo, brand mark, favicon, PWA icon | `docs/guides/frontend.md`, ADR-0004, `public/brand/`, `docs/specs/TRAPS.md` (#5–#7) |
| performance, island, LCP, client JS, analytics weight | `docs/guides/performance.md`, ADR-0001 |
| stack, Astro, Cloudflare, wrangler, static assets, React island, Tailwind | `docs/adr/0001-astro-ssg-react-island-cloudflare.md`, `README.md` § Cloudflare, Trap #1 |
| deploy, production, wrangler login, smoke live, workers.dev, citizensheba.com, MCP Cloudflare | `docs/ops/production-and-deploy.md` |
| local dev, localhost, HMR, live reload, `npm run dev`, preview before push | `docs/ops/local-dev.md` |
| llms.txt, robots, ai.txt, agent crawl, AI train | `docs/adr/0002-agent-llms-txt-and-ai-usage-signals.md` |
| Document Title, Meta Description, SERP, bilingual title, `serp_title`, `description_bn`, `meta_title`, CitizenSheba Bangladesh | ADR-0003, `src/lib/seo.ts`, `src/lib/site.ts` (`SITE_BRAND_SERP`), `CONTEXT.md`, Traps #3–#4, `docs/guides/service-page.md` |
| Category Icon, Service card, accent, Instant Directory chips, emoji on cards | `docs/adr/0004-category-icons-and-service-cards.md`, `src/lib/categoryVisuals.ts`, `CONTEXT.md`, Traps #5–#7 |
| Web Analytics, CF beacon, `PUBLIC_CF_WEB_ANALYTICS_TOKEN` | `docs/ops/web-analytics.md` |
| Search Console, GSC, sitemap | `docs/ops/search-console.md` |
| add/move docs, AGENTS layout, Cursor rules | `docs/specs/DOC_ARCHITECTURE.md` |
| content catalog, service md, category yaml, FAQ, `bd-` slug, related, new service | `docs/guides/service-page.md`, `CONTEXT.md`, `src/content.config.ts`, `docs/guides/display-names.md`, `tests/unit/content-integrity.test.ts`, Traps #11, #14 |
| Catalog Backlog, seed, populate services, priority wave, remaining services, utilities, migration, DESCO, WASA, BMET | `docs/ops/service-catalog-backlog.md`, `docs/superpowers/specs/2026-08-07-official-services-priority-wave-design.md`, `CONTEXT.md` (Catalog Backlog), `docs/guides/service-page.md` |
| Display Name, title casing, a2i, A2I, myGov, e-Namjari, official typography, Name Alias, synonym, former name, aliases | ADR-0005, ADR-0006, `docs/guides/display-names.md`, `CONTEXT.md` (Display Name, Name Alias), Trap #12–#14, `src/content/services/*.md`, `src/lib/search.ts` |
| Instant Directory search, bilingual search, romanization, Search Variant, description_bn, relatedTitles | ADR-0007, `src/lib/search.ts`, `src/lib/buildSearchIndex.ts`, `CONTEXT.md` (Instant Directory, Search Variant), `tests/unit/search.test.ts` |
| Service Page, hop page, SEO hop, body_bn, audience_bn, FAQ q_bn, related services heading, outbound CTA, last verified, service page structure | **`docs/guides/service-page.md` (SSOT)**, ADR-0008, ADR-0009, `src/lib/markdown.ts`, `src/lib/servicePageCopy.ts`, `src/pages/services/[slug].astro`, `CONTEXT.md` (Service Page v1), Trap #9 |
| Official catalog, MFS, bank, doorway | `AGENTS.md` do-nots, Traps #8–#9 |
| `_headers` | Trap #2, `public/_headers` if present |
| v1 product intent, Guides future, hop-first | `docs/superpowers/specs/2026-08-06-bd-digital-services-directory-design.md` |
| historical implementation plan | `docs/superpowers/plans/2026-08-06-bd-digital-services-directory.md` |

---

## Code map (locate before edit)

| Area | Paths |
|------|--------|
| Home Instant Directory | `src/pages/index.astro`, `src/components/directory/InstantDirectory.tsx` |
| Service / Category cards | `src/components/ui/ServiceCard.tsx`, `ServiceCardLink.astro`, `CategoryIcon.tsx` |
| Layout shell | `src/components/layout/BaseLayout.astro`, `Header.astro`, `Footer.astro` |
| Brand / favicon / PWA icons | `public/brand/citizensheba-logo.png`, `public/favicon*`, `public/icons/`, `public/manifest.webmanifest`, `docs/guides/frontend.md` § Brand mark |
| Service / Category pages | `src/pages/services/[slug].astro`, `src/pages/categories/[slug].astro`, **`docs/guides/service-page.md`** |
| Service hop copy / headings | `src/lib/servicePageCopy.ts`, `src/components/service/OutboundCta.astro`, `ServiceFaq.astro` |
| Content schema | `src/content.config.ts`, `src/content/services/*.md`, `src/content/categories/*.yaml` |
| SEO helpers | `src/lib/seo.ts`, `src/lib/site.ts` |
| Search index | `src/lib/search.ts`, `src/lib/buildSearchIndex.ts` |
| Category accents / icons | `src/lib/categoryVisuals.ts`, `src/lib/categoryIcons.ts` |
| Styles / tokens | `src/styles/global.css` |
| Agent / SEO files | `src/pages/llms.txt.ts`, `src/pages/robots.txt.ts` |
| CI | `.github/workflows/ci.yml`, `package.json` scripts `check` / `ci` |
| Content integrity tests | `tests/unit/content-integrity.test.ts` |
| Link health | `scripts/check-links.mjs`, `.github/workflows/link-health.yml` |
| Production / deploy | `docs/ops/production-and-deploy.md`, `wrangler.jsonc` |

---

## ADR index (do not duplicate bodies in AGENTS.md)

| ADR | File |
|-----|------|
| 0001 Stack | `docs/adr/0001-astro-ssg-react-island-cloudflare.md` |
| 0002 Agent signals | `docs/adr/0002-agent-llms-txt-and-ai-usage-signals.md` |
| 0003 Bilingual SERP | `docs/adr/0003-bilingual-document-title-and-meta-description.md` |
| 0004 Category Icons / cards | `docs/adr/0004-category-icons-and-service-cards.md` |
| 0005 Display Name casing | `docs/adr/0005-display-name-casing.md` |
| 0006 Name Aliases | `docs/adr/0006-name-aliases.md` |
| 0007 Bilingual Directory search | `docs/adr/0007-bilingual-directory-search.md` |
| 0008 Service Page body Markdown | `docs/adr/0008-service-page-body-markdown.md` |
| 0009 Service Page bilingual sections | `docs/adr/0009-service-page-bilingual-sections.md` |
