/**
 * Instant Directory client-side search (ADR-0007).
 * Global Search Variants only — Service-specific terms live in aliases.
 */

export type SearchableService = {
  id: string;
  slug: string;
  categoryId: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  /**
   * Extra searchable plain text (from body Markdown, etc.).
   * Prefer this over shipping full Markdown bodies into the Instant Directory island.
   */
  searchBlob: string;
  tags: string[];
  /** Name Alias strings for search (all kinds). */
  aliases: string[];
  /** Related Services’ title / titleBn (weak matches). */
  relatedTitles: string[];
  categoryName: string;
  categoryNameBn: string;
  domain: string;
  status: 'ACTIVE' | 'MAINTENANCE' | 'DEPRECATED';
  /** Home All empty-query order — lower = higher (ADR-0010). */
  directoryGlobalRank: number;
  /** Category / chip empty-query order — lower = higher (ADR-0010). */
  directoryCategoryRank: number;
};

/** Cards per page when paginating. */
export const DIRECTORY_PAGE_SIZE = 20;
/** Show all without a pager when result count is at most this (avoids a lonely 1-card page). */
export const DIRECTORY_SOFT_MAX = 21;

export type DirectoryBrowseMode = 'replace' | 'append';

export type DirectoryPageSlice<T> = {
  items: T[];
  page: number;
  pageCount: number;
  total: number;
  showing: number;
  remaining: number;
  showPager: boolean;
  showLoadMore: boolean;
  /** Index of first newly revealed card when appending (for focus); null on replace/page 1. */
  firstNewIndex: number | null;
};

export type PaginateDirectoryOptions = {
  pageSize?: number;
  softMax?: number;
  /** `append` = show pages 1..page stacked; `replace` = show only the current page. */
  mode?: DirectoryBrowseMode;
};

/** Clamp page and slice results. Soft-show-all when total ≤ DIRECTORY_SOFT_MAX. */
export function paginateDirectory<T>(
  items: T[],
  page: number,
  options: PaginateDirectoryOptions = {},
): DirectoryPageSlice<T> {
  const pageSize = options.pageSize ?? DIRECTORY_PAGE_SIZE;
  const softMax = options.softMax ?? DIRECTORY_SOFT_MAX;
  const mode = options.mode ?? 'replace';
  const total = items.length;

  if (total <= softMax) {
    return {
      items,
      page: 1,
      pageCount: 1,
      total,
      showing: total,
      remaining: 0,
      showPager: false,
      showLoadMore: false,
      firstNewIndex: null,
    };
  }

  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), pageCount);

  let sliceItems: T[];
  let firstNewIndex: number | null = null;

  if (mode === 'append') {
    const end = Math.min(total, safePage * pageSize);
    sliceItems = items.slice(0, end);
    if (safePage > 1) {
      firstNewIndex = (safePage - 1) * pageSize;
    }
  } else {
    const start = (safePage - 1) * pageSize;
    sliceItems = items.slice(start, start + pageSize);
  }

  const showing = sliceItems.length;
  const windowEnd = Math.min(total, safePage * pageSize);
  const remaining = Math.max(0, total - windowEnd);

  return {
    items: sliceItems,
    page: safePage,
    pageCount,
    total,
    showing,
    remaining,
    showPager: true,
    showLoadMore: remaining > 0,
    firstNewIndex,
  };
}

function compareBrowse(a: SearchableService, b: SearchableService, categoryId: string | null): number {
  const rankA = categoryId ? a.directoryCategoryRank : a.directoryGlobalRank;
  const rankB = categoryId ? b.directoryCategoryRank : b.directoryGlobalRank;
  if (rankA !== rankB) return rankA - rankB;
  return a.title.localeCompare(b.title);
}

/** Service-agnostic spelling twins (normalized forms). */
export const SEARCH_VARIANT_GROUPS: readonly (readonly string[])[] = [
  ['license', 'licence'],
  ['licenses', 'licences'],
  ['epassport', 'epassportportal'],
  ['etin', 'etinregistration'],
  ['nid', 'nationalid'],
];

