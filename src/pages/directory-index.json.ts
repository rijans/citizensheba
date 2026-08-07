import type { APIRoute } from 'astro';
import { buildSearchIndex } from '../lib/buildSearchIndex';

export const prerender = true;

/** Compressed JSON for Instant Directory — keeps Home HTML off the LCP critical path. */
export const GET: APIRoute = async () => {
  const index = await buildSearchIndex();
  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
