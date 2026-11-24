/* eslint-disable no-console -- command-line script */
// Checks the prerendered build in dist/ before it is deployed. Run after `npm run build`.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const SITE_URL = 'https://privateaim.de';
const errors = [];
const fail = (message) => errors.push(message);

/** The file GitHub Pages serves for a URL path. */
function fileFor(path) {
    if (path.endsWith('/')) {
        return join(DIST, path, 'index.html');
    }
    return [join(DIST, path), join(DIST, `${path}.html`)].find((file) => existsSync(file));
}

const read = (file) => readFileSync(file, 'utf8');
const attr = (html, pattern) => html.match(pattern)?.[1];
const htmlFiles = readdirSync(DIST, { recursive: true }).filter((file) => file.endsWith('.html'));

// Every sitemap URL is a prerendered page with its own head tags
const sitemap = read(join(DIST, 'sitemap.xml'));
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (locs.length === 0) {
    fail('sitemap.xml has no URLs');
}
if (/<(priority|changefreq)>/.test(sitemap)) {
    fail('sitemap.xml contains priority or changefreq');
}

const titles = new Map();
for (const loc of locs) {
    const path = loc.slice(SITE_URL.length);
    const file = fileFor(path);
    if (!file) {
        fail(`${loc}: no file in dist`);
        continue;
    }
    if (!file.endsWith('.html')) {
        continue;
    }

    const html = read(file);
    const title = attr(html, /<title>([^<]*)<\/title>/);
    const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
    if (!/<h1[\s>]/.test(html)) fail(`${loc}: no <h1>`);
    if (canonical !== loc) fail(`${loc}: canonical is ${canonical}`);
    if (attr(html, /<meta property="og:url" content="([^"]*)"/) !== loc) fail(`${loc}: og:url differs from canonical`);
    if (!/<meta name="robots" content="index, follow">/.test(html)) fail(`${loc}: not indexable`);
    if (titles.has(title)) fail(`${loc}: same title as ${titles.get(title)}`);
    titles.set(title, loc);

    // hreflang alternates must point back to this page
    const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
    if (!alternates.some(([, , href]) => href === loc)) fail(`${loc}: no hreflang pointing to itself`);
    for (const [, hreflang, href] of alternates) {
        if (!locs.includes(href)) fail(`${loc}: hreflang ${hreflang} points outside the sitemap (${href})`);
    }
}

// Nothing listed in the sitemap may be blocked for crawlers
const disallowed = [...read(join(DIST, 'robots.txt')).matchAll(/^Disallow:\s*(\S+)/gm)].map((match) => match[1]);
for (const loc of locs) {
    const blocked = disallowed.find((prefix) => loc.slice(SITE_URL.length).startsWith(prefix));
    if (blocked) fail(`${loc}: blocked by robots.txt (Disallow: ${blocked})`);
}

const notFound = read(join(DIST, '404.html'));
if (!/content="noindex"/.test(notFound) || /rel="canonical"/.test(notFound)) {
    fail('404.html must be noindex without a canonical');
}

// Content that must never ship again
const forbidden = [
    [/Test Test|test\.jpg/, 'placeholder content'],
    [/href="\/(de\/)?blog/, 'a link to the removed blog'],
    [/github\.com\/[\w-]+\.png|avatars\.githubusercontent\.com/, 'an avatar hotlinked from GitHub'],
    [/>\s*(navigation|home|footer|news|team|partners|publications|imprint|privacy|cookie|references)\.[a-zA-Z.]+\s*</, 'an untranslated i18n key'],
];
for (const file of htmlFiles) {
    const html = read(join(DIST, file));
    for (const [pattern, label] of forbidden) {
        if (pattern.test(html)) fail(`${file}: contains ${label}`);
    }
}
// llms.txt may only list pages that exist
const llms = read(join(DIST, 'llms.txt'));
for (const [, url] of llms.matchAll(/\]\((https:\/\/privateaim\.de[^)]*)\)/g)) {
    if (!locs.includes(url)) fail(`llms.txt links ${url}, which is not in the sitemap`);
}

if (existsSync(join(DIST, 'blog')) || existsSync(join(DIST, 'blog.html'))) {
    fail('dist contains blog output');
}

if (errors.length > 0) {
    console.error(`dist check failed:\n- ${errors.join('\n- ')}`);
    process.exit(1);
}
console.log(`dist check passed: ${locs.length} sitemap URLs, ${htmlFiles.length} HTML files`);
