# Directory Load more (append) — design addendum

> **Status:** implemented on `feat/directory-ranking-pagination`. Amends [ADR-0010](../../adr/0010-directory-ranking-and-pagination.md). Parent: [`2026-08-07-directory-ranking-pagination-design.md`](./2026-08-07-directory-ranking-pagination-design.md).

Adds an industry-style **Load more** control between the Service card grid and the numbered pager. Does not replace pagination.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Interaction | **Append** next page-sized batch (keep cards already shown) |
| Page jump | Numbered page / Prev / Next **replaces** the visible list (not stacked) |
| Control | Button **`Load more`** + muted **`N more`** hint |
| Surfaces | Home Instant Directory + Category Pages whenever pager is shown (≥22 results) |
| Scroll | Load more: **no** page scroll; focus first newly appended card. Pager jump: scroll to results top (unchanged) |
| Counts | Recalculate after load: total unchanged; **showing** and **current page** update |
| Reset | `page` / append window → 1 when query or category filter changes |
| Visual | Brand `--green` outline/soft (same family as pager; not Category accent) |
| Docs | **Amend ADR-0010** + CONTEXT / `frontend.md` / `directory-ranking.md` / parent design status |

## Behavior

### State model

- `page` = highest page index currently reflected in the UI after append **or** the replaced page after a jump.
- **Append mode:** visible items = `results.slice(0, page * PAGE_SIZE)` (capped at `total`).
- **Jump mode:** visible items = single page slice `[(page-1)*PAGE_SIZE, page*PAGE_SIZE)`.
- After Load more: `page := page + 1` (while `page < pageCount`); append mode continues.
- After clicking page `N`: enter jump/replace mode with `page := N`.
- Soft-max unchanged: if `total ≤ 21`, no pager and no Load more.

### Count line (example)

`82 services · Showing 40 · Page 2 of 5`

- After Load more from page 1: Showing 40, Page 2 of 5; hint `22 more` or `20 more` (remaining until end — prefer **remaining count** `total - showing`).
- On last page / fully loaded: hide Load more; Showing = total.

### Layout order

1. Card grid  
2. **Load more** button + muted hint (if more remain)  
3. Numbered Prev / pages / Next  

### Rejected

| Alternative | Why not |
|-------------|---------|
| Load more only (drop pager) | Loses random access on long catalogs |
| Grow page size on page 1 | Confusing vs “Page N of M” |
| Jump appends up to N | Heavy DOM; unclear vs replace |
| Infinite scroll | Weaker a11y / control vs explicit Load more |

## Implementation sketch

1. Extend `paginateDirectory` (or sibling helper) to support `mode: 'append' | 'replace'` / `visibleThroughPage`.
2. Shared `DirectoryLoadMore` control (or fold into pagination module).
3. Wire Instant Directory + Category Directory; unit tests for append + jump replace + remaining count.
4. Amend ADR-0010 + glossary/guides; strike “Load more out of scope” from parent design.

## Success criteria

- User can append without losing scroll position.
- Pager current page and “Showing N” stay consistent after Load more and after jump.
- Load more hidden when nothing remains.
- Docs match behavior; `npm run ci` green.
