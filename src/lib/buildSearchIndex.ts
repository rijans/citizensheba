import { getCollection } from 'astro:content';
import {
  toSearchableService,
  type CategoryProjectionInput,
  type ServiceProjectionInput,
} from './serviceProjection';
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

  const catById: Record<string, CategoryProjectionInput> = Object.fromEntries(
    categories.map((c) => [c.id, { id: c.id, name: c.name, name_bn: c.nameBn, icon: c.icon }]),
  );
  const allServices = await getCollection('services');
  const serviceData: ServiceProjectionInput[] = allServices.map((s) => s.data);
  const byId = Object.fromEntries(serviceData.map((s) => [s.id, s]));

  const services: SearchableService[] = serviceData.map((s) => {
    const cat = catById[s.category];
    if (!cat) throw new Error(`Service ${s.id} references missing category ${s.category}`);
    return toSearchableService(s, { category: cat, allServices: serviceData, byId });
  });

  services.sort((a, b) => {
    if (a.directoryGlobalRank !== b.directoryGlobalRank) {
      return a.directoryGlobalRank - b.directoryGlobalRank;
    }
    return a.title.localeCompare(b.title);
  });

  return { categories, services };
}
