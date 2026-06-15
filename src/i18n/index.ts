import { MemoryStore, defineCatalog } from 'ilingo';
import {
    type DataMaybeRef,
    injectLocale,
    install as installIlingoVue,
    useTranslation as useIlingoTranslation,
} from '@ilingo/vue';
import type { App, MaybeRef, Ref } from 'vue';
import en from './locales/en';
import de from './locales/de';

/** Locales selectable in the UI (code + native label). */
export const LOCALES = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
] as const;

export const DEFAULT_LOCALE = 'en';

/** Catalog assembled from the per-locale definitions (see ./locales/*). */
const catalog = defineCatalog([en, de]);

/** In-memory store holding the whole catalog. */
export const store = new MemoryStore({ data: catalog });

/**
 * Register the ilingo translator on the Vue app — mirrors the
 * `installTranslator` helper used in the PrivateAIM hub. It installs the
 * `@ilingo/vue` plugin, which provides the `Ilingo` instance and a reactive
 * locale ref, registers the global `<ITranslate>` / `<ITranslateT>`
 * components and the `v-t` directive.
 */
export function installTranslator(app: App, locale: string = DEFAULT_LOCALE) {
    installIlingoVue(app, { store, locale });
}

function splitPath(path: string): { namespace: string; key: string } {
    const index = path.indexOf('.');
    if (index <= 0 || index >= path.length - 1) {
        throw new SyntaxError(`[i18n] "${path}" must be a "namespace.key" path.`);
    }
    return { namespace: path.slice(0, index), key: path.slice(index + 1) };
}

/**
 * Path-based wrapper around `@ilingo/vue`'s `useTranslation`. Accepts a dotted
 * `namespace.key` path (e.g. `team.title`, `home.hero.title`) and returns a
 * reactive `Ref<string>` that re-resolves when the active locale changes.
 *
 * Use this when a translated string is needed in script or bound to an
 * attribute/prop; for inline template text prefer the globally registered
 * `<ITranslate path="..." />` component.
 */
export function useTranslation(
    path: string,
    data?: DataMaybeRef,
    count?: MaybeRef<number>,
): Ref<string> {
    const { namespace, key } = splitPath(path);
    return useIlingoTranslation({ namespace, key, data, count });
}

/** Reactive, writable active-locale ref. Assign `.value` to switch language. */
export function useLocale(): Ref<string> {
    return injectLocale();
}
