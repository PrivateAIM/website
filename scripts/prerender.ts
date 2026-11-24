import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const SITE_URL = 'https://privateaim.de';

/** GitHub Pages serves `dist/404.html` for unknown paths, with a real 404 status. */
const NOT_FOUND_ROUTE = '/404';

interface PrerenderRoute {
    path: string;
    /** Files whose last commit date becomes the sitemap `lastmod`. */
    sources: string[];
}

/** Indexable routes: the single source of truth for prerendering and the sitemap. */
const PRERENDER_ROUTES: PrerenderRoute[] = [
    { path: '/', sources: ['src/views/Home.vue', 'src/components/home', 'src/i18n/locales'] },
    { path: '/news', sources: ['src/views/News.vue', 'src/data/news'] },
    { path: '/publications', sources: ['src/views/Publications.vue'] },
    { path: '/team', sources: ['src/views/Team.vue'] },
    { path: '/partners', sources: ['src/views/Partners.vue'] },
    { path: '/references/pht', sources: ['src/views/ReferenceProject.vue', 'src/data/references'] },
    { path: '/imprint', sources: ['src/views/Imprint.vue', 'src/i18n/locales'] },
    { path: '/privacy', sources: ['src/views/Privacy.vue', 'src/data/privacy'] },
];

export const prerenderPaths = [...PRERENDER_ROUTES.map((route) => route.path), NOT_FOUND_ROUTE];

interface PageMeta {
    title?: string;
    description?: string;
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
export function applyPageHead(route: string, html: string, meta: PageMeta): string {
    if (!html.includes('<h1')) {
        throw new Error(`[prerender] ${route} rendered without an <h1>`);
    }

    if (route === NOT_FOUND_ROUTE) {
        return setAttribute(html, 'meta name="robots"', 'content', 'noindex')
            .replace(/\s*<link rel="canonical"[^>]*>/, '')
            .replace(/\s*<meta property="og:url"[^>]*>/, '')
            .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttribute(meta.title ?? 'Page Not Found')}</title>`);
    }

    const { title, description } = meta;
    if (!title || !description) {
        throw new Error(`[prerender] ${route} needs a title and description`);
    }

    const url = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
    let result = html.replace(/<title>[^<]*<\/title>/, () => `<title>${escapeAttribute(title)}</title>`);
    result = setAttribute(result, 'meta name="description"', 'content', description);
    result = setAttribute(result, 'link rel="canonical"', 'href', url);
    result = setAttribute(result, 'meta property="og:url"', 'content', url);
    result = setAttribute(result, 'meta property="og:title"', 'content', title);
    result = setAttribute(result, 'meta property="og:description"', 'content', description);
    result = setAttribute(result, 'meta name="twitter:title"', 'content', title);
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

export function writeSitemap(outDir: string) {
    const urls = PRERENDER_ROUTES.map(({ path, sources }) => {
        const loc = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
        const lastmod = lastModified(sources);
        return [
            '  <url>',
            `    <loc>${loc}</loc>`,
            ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
            '  </url>',
        ].join('\n');
    });

    const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls,
        '</urlset>',
        '',
    ].join('\n');
    writeFileSync(join(outDir, 'sitemap.xml'), sitemap);
}
