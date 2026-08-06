import { marked } from 'marked';

marked.setOptions({
  gfm: true,
  breaks: false,
});

/** Render trusted Service body Markdown to HTML (git-managed content only). */
export function renderMarkdown(md: string): string {
  const html = marked.parse(md.trim(), { async: false });
  return typeof html === 'string' ? html : '';
}
