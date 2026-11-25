import { execFileSync } from 'node:child_process';
import {
    existsSync, 
    mkdirSync, 
    readdirSync, 
    renameSync, 
    writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { socialImageFor } from './socialImages.ts';

export const SITE_URL = 'https://privateaim.de';

/** GitHub Pages serves `dist/404.html` for unknown paths, with a real 404 status. */
const NOT_FOUND_ROUTE = '/404';

interface IPrerenderRoute {
    path: string;
    /** Files whose last commit date becomes the sitemap `lastmod`. */
    sources: string[];
}

/** Indexable routes: the single source of truth for prerendering and the sitemap. */
const PRERENDER_ROUTES: IPrerenderRoute[] = [
    { path: '/', sources: ['src/views/Home.vue', 'src/components/home', 'src/i18n/locales'] },
    { path: '/flame', sources: ['src/views/Flame.vue', 'src/i18n/locales'] },
    { path: '/federated-analysis', sources: ['src/views/FederatedAnalysis.vue', 'src/i18n/locales'] },
    { path: '/news', sources: ['src/views/News.vue', 'src/data/news'] },
    { path: '/publications', sources: ['src/views/Publications.vue'] },
    { path: '/team', sources: ['src/views/Team.vue'] },
    { path: '/partners', sources: ['src/views/Partners.vue'] },
    { path: '/references/pht', sources: ['src/views/ReferenceProject.vue', 'src/data/references'] },
    { path: '/imprint', sources: ['src/views/Imprint.vue', 'src/i18n/locales'] },
    { path: '/privacy', sources: ['src/views/Privacy.vue', 'src/data/privacy'] },
];

/** Mirrors `LOCALES` and `localePath` in src/i18n: the default locale has no prefix. */
const LOCALES = ['en', 'de'] as const;
const DEFAULT_LOCALE = 'en';
const OG_LOCALES: Record<string, string> = { en: 'en_US', de: 'de_DE' };

function stripLocale(path: string): string {
    const match = path.match(/^\/de(\/.*)?$/);

    return match ? (match[1] || '/') : path;
}

function localePath(path: string, locale: string): string {
    const base = stripLocale(path);

    if (locale === DEFAULT_LOCALE) {
        return base;
    }

    return base === '/' ? `/${locale}/` : `/${locale}${base}`;
}

function absoluteUrl(path: string): string {
    return `${SITE_URL}${localePath(path, localeOfPath(path))}`;
}

function localeOfPath(path: string): string {
    return /^\/de(\/|$)/.test(path) ? 'de' : DEFAULT_LOCALE;
}

/** vite-ssg needs `/de` (not `/de/`) and writes it to de.html; see `moveLocaleHomes`. */
export const prerenderPaths = [
    ...PRERENDER_ROUTES.flatMap((route) => LOCALES.map((locale) => localePath(route.path, locale).replace(/(.)\/$/, '$1'))),
    NOT_FOUND_ROUTE,
];

/**
 * Move de.html to de/index.html: with both a de.html file and a de/ directory,
 * GitHub Pages redirects /de to /de/, so the directory index is the served URL.
 */
export function moveLocaleHomes(outDir: string) {
    for (const locale of LOCALES) {
        if (locale !== DEFAULT_LOCALE) {
            mkdirSync(join(outDir, locale), { recursive: true });
            renameSync(join(outDir, `${locale}.html`), join(outDir, locale, 'index.html'));
        }
    }
}

interface IPageMeta {
    title?: string;
    description?: string;
    locale?: string;
}

function escapeAttribute(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function setAttribute(html: string, tagStart: string, attribute: string, value: string): string {
    const pattern = new RegExp(`(<${tagStart}[^>]*\\b${attribute}=")[^"]*(")`);

    if (!pattern.test(html)) {
        throw new Error(`[prerender] Missing tag: <${tagStart}>`);
    }

    return html.replace(pattern, (_match, before: string, after: string) => `${before}${escapeAttribute(value)}${after}`);
}

/** Write the route's own head tags into its static HTML. */
/** Read the head fields from the route meta, which this project sees untyped. */
function pageMeta(meta: Record<string, unknown>): IPageMeta {
    const text = (key: string) => (typeof meta[key] === 'string' ? meta[key] : undefined);

    return {
        title: text('title'), 
        description: text('description'), 
        locale: text('locale'), 
    };
}

export function applyPageHead(route: string, html: string, routeMeta: Record<string, unknown>): string {
    const meta = pageMeta(routeMeta);

    if (!html.includes('<h1')) {
        throw new Error(`[prerender] ${route} rendered without an <h1>`);
    }

    if (route === NOT_FOUND_ROUTE) {
        return setAttribute(html, 'meta name="robots"', 'content', 'noindex')
            .replace(/\s*<link rel="(canonical|alternate)"[^>]*>/g, '')
            .replace(/\s*<meta property="og:url"[^>]*>/, '')
            .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttribute(meta.title ?? 'Page Not Found')}</title>`);
    }

    const { title, description } = meta;

    if (!title || !description) {
        throw new Error(`[prerender] ${route} needs a title and description`);
    }

    const locale = meta.locale ?? DEFAULT_LOCALE;
    const url = absoluteUrl(route);
    let result = stripLocale(route) === '/' ? html : html.replace(/\s*<link rel="preload" href="\/images\/home\/[^"]*"[^>]*>/, '');

    result = result
        .replace(/<html lang="[^"]*">/, `<html lang="${locale}">`)
        .replace(/<title>[^<]*<\/title>/, () => `<title>${escapeAttribute(title)}</title>`);

    for (const alternate of LOCALES) {
        result = setAttribute(result, `link rel="alternate" hreflang="${alternate}"`, 'href', absoluteUrl(localePath(route, alternate)));
    }

    result = setAttribute(result, 'link rel="alternate" hreflang="x-default"', 'href', absoluteUrl(stripLocale(route)));
    result = setAttribute(result, 'meta property="og:locale"', 'content', OG_LOCALES[locale] ?? 'en_US');
    result = setAttribute(result, 'meta property="og:locale:alternate"', 'content', locale === 'de' ? 'en_US' : 'de_DE');
    result = setAttribute(result, 'meta name="description"', 'content', description);
    result = setAttribute(result, 'link rel="canonical"', 'href', url);
    result = setAttribute(result, 'meta property="og:url"', 'content', url);
    result = setAttribute(result, 'meta property="og:title"', 'content', title);
    result = setAttribute(result, 'meta property="og:description"', 'content', description);
    result = setAttribute(result, 'meta name="twitter:title"', 'content', title);

    const image = socialImageFor(route, title, description);

    if (image) {
        const alt = `${title}: ${description}`;

        result = setAttribute(result, 'meta property="og:image"', 'content', `${SITE_URL}${image}`);
        result = setAttribute(result, 'meta name="twitter:image"', 'content', `${SITE_URL}${image}`);
        result = setAttribute(result, 'meta property="og:image:alt"', 'content', alt);
        result = setAttribute(result, 'meta name="twitter:image:alt"', 'content', alt);
    }

    return setAttribute(result, 'meta name="twitter:description"', 'content', description);
}

function git(...args: string[]): string {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}

/** Last commit date of the sources; omitted on shallow clones, where it would be wrong. */
function lastModified(sources: string[]): string | undefined {
    try {
        if (git('rev-parse', '--is-shallow-repository') === 'true') {
            return undefined;
        }

        return git('log', '-1', '--format=%cs', '--', ...sources) || undefined;
    } catch {
        return undefined;
    }
}

/** Last-modified date per route path, compiled into the app (see src/seo/pageDates.ts). */
export function pageDates(): Record<string, string> {
    return Object.fromEntries(PRERENDER_ROUTES.flatMap(({ path, sources }) => {
        const date = lastModified(sources);

        return date ? [[path, date]] : [];
    }));
}

export function writeSitemap(outDir: string) {
    const urls = PRERENDER_ROUTES.flatMap(({ path, sources }) => {
        const lastmod = lastModified(sources);
        const alternates = [
            ...LOCALES.map((locale) => [locale, absoluteUrl(localePath(path, locale))]),
            ['x-default', absoluteUrl(path)],
        ].map(([hreflang, href]) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`);

        return LOCALES.map((locale) => [
            '  <url>',
            `    <loc>${absoluteUrl(localePath(path, locale))}</loc>`,
            ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
            ...alternates,
            '  </url>',
        ].join('\n'));
    });

    // PDFs in public/files (flyers, slides) have no language alternates
    const filesDir = join(outDir, 'files');
    const documents = existsSync(filesDir) ?
        readdirSync(filesDir).filter((file) => file.endsWith('.pdf')).sort() :
        [];

    for (const file of documents) {
        const lastmod = lastModified([`public/files/${file}`]);

        urls.push([
            '  <url>',
            `    <loc>${absoluteUrl(`/files/${file}`)}</loc>`,
            ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
            '  </url>',
        ].join('\n'));
    }

    const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ...urls,
        '</urlset>',
        '',
    ].join('\n');

    writeFileSync(join(outDir, 'sitemap.xml'), sitemap);
}

