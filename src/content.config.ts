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

const faqItem = z.object({
  q: z.string().min(1),
  a: z.string().min(1),
  q_bn: z.string().min(1),
  a_bn: z.string().min(1),
});

const nameAlias = z.object({
  name: z.string().min(1),
  lang: z.enum(['en', 'bn']),
  kind: z.enum(['former', 'informal', 'alt']),
});

const service = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.md' }),
  schema: z.object({
    id: z.string(),
    slug: z.string().regex(/^bd-[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string(),
    title_bn: z.string(),
    /**
     * Optional SERP-only expansions when Display Names are too short/opaque for search
     * (e.g. A2I → A2I (Aspire to Innovate)). H1 / cards still use title / title_bn.
     */
    serp_title: z.string().min(1).optional(),
    serp_title_bn: z.string().min(1).optional(),
    description: z.string(),
    description_bn: z.string(),
    /** Longer hop-page Markdown (EN). Required — cards/meta still use short description. */
    body: z.string().min(40),
    /** Longer hop-page Markdown (BN). */
    body_bn: z.string().min(40),
    url: z.string().url(),
    official_domain: z.string().optional(),
    category: z.string(),
    /** Home All browse order — lower = higher (ADR-0010). */
    directory_global_rank: z.number().int(),
    /** Category Page / chip browse order — lower = higher (ADR-0010). */
    directory_category_rank: z.number().int(),
    tags: z.array(z.string()),
    /** Required: at least two Name Aliases covering EN and BN (enforced in integrity tests too). */
    aliases: z.array(nameAlias).min(2),
    status: z.enum(['ACTIVE', 'MAINTENANCE', 'DEPRECATED']),
    audience: z.string().min(1),
    audience_bn: z.string().min(1),
    faq: z.array(faqItem).min(1).max(5),
    related: z.array(z.string()).optional(),
    last_verified: z.coerce.date(),
    logo: z.string().optional(),
  }),
});

export const collections = { categories: category, services: service };
