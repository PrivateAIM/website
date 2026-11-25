import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import { colorToken } from './tokens.ts';

/**
 * Social preview image per page (og:image), written at build time in the layout
 * of public/images/og-image.png: logo, page title and description. The home
 * pages keep og-image.png.
 */
const WIDTH = 1200;
const HEIGHT = 630;

interface ISocialImage {
    file: string;
    title: string;
    description: string;
}

const pending: ISocialImage[] = [];

/** Queue the image for a route and return its URL path, or undefined for the home pages. */
export function socialImageFor(route: string, title: string, description: string): string | undefined {
    const locale = /^\/de(\/|$)/.test(route) ? 'de' : '';
    const name = route.replace(/^\/de(?=\/|$)/, '').split('/').filter(Boolean).join('-');

    if (!name) {
        return undefined;
    }

    const file = `${name}${locale ? `-${locale}` : ''}.png`;

    pending.push({
        file, 
        title: title.replace(/\s+—\s+PrivateAIM$/, ''), 
        description, 
    });

    return `/images/og/${file}`;
}

function escapeXml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Greedy word wrap; the last line ends with an ellipsis when text is left over. */
function wrap(text: string, maxChars: number, maxLines: number): string[] {
    const lines: string[] = [];
    let line = '';

    for (const word of text.split(/\s+/)) {
        if (line && `${line} ${word}`.length > maxChars) {
            lines.push(line);
            line = word;
        } else {
            line = line ? `${line} ${word}` : word;
        }
    }

    lines.push(line);

    if (lines.length > maxLines) {
        const kept = lines.slice(0, maxLines);

        kept[maxLines - 1] = `${kept[maxLines - 1]?.replace(/\s+\S*$/, '')} …`;

        return kept;
    }

    return lines;
}

async function render({ title, description }: ISocialImage, logo: string): Promise<Buffer> {
    const titleLines = wrap(title, 24, 3);
    const descriptionLines = wrap(description, 46, 3);
    const titleSize = 56;
    const descriptionSize = 28;
    const blockHeight = titleLines.length * titleSize * 1.15 + 28 + descriptionLines.length * descriptionSize * 1.4;
    let y = (HEIGHT - blockHeight) / 2 + titleSize;
    const tspans: string[] = [];

    for (const line of titleLines) {
        tspans.push(`<text x="420" y="${y}" font-size="${titleSize}" font-weight="700" fill="${colorToken('text-color')}">${escapeXml(line)}</text>`);
        y += titleSize * 1.15;
    }

    y += 28 - titleSize * 0.15;

    for (const line of descriptionLines) {
        tspans.push(`<text x="420" y="${y}" font-size="${descriptionSize}" fill="${colorToken('text-muted')}">${escapeXml(line)}</text>`);
        y += descriptionSize * 1.4;
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
<rect width="100%" height="100%" fill="${colorToken('card-bg')}"/>
<image href="data:image/png;base64,${logo}" x="80" y="167" width="258" height="294"/>
<g font-family="Helvetica Neue, Helvetica, Arial, sans-serif">${tspans.join('')}</g>
<rect y="${HEIGHT - 14}" width="100%" height="14" fill="${colorToken('primary-color')}"/>
</svg>`;

    return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}

export async function writeSocialImages(outDir: string) {
    // Uint8Array#toBase64 needs a newer V8 than Node 24 ships
    // eslint-disable-next-line unicorn/prefer-uint8array-base64
    const logo = (await readFile('public/images/logo.png')).toString('base64');
    const dir = join(outDir, 'images', 'og');

    await mkdir(dir, { recursive: true });
    await Promise.all(pending.map(async (image) => writeFile(join(dir, image.file), await render(image, logo))));
}
