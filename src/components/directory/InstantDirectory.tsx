import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { filterAndSort, type SearchableService } from '../../lib/search';
import { categoryPath, servicePath } from '../../lib/urls';
import { accentStyle } from '../../lib/categoryVisuals';
import { LayoutGrid, SearchX } from '../../lib/categoryIcons';
import CategoryIcon from '../ui/CategoryIcon';
import ServiceCard from '../ui/ServiceCard';

type Category = {
  id: string;
  slug: string;
  name: string;
  nameBn: string;
  sortOrder: number;
  icon: string;
};

interface Props {
  categories: Category[];
  services: SearchableService[];
  initialCategoryId: string | null;
}

const SEARCH_PLACEHOLDER = 'সেবা খুঁজুন… Search services…';

export default function InstantDirectory({
  categories,
  services,
  initialCategoryId,
}: Props) {
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(initialCategoryId);
  const [chipOverflow, setChipOverflow] = useState({ left: false, right: false });
  const chipsRef = useRef<HTMLDivElement>(null);

  const results = useMemo(
    () => filterAndSort(services, query, categoryId),
    [services, query, categoryId],
  );

  const iconByCategory = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.icon])),
    [categories],
  );

  const activeCategory = categoryId
    ? categories.find((c) => c.id === categoryId)
    : null;

  const hasFilters = query.trim().length > 0 || categoryId !== null;

  const updateChipOverflow = useCallback(() => {
    const el = chipsRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft > 2;
    const right = maxScroll > 2 && el.scrollLeft < maxScroll - 2;
    setChipOverflow((prev) =>
      prev.left === left && prev.right === right ? prev : { left, right },
    );
  }, []);

  useEffect(() => {
    const el = chipsRef.current;
    if (!el) return;
    updateChipOverflow();
    const ro = new ResizeObserver(updateChipOverflow);
    ro.observe(el);
    window.addEventListener('resize', updateChipOverflow);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateChipOverflow);
    };
  }, [categories, updateChipOverflow]);

  const clearAll = () => {
    setQuery('');
    setCategoryId(null);
  };

  const countLabel =
    results.length === 1 ? '1 service' : `${results.length} services`;

  const chipsWrapClass = [
    'directory-chips-wrap',
    chipOverflow.left ? 'directory-chips-wrap--left' : '',
    chipOverflow.right ? 'directory-chips-wrap--right' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="directory">
      <div className="directory-search">
        <label className="sr-only" htmlFor="directory-query">
          {SEARCH_PLACEHOLDER}
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
          placeholder={SEARCH_PLACEHOLDER}
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

      <div className={chipsWrapClass}>
        <div
          ref={chipsRef}
          className="directory-chips"
          role="group"
          aria-label="Filter by category"
          onScroll={updateChipOverflow}
        >
          <button
            type="button"
            className={`directory-chip${categoryId === null ? ' directory-chip--active' : ''}`}
            onClick={() => setCategoryId(null)}
          >
            <LayoutGrid size={16} strokeWidth={2} aria-hidden="true" />
            All
          </button>
          {categories.map((cat) => {
            const style = accentStyle(cat.id) as CSSProperties;
            return (
              <button
                key={cat.id}
                type="button"
                className={`directory-chip${categoryId === cat.id ? ' directory-chip--active' : ''}`}
                style={style}
                onClick={() => setCategoryId(cat.id)}
              >
                <CategoryIcon icon={cat.icon} categoryId={cat.id} inheritAccent size={16} />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="directory-toolbar">
        <p className="directory-count" aria-live="polite">
          {countLabel}
        </p>
        {activeCategory && (
          <p className="directory-meta">
            <a className="directory-meta__link" href={categoryPath(activeCategory.slug)}>
              View all in {activeCategory.name}
            </a>
          </p>
        )}
      </div>

      {results.length === 0 ? (
        <div className="directory-empty">
          <span className="directory-empty__icon" aria-hidden="true">
            <SearchX size={28} strokeWidth={1.75} />
          </span>
          <p className="directory-empty__text">No services match your search.</p>
          <p className="directory-empty__hint">Try a different keyword or clear filters.</p>
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
              <ServiceCard
                href={servicePath(svc.slug)}
                title={svc.title}
                titleBn={svc.titleBn}
                description={svc.description}
                domain={svc.domain}
                status={svc.status}
                categoryId={svc.categoryId}
                icon={iconByCategory[svc.categoryId] ?? 'landmark'}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
