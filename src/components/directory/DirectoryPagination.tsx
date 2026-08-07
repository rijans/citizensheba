type Props = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Optional label prefix for aria (e.g. category name). */
  label?: string;
};

/**
 * Numbered pages + Prev/Next. Brand green only (ADR-0010) — not Category accent.
 */
export default function DirectoryPagination({
  page,
  pageCount,
  onPageChange,
  label = 'Directory results',
}: Props) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

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
        {pages.map((p) => (
          <li key={p}>
            <button
              type="button"
              className={`directory-pagination__page${p === page ? ' directory-pagination__page--current' : ''}`}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          </li>
        ))}
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
