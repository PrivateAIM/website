<script setup lang="ts">
import { 
    computed, 
    onMounted, 
    onUnmounted, 
    ref, 
} from 'vue';
import { useRoute } from 'vue-router';
import {
    LOCALES, 
    localePath, 
    useLocale, 
    useTranslation,
} from '@/i18n';

import FlagEN from '@/assets/flags/en-flag.svg?no-inline';
import FlagDE from '@/assets/flags/de-flag.svg?no-inline';

type LocaleCode = (typeof LOCALES)[number]['code'];

// Flag icon per locale; LOCALES (in @/i18n) is the single source of truth for the
// locale list, and Record<LocaleCode, …> forces a flag entry for every locale.
const flags: Record<LocaleCode, string> = { en: FlagEN, de: FlagDE };
const languages = LOCALES.map((locale) => ({
    code: locale.code,
    label: locale.label,
    flag: flags[locale.code],
}));

const locale = useLocale();
const route = useRoute();
const activeLanguage = computed(() => locale.value);
const activeLanguageEntry = computed(
    () => languages.find((l) => l.code === activeLanguage.value) ?? languages[0]!,
);
const isOpen = ref(false);
const changeLanguageLabel = useTranslation('navigation.changeLanguage');
const dropdownRef = ref<HTMLElement | null>(null);

// The same page in another language; the router sets the locale from the URL
function switchTo(langCode: string) {
    return {
        path: localePath(route.path, langCode),
        query: route.query,
        hash: route.hash,
    };
}

// Dropdown umschalten
function toggleDropdown() {
    isOpen.value = !isOpen.value;
}

// Dropdown schließen, wenn außerhalb geklickt wird
function handleClickOutside(event: MouseEvent) {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        isOpen.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <div
        ref="dropdownRef"
        class="language-selector"
    >
        <button
            type="button"
            class="language-trigger"
            :class="{ active: isOpen }"
            :aria-label="`${changeLanguageLabel} (${activeLanguageEntry.label})`"
            aria-haspopup="true"
            :aria-expanded="isOpen"
            aria-controls="language-dropdown"
            @click="toggleDropdown"
        >
            <img
                :src="activeLanguageEntry.flag"
                alt=""
                class="flag-icon"
            >
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

        <div
            v-show="isOpen"
            id="language-dropdown"
            class="language-dropdown"
        >
            <router-link
                v-for="lang in languages"
                :key="lang.code"
                :to="switchTo(lang.code)"
                :hreflang="lang.code"
                :lang="lang.code"
                :aria-label="lang.label"
                class="language-option"
                :class="{ selected: activeLanguage === lang.code }"
                @click="isOpen = false"
            >
                <img
                    :src="lang.flag"
                    :alt="lang.label"
                    class="flag-icon"
                >
            </router-link>
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
  color: var(--nav-text);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.language-trigger:hover,
.language-trigger.active {
  color: var(--text-color);
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
  background-color: var(--card-bg);
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px color-mix(in srgb, var(--shadow-color) 10%, transparent);
  z-index: 50;
  overflow: hidden;
  animation: slideIn 0.1s ease-out;
}

.language-option {
  display: block;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  padding: 0.5rem;
  color: var(--nav-text);
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.language-option:hover {
  background-color: var(--tag-bg);
  color: var(--text-color);
}

.language-option.selected {
  background-color: var(--tag-bg);
  color: var(--link-color);
}

.flag-icon {
    width: 1.5rem;
    height: auto;
    border-radius: 0.125rem;
    margin-right: 0.25rem;
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
