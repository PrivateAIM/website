<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-left">
        <router-link to="/" class="logo">
            <img src="/images/logo.png" alt="PrivateAIM Logo" class="footer-logo" />
            <span class="logo-text">PrivateAIM</span>
        </router-link>
      </div>

      <div class="footer-links">
        <div class="footer-column">
          <div class="footer-header">{{ $t('footer.documentation') }}</div>
          <a href="https://docs.privateaim.net/" target="_blank" class="footer-link">{{ $t('footer.flame') }}</a>
          <a href="https://github.com/PrivateAIM" target="_blank" class="footer-link">{{ $t('footer.github') }}</a>
        </div>

        <div class="footer-column">
          <div class="footer-header">{{ $t('footer.legal') }}</div>
          <router-link to="/imprint" class="footer-link">{{ $t('footer.imprint') }}</router-link>
          <router-link to="/privacy" class="footer-link">{{ $t('footer.privacy') }}</router-link>
        </div>
          <div class="footer-column">
              <div class="footer-header">{{ $t('footer.sponsor') }}</div>
              <img src="/images/BMFTR-dark.svg" alt="Sponsor Logo Dark" class="sponsor-logo sponsor-logo-dark" />
              <img src="/images/BMFTR-light.svg" alt="Sponsor Logo Light" class="sponsor-logo sponsor-logo-light" />
          </div>
      </div>
    </div>

    <div class="copyright-container">
      <div class="copyright">
        {{ $t('footer.copyright', { year: currentYear }) }}
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Dynamic current year for copyright
const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
/* Footer */
.footer {
  border-top: 1px solid var(--border-color, #eaeaea);
  background-color: var(--footer-bg, #f7fafc);
  padding: 3rem 0 1.5rem;
  margin-top: 3rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.footer-left {
  display: flex;
  align-items: center;
}


.logo {
  text-decoration: none;
  color: var(--text-color, #1a202c);
  display: flex;
  align-items: center;
}

.logo-dark {
  height: 32px;
  width: auto;
  margin-right: 0.75rem;
  display: none;
}

.logo-light {
  height: 32px;
  width: auto;
  margin-right: 0.75rem;
  display: block;
}

.dark-mode .logo-dark {
  display: block;
}

.dark-mode .logo-light {
  display: none;
}

.footer-links {
  display: flex;
  gap: 4rem;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-header {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  color: var(--text-color, #1a202c);
}

.footer-link {
  color: var(--footer-text, #718096);
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--primary-color, #3182ce);
}

.copyright-container {
  text-align: center;
  border-top: 1px solid var(--border-color, #eaeaea);
  padding-top: 1.5rem;
}

.copyright {
  color: var(--copyright, #a0aec0);
  font-size: 0.85rem;
}
.footer-logo {
    height: 24px;
    width: auto;
    margin-right: 0.5rem;
}
.footer-logo {
    height: 32px;
    width: auto;
    margin-right: 0.5rem;
}

.sponsor-logo {
    height: 60px;
    width: auto;
}

.sponsor-logo-light {
    display: block;
}

.sponsor-logo-dark {
    display: none;
}

.dark-mode .sponsor-logo-dark {
    display: block;
}

.dark-mode .sponsor-logo-light {
    display: none;
}


/* Responsive adjustments */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    gap: 2rem;
  }

  .footer-left {
    justify-content: center;
  }

  .footer-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-links {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    text-align: center;
  }
    .footer-logo {
        height: 20px;
    }
    .sponsor-logo {
        height: 40px;
    }
}
</style>

