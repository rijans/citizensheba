import { buildPageWindow } from '../../lib/paginationWindow';

type Props = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Optional label prefix for aria (e.g. category name). */
  label?: string;
};

/**
 * Numbered pages + Prev/Next with ellipsis windowing when long (ADR-0010).
 * Brand green only — not Category accent.
 */
export default function DirectoryPagination({
  page,
  pageCount,
  onPageChange,
  label = 'Directory results',
}: Props) {
  if (pageCount <= 1) return null;

  const items = buildPageWindow(page, pageCount);

  return (
    <nav className="directory-pagination" aria-label={`${label} pagination`}>
      <button
        type="button"
        className="directory-pagination__btn"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        Prev
      </button>
      <ul className="directory-pagination__pages">
        {items.map((item, i) =>
          item === 'ellipsis' ? (
            <li key={`ellipsis-${i}`} className="directory-pagination__ellipsis" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={`directory-pagination__page${item === page ? ' directory-pagination__page--current' : ''}`}
                aria-label={`Page ${item}`}
                aria-current={item === page ? 'page' : undefined}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ul>
      <button
        type="button"
        className="directory-pagination__btn"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}
