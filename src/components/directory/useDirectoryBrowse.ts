import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import {
  paginateDirectory,
  type DirectoryBrowseMode,
  type DirectoryPageSlice,
} from '../../lib/search';

export type UseDirectoryBrowseOptions = {
  /** Change resets to page 1 + append mode (caller builds the key). */
  resetKey: string | number;
  /** DOM id prefix for load-more focus: `${cardIdPrefix}-${firstNewIndex}`. */
  cardIdPrefix: string;
  /** Pager scrolls this element into view when set. */
  scrollTargetRef?: RefObject<HTMLElement | null>;
};

export type UseDirectoryBrowseResult<T> = {
  slice: DirectoryPageSlice<T>;
  onPageChange: (next: number) => void;
  onLoadMore: () => void;
};

/**
 * Shared Instant Directory / Category Page browse controller (ADR-0010).
 * Shells own data + markup; this owns page/mode/focus/pager wiring.
 */
export function useDirectoryBrowse<T>(
  items: T[],
  { resetKey, cardIdPrefix, scrollTargetRef }: UseDirectoryBrowseOptions,
): UseDirectoryBrowseResult<T> {
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState<DirectoryBrowseMode>('append');
  const focusNewRef = useRef(false);

  const slice = useMemo(
    () => paginateDirectory(items, page, { mode }),
    [items, page, mode],
  );

  useEffect(() => {
    setPage(1);
    setMode('append');
  }, [resetKey]);

  useEffect(() => {
    if (page !== slice.page) setPage(slice.page);
  }, [page, slice.page]);

  useEffect(() => {
    if (!focusNewRef.current || slice.firstNewIndex == null) return;
    focusNewRef.current = false;
    document.getElementById(`${cardIdPrefix}-${slice.firstNewIndex}`)?.focus({
      preventScroll: true,
    });
  }, [cardIdPrefix, slice.items, slice.firstNewIndex]);

  const onPageChange = (next: number) => {
    setMode('replace');
    setPage(next);
    scrollTargetRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onLoadMore = () => {
    focusNewRef.current = true;
    setMode('append');
    setPage((p) => p + 1);
  };

  return { slice, onPageChange, onLoadMore };
}
