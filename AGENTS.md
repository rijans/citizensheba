# Agent brief — CitizenSheba

CitizenSheba (সিটিজেনসেবা) is a hop-first **Directory** of Bangladesh **Official Services** (gov, utilities, half-gov). Domain: https://citizensheba.com. Repo: this tree (`main`).

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

- Document Title: `বাংলা — English | CitizenSheba` via `documentTitle()` in `src/lib/seo.ts`
- Meta Description: BN sentence then EN sentence via `metaDescription()` from `description_bn` + `description` (or site BN/EN constants)
- Visible H1 stays English-first Mixed UI — do not force H1 to match title order
- Do **not** reintroduce `meta_title` / `meta_description` content fields

## Instant Directory visuals (see ADR-0004)

- Lucide **Category Icons** + soft accents from `src/lib/categoryVisuals.ts` (code map, not YAML)
- Shared Service card: icon, titles, description, official domain, status when not ACTIVE
- No emoji-first cards; no Home trust strip (footer disclaimer only)
- Chips: small icon + EN name; result count + clear empty state
- Frontend / perf detail: [`docs/guides/frontend.md`](docs/guides/frontend.md), [`docs/guides/performance.md`](docs/guides/performance.md)

## Hard do-nots

- No doorway-page spam; Service Pages stay thin SEO hops with clear Outbound CTA
- Catalog v1 = Official Services only — no private banks, MFS, or commercial SaaS as Official
- Do not host or proxy government transactions
- `_headers` comments: `#` only (not `/* */`)
- Do not rewrite git config; use env / `git -c` for identity when committing
- Do not push to `main` / production without explicit user approval in this environment
- Do not grow `.cursor/rules/*.mdc` with duplicated policy — pointer file only ([DOC_ARCHITECTURE](docs/specs/DOC_ARCHITECTURE.md))

## Content

- Services: `src/content/services/*.md` — required `title_bn`, `description_bn`, `bd-` slug, FAQ 3–5, `last_verified`, **and** `aliases` (≥2 with both `lang: en` and `lang: bn`, each with `kind`)
- Categories: `src/content/categories/*.yaml` — required `name_bn`, `description_bn`
- Prefer English public slugs with `bd-` prefix for services
- **Display Name** casing: curated (not blind official typography) — ADR-0005, Trap #12, living table [`docs/guides/display-names.md`](docs/guides/display-names.md); examples A2I, myGov, lowercase `e-`
- **Name Aliases**: **required** for every Service — ADR-0006, Trap #13–#14; search all kinds; “Formerly …” only for `kind: former`. New Services must ship EN+BN aliases (romanizations in `aliases`, not only `tags`)
- **Instant Directory search**: EN/BN parity, `description_bn`, related titles (weak), Search Variants — ADR-0007, `src/lib/search.ts`
- Cross-file refs + alias coverage: `tests/unit/content-integrity.test.ts`

## Deploy smoke

Local live-check before push: [`docs/ops/local-dev.md`](docs/ops/local-dev.md) (`npm run dev` → http://localhost:4321).

Full production cycle (auth, `wrangler deploy`, curl checklist): [`docs/ops/production-and-deploy.md`](docs/ops/production-and-deploy.md).

```bash
npm ci && npm run ci
# UI work: also npm run dev and verify in the browser
# then npm run deploy only when asked
```

CI on GitHub: `npm ci` → `astro check` → Vitest → `astro build` (**verify only — does not deploy**).
