import { stripLocale } from '@/i18n';

/** Last-modified date (YYYY-MM-DD) of a page, from the git history of its sources; undefined on shallow clones. */
export function pageDate(path: string): string | undefined {
    return __PAGE_DATES__[stripLocale(path)];
}
