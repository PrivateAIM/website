<template>
  <LanguageProvider>
    <div class="app">
      <RekaHeader />
      <main class="main-content">
        <router-view />
      </main>
      <CookieBanner />
      <RekaFooter />
    </div>
  </LanguageProvider>
</template>

<script setup lang="ts">
import RekaHeader from './components/RekaHeader.vue';
import RekaFooter from './components/RekaFooter.vue';
import LanguageProvider from './components/LanguageProvider.vue';
import CookieBanner from './components/CookieBanner.vue';
</script>

<style>
.app {
  font-family:'Helvetica Neue';
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
</style>
