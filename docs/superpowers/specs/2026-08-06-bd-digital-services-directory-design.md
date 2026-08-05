# BD Digital Services Directory — Design Spec (v1)

**Date:** 2026-08-06  
**Status:** Draft for user review  
**Brand placeholder:** Sheba (final name/domain TBD)  
**Related:** [`CONTEXT.md`](../../../CONTEXT.md), [`docs/adr/0001-astro-ssg-react-island-cloudflare.md`](../../adr/0001-astro-ssg-react-island-cloudflare.md), [`docs/adr/0002-agent-llms-txt-and-ai-usage-signals.md`](../../adr/0002-agent-llms-txt-and-ai-usage-signals.md)

## 1. Problem and product identity

Bangladesh government and regulated-utility digital services are scattered across many official sites. Citizens, expatriates, and local businesses struggle to discover the right Outbound Link quickly.

**v1 product identity:** a **Directory** whose primary job is discovery and hop-off — **identity A (directory hop)**.  
**Future:** **hybrid** — short hop by default, with expandable or separate **Guides** (requirements, fees, pitfalls) for high-traffic Services. Ads/promotions are out of scope for v1 but Service Pages should not paint us into a corner structurally.

We are **not** an official government entity. Footer and `/disclaimer` carry a **Non-Official Disclaimer**.

## 2. Goals and non-goals

### Goals (v1)
- Fast, Mobile-First, simple Instant Directory UX (POC-parity search/filter)
- Dedicated SEO hop **Service Pages** and indexable **Category Pages**
- SSG static HTML for Service/Category pages (SEO, agents, CDN)
- Cloudflare-hosted, production-grade performance path
- Git-managed content with a clear ops model; CMS later
- Agent-friendly: `/llms.txt`, sitemap, clean HTML
- Simple analytics; Link Health (report + automated checks)
- Installable Shell (manifest/icons only)

### Non-goals (v1)
- Full Guides / how-to essays
- Headless CMS admin
- Offline service-worker caching of the Directory
- Proxying or hosting official gov transactions
- Private banks / MFS as Official Services
- Locale-split `/bn` and `/en` sites
- Ads or partner promotions

## 3. Audience and catalog boundary

**Audience:** Bangladeshi citizens, expatriates, local businesses — Mixed UI on one URL.

**Official Service (v1):** government, statutory/public bodies, regulated utilities, and half-gov peers (e.g. education boards, railway).  
**Out of catalog (v1):** private banks, MFS products, commercial SaaS — unless later introduced under a distinct non-Official type.

## 4. Architecture

```text
Git repo (content + code)
        │
        ▼
   Astro build (SSG)
        │
        ├── /                     Home (static shell + React island: Instant Directory)
        ├── /categories/{slug}    Category Page (static HTML)
        ├── /services/bd-{slug}   Service Page (static HTML, SEO hop)
        ├── /about, /disclaimer
        ├── /sitemap.xml, /robots.txt, /manifest.webmanifest
        ├── /llms.txt
        ├── /.well-known/ai.txt
        └── report endpoint       → Cloudflare Worker or mailto (v1)
        │
        ▼
Cloudflare Pages (CDN)
        +
GitHub Actions: build, Link Health, optional Lighthouse sample
        +
Cloudflare Web Analytics (GA later)
```

**Stack (decided):** Astro SSG + React island for Instant Directory only; git Content Collections; Cloudflare Pages. See ADR 0001.

**Data flow:** Build embeds/generates a search index for the Home island. Cards navigate to Service Pages. Service Page CTA opens the Outbound Link in a **new tab** (`rel="noopener noreferrer"`). Crawlers/agents get full HTML without running the island.

## 5. Information architecture and URLs

| Route | Purpose |
|---|---|
| `/` | Home — Instant Directory |
| `/categories/{slug}` | Category Page |
| `/services/bd-{slug}` | Service Page (Service Slug always `bd-` prefixed) |
| `/about` | Product purpose |
| `/disclaimer` | Non-Official Disclaimer |
| `/sitemap.xml` | Indexable routes |
| `/robots.txt` | Crawl + Content Signals + Sitemap |
| `/llms.txt` | Agent Index |
| `/.well-known/ai.txt` | Advisory AI Usage Preference |
| `/manifest.webmanifest` | Installable Shell |

**URL rules:** English kebab-case; one URL per page (Mixed UI); no `hreflang` in v1. Internal content `id` may omit `bd-`; public Service Slug includes it (e.g. id `nid` → `/services/bd-nid`).

**Navigation:** Light header; footer 2–3 columns (Categories, trust links, disclaimer blurb); breadcrumbs on Service Pages (`Home > Category > Service`). Home filters and Category Pages both exist (chips for speed; pages for SEO/share). Home may deep-link `/?cat={id}` so Category Pages can return users to a pre-filtered Instant Directory.

## 6. Content model

Git source of truth under Astro Content Collections (YAML/MD). CMS deferred (ADR path: migrate when editorial load justifies it).

### Category fields
`id`, `slug`, `name`, `name_bn`, `description`, `icon`, `sort_order`, optional `meta_title` / `meta_description`

