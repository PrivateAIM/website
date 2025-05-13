<template>
  <header class="header">
    <div class="header-container">
      <div class="logo-section">
        <router-link to="/" class="logo">
            <img src="/images/logo.png" alt="PrivateAIM Logo" class="header-logo" />
            <span class="logo-text">PrivateAIM</span>
                  </router-link>
      </div>

      <!-- Navigation für Desktop und Mobile -->
      <nav class="main-nav" :class="{ 'mobile-menu-open': isMobileMenuOpen }">
        <router-link to="/" class="nav-item" @click="closeMobileMenu">{{ $t('navigation.home') }}</router-link>
        <router-link to="/news" class="nav-item" @click="closeMobileMenu">{{ $t('navigation.news') }}</router-link>
        <router-link to="/blog" class="nav-item" @click="closeMobileMenu">{{ $t('navigation.blog') }}</router-link>
        <router-link to="/publications" class="nav-item" @click="closeMobileMenu">{{ $t('navigation.publications') }}</router-link>
        <!-- <router-link to="/team" class="nav-item" @click="closeMobileMenu">{{ $t('navigation.team') }}</router-link>
        <router-link to="/partners" class="nav-item" @click="closeMobileMenu">{{ $t('navigation.partners') }}</router-link> -->
      </nav>

      <div class="header-right">
        <LanguageSelector />
        <ThemeToggle />
        <a href="https://github.com/PrivateAIM" target="_blank" class="github-link">
          <img
              src="/images/icons/github-mark.svg"
              class="icon-light logo-light"
              alt="GitHub"
          />
          <img
              src="/images/icons/github-mark-white.svg"
              class="icon-dark logo-dark"
              alt="GitHub"
          />
        </a>
        <a href="https://discord.gg/yCTX7ePnhb" target="_blank" class="github-link">
          <img
              src="/images/icons/discord-mark.svg"
              class="icon-light logo-light"
              alt="Discord"
          />
          <img
              src="/images/icons/discord-mark-white.svg"
              class="icon-dark logo-dark"
              alt="Discord"
          />
        </a>

        <!-- Burger-Menü Button (nur für mobile) -->
        <button class="burger-menu-btn" :class="{ 'active': isMobileMenuOpen }" @click="toggleMobileMenu" aria-label="Toggle menu">
          <span class="burger-bar"></span>
          <span class="burger-bar"></span>
          <span class="burger-bar"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LanguageSelector from './LanguageSelector.vue';
import ThemeToggle from './ThemeToggle.vue';

// Mobile Menu State
const isMobileMenuOpen = ref(false);

// Toggle Mobile Menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;

  // Bei geöffnetem Menü Scrolling unterbinden
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// Close Mobile Menu (when clicking a nav item)
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = '';
};
</script>

<style scoped>
/* Header */
.header {
  background-color: var(--header-bg, #ffffff);
  border-bottom: 1px solid var(--border-color, #eaeaea);
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  box-sizing: border-box;
}

.header-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.logo-section {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo {
  text-decoration: none;
  color: var(--text-color, #1a202c);
  display: flex;
  align-items: center;
}

/* Logo Konsistenz für hellen und dunklen Modus */
.header-logo {
  height: 32px;
  width: auto;
  margin-right: 0.75rem;
  max-width: 100%;
}

.logo-dark {
  display: none;
}

.logo-light {
  display: block;
}

.icon-dark {
  height: 25px;
  width: 25px;
  margin-right: 0.25rem;
  display: none;
}

.icon-light {
  height: 25px;
  width: 25px;
  margin-right: 0.25rem;
  display: block;
}

.dark-mode .logo-dark {
  display: block;
}

.dark-mode .logo-light {
  display: none;
}

.dark-mode .icon-dark {
  display: block;
}

.dark-mode .icon-light {
  display: none;
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
  flex-shrink: 0;
}

.github-link {
  text-decoration: none;
  color: var(--nav-text, #4a5568);
  font-size: 0.9rem;
  font-weight: 500;
}

/* Burger Menu Button (standardmäßig versteckt) */
.burger-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 20;
  flex-shrink: 0;
}

.burger-bar {
  width: 100%;
  height: 2px;
  background-color: var(--text-color, #1a202c);
  transition: all 0.3s ease;
}

.dark-mode .burger-bar {
  background-color: #ffffff;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-nav {
    gap: 1rem;
  }

  .header-right {
    gap: 0.75rem;
  }

  .github-link span {
    display: none;
  }
}

@media (max-width: 600px) {
  .logo-text {
    display: none;
  }

  .header-container {
    padding: 0 0.5rem;
  }
}

/* Mobile Menu Styling */
@media (max-width: 768px) {
  /* Burger Menu Button anzeigen */
  .burger-menu-btn {
    display: flex;
    margin-left: 0.25rem;
  }

  /* Desktop Navigation ausblenden im mobilen Modus */
  .main-nav {
    display: none;
  }

  /* Hauptnavigation für Mobile */
  .main-nav.mobile-menu-open {
    display: flex;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: var(--header-bg, #ffffff);
    border-bottom: 1px solid var(--border-color, #eaeaea);
    padding: 1rem;
    gap: 1.5rem;
    height: auto;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
    z-index: 19;
    box-sizing: border-box;
    width: 100%;
  }

  .nav-item {
    padding: 0.5rem 0;
    font-size: 1rem;
    width: 100%;
    text-align: center;
  }

  /* Dunkler Modus für mobile Navigation */
  .dark-mode .main-nav.mobile-menu-open {
    background-color: var(--header-bg, #1a1a1a);
  }

  /* Animation für Burger Icon */
  .burger-menu-btn.active .burger-bar:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }

  .burger-menu-btn.active .burger-bar:nth-child(2) {
    opacity: 0;
  }

  .burger-menu-btn.active .burger-bar:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }
}

/* Dark Mode Mobile Menu Styles */
@media (max-width: 768px) {
  .dark-mode .burger-menu-btn {
    display: flex;
  }
}
</style>
