import { useEffect, useMemo, useRef, useState } from 'react';
import { paginateDirectory, type DirectoryBrowseMode } from '../../lib/search';
import { formatDirectoryCount } from '../../lib/directoryCopy';
import { servicePath } from '../../lib/urls';
import type { DirectoryCard } from '../../lib/serviceProjection';
import DirectoryPagination from './DirectoryPagination';
import DirectoryLoadMore from './DirectoryLoadMore';
import ServiceCard from '../ui/ServiceCard';

export type { DirectoryCard };

type Props = {
  categoryId: string;
  categoryName: string;
  services: DirectoryCard[];
};

/**
 * Category Page grid with client pagination + Load more (ADR-0010).
 * Parent SSR should already order by directory_category_rank.
 */
export default function CategoryDirectory({
  categoryId,
  categoryName,
  services,
}: Props) {
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState<DirectoryBrowseMode>('append');
  const focusNewRef = useRef(false);

  const ordered = useMemo(
    () =>
      [...services].sort((a, b) => {
        if (a.directoryCategoryRank !== b.directoryCategoryRank) {
          return a.directoryCategoryRank - b.directoryCategoryRank;
        }
        return a.title.localeCompare(b.title);
      }),
    [services],
  );

  const slice = useMemo(
    () => paginateDirectory(ordered, page, { mode }),
    [ordered, page, mode],
  );

  useEffect(() => {
    setPage(1);
    setMode('append');
  }, [categoryId]);

  useEffect(() => {
    if (page !== slice.page) setPage(slice.page);
  }, [page, slice.page]);

  useEffect(() => {
    if (!focusNewRef.current || slice.firstNewIndex == null) return;
    focusNewRef.current = false;
    const el = document.getElementById(`category-card-${slice.firstNewIndex}`);
    el?.focus({ preventScroll: true });
  }, [slice.items, slice.firstNewIndex]);

  const onPageChange = (next: number) => {
    setMode('replace');
    setPage(next);
    document.getElementById('category-directory')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onLoadMore = () => {
    focusNewRef.current = true;
    setMode('append');
    setPage((p) => p + 1);
  };

  const countLabel = formatDirectoryCount({
    total: slice.total,
    showPager: slice.showPager,
    showing: slice.showing,
    page: slice.page,
    pageCount: slice.pageCount,
    categoryName,
  });

  return (
    <div id="category-directory" className="category-directory">
      <h2 className="sr-only">{categoryName} services</h2>
      <p className="directory-count" aria-live="polite">
        {countLabel}
      </p>
      <ul className="directory-grid">
        {slice.items.map((svc, i) => (
          <li key={svc.id} id={`category-card-${i}`} tabIndex={-1}>
            <ServiceCard
              href={servicePath(svc.slug)}
              title={svc.title}
              titleBn={svc.titleBn}
              description={svc.description}
              domain={svc.domain}
              status={svc.status}
              categoryId={svc.categoryId}
              icon={svc.icon}
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
          label={categoryName}
        />
      )}
    </div>
  );
}
