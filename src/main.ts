import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { installTranslator } from './i18n';
import './assets/fonts.css';
import './assets/dark-mode.css';

const app = createApp(App);

const redirectPath = sessionStorage.getItem('redirect-path');
if (redirectPath) {
    sessionStorage.removeItem('redirect-path');
    router.replace(redirectPath);
}

app.use(router);
installTranslator(app);

app.mount('#app');
