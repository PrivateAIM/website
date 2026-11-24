import { 
    mkdir, 
    readFile, 
    readdir, 
    writeFile, 
} from 'node:fs/promises';
import { join } from 'node:path';
import type { Plugin } from 'vite';

/**
 * Team avatars are referenced as /images/avatars/<github-user>.png and fetched from
 * GitHub at build time, so visitors never contact GitHub. The scheduled deploy picks
 * up changed profile pictures.
 */
const AVATAR_PATH = /\/images\/avatars\/([A-Za-z0-9-]+)\.png/g;

/** Twice the 4rem display size, for high-density screens. */
const AVATAR_SIZE = 128;

interface Avatar {
    body: Buffer;
    type: string;
}

async function fetchAvatar(user: string, attempts = 3): Promise<Avatar> {
    let lastError: unknown;
    for (let attempt = 0; attempt < attempts; attempt++) {
        try {
            const response = await fetch(`https://github.com/${user}.png?size=${AVATAR_SIZE}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return {
                 
                body: Buffer.from(await response.arrayBuffer()),
                type: response.headers.get('content-type') ?? 'image/png',
            };
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
        const { body } = await fetchAvatar(user);
        await writeFile(join(avatarDir, `${user}.png`), body);
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
                    const { body, type } = await fetchAvatar(user);
                    res.setHeader('Content-Type', type);
                    res.end(body);
                } catch (error) {
                    next(error);
                }
            });
        },
    };
}
