<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { ConfigProvider } from 'reka-ui'
import { useTextDirection } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

type LanguageInfo = {
  label: string
  value: string
  dir: 'ltr' | 'rtl'
}

// Both German and English are LTR languages
// If you add RTL languages like Arabic, you would set dir: 'rtl' for them
const languages: LanguageInfo[] = [
  { label: 'English', value: 'en', dir: 'ltr' },
  { label: 'Deutsch', value: 'de', dir: 'ltr' }
]

const { locale } = useI18n()
const textDirection = useTextDirection({ initialValue: 'ltr' })
const dir = computed(() => textDirection.value === 'rtl' ? 'rtl' : 'ltr')

// If we need to change direction based on language
// For now, both languages are LTR, so this doesn't change anything
function updateLanguage(newLocale: string) {
  const langInfo = languages.find(lang => lang.value === newLocale)
  if (langInfo) {
    textDirection.value = langInfo.dir
  }
}

// Watch for locale changes to update direction if needed
watch(locale, (newLocale) => {
  updateLanguage(newLocale)
})

// Set initial direction based on current locale
onMounted(() => {
  updateLanguage(locale.value)
})
</script>

<template>
  <ConfigProvider :dir="dir">
    <slot />
  </ConfigProvider>
</template>
