import { useMemo, useState } from 'react';
import { filterAndSort, type SearchableService } from '../../lib/search';
import { categoryPath, servicePath } from '../../lib/urls';

type Category = {
  id: string;
  slug: string;
  name: string;
  nameBn: string;
  sortOrder: number;
};

interface Props {
  categories: Category[];
  services: SearchableService[];
  initialCategoryId: string | null;
}

export default function InstantDirectory({
  categories,
  services,
  initialCategoryId,
}: Props) {
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(initialCategoryId);

  const results = useMemo(
    () => filterAndSort(services, query, categoryId),
    [services, query, categoryId],
  );

  const activeCategory = categoryId
    ? categories.find((c) => c.id === categoryId)
    : null;

  const hasFilters = query.trim().length > 0 || categoryId !== null;

  const clearAll = () => {
    setQuery('');
    setCategoryId(null);
  };

  return (
    <div className="directory">
      <div className="directory-search">
        <label className="sr-only" htmlFor="directory-query">
          Search services
        </label>
        <svg
          className="directory-search__icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          id="directory-query"
          className="directory-search__input"
          type="search"
          placeholder="Search services…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            className="directory-search__clear"
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="directory-chips" role="group" aria-label="Filter by category">
        <button
          type="button"
          className={`directory-chip${categoryId === null ? ' directory-chip--active' : ''}`}
          onClick={() => setCategoryId(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`directory-chip${categoryId === cat.id ? ' directory-chip--active' : ''}`}
            onClick={() => setCategoryId(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {activeCategory && (
        <p className="directory-meta">
          <a className="directory-meta__link" href={categoryPath(activeCategory.slug)}>
            View all in {activeCategory.name}
          </a>
        </p>
      )}

      {results.length === 0 ? (
        <div className="directory-empty">
          <p className="directory-empty__text">No services match your search.</p>
          {hasFilters && (
            <button type="button" className="directory-empty__clear" onClick={clearAll}>
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <ul className="directory-grid">
          {results.map((svc) => (
            <li key={svc.id}>
              <a className="service-card" href={servicePath(svc.slug)}>
                <div className="service-card__header">
                  <h3 className="service-card__title">{svc.title}</h3>
                  {svc.status !== 'ACTIVE' && (
                    <span
                      className={`status-badge status-badge--${svc.status.toLowerCase()}`}
                    >
                      {svc.status === 'MAINTENANCE' ? 'Maintenance' : 'Deprecated'}
                    </span>
                  )}
                </div>
                <p className="service-card__title-bn" lang="bn">
                  {svc.titleBn}
                </p>
                <p className="service-card__description">{svc.description}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