export function normalizeSearchText(s: string): string {
  return (s || '')
    .toString()
    .toLowerCase()
    .normalize('NFC')
    .replace(/[-.']/g, '')
    // Keep letters + combining marks (Bangla matras) + digits; drop other punct.
    .replace(/[^\p{L}\p{M}\p{N}\s]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function expandToken(token: string): string[] {
  const out = new Set<string>([token]);
  for (const group of SEARCH_VARIANT_GROUPS) {
    if (group.includes(token)) {
      for (const g of group) out.add(g);
    }
  }
  return [...out];
}

function subseq(q: string, s: string): boolean {
  let i = 0;
  for (let j = 0; j < s.length && i < q.length; j++) if (s[j] === q[i]) i++;
  return i === q.length;
}

function fieldStartsWith(field: string, tokens: string[]): boolean {
  return tokens.some((t) => field.startsWith(t));
}

function fieldWordStartsWith(field: string, tokens: string[]): boolean {
  const words = field.split(/\s+/);
  return tokens.some((t) => words.some((w) => w.startsWith(t)));
}

function fieldIncludes(field: string, tokens: string[]): boolean {
  return tokens.some((t) => field.includes(t));
}

function listStartsWith(list: string[], tokens: string[]): boolean {
  return list.some((g) => tokens.some((t) => g.startsWith(t)));
}

function listIncludes(list: string[], tokens: string[]): boolean {
  return list.some((g) => tokens.some((t) => g.includes(t)));
}

export function scoreService(sv: SearchableService, rawQuery: string): number {
  const q = normalizeSearchText(rawQuery);
  if (!q) return 0;

  const title = normalizeSearchText(sv.title);
  const titleBn = normalizeSearchText(sv.titleBn);
  const desc = normalizeSearchText(sv.description);
  const descBn = normalizeSearchText(sv.descriptionBn ?? '');
  const blob = normalizeSearchText(sv.searchBlob ?? '');
  const tags = (sv.tags ?? []).map(normalizeSearchText);
  const aliases = (sv.aliases ?? []).map(normalizeSearchText);
  const related = (sv.relatedTitles ?? []).map(normalizeSearchText);
  const catName = normalizeSearchText(sv.categoryName);
  const catNameBn = normalizeSearchText(sv.categoryNameBn);
  const dom = normalizeSearchText(sv.domain);
  const hay = [
    title,
    titleBn,
    desc,
    descBn,
    blob,
    catName,
    catNameBn,
    tags.join(' '),
    aliases.join(' '),
    related.join(' '),
    dom,
  ].join(' | ');

  let total = 0;
  for (const rawTok of q.split(/\s+/).filter(Boolean)) {
    const tokens = expandToken(rawTok);
    let best = -1;

    if (fieldStartsWith(title, tokens) || fieldStartsWith(titleBn, tokens)) best = 100;
    else if (fieldWordStartsWith(title, tokens) || fieldWordStartsWith(titleBn, tokens)) best = 90;
    else if (fieldIncludes(title, tokens) || fieldIncludes(titleBn, tokens)) best = 82;
    else if (listStartsWith(tags, tokens) || listStartsWith(aliases, tokens)) best = 76;
    else if (listIncludes(tags, tokens) || listIncludes(aliases, tokens)) best = 66;
    else if (fieldIncludes(catName, tokens) || fieldIncludes(catNameBn, tokens)) best = 56;
    else if (fieldIncludes(desc, tokens) || fieldIncludes(descBn, tokens)) best = 50;
    else if (fieldIncludes(blob, tokens)) best = 48;
    else if (fieldIncludes(dom, tokens)) best = 46;
    else if (listStartsWith(related, tokens)) best = 42;
    else if (listIncludes(related, tokens)) best = 36;
    else if (
      rawTok.length >= 3 &&
      (subseq(rawTok, title.replace(/\s+/g, '')) || subseq(rawTok, titleBn.replace(/\s+/g, '')))
    )
      best = 28;
    else if (rawTok.length >= 4 && tokens.some((t) => t.length >= 4 && subseq(t, hay))) best = 12;

    if (best < 0) return -1;
    total += best;
  }
  return total;
}

export function filterAndSort(
  services: SearchableService[],
  query: string,
  categoryId: string | null,
): SearchableService[] {
  const scored = services
    .filter((s) => (categoryId ? s.categoryId === categoryId : true))
    .map((s) => ({ s, score: scoreService(s, query) }))
    .filter((x) => x.score >= 0);

  if (!normalizeSearchText(query)) {
    return scored.map((x) => x.s).sort((a, b) => compareBrowse(a, b, categoryId));
  }
  return scored.sort((a, b) => b.score - a.score).map((x) => x.s);
}
