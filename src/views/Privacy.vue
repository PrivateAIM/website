<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { marked } from 'marked'

const { locale } = useI18n()

// Function to switch to German version
function switchToGerman() {
  locale.value = 'de'
}

// Reactive variable to hold the raw Markdown content.
const policyContent = ref('')

// Asynchronously load the correct Markdown file based on the locale.
async function loadPolicy() {
  try {
    let module
    if (locale.value === 'en') {
      module = await import('@/data/privacy/privacy.en.md?raw')
    }
    else if (locale.value === 'de') {
      module = await import('@/data/privacy/privacy.de.md?raw')
    }
    policyContent.value = module?.default || 'Failed to load privacy policy.'
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {
    policyContent.value = 'Failed to load privacy policy.'
  }
}

// Load the policy when the component is mounted.
onMounted(() => {
  loadPolicy()
})

// Watch for locale changes to reload the content.
watch(locale, () => {
  loadPolicy()
})

// Compute the rendered HTML from the Markdown content.
const renderedPolicy = computed(() => {
  return marked(policyContent.value)
})
</script>

<template>
  <div class="legal-container">
    <div class="page-header">
      <h1>{{ $t('privacy.title') }}</h1>
    </div>

    <div class="legal-content">
      <!-- Language notice - only shown for English -->
      <div
          v-if="locale === 'en'"
          class="language-notice"
      >
        <p class="alert alert-info">
          <strong>Note:</strong> This legal notice is in Germany not legally binding and has been created for your convenience only.
          We apologize for any inconveniences caused and refer to the
          <a
              href="#"
              @click.prevent="switchToGerman"
          >legally binding German version</a> available on this site.
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

.page-header {
  background-color: var(--primary-color, #3182ce);
  color: white;
  padding: 3rem 1rem;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
}

.legal-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1rem 5rem;
  color: var(--text-color, #1a202c);
  font-family: var(--font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);
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
  .page-header {
    padding: 2rem 1rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .legal-content {
    padding: 2rem 1rem 3rem;
  }
}
</style>
