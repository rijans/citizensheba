# Performance guide (CitizenSheba)

> Static Astro Directory — optimize for mid-range Android and LCP on Home / Service Pages. Not a SPA.

## Defaults that keep us fast

- **SSG output** — HTML ships from `dist/`; do not convert the site to a client-heavy SPA.
- **One React island on Home** — Instant Directory only. Category/Service card grids stay Astro SSR.
- **No new client islands** for decorative icons, cards, or footer — SSR Lucide in Astro components.
- **Content Collections at build time** — search index is built in `buildSearchIndex.ts` and passed as props; do not fetch catalog JSON at runtime on Home.
- **Thin Service Pages** — hop-first; avoid large client widgets, carousels, or third-party embeds on Service Pages.

## Instant Directory

- Filter/sort stays in-memory (`search.ts`) — fine at current catalog size; revisit only if catalog grows huge.
- Avoid layout thrash: no hover `transform` that escapes chip overflow clipping (Trap #6).
- Prefer CSS transitions over JS animation libraries.

## Assets & third parties

- Prefer SVG icons (Lucide) over large PNGs per card.
- Analytics: prefer Cloudflare automatic Web Analytics; only inject beacon when `PUBLIC_CF_WEB_ANALYTICS_TOKEN` is set (`docs/ops/web-analytics.md`).
- Do not add heavy tag managers / chat widgets without an explicit product decision.

## CI gate

`npm run ci` = `astro check` → Vitest → `astro build`. Fix type/import errors before shipping — broken imports are a perf and UX failure.

## Related

- ADR-0001, `docs/guides/frontend.md`, `AGENTS.md` § Deploy smoke
