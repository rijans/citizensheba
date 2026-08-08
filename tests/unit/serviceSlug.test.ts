import { describe, expect, it } from 'vitest';
import {
  isOpaqueServiceSlug,
  kebabizeExpansion,
  buildElaboratedServiceSlug,
  SOFT_SLUG_MAX_CHARS,
} from '../../src/lib/serviceSlug';

describe('isOpaqueServiceSlug', () => {
  it('flags bare acronym slugs', () => {
    expect(isOpaqueServiceSlug('bd-rab')).toBe(true);
    expect(isOpaqueServiceSlug('bd-dpdc')).toBe(true);
    expect(isOpaqueServiceSlug('bd-du')).toBe(true);
    expect(isOpaqueServiceSlug('bd-a2i')).toBe(true);
  });

  it('skips already human-readable English slugs', () => {
    expect(isOpaqueServiceSlug('bd-beautiful-bangladesh')).toBe(false);
    expect(isOpaqueServiceSlug('bd-dhaka-wasa')).toBe(false);
    expect(isOpaqueServiceSlug('bd-police-staff-college')).toBe(false);
    expect(isOpaqueServiceSlug('bd-chattogram-wasa')).toBe(false);
    expect(isOpaqueServiceSlug('bd-xi-admission')).toBe(false);
    expect(isOpaqueServiceSlug('bd-bangladesh-post')).toBe(false);
  });
});

describe('kebabizeExpansion', () => {
  it('lowercases and hyphenates official English names', () => {
    expect(kebabizeExpansion('Rapid Action Battalion')).toBe('rapid-action-battalion');
    expect(kebabizeExpansion('Dhaka Power Distribution Company Ltd.')).toBe(
      'dhaka-power-distribution-company',
    );
  });

  it('strips parenthetical acronym echoes', () => {
    expect(kebabizeExpansion('RAB (Rapid Action Battalion)')).toBe('rapid-action-battalion');
    expect(kebabizeExpansion('DPDC (Dhaka Power Distribution Company)')).toBe(
      'dhaka-power-distribution-company',
    );
  });
});

describe('buildElaboratedServiceSlug', () => {
  it('builds bd-{token}-{expansion} for RAB / DPDC / DU', () => {
    expect(
      buildElaboratedServiceSlug({
        currentSlug: 'bd-rab',
        officialEnglish: 'Rapid Action Battalion',
      }),
    ).toBe('bd-rab-rapid-action-battalion');

    expect(
      buildElaboratedServiceSlug({
        currentSlug: 'bd-dpdc',
        officialEnglish: 'Dhaka Power Distribution Company',
      }),
    ).toBe('bd-dpdc-dhaka-power-distribution-company');

    expect(
      buildElaboratedServiceSlug({
        currentSlug: 'bd-du',
        officialEnglish: 'University of Dhaka',
      }),
    ).toBe('bd-du-university-of-dhaka');
  });

  it('does not duplicate token when expansion already starts with it', () => {
    expect(
      buildElaboratedServiceSlug({
        currentSlug: 'bd-du',
        officialEnglish: 'DU University of Dhaka',
      }),
    ).toBe('bd-du-university-of-dhaka');
  });

  it('respects soft max length by trimming trailing tokens', () => {
    const long = buildElaboratedServiceSlug({
      currentSlug: 'bd-xyz',
      officialEnglish:
        'Extraordinarily Long Official English Institutional Name Of Bangladesh Authority Board',
    });
    expect(long.startsWith('bd-xyz-')).toBe(true);
    expect(long.length).toBeLessThanOrEqual(SOFT_SLUG_MAX_CHARS);
  });
});
