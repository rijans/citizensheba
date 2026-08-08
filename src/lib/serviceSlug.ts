/** Elaborated Service Slug helpers (ADR-0014 / Trap #19). */

export const SOFT_SLUG_MAX_CHARS = 80;

/** Slugs that already carry readable English beyond a naked acronym — never auto-expand. */
const READABLE_SLUG_ALLOWLIST = new Set([
  'bd-beautiful-bangladesh',
  'bd-bangladesh-post',
  'bd-bangladesh-visa',
  'bd-bangladesh-museum',
  'bd-dhaka-wasa',
  'bd-chattogram-wasa',
  'bd-khulna-wasa',
  'bd-police-staff-college',
  'bd-xi-admission',
  'bd-dss-bhata',
  'bd-ansar-vdp-bank',
  'bd-basic-bank',
  'bd-titas-gas',
  'bd-padma-oil',
  'bd-jamuna-oil',
  'bd-parjatan-hotels',
  'bd-btb-registration',
  'bd-tourism-board',
  'bd-tourist-police',
  'bd-land-portal',
  'bd-national-portal',
  'bd-national-university',
  'bd-teachers-portal',
  'bd-online-gd',
  'bd-fire-service',
  'bd-election-commission',
  'bd-attorney-general',
  'bd-milk-vita',
]);

/** Token hints that mean the slug is already descriptive (substring match on slug body). */
const READABLE_HINTS = [
  'wasa',
  'admission',
  'post',
  'bank',
  'gas',
  'oil',
  'board',
  'museum',
  'portal',
  'police',
  'staff',
  'college',
  'bhata',
  'visa',
  'hotels',
  'registration',
  'beautiful',
  'national',
  'teachers',
  'online',
  'fire-service',
  'election',
  'attorney',
  'milk',
  'parjatan',
  'tourism',
  'tourist',
  'land-portal',
];

export function isOpaqueServiceSlug(slug: string): boolean {
  if (!slug.startsWith('bd-')) return false;
  if (READABLE_SLUG_ALLOWLIST.has(slug)) return false;
  const body = slug.slice(3);
  if (READABLE_HINTS.some((h) => body.includes(h))) return false;
  const parts = body.split('-').filter(Boolean);
  if (parts.length === 0) return false;
  // Already elaborated: token + ≥2 expansion parts with a longish word
  if (parts.length >= 3 && parts.slice(1).some((p) => p.length >= 5)) return false;
  // Opaque: 1–2 short tokens
  return parts.length <= 2 && parts.every((p) => p.length <= 8);
}

export function kebabizeExpansion(officialEnglish: string): string {
  let s = officialEnglish.trim();
  // Prefer parenthetical expansion when present: "RAB (Rapid Action Battalion)"
  const paren = s.match(/\(([^)]+)\)\s*$/);
  if (paren && paren[1].trim().split(/\s+/).length >= 2) {
    s = paren[1].trim();
  }
  s = s
    .normalize('NFKD')
    .replace(/[^\x00-\x7F]/g, '') // drop non-ASCII
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const parts = s.split('-').filter(Boolean);
  // Drop legal fluff tokens; keep "company" (spec examples include it for DPDC)
  const cleaned = parts.filter(
    (p) => p !== 'ltd' && p !== 'limited' && p !== 'plc' && p !== 'the' && p !== 'co',
  );
  return cleaned.join('-');
}

export function buildElaboratedServiceSlug(input: {
  currentSlug: string;
  officialEnglish: string;
}): string {
  const body = input.currentSlug.startsWith('bd-') ? input.currentSlug.slice(3) : input.currentSlug;
  const token = body.split('-')[0] ?? body;
  let expansion = kebabizeExpansion(input.officialEnglish);

  // Strip leading token echo: "du-university-of-dhaka" or "rab-rapid-…"
  while (expansion === token || expansion.startsWith(`${token}-`)) {
    expansion = expansion.slice(token.length).replace(/^-+/, '');
  }

  let slug = `bd-${token}-${expansion}`.replace(/-+/g, '-').replace(/-$/, '');

  if (slug.length <= SOFT_SLUG_MAX_CHARS) return slug;

  // Trim trailing tokens until under soft max (keep at least token + one expansion word)
  const bits = slug.split('-');
  while (bits.length > 3 && bits.join('-').length > SOFT_SLUG_MAX_CHARS) {
    bits.pop();
  }
  return bits.join('-');
}

export function pickOfficialEnglish(fields: {
  serp_title?: string;
  title: string;
  aliases?: Array<{ name?: string; lang?: string; kind?: string }>;
}): string {
  const serp = (fields.serp_title || '').trim();
  if (serp) return serp;
  const enAlias = (fields.aliases || []).find((a) => a.lang === 'en' && a.name?.trim());
  if (enAlias?.name) return enAlias.name.trim();
  return fields.title.trim();
}