### Service fields
`id`, `slug` (`bd-…`), `title`, `title_bn`, `description`, `url` (Outbound Link), `official_domain`, `category` (ref), `tags`, `status` (`ACTIVE` | `MAINTENANCE` | `DEPRECATED`), `audience`, `faq[]` (`q`/`a`, 3–5), optional `related[]`, `last_verified`, optional `meta_*`, optional `logo`

**Service Page (v1 content):** SEO hop — not a thin doorway and not a full Guide. Include meta, FAQ, audience, last-verified, plain official domain, related Services, primary CTA.

**Build outputs derived from content:** search index JSON, sitemap entries, `/llms.txt` entries, inferred related Services when `related` omitted.

**Validation:** schema fails the build on missing/invalid fields; Service Slug must match `^bd-[a-z0-9]+(?:-[a-z0-9]+)*$`; stale `last_verified` warns in CI (e.g. >90 days) without hard-failing by default.

## 7. UI / UX

**Mobile-First:** Phone is the primary canvas — search usable early in the viewport, horizontally scrollable chips, single-column cards, large Service CTA, no hover-only actions. Mid-range Android performance matters.

**Home:** Sticky header (brand, theme toggle), Instant Directory React island (fuzzy search + chips), card grid → Service Pages only (no direct outbound from cards). Non-`ACTIVE` status badges visible. Category chips **filter in place**; a clear secondary control (e.g. “View all in category” on the active chip or results meta) links to the Category Page so SEO pages stay reachable without breaking instant filter UX.

**Category Page:** H1, short description, same cards → Service Pages; link back to Home with category query (`/?cat={id}`).

**Service Page:** Breadcrumb; mixed title; description; primary “Open official site” CTA (new tab); official domain under CTA; status + last verified; audience; FAQ in static HTML; related Services; Report a problem.

**Trust:** Footer disclaimer; `/about` and `/disclaimer`.

**Installable Shell:** Manifest + icons; no offline SW; do not claim official portals work offline.

**Visual direction:** Evolve POC flag-inspired green/red bilingual look; avoid generic purple SaaS aesthetics. Exact tokens at implementation time.

**a11y:** Keyboard-usable search/chips; visible focus; contrast; real links/buttons for CTAs.

## 8. Agent and AI signals

See ADR 0002.

- Ship build-generated `/llms.txt` (curated map; absolute URLs; Non-Official note). Optional `/llms-full.txt` later if catalog stays small.
- `robots.txt`: allow normal search indexing; Cloudflare Content Signals **`search=yes`**, **`ai-input=yes`**, **`ai-train=no`**; known AI crawler rules aligned to that stance.
- Advisory `/.well-known/ai.txt` mirrors the same preference.
- Do not treat `ai.txt` or `llms.txt` as enforcement; WAF/bot products are out of scope for v1 unless needed later.

## 9. Errors, edge cases, Link Health

| Case | Behavior |
|---|---|
| No search matches | Empty state + clear filters + suggest Categories |
| `MAINTENANCE` | Badge + caution near CTA |
| `DEPRECATED` | Demoted/filtered; editorial choice on CTA vs hide if URL dead |
| Unknown slug | Static 404 → Home |
| Official site down | Not our outage; Report available |
| Report a problem | mailto or Worker form; no auto status change |
| CI link failure | Surface issue; human updates git |
| JS disabled | Home still lists Services/Categories as plain links |
| Fonts | BN + Latin readable on small screens |

## 10. Testing, ops, deployment

- **Deploy:** Cloudflare Pages from main; PR previews  
- **CI:** `astro build`; content schema; Link Health (scheduled + PR); optional Lighthouse mobile budgets on Home + one Service Page; smoke tests for search/filter/CTA  
- **Ops:** PR-based content edits; triage reports; periodic re-verify of high-traffic Services  
- **Analytics:** Cloudflare Web Analytics at launch; GA and outbound click events later (one tool, no triple-count)  
- **Launch bar:** Strong mobile Lighthouse on key templates; Instant Directory feels fast; every Service is a real SEO hop; `/llms.txt` + static Service HTML work for agents  

## 11. Future (explicitly deferred)

- Hybrid Guides on or beside Service Pages  
- Headless CMS  
- Full PWA offline cache  
- Partner/Promoted non-Official listings and ad slots  
- Final brand/domain selection (SEO/CTR naming exercise)  
- True bilingual locale trees if Mixed UI proves insufficient  

## 12. Open items (non-blocking for implementation planning)

- Final brand name and domain  
- Exact report-a-problem transport (mailto vs Worker) at implement time  
- Lighthouse numeric budgets (set during first CI pass)  
- Theme: keep dark/light toggle from POC unless dropped for simplicity during build  

## 13. Decisions log

| Decision | Choice |
|---|---|
| Product identity v1 | Directory hop (A); hybrid later |
| Locale | Mixed UI; English slugs; one URL |
| Catalog | Official Services (gov, utilities, half-gov) |
| Service Page depth | SEO hop (B) |
| Categories | Home filters + Category Pages |
| Content | Git now; CMS later |
| Home UX | Instant Directory (client fuzzy search) |
| PWA | Installable Shell only |
| Link Health | Report UI + automated checks |
| Stack | Astro SSG + React island + Cloudflare Pages |
| Service URLs | `/services/bd-{slug}` |
| Outbound CTA | New tab |
| AI policy | search yes, ai-input yes, ai-train no |
