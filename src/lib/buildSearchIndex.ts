import { getCollection } from 'astro:content';
import { officialDomainFromUrl } from './urls';
import type { SearchableService } from './search';

const RELATED_FALLBACK_LIMIT = 4;

function relatedIdsFor(
  service: { data: { id: string; category: string; related?: string[] } },
  all: { data: { id: string; category: string } }[],
): string[] {
  if (service.data.related?.length) return service.data.related;
  return all
    .filter((s) => s.data.category === service.data.category && s.data.id !== service.data.id)
    .map((s) => s.data.id)
    .slice(0, RELATED_FALLBACK_LIMIT);
}

export async function buildSearchIndex(): Promise<{
  categories: {
    id: string;
    slug: string;
    name: string;
    nameBn: string;
    sortOrder: number;
    icon: string;
  }[];
  services: SearchableService[];
}> {
  const categories = (await getCollection('categories'))
    .map((c) => ({
      id: c.data.id,
      slug: c.data.slug,
      name: c.data.name,
      nameBn: c.data.name_bn,
      sortOrder: c.data.sort_order,
      icon: c.data.icon,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const catById = Object.fromEntries(categories.map((c) => [c.id, c]));
  const allServices = await getCollection('services');
  const byId = Object.fromEntries(allServices.map((s) => [s.data.id, s]));

  const services: SearchableService[] = allServices.map((s) => {
    const cat = catById[s.data.category];
    if (!cat) throw new Error(`Service ${s.data.id} references missing category ${s.data.category}`);

    const relatedTitles: string[] = [];
    for (const rid of relatedIdsFor(s, allServices)) {
      const rel = byId[rid];
      if (!rel) continue;
      relatedTitles.push(rel.data.title, rel.data.title_bn);
    }

    return {
      id: s.data.id,
      slug: s.data.slug,
      categoryId: s.data.category,
      title: s.data.title,
      titleBn: s.data.title_bn,
      description: s.data.description,
      descriptionBn: s.data.description_bn,
      searchBlob: [s.data.body, s.data.body_bn]
        .join('\n')
        .replace(/[#>*_`\[\]()!-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim(),
      tags: s.data.tags,
      aliases: (s.data.aliases ?? []).map((a) => a.name),
      relatedTitles,
      categoryName: cat.name,
      categoryNameBn: cat.nameBn,
      domain: s.data.official_domain ?? officialDomainFromUrl(s.data.url),
      status: s.data.status,
      directoryGlobalRank: s.data.directory_global_rank,
      directoryCategoryRank: s.data.directory_category_rank,
      ...(s.data.icon ? { icon: s.data.icon } : {}),
    };
  });

  services.sort((a, b) => {
    if (a.directoryGlobalRank !== b.directoryGlobalRank) {
      return a.directoryGlobalRank - b.directoryGlobalRank;
    }
    return a.title.localeCompare(b.title);
  });

  return { categories, services };
}
