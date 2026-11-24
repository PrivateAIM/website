<template>
    <section class="how-it-works">
        <h2><ITranslate path="home.howItWorks.title" /></h2>

        <ol class="steps-container">
            <li
                v-for="(step, index) in steps"
                :key="step.key"
                class="step"
            >
                <div class="step-badge">
                    <AppIcon
                        :name="step.icon"
                        :size="28"
                    />
                    <span class="step-number">{{ index + 1 }}</span>
                </div>
                <h3><ITranslate :path="`home.howItWorks.${step.key}.title`" /></h3>
                <p><ITranslate :path="`home.howItWorks.${step.key}.description`" /></p>
            </li>
        </ol>

        <div class="platform-cta">
            <div>
                <h3><ITranslate path="home.howItWorks.experienceFlame" /></h3>
                <p><ITranslate path="home.howItWorks.flamePlatform" /></p>
            </div>
            <router-link
                :to="localePath('/flame')"
                class="cta-button"
            >
                <ITranslate path="home.howItWorks.explorePlatform" />
                <AppIcon
                    name="arrow"
                    :size="18"
                />
            </router-link>
        </div>
    </section>
</template>

<script setup lang="ts">
import AppIcon from '@/components/shared/AppIcon.vue';
import { useLocalePath } from '@/i18n';

const localePath = useLocalePath();
const steps = [
    { key: 'step1', icon: 'server' },
    { key: 'step2', icon: 'code' },
    { key: 'step3', icon: 'chart' },
];
</script>

<style scoped>
.how-it-works {
  margin-bottom: 5rem;
  padding: 3rem;
  border-radius: 1rem;
  background-color: var(--tag-bg, #f7fafc);
}

h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  text-align: center;
  color: var(--text-color, #1a202c);
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
  margin: 0 0 2.5rem;
  padding: 0;
  list-style: none;
}

.step {
  position: relative;
  text-align: center;
}

/* Connector line between the step badges */
.step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 2rem;
  left: calc(50% + 2.75rem);
  width: calc(100% - 5.5rem + 2rem);
  border-top: 2px dashed var(--primary-color, #3182ce);
  opacity: 0.5;
}

.step-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, var(--primary-color, #3182ce) 0%, #4299e1 100%);
  color: #ffffff;
  box-shadow: 0 8px 18px rgba(30, 144, 255, 0.3);
}

.step-number {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: var(--card-bg, #ffffff);
  color: var(--primary-color, #3182ce);
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.step h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--text-color, #1a202c);
}

.step p {
  margin: 0;
  line-height: 1.6;
  color: var(--text-color, #4a5568);
}

.platform-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  border-radius: 0.75rem;
  background-color: var(--card-bg, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
}

.platform-cta h3 {
  font-size: 1.35rem;
  margin-bottom: 0.25rem;
  color: var(--text-color, #1a202c);
}

.platform-cta p {
  margin: 0;
  color: var(--text-color, #4a5568);
}

.cta-button {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  background-color: var(--primary-color, #3182ce);
  color: #ffffff;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.cta-button:hover {
  background-color: #1a75d1;
}

@media (max-width: 768px) {
  .how-it-works {
    padding: 2rem 1.25rem;
  }

  .steps-container {
    grid-template-columns: minmax(0, 1fr);
  }

  .step:not(:last-child)::after {
    display: none;
  }

  .platform-cta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
