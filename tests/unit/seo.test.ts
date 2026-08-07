import { describe, expect, it } from 'vitest';
import {
  absoluteUrl,
  breadcrumbListJsonLd,
  documentTitle,
  metaDescription,
  organizationJsonLd,
  resolveOgImage,
  webPageJsonLd,
  webSiteJsonLd,
  DEFAULT_OG_IMAGE_PATH,
} from '../../src/lib/seo';

describe('documentTitle', () => {
  it('formats BN then EN with CitizenSheba Bangladesh brand', () => {
    expect(documentTitle('জাতীয় পরিচয়পত্র', 'NID Services')).toBe(
      'জাতীয় পরিচয়পত্র — NID Services | CitizenSheba Bangladesh',
    );
  });

  it('supports expanded SERP titles for short Display Names', () => {
    expect(
      documentTitle('এটুআই (তথ্য ও যোগাযোগ প্রযুক্তি বিভাগ)', 'A2I (Aspire to Innovate)'),
    ).toBe(
      'এটুআই (তথ্য ও যোগাযোগ প্রযুক্তি বিভাগ) — A2I (Aspire to Innovate) | CitizenSheba Bangladesh',
    );
  });
});

describe('metaDescription', () => {
  it('joins BN and EN as sentences', () => {
    expect(
      metaDescription(
        'বাংলাদেশের অফিসিয়াল এনআইডি সেবা পোর্টাল খুঁজুন',
        'Find the official Bangladesh NID services portal',
      ),
    ).toBe(
      'বাংলাদেশের অফিসিয়াল এনআইডি সেবা পোর্টাল খুঁজুন। Find the official Bangladesh NID services portal.',
    );
  });

  it('does not double-punctuate', () => {
    expect(metaDescription('বাংলা বাক্য।', 'English sentence.')).toBe(
      'বাংলা বাক্য। English sentence.',
    );
  });
});

describe('resolveOgImage', () => {
  it('defaults to brand OG card', () => {
    expect(resolveOgImage()).toBe(`https://www.citizensheba.com${DEFAULT_OG_IMAGE_PATH}`);
  });

  it('prefers service then category over brand', () => {
    expect(
      resolveOgImage({
        serviceOgImage: '/brand/services/bd-nid-og.png',
        categoryOgImage: '/brand/categories/identity-og.png',
      }),
    ).toBe('https://www.citizensheba.com/brand/services/bd-nid-og.png');
    expect(resolveOgImage({ categoryOgImage: '/brand/categories/identity-og.png' })).toBe(
      'https://www.citizensheba.com/brand/categories/identity-og.png',
    );
  });
});

describe('json-ld helpers', () => {
  it('builds Organization with Non-Official disclaimer', () => {
    const org = organizationJsonLd();
    expect(org['@type']).toBe('Organization');
    expect(String(org.description)).toMatch(/not a government entity/i);
  });

  it('builds WebSite pointing at publisher', () => {
    const site = webSiteJsonLd();
    expect(site['@type']).toBe('WebSite');
    expect(site.publisher).toEqual({ '@id': 'https://www.citizensheba.com/#organization' });
  });

  it('builds BreadcrumbList matching Home → Category → Service', () => {
    const list = breadcrumbListJsonLd([
      { name: 'Identity & Registration', path: '/categories/identity-registration/' },
      { name: 'NID Services' },
    ]);
    const items = list.itemListElement as Array<Record<string, unknown>>;
    expect(items).toHaveLength(3);
    expect(items[0]).toMatchObject({
      position: 1,
      name: 'Home',
      item: 'https://www.citizensheba.com/',
    });
    expect(items[1]).toMatchObject({
      position: 2,
      name: 'Identity & Registration',
      item: 'https://www.citizensheba.com/categories/identity-registration/',
    });
    expect(items[2].name).toBe('NID Services');
    expect(items[2].item).toBeUndefined();
  });

  it('builds WebPage without GovernmentService claim', () => {
    const page = webPageJsonLd({
      name: 'NID',
      description: 'Hop',
      path: '/services/bd-nid/',
      dateModified: '2026-08-06',
    });
    expect(page['@type']).toBe('WebPage');
    expect(JSON.stringify(page)).not.toMatch(/GovernmentService/);
    expect(page.dateModified).toBe('2026-08-06');
  });

  it('absoluteUrl joins origin and path', () => {
    expect(absoluteUrl('/brand/og-default.png')).toBe(
      'https://www.citizensheba.com/brand/og-default.png',
    );
  });
});
