/**
 * Content → Directory / search DTOs (build-time & SSR).
 * Keeps related-fallback, domain resolve, and card fields in one module.
 */
import { officialDomainFromUrl } from './urls';
import type { SearchableService } from './search';

/** When `related` is empty/absent: category peers excluding self. */
export const RELATED_FALLBACK_LIMIT = 4;

/** Plain Service fields the projection module needs (from content `data`). */
export type ServiceProjectionInput = {
  id: string;
  slug: string;
  title: string;
  title_bn: string;
  description: string;
  description_bn: string;
  body: string;
  body_bn: string;
  url: string;
  official_domain?: string;
  category: string;
  directory_global_rank: number;
  directory_category_rank: number;
  icon?: string;
  tags: string[];
  aliases: { name: string }[];
  status: 'ACTIVE' | 'MAINTENANCE' | 'DEPRECATED';
  related?: string[];
};

/** Plain Category fields needed for card / search projection. */
export type CategoryProjectionInput = {
  id: string;
  name: string;
  name_bn: string;
  icon: string;
};

/** Thin Directory card model — Category grids and Service Page related cards. */
export type DirectoryCard = {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  description: string;
  domain: string;
  status: 'ACTIVE' | 'MAINTENANCE' | 'DEPRECATED';
  categoryId: string;
  directoryCategoryRank: number;
  /** Resolved: Service icon or Category icon. */
  icon: string;
};

export function relatedIdsFor(
  service: Pick<ServiceProjectionInput, 'id' | 'category' | 'related'>,
  all: Pick<ServiceProjectionInput, 'id' | 'category'>[],
): string[] {
  if (service.related?.length) return service.related;
  return all
    .filter((s) => s.category === service.category && s.id !== service.id)
    .map((s) => s.id)
    .slice(0, RELATED_FALLBACK_LIMIT);
}

export function officialDomain(
  service: Pick<ServiceProjectionInput, 'url' | 'official_domain'>,
): string {
  return service.official_domain ?? officialDomainFromUrl(service.url);
}

export function toDirectoryCard(
  service: ServiceProjectionInput,
  category: CategoryProjectionInput,
): DirectoryCard {
  if (service.category !== category.id) {
    throw new Error(
      `Service ${service.id} category ${service.category} does not match Category ${category.id}`,
    );
  }
  return {
    id: service.id,
    slug: service.slug,
    title: service.title,
    titleBn: service.title_bn,
    description: service.description,
    domain: officialDomain(service),
    status: service.status,
    categoryId: category.id,
    directoryCategoryRank: service.directory_category_rank,
    icon: service.icon ?? category.icon,
  };
}

export type SearchableProjectionContext = {
  category: CategoryProjectionInput;
  allServices: ServiceProjectionInput[];
  byId: Record<string, ServiceProjectionInput>;
};

export function toSearchableService(
  service: ServiceProjectionInput,
  ctx: SearchableProjectionContext,
): SearchableService {
  const { category, allServices, byId } = ctx;
  if (service.category !== category.id) {
    throw new Error(
      `Service ${service.id} references missing category ${service.category}`,
    );
  }

  const relatedTitles: string[] = [];
  for (const rid of relatedIdsFor(service, allServices)) {
    const rel = byId[rid];
    if (!rel) continue;
    relatedTitles.push(rel.title, rel.title_bn);
  }

  return {
    id: service.id,
    slug: service.slug,
    categoryId: service.category,
    title: service.title,
    titleBn: service.title_bn,
    description: service.description,
    descriptionBn: service.description_bn,
    searchBlob: [service.body, service.body_bn]
      .join('\n')
      .replace(/[#>*_`\[\]()!-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
    tags: service.tags,
    aliases: (service.aliases ?? []).map((a) => a.name),
    relatedTitles,
    categoryName: category.name,
    categoryNameBn: category.name_bn,
    domain: officialDomain(service),
    status: service.status,
    directoryGlobalRank: service.directory_global_rank,
    directoryCategoryRank: service.directory_category_rank,
    ...(service.icon ? { icon: service.icon } : {}),
  };
}
