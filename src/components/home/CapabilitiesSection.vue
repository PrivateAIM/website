<script setup lang="ts">
import LinkText from '@/components/shared/LinkText.vue';
import { useTranslation } from '@/i18n';

// What FLAME supports, as described in the FLAME documentation (getting started)
const capabilities = ['statistics', 'learning', 'privacy', 'code'];
const examples = useTranslation('home.capabilities.examples');
</script>
<template>
    <section class="capabilities">
        <h2><ITranslate path="home.capabilities.title" /></h2>
        <div class="capability-grid">
            <div
                v-for="capability in capabilities"
                :key="capability"
                class="capability"
            >
                <h3><ITranslate :path="`home.capabilities.${capability}.title`" /></h3>
                <p><ITranslate :path="`home.capabilities.${capability}.description`" /></p>
            </div>
        </div>
        <LinkText
            :text="examples"
            tag="p"
            class="capability-examples"
        />
    </section>
</template>

<style scoped>
.capabilities {
  margin-bottom: 5rem;
}

h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--text-color, #1a202c);
}

.capability-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.capability {
  padding: 1.5rem;
  border: 1px solid var(--border-color, #e2e8f0);
  border-left: 4px solid var(--primary-color, #3182ce);
  border-radius: 0.5rem;
  background-color: var(--card-bg, #ffffff);
}

.capability h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--text-color, #1a202c);
}

.capability p {
  margin: 0;
  line-height: 1.6;
  color: var(--text-color, #4a5568);
}

.capability-examples {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  line-height: 1.6;
  color: var(--text-color, #4a5568);
}

@media (max-width: 640px) {
  .capability-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
