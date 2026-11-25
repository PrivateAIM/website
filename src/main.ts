import { ViteSSG } from 'vite-ssg';
import { SCROLL_RESTORATION_CAPTURE_DEFAULT, ScrollRestoration } from 'vue-router/experimental';
import App from './App.vue';
import { installRouterHooks, routes } from './router';
import { restoreScroll } from './router/scroll';
import { appLocale, installTranslator } from './i18n';
import './assets/fonts.css';
import './assets/dark-mode.css';

export const createApp = ViteSSG(App, { routes }, ({ app, router }) => {
    // vite-ssg installs the router after this callback, as the plugin requires
    app.use(ScrollRestoration, {
        router,
        capture: SCROLL_RESTORATION_CAPTURE_DEFAULT,
        restore: restoreScroll,
    });
    installTranslator(app);
    installRouterHooks(router, appLocale(app));
});
