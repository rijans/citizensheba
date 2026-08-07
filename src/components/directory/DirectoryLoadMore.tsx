type Props = {
  remaining: number;
  onLoadMore: () => void;
};

/**
 * Append next batch — sits between grid and pager (ADR-0010 / load-more addendum).
 */
export default function DirectoryLoadMore({ remaining, onLoadMore }: Props) {
  if (remaining <= 0) return null;

  return (
    <div className="directory-load-more">
      <button type="button" className="directory-load-more__btn" onClick={onLoadMore}>
        Load more
      </button>
      <p className="directory-load-more__hint">
        {remaining === 1 ? '1 more' : `${remaining} more`}
      </p>
    </div>
  );
}
