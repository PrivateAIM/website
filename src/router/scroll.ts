import type { RouteLocationNormalized } from 'vue-router';
import type { ScrollRestorationSessionEntry } from 'vue-router/experimental';

/** Height of the sticky header: anchors scroll to just below it. */
const HEADER_OFFSET = 80;

/** Scroll the element a hash points to (#news-…, #audiences) below the sticky header. */
export function scrollToHash(hash: string): boolean {
    const element = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;

    if (!element) {
        return false;
    }

    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET });

    return true;
}

/**
 * Restore for the ScrollRestoration plugin: back/forward returns to the saved
 * position, a link with a hash goes to its anchor, any other link to the top.
 */
export function restoreScroll(entry: ScrollRestorationSessionEntry | null | undefined, to: RouteLocationNormalized) {
    if (entry?.default) {
        window.scrollTo(entry.default);

        return;
    }

    if (!scrollToHash(to.hash)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
