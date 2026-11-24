<template>
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-brand">
                <router-link
                    :to="localePath('/')"
                    class="logo"
                >
                    <img
                        src="/images/logo-sm.webp"
                        alt="PrivateAIM Logo"
                        class="footer-logo"
                    >
                    <span class="logo-text">PrivateAIM</span>
                </router-link>
                <p class="footer-tagline">
                    <ITranslate path="footer.tagline" />
                </p>
                <div class="footer-social">
                    <a
                        href="https://github.com/PrivateAIM"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <AppIcon
                            name="code"
                            :size="18"
                        />
                    </a>
                    <a
                        href="https://docs.privateaim.net/"
                        target="_blank"
                        rel="noopener noreferrer"
                        :aria-label="docsLabel"
                    >
                        <AppIcon
                            name="book"
                            :size="18"
                        />
                    </a>
                </div>
            </div>

            <nav
                class="footer-links"
                aria-label="Footer navigation"
            >
                <div class="footer-column">
                    <div class="footer-header">
                        <ITranslate path="footer.project" />
                    </div>
                    <router-link
                        v-for="page in projectPages"
                        :key="page.path"
                        :to="localePath(page.path)"
                        class="footer-link"
                    >
                        <ITranslate :path="page.label" />
                    </router-link>
                </div>

                <div class="footer-column">
                    <div class="footer-header">
                        <ITranslate path="footer.documentation" />
                    </div>
                    <a
                        href="https://docs.privateaim.net/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="footer-link"
                    ><ITranslate path="footer.flame" /></a>
                    <a
                        href="https://github.com/PrivateAIM"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="footer-link"
                    ><ITranslate path="footer.github" /></a>
                    <router-link
                        v-for="reference in referenceLinks"
                        :key="reference.slug"
                        :to="localePath(`/references/${reference.slug}`)"
                        class="footer-link"
                    >
                        {{ reference.name }}
                    </router-link>
                </div>

                <div class="footer-column">
                    <div class="footer-header">
                        <ITranslate path="footer.legal" />
                    </div>
                    <router-link
                        :to="localePath('/imprint')"
                        class="footer-link"
                    >
                        <ITranslate path="footer.imprint" />
                    </router-link>
                    <router-link
                        :to="localePath('/privacy')"
                        class="footer-link"
                    >
                        <ITranslate path="footer.privacy" />
                    </router-link>
                </div>
            </nav>
        </div>

        <!-- Funding and network -->
        <div class="footer-funding">
            <div class="funding-item">
                <span class="funding-label"><ITranslate path="footer.sponsor" /></span>
                <a
                    href="https://www.gesundheitsforschung-bmftr.de/de/privateaim-medizininformatik-plattform-privatspharen-schutzende-analytik-in-der-medizin-16491.php"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        loading="lazy"
                        src="/images/BMFTR-dark.svg"
                        alt="Funded by the Federal Ministry of Research, Technology and Space (BMFTR)"
                        class="sponsor-logo sponsor-logo-dark"
                    >
                    <img
                        loading="lazy"
                        src="/images/BMFTR-light.svg"
                        alt="Funded by the Federal Ministry of Research, Technology and Space (BMFTR)"
                        class="sponsor-logo sponsor-logo-light"
                    >
                </a>
            </div>
            <div class="funding-item">
                <span class="funding-label"><ITranslate path="footer.partOf" /></span>
                <a
                    href="https://www.medizininformatik-initiative.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mii-link"
                >
                    <img
                        loading="lazy"
                        :src="`/images/mii/mii-logo-${locale === 'de' ? 'de' : 'en'}.webp`"
                        :alt="miiLabel"
                        :width="locale === 'de' ? 107 : 110"
                        height="64"
                        class="mii-logo"
                    >
                </a>
            </div>
        </div>

        <div class="copyright-container">
            <div class="copyright">
                <ITranslate
                    path="footer.copyright"
                    :data="{ year: currentYear }"
                />
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppIcon from '@/components/shared/AppIcon.vue';
import { useLocale, useLocalePath, useTranslation } from '@/i18n';
import { referenceContentForLocale, references } from '@/data/references';

const localePath = useLocalePath();
const docsLabel = useTranslation('footer.flame');
const miiLabel = useTranslation('footer.mii');

// Dynamic current year for copyright
const currentYear = computed(() => new Date().getFullYear());

const locale = useLocale();

const projectPages = [
    { path: '/flame', label: 'navigation.flame' },
    { path: '/federated-analysis', label: 'footer.explainer' },
    { path: '/news', label: 'navigation.news' },
    { path: '/publications', label: 'navigation.publications' },
    { path: '/team', label: 'navigation.team' },
    { path: '/partners', label: 'navigation.partners' },
];

// One footer link per predecessor project, so new data files appear automatically
const referenceLinks = computed(() => references.map((project) => ({
    slug: project.slug,
    name: referenceContentForLocale(project, locale.value).name,
})));
</script>

<style scoped>
.footer {
  margin-top: 3rem;
  padding: 3.5rem 0 1.5rem;
  border-top: 1px solid var(--border-color, #eaeaea);
  background-color: var(--footer-bg, #f7fafc);
}

.footer-container {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 2fr);
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto 2.5rem;
  padding: 0 1rem;
}

.logo {
  display: inline-flex;
  align-items: center;
  color: var(--text-color, #1a202c);
  text-decoration: none;
}

.footer-logo {
  width: auto;
  height: 44px;
  margin-right: 0.75rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
}

.footer-tagline {
  max-width: 320px;
  margin: 1rem 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--footer-text, #718096);
}

.footer-social {
  display: flex;
  gap: 0.5rem;
}

.footer-social a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 50%;
  color: var(--footer-text, #718096);
  transition: color 0.2s, border-color 0.2s;
}

.footer-social a:hover {
  border-color: var(--primary-color, #3182ce);
  color: var(--primary-color, #3182ce);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-header {
  margin-bottom: 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-color, #1a202c);
}

.footer-link {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  margin-bottom: 0.5rem;
  font-size: 0.92rem;
  color: var(--footer-text, #718096);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--primary-color, #3182ce);
}

.footer-funding {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.5rem 4rem;
  max-width: 1200px;
  margin: 0 auto 1.5rem;
  padding: 1.5rem 1rem;
  border-top: 1px solid var(--border-color, #eaeaea);
}

.funding-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.funding-label {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--footer-text, #718096);
}

.sponsor-logo {
  width: auto;
  height: 56px;
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

.mii-link {
  display: inline-flex;
  border-radius: 0.5rem;
}

.mii-logo {
  display: block;
  width: auto;
  height: 64px;
}

/* The MII logo has grey text (and the English one a white background), so it sits on a light plate in dark mode */
.dark-mode .mii-logo {
  padding: 4px 8px;
  border-radius: 0.5rem;
  background-color: #ffffff;
}

.copyright-container {
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-color, #eaeaea);
  text-align: center;
}

.copyright {
  font-size: 0.85rem;
  color: var(--copyright, #a0aec0);
}

@media (max-width: 860px) {
  .footer-container {
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
  }
}

@media (max-width: 560px) {
  .footer-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .funding-item {
    flex-direction: column;
    gap: 0.5rem;
  }

  .sponsor-logo,
  .mii-logo {
    height: 44px;
  }
}
</style>
