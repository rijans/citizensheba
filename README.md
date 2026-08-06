# CitizenSheba

**CitizenSheba** (সিটিজেনসেবা) is a Mobile-First directory for Bangladesh government and utility digital services. It helps citizens discover the right official portal quickly, then hop off to the government site to complete transactions.

CitizenSheba is **not** a government entity and is not an official portal.

**Domain:** [citizensheba.com](https://citizensheba.com)

## Quick start

```bash
npm ci
npm run dev          # http://localhost:4321
npm run check        # Astro + TypeScript (imports, props, .astro)
npm test             # unit tests (Vitest)
npm run build        # static output → dist/
npm run ci           # check → test → build (same as GitHub Actions)
npm run preview      # serve dist/
```

### End-to-end tests (Playwright)

```bash
npx playwright install chromium
npm run test:e2e
```

## npm scripts

| Script | Description |
|--------|-------------|
| `dev` | Astro dev server |
| `check` | `astro check` — TypeScript / .astro diagnostics |
| `build` | Production static build to `dist/` |
| `preview` | Preview built site |
| `test` | Vitest unit tests |
| `test:watch` | Vitest watch mode |
| `ci` | `check` → `test` → `build` (matches GitHub Actions) |
| `test:e2e` | Playwright smoke tests |
| `check:links` | Outbound link health for service URLs |
| `pages:deploy` | Build and deploy `dist/` to Cloudflare Pages |

## Editing content

Services live in `src/content/services/*.md` and categories in `src/content/categories/*.yaml`. Each needs EN + BN title/name and description fields (`title`/`title_bn`, `description`/`description_bn`, etc.). Document Title and Meta Description are generated at build time (BN→EN) — do not add `meta_title` / `meta_description`. Edit via PR; Astro rebuilds static HTML.

Agent onboarding: [`AGENTS.md`](AGENTS.md) → [`docs/agent/INDEX.md`](docs/agent/INDEX.md). Doc map: [`docs/README.md`](docs/README.md). Domain language: [`CONTEXT.md`](CONTEXT.md). ADRs: [`docs/adr/`](docs/adr/).

## Cloudflare (Workers static assets / Pages)

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Output / assets | `dist` (see `wrangler.jsonc`) |
| Node version | 22+ |
| Production domain | `citizensheba.com` |

Do **not** run `astro add cloudflare` for this site — it is plain static SSG (`output: "static"`). `wrangler.jsonc` serves `./dist` as assets.

Deploy locally:

```bash
npm run build
npx wrangler deploy
```

Attach custom domains `citizensheba.com` and `www.citizensheba.com` in the project settings.

## Post-launch ops

- [Web Analytics setup](docs/ops/web-analytics.md) — automatic preferred for `citizensheba.com`
- [Google Search Console](docs/ops/search-console.md) — DNS verify + submit `sitemap-index.xml`

### Cloudflare Web Analytics

Preferred: **automatic** for proxied `citizensheba.com` (no code change required).

1. Open [Web Analytics](https://dash.cloudflare.com/?to=/:account/web-analytics/sites).
2. Add site hostname `citizensheba.com`.
3. Enable automatic setup for Cloudflare-proxied sites.
4. Confirm DNS is orange-cloud (proxied).

Fallback: set Worker/Pages env `PUBLIC_CF_WEB_ANALYTICS_TOKEN` to the site token — [`BaseLayout.astro`](src/components/layout/BaseLayout.astro) injects the beacon only when that var is set. Do not commit the token.

### Google Search Console

1. Open [Search Console](https://search.google.com/search-console) → Add property → URL prefix `https://citizensheba.com`.
2. Verify via **DNS TXT** record on the Cloudflare zone for `citizensheba.com` (copy the TXT value Google shows).
3. After verified, submit sitemap: `https://citizensheba.com/sitemap-index.xml`.
4. Optional: Bing Webmaster Tools with the same sitemap.

Sitemap and `robots.txt` are generated on every Astro build.
