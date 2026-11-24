import { URL, fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import type {} from 'vite-ssg';
import { avatarDevServer, downloadAvatars } from './scripts/avatars';
import {
    applyPageHead,
    moveLocaleHomes,
    prerenderPaths,
    writeLegacyRedirects,
    writeSitemap,
} from './scripts/prerender';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        avatarDevServer(),
    ],
    assetsInclude: ['**/*.md'],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
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
            await downloadAvatars('dist');
        },
    },
});
