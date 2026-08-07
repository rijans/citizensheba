/** Placeholder cards while `/directory-index.json` loads on Home. */
const SKELETON_COUNT = 6;

export default function DirectoryCardSkeleton() {
  return (
    <div className="directory-skeleton" aria-hidden="true">
      <ul className="directory-grid directory-skeleton__grid">
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <li key={i}>
            <div className="service-card service-card--skeleton">
              <div className="service-card__top">
                <span className="skeleton-bone skeleton-bone--icon" />
                <div className="service-card__titles">
                  <span className="skeleton-bone skeleton-bone--title" />
                  <span className="skeleton-bone skeleton-bone--title-bn" />
                </div>
              </div>
              <span className="skeleton-bone skeleton-bone--line" />
              <span className="skeleton-bone skeleton-bone--line skeleton-bone--line-short" />
              <span className="skeleton-bone skeleton-bone--domain" />
            </div>
          </li>
        ))}
      </ul>
      <p className="sr-only">Loading services…</p>
    </div>
  );
}