/** URLs of the former website that other sites still link to (e.g. docs.privateaim.net), and their new pages. */
const LEGACY_REDIRECTS: Record<string, string> = {
    '/eng/index.html': '/',
    '/eng/project.html': '/',
    '/eng/team.html': '/team',
};

/**
 * GitHub Pages cannot send 301s, so each legacy URL gets a static page with an
 * immediate meta refresh, which Google treats as a permanent redirect. The stub
 * itself is noindex, so only the target is indexed.
 */
export function writeLegacyRedirects(outDir: string) {
    for (const [from, to] of Object.entries(LEGACY_REDIRECTS)) {
        const target = absoluteUrl(to);
        const file = join(outDir, from);

        mkdirSync(join(file, '..'), { recursive: true });
        writeFileSync(file, [
            '<!DOCTYPE html>',
            '<html lang="en">',
            '<head>',
            '<meta charset="utf-8">',
            `<title>PrivateAIM — moved to ${target}</title>`,
            '<meta name="robots" content="noindex">',
            `<link rel="canonical" href="${target}">`,
            `<meta http-equiv="refresh" content="0; url=${target}">`,
            '</head>',
            `<body><p>This page has moved to <a href="${target}">${target}</a>.</p></body>`,
            '</html>',
            '',
        ].join('\n'));
    }
}
