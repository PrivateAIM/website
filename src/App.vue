<template>
    <LanguageProvider>
        <div class="app">
            <a
                href="#main-content"
                class="skip-link"
            ><ITranslate path="navigation.skipToContent" /></a>
            <RekaHeader />
            <main
                id="main-content"
                class="main-content"
            >
                <router-view v-slot="{ Component }">
                    <transition
                        name="page-fade"
                        mode="out-in"
                    >
                        <component :is="Component" />
                    </transition>
                </router-view>
            </main>
            <JsonLd :nodes="pageNodes" />
            <CookieBanner />
            <BackToTop />
            <RekaFooter />
        </div>
    </LanguageProvider>
</template>

<script setup lang="ts">
import RekaHeader from './components/RekaHeader.vue';
import RekaFooter from './components/RekaFooter.vue';
import LanguageProvider from './components/LanguageProvider.vue';
import CookieBanner from './components/CookieBanner.vue';
import BackToTop from './components/BackToTop.vue';
import JsonLd from './components/shared/JsonLd';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { localePath, useLocale } from '@/i18n';
import {
    breadcrumbNode,
    flameNode,
    projectNode,
    projectReferenceNode,
    publicationListId,
    webPageNode,
    websiteNode,
} from '@/seo/structuredData';

const route = useRoute();
const locale = useLocale();

const PAGE_TYPES: Record<string, string> = {
    News: 'CollectionPage',
    Publications: 'CollectionPage',
    Team: 'AboutPage',
    Partners: 'AboutPage',
};

// The project is described on the home pages; other pages reference it by @id
const pageNodes = computed(() => {
    const page = String(route.name ?? '').replace(/-de$/, '');
    const path = localePath(route.path, locale.value);
    const title = route.meta.title ?? 'PrivateAIM';
    const isHome = page === 'Home';
    let mainEntity: string | undefined;
    if (page === 'Publications') mainEntity = publicationListId(path);
    if (page === 'Flame') mainEntity = flameNode['@id'] as string;

    return [
        websiteNode,
        webPageNode({
            path,
            name: title,
            description: route.meta.description,
            locale: locale.value,
            type: PAGE_TYPES[page],
            mainEntity,
        }),
        ...(isHome ? [projectNode, flameNode] : [projectReferenceNode]),
        ...(page === 'Flame' ? [flameNode] : []),
        ...(isHome || page === 'NotFound' ? [] : [breadcrumbNode(localePath('/', locale.value), 'PrivateAIM', path, title.split(' — ')[0] ?? title)]),
    ];
});
</script>

<style>
.app {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color, #2c3e50);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.main-content {
  flex: 1;
}

/* Base styles using CSS variables for theme support */
body {
  margin: 0;
  padding: 0;
  background-color: var(--body-bg, #ffffff);
  transition: background-color 0.3s ease, color 0.3s ease;
}

a {
  color: var(--primary-color, #3182ce);
}

/* Add smooth transitions for color changes */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* Skip to content link — hidden until focused */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: var(--primary-color, #3182ce);
  color: white;
  border-radius: 0 0 0.5rem 0.5rem;
  z-index: 100;
  text-decoration: none;
  font-weight: 600;
}

.skip-link:focus {
  top: 0;
}

/* Page route transitions */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>
