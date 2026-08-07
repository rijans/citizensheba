import { describe, expect, it } from 'vitest';
import { buildPageWindow } from '../../src/lib/paginationWindow';

describe('buildPageWindow', () => {
  it('returns empty for zero pages', () => {
    expect(buildPageWindow(1, 0)).toEqual([]);
  });

  it('shows every page when pageCount is small', () => {
    expect(buildPageWindow(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('windows long lists around page 1', () => {
    expect(buildPageWindow(1, 14)).toEqual([1, 2, 'ellipsis', 14]);
  });

  it('windows long lists around the middle', () => {
    expect(buildPageWindow(7, 14)).toEqual([1, 'ellipsis', 6, 7, 8, 'ellipsis', 14]);
  });

  it('windows long lists around the last page', () => {
    expect(buildPageWindow(14, 14)).toEqual([1, 'ellipsis', 13, 14]);
  });

  it('clamps current page into range', () => {
    expect(buildPageWindow(99, 10)).toEqual([1, 'ellipsis', 9, 10]);
  });
});
