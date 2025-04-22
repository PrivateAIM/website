<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

// Reduzierte Sprachoptionen
const languages = [
  { code: 'en', label: '🇺🇸' },
  { code: 'de', label: '🇩🇪' },
]

const { locale } = useI18n()
const activeLanguage = computed(() => locale.value)
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

// Sprache ändern
function changeLanguage(langCode: string) {
  locale.value = langCode
  isOpen.value = false
}

// Dropdown umschalten
function toggleDropdown() {
  isOpen.value = !isOpen.value
}

// Dropdown schließen, wenn außerhalb geklickt wird
function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
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
        :class="{ active: isOpen }"
        @click="toggleDropdown"
    >
      {{ languages.find(l => l.code === activeLanguage)?.label || '🌐' }}
      <svg
          xmlns="http://www.w3.org/2000/svg"
          class="chevron-icon"
          :class="{ rotate: isOpen }"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
      >
        <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m6 9l6 6l6-6"
        />
      </svg>
    </button>

    <div v-if="isOpen" class="language-dropdown">
      <button
          v-for="lang in languages"
          :key="lang.code"
          class="language-option"
          :class="{ selected: activeLanguage === lang.code }"
          @click="changeLanguage(lang.code)"
      >
        {{ lang.label }}
      </button>
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
  padding: 0.5rem;
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
  width: 80px;
  margin-top: 0.5rem;
  background-color: var(--card-bg, white);
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 50;
  overflow: hidden;
  animation: slideIn 0.1s ease-out;
}

.language-option {
  width: 100%;
  text-align: center;
  padding: 0.5rem;
  color: var(--nav-text, #64748b);
  background: none;
  border: none;
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
    right: -8px;
  }
}
</style>