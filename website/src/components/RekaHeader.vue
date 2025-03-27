<template>
  <header class="header">
    <div class="header-container">
      <div class="logo-section">
        <router-link to="/" class="logo">
          <img src="/images/logo.png" alt="PrivateAIM Logo" class="header-logo" />
          <span class="logo-text">PrivateAIM</span>
        </router-link>
      </div>

      <nav class="main-nav">
        <router-link to="/" class="nav-item">{{ $t('navigation.home') }}</router-link>
        <router-link to="/news" class="nav-item">{{ $t('navigation.news') }}</router-link>
        <router-link to="/blog" class="nav-item">{{ $t('navigation.blog') }}</router-link>
        <router-link to="/team" class="nav-item">{{ $t('navigation.team') }}</router-link>
        <router-link to="/partners" class="nav-item">{{ $t('navigation.partners') }}</router-link>
      </nav>

      <div class="header-right">
        <LanguageSelector />
        <ThemeToggle />
        <a href="https://github.com/PrivateAIM" target="_blank" class="github-link">
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import LanguageSelector from './LanguageSelector.vue';
import ThemeToggle from './ThemeToggle.vue';
</script>

<style scoped>
/* Header */
.header {
  background-color: var(--header-bg, #ffffff);
  border-bottom: 1px solid var(--border-color, #eaeaea);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo {
  text-decoration: none;
  color: var(--text-color, #1a202c);
  display: flex;
  align-items: center;
}

.header-logo {
  height: 32px;
  width: auto;
  margin-right: 0.75rem;
}

.logo-text {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--text-color, #1a202c);
}

.main-nav {
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  text-decoration: none;
  color: var(--nav-text, #4a5568);
  font-size: 0.95rem;
  font-weight: 500;
}

.nav-item.router-link-active {
  color: var(--primary-color, #3182ce);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.github-link {
  text-decoration: none;
  color: var(--nav-text, #4a5568);
  font-size: 0.9rem;
  font-weight: 500;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-nav {
    gap: 1rem;
  }

  .github-link span {
    display: none;
  }

  .github-link:after {
    content: "GH";
  }
}

@media (max-width: 600px) {
  .logo-text {
    display: none;
  }

  .main-nav {
    gap: 0.75rem;
  }

  .nav-item {
    font-size: 0.85rem;
  }
}
</style>
