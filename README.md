# Sheba

**Sheba** (সেবা) is a Mobile-First directory for Bangladesh government and utility digital services. It helps citizens discover the right official portal quickly, then hop off to the government site to complete transactions.

Sheba is **not** a government entity and is not an official portal.

**Brand / domain:** placeholder `sheba.example.com` until final branding is chosen.

## Quick start

```bash
npm ci
npm run dev          # http://localhost:4321
npm test             # unit tests (Vitest)
npm run build        # static output → dist/
npm run preview      # serve dist/
```

### End-to-end tests (Playwright)

Playwright runs against `astro preview` (built `dist/`). Install browsers once:

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

## Editing content

Content lives in Astro Content Collections:

- **Categories:** `src/content/categories/*.yaml`
- **Services:** `src/content/services/*.md` (YAML frontmatter + optional body)

Each service needs a valid `url` (outbound official link), `slug` (`bd-…`), `faq` (3–5 items), and `last_verified`. Schema validation runs at build time.

After editing content, run `npm run build` locally. CI also runs `npm run check:links` weekly to flag stale or broken outbound URLs.

## Agent & SEO files

Built or copied at deploy:

- `/sitemap-index.xml` — Astro sitemap integration
- `/robots.txt` — crawl rules + Content Signals (`search=yes`, `ai-input=yes`, `ai-train=no`)
- `/llms.txt` — curated agent index (categories + services)
- `/.well-known/ai.txt` — advisory AI usage policy
- `/manifest.webmanifest` — installable shell (icons in `public/icons/`)

## Deploy on Cloudflare Pages

1. Connect the GitHub repo to Cloudflare Pages.
2. **Build command:** `npm run build`
3. **Build output directory:** `dist`
4. **Node version:** 22+ (see `engines` in `package.json`)

`public/_headers` sets MIME types for agent files. Enable Cloudflare Web Analytics in the dashboard after the project exists.

## License

See repository license file.
