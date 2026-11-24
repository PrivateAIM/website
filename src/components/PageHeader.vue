<template>
    <div class="page-header">
        <div class="page-header-inner">
            <h1>{{ title }}</h1>
            <p
                v-if="subtitle"
                class="header-subtitle"
            >
                {{ subtitle }}
            </p>
            <slot />
        </div>
        <!-- Same wave as the home hero, so every page header matches it -->
        <svg
            class="header-wave"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <path
                d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1150,100 1350,0 1440,50 L1440,100 L0,100 Z"
                class="wave-path"
            />
        </svg>
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
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--on-band) 14%, transparent) 1px, transparent 0) 0 0 / 22px 22px,
    var(--band-bg);
  color: var(--on-band);
  padding: 4rem 1rem 5.5rem;
  text-align: center;
}

.page-header-inner {
  position: relative;
  z-index: 1;
}

.page-header h1 {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  margin-bottom: 1rem;
}

.header-subtitle {
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.92;
}

.header-wave {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 48px;
}

.wave-path {
  fill: var(--body-bg);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .page-header {
    padding: 3rem 1rem 4.5rem;
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
    padding: 2.5rem 1rem 4rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .header-wave {
    height: 32px;
  }
}
</style>
