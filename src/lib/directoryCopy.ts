/** Visible Instant Directory / Category count line (ADR-0010). */

type CountOpts = {
  total: number;
  showing?: number;
  page?: number;
  pageCount?: number;
  showPager?: boolean;
  /** Active category Display Name (EN chip name). */
  categoryName?: string | null;
  /** Non-empty search query string. */
  query?: string | null;
};

/**
 * Prefer naming the filter over vague “filtered”:
 * - `26 services in Safety & Security`
 * - `3 services matching “nid”`
 * - pager suffix unchanged when paginating
 */
export function formatDirectoryCount({
  total,
  showing,
  page,
  pageCount,
  showPager = false,
  categoryName,
  query,
}: CountOpts): string {
  const q = query?.trim() ?? '';
  const cat = categoryName?.trim() || null;
  const noun = total === 1 ? 'service' : 'services';

  let head = `${total} ${noun}`;
  if (q && cat) {
    head = `${total} ${noun} in ${cat} matching “${q}”`;
  } else if (q) {
    head = `${total} ${noun} matching “${q}”`;
  } else if (cat) {
    head = `${total} ${noun} in ${cat}`;
  }

  if (showPager && showing != null && page != null && pageCount != null) {
    return `${head} · Showing ${showing} · Page ${page} of ${pageCount}`;
  }
  return head;
}
