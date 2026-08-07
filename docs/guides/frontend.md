# Frontend guide (CitizenSheba)

> Civic Directory UI — Mobile-First, hop-first. Visual decisions: ADR-0004. Tokens: `src/styles/global.css`.

## Principles

- **One job per surface:** Home = Instant Directory; Service Page = SEO hop + Outbound CTA; Category = filtered list.
- **Shared Service card** everywhere (`ServiceCard` / `ServiceCardLink`) — do not invent a second card UI. Card Category Icon tile is `3rem` (~two EN+BN title lines); glyph `24px`. Fixed size when titles wrap taller.
- **Category Icon + soft accent** (Lucide + `categoryVisuals.ts`). Optional **Service Icon** overrides the glyph only (ADR-0004). No emoji-first cards.
- **Mixed UI:** EN-first visible H1; SERP Document Title / Meta Description stay BN→EN (ADR-0003).
- **Plain language** in UI copy — no internal jargon (`SSOT`, `ADR`, `meta_*`) in citizen-facing strings.

## Layout & Mobile-First

- Design phone-first: sticky search/chips must not push the directory below the fold.
- Chips: horizontal scroll OK; do **not** use `translateY` hover lifts inside `overflow-x` scrollports (Trap #6). On fine-pointer desktops, show small left/right chevrons only when that side still has overflow (fade edges stay for touch). Do not show a permanent scrollbar on the chip row.
- Touch targets: chips ~2.375rem height; search field ~3.25rem; header icon buttons 2.5rem; sticky header ~4.25rem (logo 2.75rem, wordmark ~1.3125rem).
- **Header search (B1):** sticky header Search control links to `/#directory-search` (the search shell, not the input) — jumps to Home Instant Directory, scrolls with `scroll-margin-top` under the sticky header, then focuses the field with `preventScroll`. Do not load the search island on Service Pages for this.
- **Hop capability capsules:** optional `capabilities` (2–4 EN+BN) between description and Outbound CTA; muted gray EN + subtler gray BN on `surface-muted` (not Category blue / green BN); not on cards (ADR-0011).
- Prefer CSS variables from `:root` / `[data-theme="dark"]` over one-off hex in components.

## Components

| Use | Path |
|-----|------|
| Instant Directory island | `InstantDirectory.tsx` (`client:idle={{ timeout: 500 }}` on Home) |
| Category directory island | `CategoryDirectory.tsx` |
| Shared browse controller | `useDirectoryBrowse.ts` (page/mode/focus/pager — both shells) |
| Site header | `Header.astro` — brand, Search → `/#directory-search`, theme toggle |
| Site footer | `Footer.astro` — category links with chip-size icons; trust/notice; brand under Notice; © strip |
| Breadcrumb | `Breadcrumb.astro` — quiet surface pill, Lucide home + chevron seps (same gray as current), current muted |
| Load more / pager | `DirectoryLoadMore.tsx`, `DirectoryPagination.tsx` |
| Island cards | `ServiceCard.tsx` + `StatusBadge.tsx` |
| Static / related cards | `ServiceCardLink.astro` + `StatusBadge.astro` (SSR Lucide, no extra island) |
| Shared card / badge types | `src/lib/serviceCard.ts` |
| Content → card / search DTOs | `src/lib/serviceProjection.ts` (`DirectoryCard`, `toSearchableService`) |
| Hop disclose / bilingual panes | `HopDisclose.astro`, `BilingualPanes.astro`, `ServiceFaq.astro` |
| Icons | `CategoryIcon.tsx` + `categoryIcons.ts` (Category + optional Service keys) |
| Accents | `categoryVisuals.ts` — `accentStyle` (React object) / `accentStyleAttr` (Astro string) |

**Structure SSOT:** [`code-structure.md`](code-structure.md) (where not to fork recipes).

## Typography & tokens

- Display: Bricolage Grotesque; body/BN: Hind Siliguri (see `global.css`).
- Body base **17px** (one step up from 16 for readability on Home + hop pages). Home hero H1: `clamp(1.625rem, 4.5vw, 2.125rem)`.
- **Service hop content regions:** About = primary surface panel; Who/FAQ = muted support strips; all three use chevron disclose (**open by default**); labeled BN/EN panes; hop blocks use full `site-main` width — see [`service-page.md`](service-page.md). `.lang-label` stays the same small size in every region (exclude it from support/FAQ `p` font-size rules — Trap #15).
- **Directory / card scale:** card title EN+BN `1.125rem` (BN uses brand `--green`, weight 600 — peer for Bangla-only readers; EN stays ink + 650). Description `1rem`, domain `0.875rem`; chips `0.9375rem`; search input `1.0625rem`. Hop prose `1.0625rem`. Do **not** tint BN titles with `--cat-accent` (icon well already carries Category accent).
- **Card description clamp (ADR-0012):** EN `description` on `.service-card` is capped at **2 lines** (`-webkit-line-clamp: 2`) with ellipsis. Pin `.service-card__domain` with `margin-top: auto` so domains align at the card bottom while grid rows stretch equal height. Do **not** force a 2-line `min-height` slot. Editorial floor: EN `description` ≥ **90** characters (content-integrity test) so cards fill ~2 lines at typical desktop width.
- Prefer existing classes in `global.css` over ad-hoc pixel sizes in JSX.
- Dark theme: keep contrast; accent soft tints must remain readable on `--surface`.
- **Directory Pagination** (ADR-0010): Prev/Next + windowed page numbers (`buildPageWindow` in `src/lib/paginationWindow.ts` — ellipsis when >7 pages) use `--green` / `--green-hover` / `--green-soft` only — never `--cat-accent`. **Load more** (same green family) sits between the grid and the pager: appends the next batch, keeps viewport, focuses the first new card; page jumps replace and scroll to results. Hide pager + Load more when results ≤ 21; page size 20 when ≥ 22. Reset to page 1 / append mode on query/category change. Count: `N services` (All); `N services in {Category}` when a chip is active; `N services matching “q”` when searching; pager suffix `· Showing X · Page Y of Z` when paginating. Prefer naming the filter over vague “filtered”.
- **Directory load skeleton:** while Home fetches `/directory-index.json` (after `client:idle` hydrate), show a 6-card skeleton grid (`DirectoryCardSkeleton`) that matches Service card chrome — not a blank “Loading services…” panel. Keep `aria-busy` + screen-reader loading text; errors stay a Retry empty state. Respect `prefers-reduced-motion` (static bones, no pulse).
- **Search ↔ chips:** changing the Instant Directory search **value** (type or clear ×) resets the category chip to All; focus/click with no value change leaves the chip alone. After searching, chip clicks may still narrow results until the query string changes again.

## Content → UI

- Cards show: icon, title, `title_bn`, description, **official domain**, status when not ACTIVE.
- EN card `description` ≥ 90 characters (ADR-0012); CSS clamps display to 2 lines.
- Never reintroduce `meta_title` / `meta_description` content fields.
- New categories need `icon` (lucide key) + entry in `CATEGORY_ACCENTS` if a dedicated hue is desired.
- New Services need `directory_global_rank` + `directory_category_rank` (see [`directory-ranking.md`](directory-ranking.md)).
- Optional Service `icon` (Lucide): see [`service-icons.md`](service-icons.md); add the key to `categoryIcons.ts` if missing.
- Full add-Service checklist: [`new-service.md`](new-service.md).
## Brand mark

- Circular emblem (transparent PNG): `public/brand/citizensheba-logo.png`
- Header: emblem + existing English `.com` wordmark + Bangla (`Header.astro`)
- Favicon / Apple touch: `public/favicon-32.png`, `favicon-48.png`, `favicon.ico`, `apple-touch-icon.png`
- PWA: `public/icons/icon-192.png`, `icon-512.png`, `icon-512-maskable.png` (`manifest.webmanifest`)
- **Default OG / Twitter image:** `public/brand/og-default.png` (1200×630). Wired in `BaseLayout` via `resolveOgImage()` — overwrite the file to refresh shares. Future per-Service/Category images resolve ahead of this default (`src/lib/seo.ts`).
- JSON-LD: sitewide `Organization` + `WebSite` in `BaseLayout`; Service/Category pages add `BreadcrumbList` + `WebPage` (helpers in `seo.ts`). Do not claim `GovernmentService` for CitizenSheba.
- When replacing the logo, crop to a transparent circle and regenerate favicon + PWA sizes together (see `docs/superpowers/specs/2026-08-07-brand-logo-design.md`); refresh `og-default.png` if the brand mark changes.

## Related

- **Code structure / seams:** [`docs/guides/code-structure.md`](code-structure.md)
- **Service Page hop:** [`docs/guides/service-page.md`](service-page.md)
- **Directory ranking:** [`docs/guides/directory-ranking.md`](directory-ranking.md)
- ADR-0003, ADR-0004, ADR-0010, ADR-0012, `docs/guides/performance.md`, `docs/specs/TRAPS.md` (#3–#7, #16), `CONTEXT.md` § Instant Directory / Category Icon / Mobile-First / Directory ranks
