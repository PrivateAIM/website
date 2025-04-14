<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

// Define language options
const languages = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' }
]

const { locale } = useI18n()

// Set active language based on current locale
const activeLanguage = ref(locale.value)
const isOpen = ref(false)
const dropdownRef = ref(null)

// Function to change language
const changeLanguage = (langCode) => {
  locale.value = langCode
  activeLanguage.value = langCode
  isOpen.value = false
}

// Toggle dropdown
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// Get current language label
const currentLanguageLabel = () => {
  const lang = languages.find(l => l.code === activeLanguage.value)
  return lang ? lang.label : 'Language'
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="language-selector">
    <button
      type="button"
      class="language-trigger"
      :class="{ 'active': isOpen }"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      @click="toggleDropdown"
    >
      <span>{{ currentLanguageLabel() }}</span>
      <!-- Chevron down icon (similar to the lucide icon in your example) -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ml-1 chevron-icon"
        :class="{ 'rotate': isOpen }"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"></path>
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="language-dropdown"
    >
      <div class="language-menu">
        <button
          v-for="lang in languages"
          :key="lang.code"
          class="language-option"
          :class="{ 'selected': activeLanguage === lang.code }"
          @click="changeLanguage(lang.code)"
        >
          {{ lang.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.language-selector {
  position: relative;
  display: inline-block;
}

.language-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--nav-text, #64748b);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.language-trigger:hover,
.language-trigger.active {
  color: var(--text-color, #1e293b);
}

.chevron-icon {
  margin-left: 0.25rem;
  transition: transform 0.2s ease;
}

.chevron-icon.rotate {
  transform: rotate(180deg);
}

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 160px;
  margin-top: 0.5rem;
  background-color: var(--card-bg, white);
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 50;
  overflow: hidden;
  animation: slideIn 0.1s ease-out;
}

.language-menu {
  padding: 0.25rem;
}

.language-option {
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: var(--nav-text, #64748b);
  background: none;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.language-option:hover {
  background-color: var(--tag-bg, #f1f1f1);
  color: var(--text-color, #1e293b);
}

.language-option.selected {
  background-color: var(--tag-bg, #f1f1f1);
  color: var(--primary-color, #3182ce);
  font-weight: 500;
}

@keyframes slideIn {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .language-dropdown {
    right: -2rem;
  }
}
</style>
