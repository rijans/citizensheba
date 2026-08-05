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

## Cloudflare Pages

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 20+ |
| Production domain | `citizensheba.com` |

Deploy from CI (Git connected) or locally:

```bash
npm run build
npx wrangler pages deploy dist --project-name=citizensheba
```

Then attach custom domains `citizensheba.com` and `www.citizensheba.com` in the Pages project settings.
