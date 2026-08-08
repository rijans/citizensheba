import { describe, expect, it } from 'vitest';
import {
  filterAndSort,
  normalizeSearchText,
  paginateDirectory,
  scoreService,
  type SearchableService,
} from '../../src/lib/search';

const base = {
  categoryName: 'Identity & Registration',
  categoryNameBn: 'পরিচয় ও নিবন্ধন',
  domain: 'example.gov.bd',
  status: 'ACTIVE' as const,
  descriptionBn: '',
  searchBlob: '',
  relatedTitles: [] as string[],
  directoryGlobalRank: 500,
  directoryCategoryRank: 100,
};

const nid: SearchableService = {
  ...base,
  id: 'nid',
  slug: 'bd-nid',
  categoryId: 'identity',
  title: 'NID Services',
  titleBn: 'জাতীয় পরিচয়পত্র',
  description: 'New voter registration and NID corrections.',
  descriptionBn: 'নতুন ভোটার নিবন্ধন এবং এনআইডি সংশোধন',
  tags: ['nid', 'voter', 'identity', 'পরিচয়পত্র'],
  aliases: ['national identity card', 'এনআইডি'],
  domain: 'services.nidw.gov.bd',
  directoryGlobalRank: 10,
  directoryCategoryRank: 10,
};

const passport: SearchableService = {
  ...base,
  id: 'passport',
  slug: 'bd-passport',
  categoryId: 'travel',
  title: 'e-Passport Portal',
  titleBn: 'ই-পাসপোর্ট',
  description: 'Apply for passport.',
  descriptionBn: 'পাসপোর্ট আবেদন',
  tags: ['passport', 'travel'],
  aliases: ['Machine Readable Passport', 'MRP'],
  relatedTitles: ['NID Services', 'জাতীয় পরিচয়পত্র'],
  categoryName: 'Travel',
  categoryNameBn: 'ভ্রমণ',
  domain: 'epassport.gov.bd',
  directoryGlobalRank: 20,
  directoryCategoryRank: 10,
};

const brta: SearchableService = {
  ...base,
  id: 'brta',
  slug: 'bd-brta',
  categoryId: 'transport',
  title: 'BRTA Service Portal (BSP)',
  titleBn: 'বিআরটিএ সেবা',
  description: 'Driving licences and vehicles.',
  descriptionBn: 'ড্রাইভিং লাইসেন্স',
  tags: ['driving licence', 'vehicle'],
  aliases: [],
  categoryName: 'Transport',
  categoryNameBn: 'পরিবহন',
  domain: 'bsp.brta.gov.bd',
  directoryGlobalRank: 130,
  directoryCategoryRank: 20,
};

describe('normalizeSearchText', () => {
  it('folds hyphens and punctuation', () => {
    expect(normalizeSearchText('e-Passport')).toBe('epassport');
    expect(normalizeSearchText('N.I.D.')).toBe('nid');
  });

  it('keeps Bengali letters with matras intact', () => {
    expect(normalizeSearchText('সেবা')).toBe('সেবা');
  });

  it('folds ZWJ so র‍্যাব and র্যাব match', () => {
    expect(normalizeSearchText('র‍্যাব')).toBe(normalizeSearchText('র্যাব'));
  });
});

describe('scoreService', () => {
  it('returns 0 for empty query', () => {
    expect(scoreService(nid, '')).toBe(0);
  });

  it('ranks exact title prefix highly', () => {
    expect(scoreService(nid, 'nid')).toBeGreaterThan(80);
  });

  it('ranks Bengali title like English title', () => {
    expect(scoreService(nid, 'জাতীয়')).toBeGreaterThan(80);
  });

  it('matches description_bn', () => {
    expect(scoreService(nid, 'ভোটার')).toBeGreaterThan(0);
  });

  it('matches Name Alias strings', () => {
    expect(scoreService(passport, 'Machine Readable Passport')).toBeGreaterThan(0);
    expect(scoreService(passport, 'MRP')).toBeGreaterThan(60);
  });

  it('matches Search Variants (licence ↔ license)', () => {
    expect(scoreService(brta, 'license')).toBeGreaterThan(0);
  });

  it('matches related titles at a lower band than own title', () => {
    const relatedHit = scoreService(passport, 'জাতীয় পরিচয়পত্র');
    const ownTitle = scoreService(nid, 'জাতীয় পরিচয়পত্র');
    expect(relatedHit).toBeGreaterThan(0);
    expect(ownTitle).toBeGreaterThan(relatedHit);
  });

  it('returns -1 when a token matches nothing', () => {
    expect(scoreService(nid, 'passport xyzzy')).toBe(-1);
  });
});

describe('filterAndSort', () => {
  it('filters by categoryId', () => {
    const result = filterAndSort([nid, passport], '', 'identity');
    expect(result).toEqual([nid]);
  });

  it('sorts by score when query is non-empty', () => {
    const result = filterAndSort([passport, nid], 'nid', null);
    expect(result[0]?.id).toBe('nid');
  });

  it('sorts by directoryGlobalRank when All + empty query', () => {
    const low: SearchableService = { ...brta, id: 'z-low', title: 'Zebra', directoryGlobalRank: 5 };
    const result = filterAndSort([passport, low, nid], '', null);
    expect(result.map((s) => s.id)).toEqual(['z-low', 'nid', 'passport']);
  });

  it('sorts by directoryCategoryRank when category chip + empty query', () => {
    const late: SearchableService = {
      ...nid,
      id: 'late-nid',
      title: 'AAA Late',
      directoryCategoryRank: 99,
    };
    const result = filterAndSort([late, nid], '', 'identity');
    expect(result.map((s) => s.id)).toEqual(['nid', 'late-nid']);
  });
});

describe('paginateDirectory', () => {
  const items = Array.from({ length: 82 }, (_, i) => i + 1);

  it('shows all without pager when total ≤ soft max (21)', () => {
    const slice = paginateDirectory(items.slice(0, 21), 1);
    expect(slice.showPager).toBe(false);
    expect(slice.showLoadMore).toBe(false);
    expect(slice.items).toHaveLength(21);
  });

  it('pages by 20 when total ≥ 22 (replace)', () => {
    const slice = paginateDirectory(items, 1, { mode: 'replace' });
    expect(slice.showPager).toBe(true);
    expect(slice.items).toEqual(items.slice(0, 20));
    expect(slice.pageCount).toBe(5);
    expect(slice.showing).toBe(20);
    expect(slice.remaining).toBe(62);
    expect(paginateDirectory(items, 2, { mode: 'replace' }).items).toEqual(items.slice(20, 40));
  });

  it('append stacks pages 1..page and exposes firstNewIndex', () => {
    const page2 = paginateDirectory(items, 2, { mode: 'append' });
    expect(page2.items).toEqual(items.slice(0, 40));
    expect(page2.showing).toBe(40);
    expect(page2.remaining).toBe(42);
    expect(page2.page).toBe(2);
    expect(page2.firstNewIndex).toBe(20);
    expect(page2.showLoadMore).toBe(true);
  });

  it('hides Load more on the last page window', () => {
    const last = paginateDirectory(items, 5, { mode: 'append' });
    expect(last.showing).toBe(82);
    expect(last.remaining).toBe(0);
    expect(last.showLoadMore).toBe(false);
  });
});
