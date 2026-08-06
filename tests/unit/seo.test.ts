import { describe, expect, it } from 'vitest';
import { documentTitle, metaDescription } from '../../src/lib/seo';

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
