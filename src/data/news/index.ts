import type { NewsByYear } from './types';
import en from './en';
import de from './de';

export type { NewsByYear, NewsEntry } from './types';

/** News content keyed by locale code. Falls back to `en` for unknown locales. */
export const news: Record<string, NewsByYear> = { en, de };
