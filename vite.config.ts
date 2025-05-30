import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
    /**
     * todo: remove when moving to apex domain.
     */
    base: '/website/',
    plugins: [
        vue(),
        vueDevTools(),
    ],
    assetsInclude: ['**/*.md'],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
})
