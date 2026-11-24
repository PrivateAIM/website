import type { ReferenceProject, ReferenceProjectContent } from '@/types/ReferenceProject';
import pht from './pht';

/** All predecessor/reference projects, each rendered at `/references/<slug>`. */
export const references: ReferenceProject[] = [pht];

/** Find a reference project by its slug (case-insensitive). */
export function findReference(slug: string): ReferenceProject | undefined {
    const needle = slug.toLowerCase();
    return references.find((project) => project.slug.toLowerCase() === needle);
}

/** Resolve the localized content of a reference project, falling back to English. */
export function referenceContentForLocale(project: ReferenceProject, locale: string): ReferenceProjectContent {
    const content = project.content[locale] ?? project.content.en;
    if (!content) {
        throw new Error(`Reference project "${project.slug}" has no English content.`);
    }
    return content;
}

/** Page title of a reference project; the German one names the page type, so both locales have distinct titles. */
export function referenceTitle(content: ReferenceProjectContent, locale: string): string {
    return locale === 'de' ?
        `${content.name} — Referenzprojekt von PrivateAIM` :
        `${content.name} — PrivateAIM Reference Project`;
}
