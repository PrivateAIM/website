<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue';
import { computed } from 'vue';
import { marked } from 'marked';
import { useLocale, useTranslation } from '@/i18n';
import policyEn from '@/data/privacy/privacy.en.md?raw';
import policyDe from '@/data/privacy/privacy.de.md?raw';

const locale = useLocale();
const pageTitle = useTranslation('privacy.title');

// Compute the rendered HTML from the Markdown content. Both locales are bundled
// so the policy is part of the prerendered page.
const renderedPolicy = computed(() => marked.parse(locale.value === 'de' ? policyDe : policyEn, { async: false }));
</script>

<template>
    <div class="legal-container">
        <PageHeader :title="pageTitle" />

        <div class="legal-content">
            <!-- Language notice - only shown for English -->
            <div
                v-if="locale === 'en'"
                class="language-notice"
            >
                <p class="alert alert-info">
                    <strong>Note:</strong> This legal notice is in Germany not legally binding and has been created for your convenience only.
                    We apologize for any inconveniences caused and refer to the
                    <router-link to="/de/privacy">
                        legally binding German version
                    </router-link> available on this site.
                </p>
            </div>

            <!-- Render the converted Markdown content -->
            <div class="privacy-container">
                <div v-html="renderedPolicy" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.legal-container {
  width: 100%;
}



.legal-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1rem 5rem;
  color: var(--text-color, #1a202c);
  font-family: var(--font-family);
  font-size: 1rem;
  line-height: 1.6;
}

.privacy-container {
  width: 100%;
}

.language-notice {
  background-color: #f8f9fa;
  border-left: 4px solid #ffc107;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.alert {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.alert-info {
  color: #0c5460;
  background-color: #d1ecf1;
  border-color: #bee5eb;
}

/* Dark mode styling */
body.dark-mode .language-notice {
  background-color: #1a1a2e;
  border-left-color: #ffc107;
}

body.dark-mode .alert-info {
  color: #d1ecf1;
  background-color: #0f3a4a;
  border-color: #164b5e;
}

/* Add global styles for the markdown rendered content */
:deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-color, #1a202c);
  border-bottom: 1px solid var(--border-color, #eaeaea);
  padding-bottom: 0.5rem;
}

:deep(h3) {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  color: var(--text-color, #1a202c);
}

:deep(p) {
  margin-bottom: 1.2rem;
  line-height: 1.6;
}

:deep(ul), :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

:deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

:deep(a) {
  color: var(--primary-color, #3182ce);
  text-decoration: none;
}

:deep(a:hover) {
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 768px) {


  .legal-content {
    padding: 2rem 1rem 3rem;
  }
}
</style>
