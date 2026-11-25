/** Widths generated at build time by scripts/thumbnails.ts (about twice the displayed size). */
export const THUMBNAIL_WIDTHS = [192, 640];

type ThumbnailWidth = 192 | 640;

/**
 * URL of a downscaled copy of an image in public/images, e.g.
 * thumbnail('news/aime/news_aime-2026_1.webp', 192).
 */
export function thumbnail(path: string, width: ThumbnailWidth): string {
    return `/images/thumbs/${width}/${path.replace(/\.(webp|jpe?g|png)$/i, '')}.webp`;
}
