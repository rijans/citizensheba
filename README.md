# CitizenSheba

**CitizenSheba** (সিটিজেনসেবা) is a Mobile-First directory for Bangladesh government and utility digital services. It helps citizens discover the right official portal quickly, then hop off to the government site to complete transactions.

CitizenSheba is **not** a government entity and is not an official portal.

**Domain:** [citizensheba.com](https://citizensheba.com)

## Quick start

```bash
npm ci
npm run dev          # http://localhost:4321
npm test             # unit tests (Vitest)
npm run build        # static output → dist/
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
| `build` | Production static build to `dist/` |
| `preview` | Preview built site |
| `test` | Vitest unit tests |
| `test:watch` | Vitest watch mode |
| `test:e2e` | Playwright smoke tests |
| `check:links` | Outbound link health for service URLs |
| `pages:deploy` | Build and deploy `dist/` to Cloudflare Pages |

## Editing content

Services live in `src/content/services/*.md` and categories in `src/content/categories/*.yaml`. Edit via PR; Astro rebuilds static HTML.

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
