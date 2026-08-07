import {
  DISCLAIMER_SHORT,
  SITE_BRAND_SERP,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_TAGLINE,
} from './site';

/** Default Open Graph / Twitter share image (1200×630). Overwrite file to refresh. */
export const DEFAULT_OG_IMAGE_PATH = '/brand/og-default.png';

/** Document Title: `বাংলা — English | CitizenSheba Bangladesh` */
export function documentTitle(bn: string, en: string, brand: string = SITE_BRAND_SERP): string {
  return `${bn.trim()} — ${en.trim()} | ${brand}`;
}

/** Meta Description: Bengali sentence(s) then English sentence(s). */
export function metaDescription(bn: string, en: string): string {
  return `${asSentence(bn.trim(), 'bn')} ${asSentence(en.trim(), 'en')}`;
}

function asSentence(text: string, lang: 'bn' | 'en'): string {
  if (!text) return text;
  if (/[.!?।]$/.test(text)) return text;
  return lang === 'bn' ? `${text}।` : `${text}.`;
}

/** Absolute asset URL under SITE_ORIGIN (trailingSlash-safe). */
export function absoluteUrl(path: string, origin: string = SITE_ORIGIN): string {
  if (/^https?:\/\//i.test(path)) return path;
  const base = origin.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

/**
 * Resolve og:image for a page.
 * Future: serviceOgImage ?? categoryOgImage ?? brand default.
 * P0: brand default only (`/brand/og-default.png`).
 */
export function resolveOgImage(opts?: {
  serviceOgImage?: string | null;
  categoryOgImage?: string | null;
}): string {
  const pick = opts?.serviceOgImage || opts?.categoryOgImage || DEFAULT_OG_IMAGE_PATH;
  return absoluteUrl(pick);
}

export type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_BRAND_SERP,
    url: `${SITE_ORIGIN}/`,
    logo: absoluteUrl('/brand/citizensheba-logo.png'),
    description: DISCLAIMER_SHORT,
  };
}

export function webSiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    name: SITE_BRAND_SERP,
    url: `${SITE_ORIGIN}/`,
    description: SITE_TAGLINE,
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    inLanguage: ['en', 'bn'],
  };
}

export type BreadcrumbCrumb = {
  name: string;
  /** Absolute or site path; omit on the current (last) crumb. */
  path?: string;
};

/** Visible trail: Home → … (matches Breadcrumb.astro). */
export function breadcrumbListJsonLd(crumbs: BreadcrumbCrumb[]): JsonLd {
  const items = [
    { name: 'Home', path: '/' },
    ...crumbs,
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => {
      const entry: Record<string, unknown> = {
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
      };
      if (c.path) {
        entry.item = absoluteUrl(c.path);
      }
      return entry;
    }),
  };
}

export function webPageJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  dateModified?: string;
}): JsonLd {
  const url = absoluteUrl(opts.path);
  const page: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name: opts.name,
    description: opts.description,
    url,
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    about: { '@id': `${SITE_ORIGIN}/#organization` },
    inLanguage: ['en', 'bn'],
  };
  if (opts.dateModified) {
    page.dateModified = opts.dateModified;
  }
  return page;
}

/** Sitewide publisher graphs for BaseLayout. */
export function sitewideJsonLd(): JsonLd[] {
  return [organizationJsonLd(), webSiteJsonLd()];
}
