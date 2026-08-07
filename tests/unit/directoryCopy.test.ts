import { describe, expect, it } from 'vitest';
import { formatDirectoryCount } from '../../src/lib/directoryCopy';

describe('formatDirectoryCount', () => {
  it('uses plain plural when unfiltered', () => {
    expect(formatDirectoryCount({ total: 26 })).toBe('26 services');
    expect(formatDirectoryCount({ total: 1 })).toBe('1 service');
  });

  it('names the category instead of saying filtered', () => {
    expect(formatDirectoryCount({ total: 26, categoryName: 'Safety & Security' })).toBe(
      '26 services in Safety & Security',
    );
  });

  it('names the search query', () => {
    expect(formatDirectoryCount({ total: 3, query: 'nid' })).toBe('3 services matching “nid”');
  });

  it('combines category and query', () => {
    expect(
      formatDirectoryCount({ total: 2, categoryName: 'Tax & Finance', query: ' vat ' }),
    ).toBe('2 services in Tax & Finance matching “vat”');
  });

  it('keeps pager suffix', () => {
    expect(
      formatDirectoryCount({
        total: 26,
        categoryName: 'Safety & Security',
        showPager: true,
        showing: 20,
        page: 1,
        pageCount: 2,
      }),
    ).toBe('26 services in Safety & Security · Showing 20 · Page 1 of 2');
  });
});
