import { 
    mkdir, 
    readFile, 
    readdir, 
    writeFile, 
} from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import type { Plugin } from 'vite';

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

async function fetchAvatar(user: string, attempts = 3): Promise<Buffer> {
    let lastError: unknown;
    for (let attempt = 0; attempt < attempts; attempt++) {
        try {
            const response = await fetch(`https://github.com/${user}.png?size=${AVATAR_SIZE}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return await downscale(Buffer.from(await response.arrayBuffer()));
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
    await Promise.all([...users].map(async (user) => {
        await writeFile(join(avatarDir, `${user}.png`), await fetchAvatar(user));
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
                    const body = await fetchAvatar(user);
                    res.setHeader('Content-Type', 'image/png');
                    res.end(body);
                } catch (error) {
                    next(error);
                }
            });
        },
    };
}
