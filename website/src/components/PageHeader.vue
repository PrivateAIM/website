<template>
  <div class="page-header">
    <h1>{{ title }}</h1>
    <p v-if="subtitle" class="header-subtitle">
      {{ subtitle }}
    </p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

defineProps<PageHeaderProps>();
</script>

<style scoped>
.page-header {
  background-color: var(--primary-color, #3182ce);
  color: white;
  padding: 4rem 1rem;
  text-align: center;
}

.page-header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.header-subtitle {
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .page-header {
    padding: 3rem 1rem;
  }

  .page-header h1 {
    font-size: 2.5rem;
  }

  .header-subtitle {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 2.5rem 1rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }
}
</style>
