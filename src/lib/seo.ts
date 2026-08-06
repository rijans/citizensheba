import { SITE_NAME } from './site';

/** Document Title: `বাংলা — English | CitizenSheba` */
export function documentTitle(bn: string, en: string, brand: string = SITE_NAME): string {
  return `${bn.trim()} — ${en.trim()} | ${brand}`;
}

/** Meta Description: Bengali sentence(s) then English sentence(s). */
export function metaDescription(bn: string, en: string): string {
  return `${asSentence(bn.trim(), 'bn')} ${asSentence(en.trim(), 'en')}`;
}

function asSentence(text: string, lang: 'bn' | 'en'): string {
  if (!text) return text;
  if (/[.!?।]$/.test(text)) return text;
  return lang === 'bn' ? `${text}।` : `${text}.`;
}
