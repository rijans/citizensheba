import { describe, expect, it } from 'vitest';
import { categoryPath, servicePath, assertServiceSlug } from '../../src/lib/urls';

describe('urls', () => {
  it('builds service paths with bd- slug', () => {
    expect(servicePath('bd-nid')).toBe('/services/bd-nid/');
  });

  it('builds category paths', () => {
    expect(categoryPath('identity-registration')).toBe('/categories/identity-registration/');
  });

  it('rejects service slugs without bd- prefix', () => {
    expect(() => assertServiceSlug('nid')).toThrow(/bd-/);
  });
});
