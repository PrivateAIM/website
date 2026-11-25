import { readFileSync } from 'node:fs';

/** A colour of the light palette in src/assets/dark-mode.css, for images generated at build time. */
export function colorToken(name: string): string {
    const css = readFileSync('src/assets/dark-mode.css', 'utf8');
    const value = css.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`))?.[1];

    if (!value) {
        throw new Error(`[tokens] No colour --${name} in dark-mode.css`);
    }

    return value;
}
