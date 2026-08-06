# Agent brief — CitizenSheba

CitizenSheba (সিটিজেনসেবা) is a hop-first **Directory** of Bangladesh **Official Services** (gov, utilities, half-gov). Domain: https://citizensheba.com. Repo: this tree (`main`).

## Read first

| Layer | Purpose |
|-------|---------|
| [`CONTEXT.md`](CONTEXT.md) | Ubiquitous language / glossary |
| [`docs/adr/`](docs/adr/) | Hard-to-reverse product + tech decisions |
| [`README.md`](README.md) | Dev/deploy commands |
| [`docs/ops/`](docs/ops/) | Analytics, Search Console, runbooks |
| Spec/plan under `docs/superpowers/` | Design + implementation plan history |

**Document every product decision and logic.** When a decision lands or changes, update the matching layer (glossary → CONTEXT; expensive-to-reverse → ADR; agent do-nots → this file; ops → `docs/ops/`). Do not leave decisions only in chat.

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

## Hard do-nots

- No doorway-page spam; Service Pages stay thin SEO hops with clear Outbound CTA
- Catalog v1 = Official Services only — no private banks, MFS, or commercial SaaS as Official
- Do not host or proxy government transactions
- `_headers` comments: `#` only (not `/* */`)
- Do not rewrite git config; use env / `git -c` for identity when committing
- Do not push to `main` / production without explicit user approval in this environment

## Content

- Services: `src/content/services/*.md` — required `title_bn`, `description_bn`, `bd-` slug, FAQ 3–5, `last_verified`
- Categories: `src/content/categories/*.yaml` — required `name_bn`, `description_bn`
- Prefer English public slugs with `bd-` prefix for services

## Deploy smoke

```bash
npm ci && npm run ci
# then wrangler deploy only when asked
```

CI on GitHub: `npm ci` → `astro check` → Vitest → `astro build`.
