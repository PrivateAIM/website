<template>
  <router-link v-if="internal" :to="url" class="inline-link">
    <slot>{{ text }}</slot>
  </router-link>
  <a v-else :href="finalUrl" class="inline-link" target="_blank" rel="noopener noreferrer">
    <slot>{{ text }}</slot>
  </a>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    required: true
  },
  internal: {
    type: Boolean,
    default: false
  }
});

// Process external URLs to ensure they have protocol
const finalUrl = computed(() => {
  if (props.internal) {
    return props.url;
  }

  // If URL already has protocol, return as is
  if (/^https?:\/\//.test(props.url)) {
    return props.url;
  }

  // Otherwise, add https://
  return `https://${props.url}`;
});
</script>

<style scoped>
.inline-link {
  color: var(--primary-color, #3182ce);
  text-decoration: none;
}
.inline-link:hover {
  text-decoration: underline;
}
</style>