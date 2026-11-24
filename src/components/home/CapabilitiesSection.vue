<script setup lang="ts">
import AppIcon from '@/components/shared/AppIcon.vue';
import LinkText from '@/components/shared/LinkText.vue';
import { useTranslation } from '@/i18n';

// What FLAME supports, as described in the FLAME documentation (getting started)
const capabilities = [
    { key: 'statistics', icon: 'chart' },
    { key: 'learning', icon: 'layers' },
    { key: 'privacy', icon: 'shield' },
    { key: 'code', icon: 'code' },
];
const examples = useTranslation('home.capabilities.examples');
</script>
<template>
    <section class="capabilities">
        <h2><ITranslate path="home.capabilities.title" /></h2>
        <div class="capability-grid">
            <div
                v-for="capability in capabilities"
                :key="capability.key"
                class="capability"
            >
                <span class="capability-icon">
                    <AppIcon :name="capability.icon" />
                </span>
                <div>
                    <h3><ITranslate :path="`home.capabilities.${capability.key}.title`" /></h3>
                    <p><ITranslate :path="`home.capabilities.${capability.key}.description`" /></p>
                </div>
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
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.5rem;
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 0.75rem;
  background-color: var(--card-bg, #ffffff);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.capability:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.capability-icon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.6rem;
  background: linear-gradient(135deg, var(--primary-color, #3182ce) 0%, #4299e1 100%);
  color: #ffffff;
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
