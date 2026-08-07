# Code structure patterns (CitizenSheba)

> **Where shared logic lives** after the 2026-08 deepenings. Read before forking Directory / hop / card recipes. Product UI rules stay in [`frontend.md`](frontend.md), [`service-page.md`](service-page.md), [`performance.md`](performance.md). Router: [`docs/agent/INDEX.md`](../agent/INDEX.md).

## Principles

- **Deepen recipes, not islands.** Extract shared pure/SSR modules; do not add React islands for cards, icons, hop disclose, or footer.
- **Two adapters = real seam.** Instant + Category justified `useDirectoryBrowse`; React + Astro cards justified shared `serviceCard.ts` + twin StatusBadges. Do not invent barrels or pass-through wrappers that fail the deletion test.
- **Home LCP path stays asymmetric:** Instant Directory fetches `/directory-index.json` after idle; Category pages may pass props. Do **not** inline the full searchable catalog into Home island props ([`performance.md`](performance.md), ADR-0001).

## Service projection (`src/lib/serviceProjection.ts`)

**Owns:** related-id fallback (`RELATED_FALLBACK_LIMIT` = 4), `officialDomain`, `toDirectoryCard`, `toSearchableService`.

| Caller | Uses |
|--------|------|
| `buildSearchIndex.ts` | Thin `getCollection` adapter → `toSearchableService` |
| `categories/[slug].astro` | `toDirectoryCard` for Category grid props |
| `services/[slug].astro` | `relatedIdsFor` + `toDirectoryCard` for related grid; `officialDomain` for CTA |

**`DirectoryCard`** — thin display model for Category grids and Service Page related cards (resolved `icon`, `categoryId`, `directoryCategoryRank`). **`SearchableService`** (`search.ts`) stays the Instant Directory search-heavy shape.

**Do not:** re-inline related fallback or `official_domain ?? hostname(url)` in pages; do not put `astro:content` inside `serviceProjection` (plain data in → DTOs out; unit-testable).

## Directory browse (`useDirectoryBrowse.ts`)

**Owns:** page / mode (`append` | `replace`), `paginateDirectory` wiring, page clamp, load-more focus (`cardIdPrefix-${index}`), pager scroll via `scrollTargetRef`.

| Shell | Data | `resetKey` | `cardIdPrefix` |
|-------|------|------------|----------------|
| `InstantDirectory.tsx` | fetch JSON + `filterAndSort` | `` `${query}\0${categoryId}` `` | `directory-card` |
| `CategoryDirectory.tsx` | SSR `DirectoryCard[]` props | `categoryId` | `category-card` |

**Do not:** fork page/mode/focus again in a third shell; do not client-re-sort Category lists (SSR already orders by `directory_category_rank`); do not merge Instant + Category into one fat island.

## Hop disclose (Astro-only)

| Module | Role |
|--------|------|
| `HopDisclose.astro` | `<details open>` + primary/support region + EN+BN H2 + chevron; default slot = body |
| `BilingualPanes.astro` | Labeled BN then EN panes; named slots `bn` / `en` |
| `ServiceFaq.astro` | FAQ item loop inside `HopDisclose` + per-answer `BilingualPanes` |

Headings/labels: `servicePageCopy.ts`. Markup rules: [`service-page.md`](service-page.md).

**Do not:** add a React island on Service Pages for disclose/FAQ; do not re-copy `<details class="hop-disclose">` markup on the hop page.

## Service cards (twins by constraint)

| Piece | Role |
|-------|------|
| `serviceCard.ts` | Shared `ServiceCardFields` + `statusBadgeLabel` |
| `ServiceCard.tsx` | React island cards |
| `ServiceCardLink.astro` | SSR related / static cards |
| `StatusBadge.tsx` / `StatusBadge.astro` | Twin badges; same classes via `statusBadgeLabel` |
| `accentStyle` / `accentStyleAttr` | Object (React) vs inline string (Astro) in `categoryVisuals.ts` |

**Do not:** hydrate related cards with a React island; do not inline badge label strings in only one twin.

## Accents vs icons (unchanged split)

- Accents by Category **id**: `categoryVisuals.ts` (ADR-0004)
- Lucide **keys**: `categoryIcons.ts` + content `icon` fields

Do not merge these modules.

## Schema note

Service frontmatter has **no** `logo` field. Brand/OG images are site assets (`public/brand/`, `resolveOgImage` in `seo.ts`). Per-Service raster OG is future — not a content `logo` string.

## Tests

Projection + status labels: `tests/unit/serviceProjection.test.ts`, `serviceCard.test.ts`. Browse math: `search.test.ts` (`paginateDirectory`) + `paginationWindow.test.ts`. Hook itself is thin wiring — no RTL dep required.
