/** Visible pager tokens: page numbers plus ellipsis gaps. */
export type PageWindowItem = number | 'ellipsis';

type Options = {
  /** Pages each side of the current page (default 1). */
  siblingCount?: number;
  /** Always-visible pages at each end (default 1). */
  boundaryCount?: number;
  /** Show every page when `pageCount` is at most this (default 7). */
  maxWithoutEllipsis?: number;
};

/**
 * Compact page list for Directory Pagination: `1 … 6 7 8 … 14`.
 * Keeps first/last + a window around the current page.
 */
export function buildPageWindow(
  page: number,
  pageCount: number,
  options: Options = {},
): PageWindowItem[] {
  const siblingCount = options.siblingCount ?? 1;
  const boundaryCount = options.boundaryCount ?? 1;
  const maxWithoutEllipsis = options.maxWithoutEllipsis ?? 7;

  if (pageCount <= 0) return [];
  const current = Math.min(Math.max(1, page), pageCount);

  if (pageCount <= maxWithoutEllipsis) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  for (let i = 1; i <= Math.min(boundaryCount, pageCount); i++) pages.add(i);
  for (let i = Math.max(1, pageCount - boundaryCount + 1); i <= pageCount; i++) {
    pages.add(i);
  }
  for (
    let i = Math.max(1, current - siblingCount);
    i <= Math.min(pageCount, current + siblingCount);
    i++
  ) {
    pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result: PageWindowItem[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev > 0 && p - prev > 1) result.push('ellipsis');
    result.push(p);
    prev = p;
  }
  return result;
}
