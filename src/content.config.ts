import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const category = defineCollection({
  loader: glob({ base: './src/content/categories', pattern: '**/*.{yaml,yml}' }),
  schema: z.object({
    id: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    name: z.string(),
    name_bn: z.string(),
    description: z.string(),
    description_bn: z.string(),
    icon: z.string(),
    sort_order: z.number().int(),
  }),
});

const faqItem = z.object({ q: z.string(), a: z.string() });

const nameAlias = z.object({
  name: z.string().min(1),
  lang: z.enum(['en', 'bn']).optional(),
  kind: z.enum(['former', 'informal', 'alt']).optional(),
});

const service = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.md' }),
  schema: z.object({
    id: z.string(),
    slug: z.string().regex(/^bd-[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string(),
    title_bn: z.string(),
    description: z.string(),
    description_bn: z.string(),
    url: z.string().url(),
    official_domain: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()),
    aliases: z.array(nameAlias).optional(),
    status: z.enum(['ACTIVE', 'MAINTENANCE', 'DEPRECATED']),
    audience: z.string(),
    faq: z.array(faqItem).min(3).max(5),
    related: z.array(z.string()).optional(),
    last_verified: z.coerce.date(),
    logo: z.string().optional(),
  }),
});

export const collections = { categories: category, services: service };
