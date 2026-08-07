import { useRef } from 'react';
import { formatDirectoryCount } from '../../lib/directoryCopy';
import { servicePath } from '../../lib/urls';
import type { DirectoryCard } from '../../lib/serviceProjection';
import DirectoryPagination from './DirectoryPagination';
import DirectoryLoadMore from './DirectoryLoadMore';
import ServiceCard from '../ui/ServiceCard';
import { useDirectoryBrowse } from './useDirectoryBrowse';

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
  const rootRef = useRef<HTMLDivElement>(null);
  const { slice, onPageChange, onLoadMore } = useDirectoryBrowse(services, {
    resetKey: categoryId,
    cardIdPrefix: 'category-card',
    scrollTargetRef: rootRef,
  });

  const countLabel = formatDirectoryCount({
    total: slice.total,
    showPager: slice.showPager,
    showing: slice.showing,
    page: slice.page,
    pageCount: slice.pageCount,
    categoryName,
  });

  return (
    <div id="category-directory" className="category-directory" ref={rootRef}>
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
