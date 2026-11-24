import { mkdir, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import sharp from 'sharp';
import type { Plugin } from 'vite';
import { THUMBNAIL_WIDTHS } from '../src/utils/thumbnail.ts';

/**
 * Downscaled copies of the news photos, served as /images/thumbs/<width>/<path>.webp
 * (see src/utils/thumbnail.ts). The originals stay for the lightbox.
 */
const THUMBNAIL_PATH = /^\/images\/thumbs\/(\d+)\/([\w/.-]+)\.webp$/;
const SOURCE_DIRS = ['news'];
const IMAGE_FILE = /\.(webp|jpe?g|png)$/i;

function resize(source: string, width: number) {
    return sharp(source)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 72 });
}

/** Write a thumbnail per width for every image in the source directories. */
export async function writeThumbnails(outDir: string) {
    const imagesDir = join(outDir, 'images');
    await Promise.all(SOURCE_DIRS.map(async (dir) => {
        const files = (await readdir(join(imagesDir, dir), { recursive: true })).filter((file) => IMAGE_FILE.test(file));
        await Promise.all(files.flatMap((file) => THUMBNAIL_WIDTHS.map(async (width) => {
            const target = join(imagesDir, 'thumbs', String(width), dir, file.replace(IMAGE_FILE, '.webp'));
            await mkdir(dirname(target), { recursive: true });
            await resize(join(imagesDir, dir, file), width).toFile(target);
        })));
    }));
}

/** Resize on request in the dev server, which has no build output. */
export function thumbnailDevServer(): Plugin {
    return {
        name: 'image-thumbnails',
        apply: 'serve',
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                const match = req.url?.match(THUMBNAIL_PATH);
                const width = Number(match?.[1]);
                if (!match?.[2] || !THUMBNAIL_WIDTHS.includes(width)) {
                    next();
                    return;
                }

                const stem = join('public', 'images', match[2]);
                const sources = await Promise.all(['.webp', '.jpg', '.jpeg', '.png'].map(async (extension) => {
                    try {
                        await sharp(stem + extension).metadata();
                        return stem + extension;
                    } catch {
                        return undefined;
                    }
                }));
                const source = sources.find(Boolean);
                if (!source) {
                    next();
                    return;
                }

                res.setHeader('Content-Type', 'image/webp');
                res.end(await resize(source, width).toBuffer());
            });
        },
    };
}
