import { describe, expect, it } from 'vitest';
import {
  RELATED_FALLBACK_LIMIT,
  officialDomain,
  relatedIdsFor,
  toDirectoryCard,
  toSearchableService,
  type CategoryProjectionInput,
  type ServiceProjectionInput,
} from '../../src/lib/serviceProjection';

const catIdentity: CategoryProjectionInput = {
  id: 'identity',
  name: 'Identity',
  name_bn: 'পরিচয়',
  icon: 'Fingerprint',
};

function svc(
  overrides: Partial<ServiceProjectionInput> & Pick<ServiceProjectionInput, 'id' | 'slug' | 'title'>,
): ServiceProjectionInput {
  return {
    title_bn: overrides.title_bn ?? 'টাইটেল',
    description: overrides.description ?? 'Short EN',
    description_bn: overrides.description_bn ?? 'সংক্ষিপ্ত',
    body: overrides.body ?? 'Body markdown long enough for hop. '.repeat(3),
    body_bn: overrides.body_bn ?? 'বডি '.repeat(20),
    url: overrides.url ?? 'https://www.example.gov.bd/path',
    official_domain: overrides.official_domain,
    category: overrides.category ?? 'identity',
    directory_global_rank: overrides.directory_global_rank ?? 10,
    directory_category_rank: overrides.directory_category_rank ?? 2,
    icon: overrides.icon,
    tags: overrides.tags ?? ['tag'],
    aliases: overrides.aliases ?? [{ name: 'alias-en' }, { name: 'এলিয়াস' }],
    status: overrides.status ?? 'ACTIVE',
    related: overrides.related,
    id: overrides.id,
    slug: overrides.slug,
    title: overrides.title,
  };
}

describe('relatedIdsFor', () => {
  const peers = [
    svc({ id: 'a', slug: 'bd-a', title: 'A' }),
    svc({ id: 'b', slug: 'bd-b', title: 'B' }),
    svc({ id: 'c', slug: 'bd-c', title: 'C' }),
    svc({ id: 'd', slug: 'bd-d', title: 'D' }),
    svc({ id: 'e', slug: 'bd-e', title: 'E' }),
    svc({ id: 'other', slug: 'bd-other', title: 'Other', category: 'tax' }),
  ];

  it('uses explicit related when present', () => {
    const self = svc({ id: 'a', slug: 'bd-a', title: 'A', related: ['c', 'other'] });
    expect(relatedIdsFor(self, peers)).toEqual(['c', 'other']);
  });

  it('falls back to category peers excluding self, capped', () => {
    const self = svc({ id: 'a', slug: 'bd-a', title: 'A' });
    const ids = relatedIdsFor(self, peers);
    expect(ids).toHaveLength(RELATED_FALLBACK_LIMIT);
    expect(ids).toEqual(['b', 'c', 'd', 'e']);
    expect(ids).not.toContain('a');
    expect(ids).not.toContain('other');
  });
});

describe('officialDomain', () => {
  it('prefers official_domain', () => {
    expect(
      officialDomain(svc({ id: 'x', slug: 'bd-x', title: 'X', official_domain: 'custom.bd' })),
    ).toBe('custom.bd');
  });

  it('strips protocol and www from url', () => {
    expect(officialDomain(svc({ id: 'x', slug: 'bd-x', title: 'X' }))).toBe('example.gov.bd');
  });
});

describe('toDirectoryCard', () => {
  it('resolves domain, icon fallback, and category fields', () => {
    const card = toDirectoryCard(
      svc({ id: 'nid', slug: 'bd-nid', title: 'NID', directory_category_rank: 1 }),
      catIdentity,
    );
    expect(card).toMatchObject({
      id: 'nid',
      slug: 'bd-nid',
      title: 'NID',
      titleBn: 'টাইটেল',
      domain: 'example.gov.bd',
      categoryId: 'identity',
      directoryCategoryRank: 1,
      icon: 'Fingerprint',
      status: 'ACTIVE',
    });
  });

  it('prefers Service icon when set', () => {
    const card = toDirectoryCard(
      svc({ id: 'nid', slug: 'bd-nid', title: 'NID', icon: 'IdCard' }),
      catIdentity,
    );
    expect(card.icon).toBe('IdCard');
  });

  it('throws when category id mismatches', () => {
    expect(() =>
      toDirectoryCard(svc({ id: 'x', slug: 'bd-x', title: 'X', category: 'tax' }), catIdentity),
    ).toThrow(/does not match/);
  });
});

describe('toSearchableService', () => {
  it('builds search DTO with relatedTitles and blob strip', () => {
    const a = svc({
      id: 'a',
      slug: 'bd-a',
      title: 'Alpha',
      title_bn: 'আলফা',
      related: ['b'],
      body: '## Hello **world**',
      body_bn: 'বডি',
    });
    const b = svc({ id: 'b', slug: 'bd-b', title: 'Beta', title_bn: 'বেটা' });
    const all = [a, b];
    const byId = Object.fromEntries(all.map((s) => [s.id, s]));

    const row = toSearchableService(a, { category: catIdentity, allServices: all, byId });
    expect(row.relatedTitles).toEqual(['Beta', 'বেটা']);
    expect(row.searchBlob).not.toMatch(/[#*]/);
    expect(row.searchBlob).toContain('Hello');
    expect(row.aliases).toEqual(['alias-en', 'এলিয়াস']);
    expect(row.domain).toBe('example.gov.bd');
    expect(row.categoryName).toBe('Identity');
    expect(row.directoryGlobalRank).toBe(10);
  });
});
