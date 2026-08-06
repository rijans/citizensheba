import { describe, expect, it } from 'vitest';
import { categoryAccent, CATEGORY_ACCENTS } from '../../src/lib/categoryVisuals';

describe('categoryAccent', () => {
  it('returns mapped accent for known categories', () => {
    expect(categoryAccent('identity').accent).toBe(CATEGORY_ACCENTS.identity.accent);
  });

  it('falls back for unknown ids', () => {
    expect(categoryAccent('nope').accent).toBe('#006a4e');
  });
});
