import { 
    mkdir, 
    readFile, 
    readdir, 
    writeFile, 
} from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import type { Plugin } from 'vite';
import { colorToken } from './tokens.ts';

/**
 * Team avatars are referenced as /images/avatars/<github-user>.png and fetched from
 * GitHub at build time, so visitors never contact GitHub. The scheduled deploy picks
 * up changed profile pictures.
 */
const AVATAR_PATH = /\/images\/avatars\/([A-Za-z0-9-]+)\.png/g;

/** Twice the 4rem display size, for high-density screens. */
const AVATAR_SIZE = 128;

/** GitHub ignores the size parameter for default identicons (420 px), so resize them ourselves. */
async function downscale(body: Buffer): Promise<Buffer> {
    return sharp(body)
        .resize(AVATAR_SIZE, AVATAR_SIZE, { fit: 'cover', withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: true })
        .toBuffer();
}

/** GitHub's default identicon is a pattern of exactly two colours; photos have thousands. */
async function isIdenticon(body: Buffer): Promise<boolean> {
    const { data } = await sharp(body).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const colors = new Set<number>();

    for (let i = 0; i < data.length && colors.size <= 2; i += 3) {
        colors.add(((data[i] ?? 0) << 16) | ((data[i + 1] ?? 0) << 8) | (data[i + 2] ?? 0));
    }

    return colors.size <= 2;
}

/** Display names keyed by GitHub user, read from the team data. */
async function teamNames(): Promise<Map<string, string>> {
    const source = await readFile('src/views/Team.vue', 'utf8');

    return new Map(source.matchAll(/\{\s*name: '([^']+)',[^{}]*?github: '([^']+)'/g).map(([, name, user]) => [user ?? '', name ?? '']));
}

/** "Prof. Dr. Oliver Kohlbacher" → "OK" */
function initialsOf(name: string): string {
    const words = name.split(/\s+/).filter((word) => word && !word.endsWith('.'));
    const first = words[0]?.[0] ?? '';
    const last = words.length > 1 ? words.at(-1)?.[0] ?? '' : '';

    return (first + last).toUpperCase();
}

async function initialsAvatar(name: string): Promise<Buffer> {
    const background = colorToken('primary-color');
    const text = colorToken('brand-yellow');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${AVATAR_SIZE}" height="${AVATAR_SIZE}">
<rect width="100%" height="100%" fill="${background}"/>
<text x="50%" y="50%" dy="0.35em" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
 font-size="${AVATAR_SIZE * 0.4}" font-weight="700" fill="${text}">${initialsOf(name)}</text>
</svg>`;

    return sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toBuffer();
}

/** The avatar for a user: the downscaled photo, or initials instead of the identicon. */
async function avatarFor(user: string, names: Map<string, string>): Promise<Buffer> {
    const body = await fetchAvatar(user);
    const name = names.get(user);

    return name && await isIdenticon(body) ? initialsAvatar(name) : downscale(body);
}

async function fetchAvatar(user: string, attempts = 3): Promise<Buffer> {
    let lastError: unknown;

    for (let attempt = 0; attempt < attempts; attempt++) {
        try {
            const response = await fetch(`https://github.com/${user}.png?size=${AVATAR_SIZE}`);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return Buffer.from(await response.arrayBuffer());
        } catch (error) {
            lastError = error;
        }
    }

    throw new Error(`[avatars] Could not fetch the GitHub avatar of "${user}": ${String(lastError)}`);
}

/**
 * Download every avatar the prerendered pages reference. A failure fails the
 * build, so the live site keeps its previous avatars instead of broken images.
 */
export async function downloadAvatars(outDir: string) {
    const users = new Set<string>();
    const files = await readdir(outDir, { recursive: true });

    for (const file of files) {
        if (file.endsWith('.html')) {
            const html = await readFile(join(outDir, file), 'utf8');

            for (const match of html.matchAll(AVATAR_PATH)) {
                if (match[1]) {
                    users.add(match[1]);
                }
            }
        }
    }

    const avatarDir = join(outDir, 'images', 'avatars');

    await mkdir(avatarDir, { recursive: true });

    const names = await teamNames();

    await Promise.all([...users].map(async (user) => {
        await writeFile(join(avatarDir, `${user}.png`), await avatarFor(user, names));
    }));
}

/** Serve the avatars from GitHub through the dev server, which has no build output. */
export function avatarDevServer(): Plugin {
    return {
        name: 'github-avatars',
        apply: 'serve',
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                const user = req.url?.match(/^\/images\/avatars\/([A-Za-z0-9-]+)\.png/)?.[1];

                if (!user) {
                    next();

                    return;
                }

                try {
                    const body = await avatarFor(user, await teamNames());

                    res.setHeader('Content-Type', 'image/png');
                    res.end(body);
                } catch (error) {
                    next(error);
                }
            });
        },
    };
}
