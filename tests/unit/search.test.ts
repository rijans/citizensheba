import { describe, expect, it } from 'vitest';
import {
  filterAndSort,
  normalizeSearchText,
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
};

describe('normalizeSearchText', () => {
  it('folds hyphens and punctuation', () => {
    expect(normalizeSearchText('e-Passport')).toBe('epassport');
    expect(normalizeSearchText('N.I.D.')).toBe('nid');
  });

  it('keeps Bengali letters with matras intact', () => {
    expect(normalizeSearchText('সেবা')).toBe('সেবা');
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
});
