import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import {
  filterAndSort,
  paginateDirectory,
  type DirectoryBrowseMode,
  type SearchableService,
} from '../../lib/search';
import { formatDirectoryCount } from '../../lib/directoryCopy';
import { categoryPath, servicePath } from '../../lib/urls';
import { accentStyle } from '../../lib/categoryVisuals';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LayoutGrid, SearchX } from '../../lib/categoryIcons';
import CategoryIcon from '../ui/CategoryIcon';
import ServiceCard from '../ui/ServiceCard';
import DirectoryPagination from './DirectoryPagination';
import DirectoryLoadMore from './DirectoryLoadMore';
import DirectoryCardSkeleton from './DirectoryCardSkeleton';

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
  initialCategoryId: string | null;
  /** Build-time JSON from `directory-index.json.ts` — not inlined in Home HTML. */
  indexUrl: string;
}

const SEARCH_PLACEHOLDER = 'সেবা খুঁজুন… Search services…';
/** Hash target = search shell (not the input) so sticky-header scroll-margin applies. */
const DIRECTORY_SEARCH_HASH = '#directory-search';

function revealDirectorySearch(
  shell: HTMLElement | null,
  input: HTMLInputElement | null,
) {
  shell?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  // preventScroll: focus must not fight scrollIntoView / land on chips under the header.
  input?.focus({ preventScroll: true });
}

export default function InstantDirectory({
  categories,
  initialCategoryId,
  indexUrl,
}: Props) {
  const [services, setServices] = useState<SearchableService[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(initialCategoryId);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState<DirectoryBrowseMode>('append');
  const [chipOverflow, setChipOverflow] = useState({ left: false, right: false });
  const chipsRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchShellRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const focusNewRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    setLoadError(false);
    setServices(null);
    fetch(indexUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`directory index ${res.status}`);
        return res.json() as Promise<{ services: SearchableService[] }>;
      })
      .then((data) => {
        if (!cancelled) setServices(data.services);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [indexUrl, loadAttempt]);

  const results = useMemo(
    () => filterAndSort(services ?? [], query, categoryId),
    [services, query, categoryId],
  );

  const slice = useMemo(
    () => paginateDirectory(results, page, { mode }),
    [results, page, mode],
  );

  useEffect(() => {
    setPage(1);
    setMode('append');
  }, [query, categoryId]);

  useEffect(() => {
    if (page !== slice.page) setPage(slice.page);
  }, [page, slice.page]);

  useEffect(() => {
    if (!focusNewRef.current || slice.firstNewIndex == null) return;
    focusNewRef.current = false;
    const el = document.getElementById(`directory-card-${slice.firstNewIndex}`);
    el?.focus({ preventScroll: true });
  }, [slice.items, slice.firstNewIndex]);

  useEffect(() => {
    const focusFromHash = () => {
      if (window.location.hash !== DIRECTORY_SEARCH_HASH) return;
      revealDirectorySearch(searchShellRef.current, searchInputRef.current);
    };
    const frame = requestAnimationFrame(focusFromHash);
    window.addEventListener('hashchange', focusFromHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', focusFromHash);
    };
  }, []);

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

  const scrollChips = useCallback((direction: -1 | 1) => {
    const el = chipsRef.current;
    if (!el) return;
    const step = Math.max(180, Math.round(el.clientWidth * 0.7));
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
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

  const onQueryChange = (next: string) => {
    if (next === query) return;
    setQuery(next);
    setCategoryId(null);
  };

  const clearAll = () => {
    setQuery('');
    setCategoryId(null);
  };

  const onPageChange = (next: number) => {
    setMode('replace');
    setPage(next);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onLoadMore = () => {
    focusNewRef.current = true;
    setMode('append');
    setPage((p) => p + 1);
  };

  const countLabel =
    services == null
      ? loadError
        ? 'Could not load services'
        : 'Loading services…'
      : formatDirectoryCount({
          total: slice.total,
          showPager: slice.showPager,
          showing: slice.showing,
          page: slice.page,
          pageCount: slice.pageCount,
          categoryName: activeCategory?.name,
          query,
        });

  const chipsWrapClass = [
    'directory-chips-wrap',
    chipOverflow.left ? 'directory-chips-wrap--left' : '',
    chipOverflow.right ? 'directory-chips-wrap--right' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="directory" ref={resultsRef}>
      <div
        ref={searchShellRef}
        id="directory-search"
        className="directory-search"
      >
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
          ref={searchInputRef}
          id="directory-query"
          className="directory-search__input"
          type="search"
          placeholder={SEARCH_PLACEHOLDER}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            className="directory-search__clear"
            onClick={() => onQueryChange('')}
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
        {chipOverflow.left && (
          <button
            type="button"
            className="directory-chips-nav directory-chips-nav--left"
            aria-label="Scroll categories left"
            onClick={() => scrollChips(-1)}
          >
            <ChevronLeft size={18} strokeWidth={2.25} aria-hidden="true" />
          </button>
        )}
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
        {chipOverflow.right && (
          <button
            type="button"
            className="directory-chips-nav directory-chips-nav--right"
            aria-label="Scroll categories right"
            onClick={() => scrollChips(1)}
          >
            <ChevronRight size={18} strokeWidth={2.25} aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="directory-toolbar">
        <h2 className="sr-only">Official services</h2>
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

      {services == null ? (
        loadError ? (
          <div className="directory-empty" aria-live="polite">
            <p className="directory-empty__text">Could not load the service directory.</p>
            <button
              type="button"
              className="directory-empty__clear"
              onClick={() => setLoadAttempt((n) => n + 1)}
            >
              Retry
            </button>
          </div>
        ) : (
          <div aria-busy="true" aria-live="polite">
            <DirectoryCardSkeleton />
          </div>
        )
      ) : slice.total === 0 ? (
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
        <>
          <ul className="directory-grid">
            {slice.items.map((svc, i) => (
              <li key={svc.id} id={`directory-card-${i}`} tabIndex={-1}>
                <ServiceCard
                  href={servicePath(svc.slug)}
                  title={svc.title}
                  titleBn={svc.titleBn}
                  description={svc.description}
                  domain={svc.domain}
                  status={svc.status}
                  categoryId={svc.categoryId}
                  icon={svc.icon ?? iconByCategory[svc.categoryId] ?? 'landmark'}
                />
              </li>
            ))}
          </ul>
          {slice.showLoadMore && (
            <DirectoryLoadMore remaining={slice.remaining} onLoadMore={onLoadMore} />
          )}
          {slice.showPager && (
            <DirectoryPagination
              page={slice.page}
              pageCount={slice.pageCount}
              onPageChange={onPageChange}
              label="Directory results"
            />
          )}
        </>
      )}
    </div>
  );
}
