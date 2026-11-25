import type { INewsEntry, NewsByYear, NewsCategory } from './types';
import en from './en';
import de from './de';

export type {
    INewsEntry,
    NewsByYear,
    NewsCategory,
} from './types';

/** News content keyed by locale code. Falls back to `en` for unknown locales. */
export const news: Record<string, NewsByYear> = { en, de };

/** Resolve the news catalog for a locale, falling back to English. */
export function newsForLocale(locale: string): NewsByYear {
    return news[locale] ?? en;
}

/** Start date of a display date such as `19-22/05/2026` as ISO `2026-05-19`. */
export function isoDate(date: string): string | undefined {
    // "8/10/2025", "8-10/10/2025" or, across months, "27/09-01/10/2026"; the start date counts
    const match = date.match(/^(\d{1,2})(?:\/(\d{1,2}))?(?:-\d{1,2})?\/(\d{1,2})\/(\d{4})$/);

    if (!match) {
        return undefined;
    }

    const [, day, startMonth, endMonth, year] = match;

    return `${year}-${(startMonth ?? endMonth)!.padStart(2, '0')}-${day!.padStart(2, '0')}`;
}

/** Stable anchor per entry, e.g. #news-2026-05-19-mie-2026 */
export function anchorFor(item: INewsEntry): string {
    const slug = item.title
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 40)
        .replace(/-$/, '');

    return `news-${isoDate(item.date) ?? item.date}-${slug}`;
}

/** The newest entries across all years (entries within a year are authored newest-first). */
export function latestNews(locale: string, count: number): INewsEntry[] {
    const byYear = newsForLocale(locale);

    return Object.keys(byYear)
        .sort((a, b) => Number.parseInt(b, 10) - Number.parseInt(a, 10))
        .flatMap((year) => byYear[year] ?? [])
        .slice(0, count);
}

/** Category of an entry, derived from its title (works for both locales). */
export function categoryOf(item: INewsEntry): NewsCategory {
    const title = item.title.toLowerCase();

    if (title.includes('retreat')) {
        return 'retreat';
    }

    if (title.includes('workshop')) {
        return 'workshop';
    }

    if (/kick-off|start|flyer/.test(title)) {
        return 'milestone';
    }

    return 'conference';
}
