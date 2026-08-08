# Agent brief — CitizenSheba

CitizenSheba (সিটিজেনসেবা) is a hop-first **Directory** of Bangladesh **Official Services** (gov, utilities, half-gov). Domain: https://www.citizensheba.com (apex redirects to www). Repo: this tree (`main`).

> **Start here every task:** Tier 0 below → route via [`docs/agent/INDEX.md`](docs/agent/INDEX.md). Scan trap titles in [`docs/specs/TRAPS.md`](docs/specs/TRAPS.md) when the topic matches. Doc map: [`docs/README.md`](docs/README.md).

## Tier 0 — always read

| File | Purpose |
|------|---------|
| [`AGENTS.md`](AGENTS.md) | This file — do-nots and standing product rules |
| [`docs/agent/INDEX.md`](docs/agent/INDEX.md) | **Task router** — keywords → ADRs / guides / code map |
| [`CONTEXT.md`](CONTEXT.md) | Domain glossary / ubiquitous language |

**On demand:** [`README.md`](README.md), [`docs/README.md`](docs/README.md), [`docs/guides/agent-workflow.md`](docs/guides/agent-workflow.md), [`docs/specs/DOC_ARCHITECTURE.md`](docs/specs/DOC_ARCHITECTURE.md), [`docs/specs/TRAPS.md`](docs/specs/TRAPS.md).

**Document every product decision.** Update the matching layer (glossary → CONTEXT; expensive-to-reverse → ADR; agent do-nots → this file; ops → `docs/ops/`; routing → INDEX; pitfalls → TRAPS). Do not leave decisions only in chat.

## Workflow (summary)

Full text: [`docs/guides/agent-workflow.md`](docs/guides/agent-workflow.md).

- Match existing patterns; do not silently redesign.
- Stop-and-ask on ambiguity, contradictions, or foreign dirty files.
- Parallel chats: isolate worktrees when possible; stage explicit paths only.
- Before done: `npm run ci` + update owner docs (finalization checklist in the guide).

## Stack (see ADR-0001)

- Astro **SSG** + React island for Instant Directory; Tailwind v4 via `@tailwindcss/vite`
- Git Content Collections; Cloudflare Workers **static assets** (`wrangler.jsonc` → `./dist`)
- Do **not** run `astro add cloudflare` for this site

## SERP / bilingual (see ADR-0003)

- Document Title: `বাংলা — English | CitizenSheba Bangladesh` via `documentTitle()` in `src/lib/seo.ts` (brand = `SITE_BRAND_SERP`)
- Service Pages: when Display Names are too short for SERP (e.g. A2I), set optional `serp_title` / `serp_title_bn`; H1 stays `title` / `title_bn`
- Meta Description: BN sentence then EN sentence via `metaDescription()` from `description_bn` + `description` (or site BN/EN constants)
- Visible H1 stays English-first Mixed UI — do not force H1 to match title order
- Do **not** reintroduce free-form `meta_title` / `meta_description` content fields

## Instant Directory visuals (see ADR-0004)

- Lucide **Category Icons** (+ optional **Service Icon** glyph) + soft accents from `src/lib/categoryVisuals.ts` (code map, not YAML); living seeds [`docs/guides/service-icons.md`](docs/guides/service-icons.md)
- Shared Service card: icon, titles, description, official domain, status when not ACTIVE — React/Astro twins via `src/lib/serviceCard.ts` ([`docs/guides/code-structure.md`](docs/guides/code-structure.md))
- No emoji-first cards; no Home trust strip (footer disclaimer only)
- Chips: small icon + EN name; result count + clear empty state
- Frontend / perf / seams: [`docs/guides/frontend.md`](docs/guides/frontend.md), [`docs/guides/performance.md`](docs/guides/performance.md), [`docs/guides/code-structure.md`](docs/guides/code-structure.md)

## Hard do-nots

- No doorway-page spam; Service Pages stay thin SEO hops with clear Outbound CTA — structure: [`docs/guides/service-page.md`](docs/guides/service-page.md)
- Catalog Instant Directory / published hops = Official Services only — no private banks, MFS, or commercial SaaS as Official
- Do not ship Partner / association hops or call them Official — type locked in ADR-0013 (docs-only until a ship wave); Instant Directory stays Official-only until a follow-up discovery ADR
- Do not host or proxy government transactions
- `_headers` comments: `#` only (not `/* */`)
- Do not rewrite git config; use env / `git -c` for identity when committing
- Do not push to `main` / production without explicit user approval in this environment
- Do not grow `.cursor/rules/*.mdc` with duplicated policy — pointer file only ([DOC_ARCHITECTURE](docs/specs/DOC_ARCHITECTURE.md))

## Content

- **New Service checklist (cards + hop + icons + ranks):** [`docs/guides/new-service.md`](docs/guides/new-service.md)
- **Service Page hop structure (read + update when changing hop UI/copy):** [`docs/guides/service-page.md`](docs/guides/service-page.md)
- **Shared code seams (projection, browse hook, hop disclose, card twins):** [`docs/guides/code-structure.md`](docs/guides/code-structure.md) — Trap #16
- Services: `src/content/services/*.md` — required fields and FAQ policy summarized in the hop guide; schema in `src/content.config.ts` (no Service `logo` field — brand/OG are site assets)
- Categories: `src/content/categories/*.yaml` — required `name_bn`, `description_bn`
- Prefer English public slugs with `bd-` prefix; **opaque acronyms must be elaborated** `bd-{token}-{expansion}` (ADR-0014, Trap #19). Stable short content `id`. Legacy short URLs → `public/_redirects` 301
- **Display Name** casing: curated (not blind official typography) — ADR-0005, Trap #12, living table [`docs/guides/display-names.md`](docs/guides/display-names.md); examples A2I, myGov, lowercase `e-`
- **Name Aliases**: **required** for every Service — ADR-0006, Trap #13–#14; search all kinds; “Formerly …” only for `kind: former`. New Services must ship EN+BN aliases (romanizations in `aliases`, not only `tags`)
- **Directory ranks**: **required** `directory_global_rank` + `directory_category_rank` — ADR-0010, [`docs/guides/directory-ranking.md`](docs/guides/directory-ranking.md); pagination soft-max 21 / page size 20
- **Service Icon**: strongly preferred Lucide `icon` — [`docs/guides/service-icons.md`](docs/guides/service-icons.md); register new keys in `categoryIcons.ts`
- **Instant Directory search**: EN/BN parity, `description_bn`, related titles (weak), Search Variants — ADR-0007, `src/lib/search.ts`
- Cross-file refs + alias / body / audience / FAQ / ranks coverage: `tests/unit/content-integrity.test.ts`

## Deploy smoke

Local live-check before push: [`docs/ops/local-dev.md`](docs/ops/local-dev.md) (`npm run dev` → http://localhost:4321).

Full production cycle (Workers Builds, CLI fallback, curl checklist): [`docs/ops/production-and-deploy.md`](docs/ops/production-and-deploy.md).

```bash
npm ci && npm run ci
# UI work: also npm run dev and verify in the browser
# push to main (with approval) → Cloudflare Workers Builds deploys
# npm run deploy only as fallback / when asked
```

GitHub Actions: `npm ci` → `astro check` → Vitest → `astro build` (**verify only**). Production deploy is **Cloudflare Workers Builds** on push to `main` (not GitHub Actions).
