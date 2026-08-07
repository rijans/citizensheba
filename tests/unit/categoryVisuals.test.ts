import { describe, expect, it } from 'vitest';
import { accentStyleAttr, categoryAccent, CATEGORY_ACCENTS } from '../../src/lib/categoryVisuals';

describe('categoryAccent', () => {
  it('returns mapped accent for known categories', () => {
    expect(categoryAccent('identity').accent).toBe(CATEGORY_ACCENTS.identity.accent);
  });

  it('falls back for unknown ids', () => {
    expect(categoryAccent('nope').accent).toBe('#006a4e');
  });
});

describe('accentStyleAttr', () => {
  it('joins CSS variables for Astro inline style', () => {
    const attr = accentStyleAttr('identity');
    expect(attr).toContain('--cat-accent:');
    expect(attr).toContain('--cat-accent-soft:');
    expect(attr).toContain(CATEGORY_ACCENTS.identity.accent);
  });
});
