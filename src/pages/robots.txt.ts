import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site).href;

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Content Signals',
    'search: yes',
    'ai-input: yes',
    'ai-train: no',
    '',
    'User-agent: GPTBot',
    'Allow: /',
    '',
    'User-agent: Google-Extended',
    'Disallow: /',
    '',
    `Sitemap: ${sitemapUrl}`,
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
