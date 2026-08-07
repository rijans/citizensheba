import { describe, expect, it } from 'vitest';
import { servicePageHeadings, servicePageLangLabels } from '../../src/lib/servicePageCopy';

describe('servicePageCopy', () => {
  it('exposes About heading EN+BN', () => {
    expect(servicePageHeadings.about.en).toBe('About this service');
    expect(servicePageHeadings.about.bn).toBe('এই সেবা সম্পর্কে');
  });

  it('exposes language pane labels', () => {
    expect(servicePageLangLabels.bn).toBe('বাংলা');
    expect(servicePageLangLabels.en).toBe('English');
  });

  it('keeps existing section headings', () => {
    expect(servicePageHeadings.audience.en).toBe('Who is this for');
    expect(servicePageHeadings.faq.en).toBe('FAQ');
    expect(servicePageHeadings.related.en).toBe('Related services');
  });
});
