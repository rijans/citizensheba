# Directory ranking + pagination — design

> **Status:** implemented on `feat/directory-ranking-pagination`. Living ranks: [`docs/guides/directory-ranking.md`](../../guides/directory-ranking.md). Decision: [ADR-0010](../../adr/0010-directory-ranking-and-pagination.md). Glossary: CONTEXT (**Directory Global Rank**, **Directory Category Rank**, **Directory Pagination**).

Catalog growth (~82 Services) makes unpaginated Home / Category grids hard to scan. Browse mode must surface high-demand Official Services first, with consistent brand-green pagination when lists are long. Search scoring (ADR-0007) is unchanged when the query is non-empty.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Popularity source | Curated dual ranks on every Service — not analytics |
| Fields | Required `directory_global_rank` + `directory_category_rank` (ints; lower = higher) |
| Home All (empty query) | Sort by **global** rank; ties → Display Name A–Z |
| Home category chip (empty query) | Sort by **category** rank among filtered Services; ties → title A–Z |
| Category Pages | Same **category** rank sort |
| Active search | Keep score order (ADR-0007); ranks ignored while query non-empty |
| Page size | **20** cards per page |
| Soft overflow | If total results **≤ 21**, show **all** (no pager). Pager when **≥ 22** |
| When to paginate | Any filtered result set that exceeds soft overflow (All, chip, Category, and long search hits) |
| Reset | Page → 1 when query or category filter changes |
| Mechanism | Client pager; **no** `?page=` / multi-page Category routes in v1 |
| Home | Extend Instant Directory island: slice + pager |
| Category Pages | Small island: SSR first page (≤20/21); remaining cards via island props |
| Pager UI | Numbered pages + Prev/Next; accents use `--green` / `--green-soft` (not Category accent) |
| Seed | Curated Top ~20 global + per-category tops; rest high defaults (`500+` global, `100+` category) |
| Docs | ADR-0010 + CONTEXT + `frontend.md` + living `directory-ranking.md` + INDEX row |
| Noscript Home list | Same global-rank order as browse All |

## Goal and non-goals

**In scope**

- Schema + frontmatter ranks on all Services.
- Browse sort helpers shared by Home and Category surfaces.
- Shared pagination UI (green) on Instant Directory and Category Pages.
- Docs / glossary / living Top table / integrity coverage for required ranks.
- Seed Top ~20 global list (below) and category tops for popular peers.

**Out of scope**

- Analytics-driven popularity.
- Infinite scroll as the **only** browse pattern (Load more + pager is in [`2026-08-07-directory-load-more-design.md`](./2026-08-07-directory-load-more-design.md)).
- Shareable page URLs (`?page=`).
- Changing Service Page related-list order (unless it already follows category peers — leave as today).
- Changing search scoring weights (ADR-0007).

## Top ~20 global seed (approved)

Assign `directory_global_rank` **10, 20, 30 … 200** in this order:

1. NID Services (`nid`)
2. e-Passport Portal (`epassport`)
3. NBR e-TIN Registration (`etin`)
4. e-Return (`ereturn`)
5. Birth & Death Registration — BDRIS (`bdris`)
6. myGov (`mygov`)
7. Bangladesh National Portal (`national-portal`)
8. BTRC (`btrc`)
9. Dhaka WASA (`dhaka-wasa`)
10. DESCO (`desco`)
11. DPDC (`dpdc`)
12. Bangladesh Railway e-Ticket (`railway`)
13. BRTA Service Portal (`brta`)
14. Bangladesh Police (`police`)
15. e-Porcha (`eporcha`) — land top (Namjari stays category peer, not global Top 20)
16. Teachers' Portal (`teachers-portal`)
17. Education Board Results (`edu-results`)
18. Surokkha (`surokkha`)
19. Fire Service & Civil Defence (`fire-service`)
20. ekPay (`ekpay`)

All other Services: `directory_global_rank` starting at **500**, spaced (e.g. 500, 510, …) or clustered with title A–Z tie-break. Do not require globally unique ranks; uniqueness is preferred among the Top 20.

**Per-category tops:** Within each Category, assign low `directory_category_rank` (10, 20, …) to the same high-demand Services that belong there; remaining members `100+` with title A–Z ties. Living table documents Top global + notes per Category; full numbers live in frontmatter.

## Behavior detail

### Browse sort

```
empty query + no category  → sort by directory_global_rank, then title
empty query + category     → sort by directory_category_rank, then title
non-empty query            → existing filterAndSort score order
```

### Pagination math

```
PAGE_SIZE = 20
SOFT_MAX  = 21   // show all if length <= SOFT_MAX
if (n <= SOFT_MAX) → one page, no pager UI
else → pages of PAGE_SIZE; last page may have 1..(PAGE_SIZE) items
```

Example: 21 results → all 21, no pager. 22 results → page 1 has 20, page 2 has 2.

### Category Page island

- Astro sorts by `directory_category_rank`, then title.
- SSR renders first visible page of cards (≤20, or all if ≤21) for first paint / SEO of tops.
- Island receives full ordered card props (or compact service list + shared card) and pager; pages 2+ client-only in v1 (acceptable: Category SEO is secondary to Service hops).

### Visual

- Pager current page / focus / hover: `--green`, `--green-hover`, `--green-soft` from `global.css`.
- Do not tint pager with `--cat-accent`.

## Alternatives rejected

| Alternative | Why not |
|-------------|---------|
| Single `directory_rank` | Home All and Category needs diverge; dual fields keep both honest |
| Hardcoded popular IDs in code | Invisible to content authors; harder to audit |
| Analytics popularity | No beacon → rank pipeline in v1; editorial curation fits hop catalog |
| `?page=` Category URLs | Extra routes + canonical complexity for little SEO gain vs Service Pages |
| Infinite scroll | Weaker scanability / a11y vs explicit pages on Mobile-First |

## Implementation sketch (not a plan)

1. Zod schema + integrity test for both ranks.
2. Seed ranks on all `src/content/services/*.md`.
3. Extend `SearchableService` + `buildSearchIndex`; empty-query sort in `filterAndSort` (or sibling helper).
4. `DirectoryPagination` React control; wire Instant Directory + Category island.
5. ADR-0010, CONTEXT, `frontend.md`, `directory-ranking.md`, INDEX / README rows.
6. Unit tests: browse sort + soft-21 pagination helper; update search fixtures with ranks.
7. `npm run ci`.

## Success criteria

- Home All shows Top ~20 before long-tail Services.
- Category Pages show category tops first.
- Pager appears only when results ≥ 22; uses brand green.
- Search results remain score-ordered.
- Agents have ADR + living table + glossary for future rank edits.
