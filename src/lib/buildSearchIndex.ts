import { getCollection } from 'astro:content';
import { officialDomainFromUrl } from './urls';
import type { SearchableService } from './search';

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

  const services: SearchableService[] = (await getCollection('services')).map((s) => {
    const cat = catById[s.data.category];
    if (!cat) throw new Error(`Service ${s.data.id} references missing category ${s.data.category}`);
    return {
      id: s.data.id,
      slug: s.data.slug,
      categoryId: s.data.category,
      title: s.data.title,
      titleBn: s.data.title_bn,
      description: s.data.description,
      tags: s.data.tags,
      aliases: (s.data.aliases ?? []).map((a) => a.name),
      categoryName: cat.name,
      categoryNameBn: cat.nameBn,
      domain: s.data.official_domain ?? officialDomainFromUrl(s.data.url),
      status: s.data.status,
    };
  });

  return { categories, services };
}
