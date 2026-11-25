import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import type {} from 'vite-ssg';
import { avatarDevServer, downloadAvatars } from './scripts/avatars.ts';
import {
    applyPageHead,
    moveLocaleHomes,
    pageDates,
    prerenderPaths,
    writeLegacyRedirects,
    writeSitemap,
} from './scripts/prerender.ts';
import { writeSocialImages } from './scripts/socialImages.ts';
import { thumbnailDevServer, writeThumbnails } from './scripts/thumbnails.ts';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        avatarDevServer(),
        thumbnailDevServer(),
    ],
    assetsInclude: ['**/*.md'],
    define: { __PAGE_DATES__: JSON.stringify(pageDates()) },
    // The @/* alias comes from tsconfig.json paths
    resolve: { tsconfigPaths: true },
    // Browser errors and warnings also show in the dev server log
    server: { forwardConsole: true },
    // Inventory of the bundled third-party packages, published with the site
    build: { license: { fileName: 'third-party-licenses.md' } },
    ssgOptions: {
        // Flat files: GitHub Pages serves news.html at /news, while news/index.html would 301 to /news/
        dirStyle: 'flat',
        beastiesOptions: false,
        includedRoutes: () => prerenderPaths,
        onPageRendered: (route, html, appCtx) => applyPageHead(route, html, appCtx.router.currentRoute.value.meta),
        onFinished: async () => {
            moveLocaleHomes('dist');
            writeSitemap('dist');
            writeLegacyRedirects('dist');
            await Promise.all([downloadAvatars('dist'), writeThumbnails('dist'), writeSocialImages('dist')]);
        },
    },
});
