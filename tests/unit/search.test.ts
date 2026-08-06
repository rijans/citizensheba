import { describe, expect, it } from 'vitest';
import { filterAndSort, scoreService, type SearchableService } from '../../src/lib/search';

const nid: SearchableService = {
  id: 'nid',
  slug: 'bd-nid',
  categoryId: 'identity',
  title: 'NID Services',
  titleBn: 'জাতীয় পরিচয়পত্র',
  description: 'New voter registration and NID corrections.',
  tags: ['nid', 'voter', 'identity', 'পরিচয়পত্র'],
  aliases: [],
  categoryName: 'Identity & Registration',
  categoryNameBn: 'পরিচয় ও নিবন্ধন',
  domain: 'services.nidw.gov.bd',
  status: 'ACTIVE',
};

const passport: SearchableService = {
  id: 'passport',
  slug: 'bd-passport',
  categoryId: 'travel',
  title: 'Passport Services',
  titleBn: 'পাসপোর্ট',
  description: 'Apply for passport.',
  tags: ['passport', 'travel'],
  aliases: ['Machine Readable Passport', 'MRP'],
  categoryName: 'Travel',
  categoryNameBn: 'ভ্রমণ',
  domain: 'passport.gov.bd',
  status: 'ACTIVE',
};

describe('scoreService', () => {
  it('returns 0 for empty query', () => {
    expect(scoreService(nid, '')).toBe(0);
  });

  it('ranks exact title prefix highly', () => {
    expect(scoreService(nid, 'nid')).toBeGreaterThan(80);
  });

  it('matches Bengali tags', () => {
    expect(scoreService(nid, 'পরিচয়পত্র')).toBeGreaterThan(0);
  });

  it('matches Name Alias strings in the tags score band', () => {
    expect(scoreService(passport, 'Machine Readable Passport')).toBeGreaterThan(0);
    expect(scoreService(passport, 'MRP')).toBeGreaterThan(60);
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
