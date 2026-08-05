const SERVICE_SLUG = /^bd-[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function servicePath(slug: string): string {
  assertServiceSlug(slug);
  return `/services/${slug}`;
}

export function categoryPath(slug: string): string {
  return `/categories/${slug}`;
}

export function assertServiceSlug(slug: string): void {
  if (!SERVICE_SLUG.test(slug)) {
    throw new Error(`Service slug must match ${SERVICE_SLUG}: got "${slug}"`);
  }
}

export function officialDomainFromUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0] ?? url;
}
