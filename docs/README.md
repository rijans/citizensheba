# CitizenSheba documentation

Central map of project docs. **Agents:** start at root [`AGENTS.md`](../AGENTS.md), then route via [`docs/agent/INDEX.md`](agent/INDEX.md).

## Directory index

| Path | Role |
|------|------|
| [`../AGENTS.md`](../AGENTS.md) | Agent anchor — guardrails, do-nots, Tier 0 reads |
| [`../CONTEXT.md`](../CONTEXT.md) | Domain glossary / ubiquitous language (SSOT) |
| [`agent/INDEX.md`](agent/INDEX.md) | **Task router** — keywords → SSOT docs + code map |
| [`specs/DOC_ARCHITECTURE.md`](specs/DOC_ARCHITECTURE.md) | How docs are layered; where to put new docs |
| [`specs/TRAPS.md`](specs/TRAPS.md) | Known pitfalls — scan titles, open bodies on demand |
| [`guides/`](guides/) | Agent workflow, frontend, performance |
| [`adr/`](adr/) | Architecture Decision Records (hard-to-reverse) |
| [`ops/`](ops/) | Runbooks (analytics, Search Console) |
| [`superpowers/`](superpowers/) | Historical design specs + implementation plans |
| [`../README.md`](../README.md) | Human quick start, npm scripts, deploy |

## Guides

| Doc | Topic |
|-----|--------|
| [guides/agent-workflow.md](guides/agent-workflow.md) | Stop-and-ask, patterns, parallel sessions, finalization |
| [guides/service-page.md](guides/service-page.md) | **Service Page hop structure** (layout, bilingual rules, FAQ policy) |
| [guides/new-service.md](guides/new-service.md) | **Checklist when adding a Service** (fields, icons, ranks, cards) |
| [guides/display-names.md](guides/display-names.md) | Display Name table + Name Aliases |
| [guides/directory-ranking.md](guides/directory-ranking.md) | Directory Global / Category ranks + Top browse table |
| [guides/service-icons.md](guides/service-icons.md) | Optional per-Service Lucide icons (seed table) |
| [guides/frontend.md](guides/frontend.md) | Cards, chips, Mobile-First, tokens, **brand logo / favicon** |
| [guides/code-structure.md](guides/code-structure.md) | **Shared seams** — projection, browse hook, hop disclose, card twins |
| [guides/performance.md](guides/performance.md) | Islands, SSG, analytics weight |

## ADR index

| ADR | Topic |
|-----|--------|
| [0001](adr/0001-astro-ssg-react-island-cloudflare.md) | Astro SSG + React island + Cloudflare static assets |
| [0002](adr/0002-agent-llms-txt-and-ai-usage-signals.md) | `/llms.txt` + AI usage / robots signals |
| [0003](adr/0003-bilingual-document-title-and-meta-description.md) | BN→EN Document Title / Meta Description |
| [0004](adr/0004-category-icons-and-service-cards.md) | Lucide Category Icons + shared Service cards |
| [0005](adr/0005-display-name-casing.md) | Display Name casing vs official sites |
| [0006](adr/0006-name-aliases.md) | Name Aliases (search + former line) |
| [0007](adr/0007-bilingual-directory-search.md) | Bilingual Instant Directory search |
| [0008](adr/0008-service-page-body-markdown.md) | Service Page body Markdown (EN + BN) |
| [0009](adr/0009-service-page-bilingual-sections.md) | Service Page bilingual audience / FAQ / related |
| [0010](adr/0010-directory-ranking-and-pagination.md) | Directory browse ranks + green pagination |
| [0011](adr/0011-service-capability-capsules.md) | Hop capability capsules (EN+BN) |

## Ops

| Doc | Topic |
|-----|--------|
| [ops/local-dev.md](ops/local-dev.md) | Localhost live reload (`npm run dev`) before push |
| [ops/production-and-deploy.md](ops/production-and-deploy.md) | Production URLs, Workers Builds auto-deploy on `main`, CLI fallback, live smoke |
| [ops/web-analytics.md](ops/web-analytics.md) | Cloudflare Web Analytics |
| [ops/search-console.md](ops/search-console.md) | Google Search Console |
| [ops/service-catalog-backlog.md](ops/service-catalog-backlog.md) | Catalog Backlog — candidates vs shipped (priority waves) |

## History (superpowers)

| Doc | Topic |
|-----|--------|
| [specs/…-design.md](superpowers/specs/2026-08-06-bd-digital-services-directory-design.md) | v1 product design |
| [specs/…-name-aliases-design.md](superpowers/specs/2026-08-07-name-aliases-design.md) | Name Aliases (typed field, search, former line) |
| [specs/…-priority-wave-design.md](superpowers/specs/2026-08-07-official-services-priority-wave-design.md) | Official Services priority wave + Catalog Backlog |
| [specs/…-directory-ranking-pagination-design.md](superpowers/specs/2026-08-07-directory-ranking-pagination-design.md) | Directory ranking + pagination |
| [specs/…-directory-load-more-design.md](superpowers/specs/2026-08-07-directory-load-more-design.md) | Directory Load more (append) + pager |
| [specs/…-service-icons-design.md](superpowers/specs/2026-08-07-service-icons-design.md) | Optional per-Service Lucide icons |
| [plans/…-directory.md](superpowers/plans/2026-08-06-bd-digital-services-directory.md) | v1 implementation plan |
| [plans/…-priority-wave.md](superpowers/plans/2026-08-07-official-services-priority-wave.md) | Official Services priority wave implementation |
| [plans/…-directory-ranking-pagination.md](superpowers/plans/2026-08-07-directory-ranking-pagination.md) | Directory ranking + pagination implementation |
