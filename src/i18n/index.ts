import {
    MemoryStore,
    defineCatalog,
    normalizeCatalog,
    template,
} from 'ilingo';
import { ITranslateT, applyInstallInput, injectLocale } from '@ilingo/vue';
import {
    type App,
    type ComputedRef,
    type MaybeRef,
    type Ref,
    computed,
    defineComponent,
    unref,
} from 'vue';
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

/** The catalog as nested records, for synchronous lookups. */
const messages = normalizeCatalog(catalog);

function splitPath(path: string): { namespace: string; key: string } {
    const index = path.indexOf('.');
    if (index <= 0 || index >= path.length - 1) {
        throw new SyntaxError(`[i18n] "${path}" must be a "namespace.key" path.`);
    }
    return { namespace: path.slice(0, index), key: path.slice(index + 1) };
}

function lookup(locale: string, namespace: string, key: string): string | undefined {
    let node: unknown = messages[locale]?.[namespace];
    for (const part of key.split('.')) {
        node = (node as Record<string, unknown> | undefined)?.[part];
    }
    return typeof node === 'string' ? node : undefined;
}

/**
 * Resolve a `namespace.key` path synchronously, falling back to the default
 * locale. ilingo's own `get()` is async and would prerender the raw key.
 */
function translate(locale: string, path: string, data?: Record<string, unknown>): string {
    const { namespace, key } = splitPath(path);
    const message = lookup(locale, namespace, key) ?? lookup(DEFAULT_LOCALE, namespace, key);
    return message === undefined ? path : template(message, data ?? {});
}

/** `<ITranslate path="namespace.key" />`, resolved synchronously for prerendering. */
export const ITranslate = defineComponent({
    name: 'ITranslate',
    props: {
        path: { type: String, required: true },
        data: { type: Object },
    },
    setup(props) {
        const locale = injectLocale();
        return () => translate(locale.value, props.path, props.data);
    },
});

/**
 * Register the translator on the Vue app — mirrors the `installTranslator`
 * helper used in the PrivateAIM hub. It provides the `Ilingo` instance and a
 * reactive locale ref, and registers the global `<ITranslate>` / `<ITranslateT>`
 * components.
 */
export function installTranslator(app: App, locale: string = DEFAULT_LOCALE) {
    applyInstallInput(app, { store, locale });
    app.component('ITranslate', ITranslate);
    app.component('ITranslateT', ITranslateT);
}

/**
 * Accepts a dotted `namespace.key` path (e.g. `team.title`, `home.hero.title`)
 * and returns a reactive ref that re-resolves when the active locale changes.
 *
 * Use this when a translated string is needed in script or bound to an
 * attribute/prop; for inline template text prefer the globally registered
 * `<ITranslate path="..." />` component.
 */
export function useTranslation(path: string, data?: MaybeRef<Record<string, unknown>>): ComputedRef<string> {
    const locale = injectLocale();
    return computed(() => translate(locale.value, path, unref(data)));
}

/** Locale of a URL path: `/de/...` is German, everything else the default locale. */
export function localeOfPath(path: string): string {
    return /^\/de(\/|$)/.test(path) ? 'de' : DEFAULT_LOCALE;
}

/** Strip the locale prefix: `/de/news` → `/news`, `/de` → `/`. */
export function stripLocale(path: string): string {
    const match = path.match(/^\/de(\/.*)?$/);
    return match ? (match[1] || '/') : path;
}

/**
 * Path of a page in a locale; the default locale has no prefix. The German
 * home is `/de/`, a directory index, since GitHub Pages would redirect `/de` there.
 */
export function localePath(path: string, locale: string): string {
    const base = stripLocale(path);
    if (locale === DEFAULT_LOCALE) {
        return base;
    }
    return base === '/' ? `/${locale}/` : `/${locale}${base}`;
}

/** `localePath` bound to the active locale, for internal links. */
export function useLocalePath(): (path: string) => string {
    const locale = injectLocale();
    return (path: string) => localePath(path, locale.value);
}

/** The app's locale ref, for code that runs outside components (router hooks). */
export function appLocale(app: App): Ref<string> {
    return injectLocale(app);
}

/** Reactive, writable active-locale ref. Assign `.value` to switch language. */
export function useLocale(): Ref<string> {
    return injectLocale();
}
