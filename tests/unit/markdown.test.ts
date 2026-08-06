import { describe, expect, it } from 'vitest';
import { renderMarkdown } from '../../src/lib/markdown';

describe('renderMarkdown', () => {
  it('renders paragraphs and bold', () => {
    const html = renderMarkdown('Hello **world**.\n\nSecond paragraph.');
    expect(html).toContain('<strong>world</strong>');
    expect(html).toContain('<p>');
  });
});
