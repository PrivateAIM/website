<template>
    <header
        class="header"
        :class="{ scrolled: isScrolled }"
    >
        <div class="header-container">
            <div class="logo-section">
                <router-link
                    :to="localePath('/')"
                    class="logo"
                >
                    <img
                        src="/images/logo-sm.webp"
                        alt="PrivateAIM Logo"
                        class="header-logo"
                    >
                    <span class="logo-text">PrivateAIM</span>
                </router-link>
            </div>

            <!-- Navigation für Desktop und Mobile -->
            <nav
                class="main-nav"
                :class="{ 'mobile-menu-open': isMobileMenuOpen }"
                aria-label="Main navigation"
            >
                <router-link
                    :to="localePath('/')"
                    class="nav-item"
                    @click="closeMobileMenu"
                >
                    <ITranslate path="navigation.home" />
                </router-link>
                <router-link
                    :to="localePath('/flame')"
                    class="nav-item"
                    @click="closeMobileMenu"
                >
                    <ITranslate path="navigation.flame" />
                </router-link>
                <router-link
                    :to="localePath('/news')"
                    class="nav-item"
                    @click="closeMobileMenu"
                >
                    <ITranslate path="navigation.news" />
                </router-link>
                <router-link
                    :to="localePath('/publications')"
                    class="nav-item"
                    @click="closeMobileMenu"
                >
                    <ITranslate path="navigation.publications" />
                </router-link>
                <router-link
                    :to="localePath('/team')"
                    class="nav-item"
                    @click="closeMobileMenu"
                >
                    <ITranslate path="navigation.team" />
                </router-link>
                <router-link
                    :to="localePath('/partners')"
                    class="nav-item"
                    @click="closeMobileMenu"
                >
                    <ITranslate path="navigation.partners" />
                </router-link>
            </nav>

            <div class="header-right">
                <LanguageSelector />
                <ThemeToggle />
                <a
                    href="https://github.com/PrivateAIM"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="github-link"
                >
                    <img
                        loading="lazy"
                        src="/images/icons/github-mark.svg"
                        class="icon-light logo-light"
                        alt="GitHub"
                    >
                    <img
                        loading="lazy"
                        src="/images/icons/github-mark-white.svg"
                        class="icon-dark logo-dark"
                        alt="GitHub"
                    >
                </a>
                <a
                    href="https://discord.gg/yCTX7ePnhb"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="github-link"
                >
                    <img
                        loading="lazy"
                        src="/images/icons/discord-mark.svg"
                        class="icon-light logo-light"
                        alt="Discord"
                    >
                    <img
                        loading="lazy"
                        src="/images/icons/discord-mark-white.svg"
                        class="icon-dark logo-dark"
                        alt="Discord"
                    >
                </a>

                <!-- Burger-Menü Button (nur für mobile) -->
                <button
                    class="burger-menu-btn"
                    :class="{ 'active': isMobileMenuOpen }"
                    aria-label="Toggle menu"
                    @click="toggleMobileMenu"
                >
                    <span class="burger-bar" />
                    <span class="burger-bar" />
                    <span class="burger-bar" />
                </button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import {
    onBeforeUnmount, 
    onMounted, 
    ref, 
    watch,
} from 'vue';
import { useRoute } from 'vue-router';
import { useLocalePath } from '@/i18n';
import LanguageSelector from './LanguageSelector.vue';
import ThemeToggle from './ThemeToggle.vue';

const localePath = useLocalePath();

// Shadow under the sticky header once the page is scrolled
const isScrolled = ref(false);
const onScroll = () => {
    isScrolled.value = window.scrollY > 8;
};
onMounted(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
});
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));

// Mobile Menu State
const isMobileMenuOpen = ref(false);
const route = useRoute();

// Close mobile menu on any route change (including browser back/forward)
watch(() => route.path, () => {
    closeMobileMenu();
});

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
  background-color: var(--header-bg);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  box-sizing: border-box;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.header.scrolled {
  border-bottom-color: transparent;
  box-shadow: 0 4px 16px color-mix(in srgb, var(--shadow-color) 8%, transparent);
}

.dark-mode .header.scrolled {
  box-shadow: 0 4px 16px color-mix(in srgb, var(--shadow-color) 50%, transparent);
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
  color: var(--text-color);
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
  color: var(--nav-text);
  font-size: 0.95rem;
  font-weight: 500;
}

.nav-item.router-link-active {
  color: var(--link-color);
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 2px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.github-link {
  text-decoration: none;
  color: var(--nav-text);
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
  /* 50x44px touch target around the 30x20px icon, without moving it; the right
     side stays within the 0.5rem header padding on small screens */
  box-sizing: content-box;
  padding: 12px 8px 12px 12px;
  margin: -12px -8px -12px -12px;
  z-index: 20;
  flex-shrink: 0;
}

.burger-bar {
  width: 100%;
  height: 2px;
  background-color: var(--text-color);
  transition: all 0.3s ease;
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
    background-color: var(--header-bg);
    border-bottom: 1px solid var(--border-color);
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
    background-color: var(--header-bg);
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
