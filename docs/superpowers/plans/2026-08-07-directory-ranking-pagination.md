# Directory ranking + pagination — implementation plan

> **Spec:** [`docs/superpowers/specs/2026-08-07-directory-ranking-pagination-design.md`](../specs/2026-08-07-directory-ranking-pagination-design.md)

**Goal:** Curated dual ranks on every Service + green client pagination (page size 20, soft show-all ≤21) on Home Instant Directory and Category Pages.

## Tasks

1. Schema: `directory_global_rank` + `directory_category_rank` required ints in `content.config.ts`
2. Seed ranks on all `src/content/services/*.md` (Top ~20 global + category tops; rest high defaults)
3. Lib: extend `SearchableService` / `buildSearchIndex`; empty-query sort in `filterAndSort`; `paginateDirectory` helper (`PAGE_SIZE=20`, `SOFT_MAX=21`)
4. UI: `DirectoryPagination.tsx` (Prev/Next + numbers, `--green`); wire Instant Directory; Category Page island
5. Docs: ADR-0010, CONTEXT terms, `frontend.md`, living `directory-ranking.md`, INDEX + docs/README
6. Tests: search fixtures + pagination helper + integrity ranks required
7. `npm run ci`

## Done when

- Home All / category chips / Category Pages respect ranks; search stays score-ordered
- Pager green, only when ≥22 results; resets on filter change
- Docs + CI green
