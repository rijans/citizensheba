import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { categoryPath, servicePath } from '../lib/urls';
import { DISCLAIMER_SHORT } from '../lib/site';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const categories = await getCollection('categories');
  const services = await getCollection('services');

  const lines: string[] = [
    '# Sheba',
    '',
    `> ${DISCLAIMER_SHORT}`,
    '',
    '## Categories',
    '',
  ];

  const sortedCategories = [...categories].sort((a, b) => a.data.sort_order - b.data.sort_order);
  for (const cat of sortedCategories) {
    const url = new URL(categoryPath(cat.data.slug), site).href;
    lines.push(`- [${cat.data.name}](${url}): ${cat.data.description}`);
  }

  lines.push('', '## Services', '');

  const sortedServices = [...services].sort((a, b) => a.data.title.localeCompare(b.data.title));
  for (const svc of sortedServices) {
    const pageUrl = new URL(servicePath(svc.data.slug), site).href;
    lines.push(`- [${svc.data.title}](${pageUrl}): ${svc.data.description} — Official: ${svc.data.url}`);
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
