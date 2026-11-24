import { ViteSSG } from 'vite-ssg';
import App from './App.vue';
import { installRouterHooks, routes, scrollBehavior } from './router';
import { installTranslator } from './i18n';
import './assets/fonts.css';
import './assets/dark-mode.css';

export const createApp = ViteSSG(App, { routes, scrollBehavior }, ({ app, router }) => {
    installRouterHooks(router);
    installTranslator(app);
});
