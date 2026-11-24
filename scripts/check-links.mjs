/* eslint-disable no-console -- command-line script */
// Checks every external link in the built pages. Run after `npm run build`.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const TIMEOUT_MS = 20000;

const urls = new Map();
for (const file of readdirSync(DIST, { recursive: true })) {
    if (!file.endsWith('.html')) continue;
    const html = readFileSync(join(DIST, file), 'utf8');
    for (const [, url] of html.matchAll(/href="(https?:\/\/[^"#]+)/g)) {
        const decoded = url.replace(/&amp;/g, '&');
        if (!decoded.startsWith('https://privateaim.de')) {
            if (!urls.has(decoded)) urls.set(decoded, new Set());
            urls.get(decoded).add(file);
        }
    }
}

async function status(url) {
    const options = {
        redirect: 'follow',
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { 'user-agent': 'Mozilla/5.0 (compatible; privateaim.de link check)' },
    };
    try {
        const head = await fetch(url, { ...options, method: 'HEAD' });
        if (head.ok) return head.status;
        // Some servers reject HEAD
        return (await fetch(url, options)).status;
    } catch (error) {
        return error.name === 'TimeoutError' ? 'timeout' : (error.cause?.code ?? error.message);
    }
}

const results = await Promise.all(urls.keys().map(async (url) => [url, await status(url)]).toArray());
// 401/403/429 usually mean bot protection, not a dead link
const blocked = results.filter(([, code]) => [401, 403, 429].includes(code));
const broken = results.filter(([, code]) => !(typeof code === 'number' && (code < 400 || [401, 403, 429].includes(code))));

for (const [url, code] of blocked) console.warn(`blocked ${code}: ${url}`);
for (const [url, code] of broken) console.error(`broken ${code}: ${url} (in ${[...urls.get(url)].join(', ')})`);
console.log(`${results.length} external links checked: ${broken.length} broken, ${blocked.length} blocked by the server`);
process.exit(broken.length > 0 ? 1 : 0);
