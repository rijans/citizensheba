# Performance guide (CitizenSheba)

> Static Astro Directory — optimize for mid-range Android and LCP on Home / Service Pages. Not a SPA.

## Defaults that keep us fast

- **SSG output** — HTML ships from `dist/`; do not convert the site to a client-heavy SPA.
- **One React island on Home** — Instant Directory only (`client:idle` so hydration waits for browser idle). Category grids use `client:idle` too. Service Pages stay Astro SSR (no island).
- **Content Collections at build time** — search index is built in `buildSearchIndex.ts`. Home fetches `/directory-index.json` after idle (not inlined as island props) so HTML stays small for LCP.
- **Self-hosted fonts** — `src/styles/fonts.css` from `@fontsource` files, `font-display: optional` (no Google Fonts; no font preload — preload + optional delays text LCP).
- **Inline CSS** — `build.inlineStylesheets: 'always'` so the document is not blocked on a separate stylesheet request.
- **Sized brand mark** — header uses `/brand/citizensheba-logo-88.webp` (not the 512px PNG).
- **No new client islands** for decorative icons, cards, or footer — SSR Lucide in Astro components.
- **Thin Service Pages** — hop-first; avoid large client widgets, carousels, or third-party embeds on Service Pages.
- **Asset caching** — hashed `/_astro/*` and `/brand/*` immutable in `public/_headers`; icons week-long cache.

## Instant Directory

- Filter/sort stays in-memory (`search.ts`) — fine at current catalog size; revisit only if catalog grows huge.
- Home island is `client:idle`; categories ship as props, but the searchable catalog loads from `/directory-index.json` after hydrate (keeps HTML small for LCP). Until JSON arrives, show the card-grid skeleton — not an empty loading panel that collapses into the footer.
- Avoid layout thrash: no hover `transform` that escapes chip overflow clipping (Trap #6).
- Prefer CSS transitions over JS animation libraries.

## Assets & third parties

- Prefer SVG icons (Lucide) over large PNGs per card.
- Analytics: prefer Cloudflare automatic Web Analytics; only inject beacon when `PUBLIC_CF_WEB_ANALYTICS_TOKEN` is set (`docs/ops/web-analytics.md`).
- Do not add heavy tag managers / chat widgets without an explicit product decision.

## PageSpeed / Lighthouse expectations

Aim for **100** on accessibility, best-practices, and SEO (mobile + desktop). Performance **100** is the goal after deploy to Cloudflare (brotli + edge TTFB + `_headers` cache). Local `python -m http.server` will look much worse (no compression / no cache) — measure with a compressing local server or live www.

Home still ships one React island (~unused-JS opportunity). Service Pages (no island) are the easier 100. Directory JSON grows with the catalog — keep it off the HTML critical path.

## CI gate

`npm run ci` = `astro check` → Vitest → `astro build`. Fix type/import errors before shipping — broken imports are a perf and UX failure.

## Related

- ADR-0001, `docs/guides/frontend.md`, `AGENTS.md` § Deploy smoke
