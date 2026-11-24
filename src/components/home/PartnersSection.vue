<template>
    <section class="partners-section">
        <div class="section-container">
            <h2><ITranslate path="home.partners.title" /></h2>
            <div class="partners-grid">
                <!-- Partner logos -->
                <div class="partner-logo">
                    <img
                        loading="lazy"
                        decoding="async"
                        src="/images/partners/UKT.webp"
                        width="300"
                        height="51"
                        alt="University Hospital Tübingen"
                    >
                </div>
                <div class="partner-logo">
                    <img
                        loading="lazy"
                        decoding="async"
                        src="/images/partners/CHARITE.svg"
                        width="800"
                        height="295"
                        alt="Charité Berlin"
                    >
                </div>
                <div class="partner-logo">
                    <img
                        loading="lazy"
                        decoding="async"
                        src="/images/partners/TUM.svg"
                        width="266"
                        height="40"
                        alt="TUM Klinikum Rechts der Isar"
                    >
                </div>
                <div class="partner-logo">
                    <img
                        loading="lazy"
                        decoding="async"
                        src="/images/partners/UKHD.webp"
                        width="300"
                        height="66"
                        alt="University Hospital Heidelberg"
                    >
                </div>
                <div class="partner-logo">
                    <img
                        loading="lazy"
                        decoding="async"
                        src="/images/partners/UKER.svg"
                        width="371"
                        height="103"
                        alt="University Hospital Erlangen"
                    >
                </div>
                <div class="partner-logo">
                    <img
                        loading="lazy"
                        decoding="async"
                        src="/images/partners/UKL.webp"
                        width="300"
                        height="70"
                        alt="University Hospital Leipzig"
                    >
                </div>
                <div class="partner-logo">
                    <img
                        loading="lazy"
                        decoding="async"
                        src="/images/partners/UKFR.webp"
                        width="300"
                        height="51"
                        alt="University Hospital Freiburg"
                    >
                </div>
                <div class="partner-logo">
                    <img
                        loading="lazy"
                        decoding="async"
                        src="/images/partners/LMU.webp"
                        width="300"
                        height="142"
                        alt="LMU Munich"
                    >
                </div>
            </div>
            <div class="partner-cta">
                <router-link
                    :to="localePath('/partners')"
                    class="text-link"
                >
                    <ITranslate path="home.partners.viewAll" /> →
                </router-link>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useLocalePath } from '@/i18n';

const localePath = useLocalePath();
</script>
<style scoped>
.partners-section {
  background-color: var(--footer-bg);
  padding: 4rem 1rem;
}

.section-container {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}

h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--text-color);
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.partner-logo {
  height: 200px;
  background-color: var(--logo-plate);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  padding: 0.75rem;
  box-shadow: 0 2px 4px color-mix(in srgb, var(--shadow-color) 5%, transparent);
}

.partner-logo img {
  width: auto;
  height: auto;
  max-width: 90%;
  max-height: 140px;
  object-fit: contain;
}

.partner-cta {
  margin-top: 2rem;
}

.text-link {
  display: inline-block;
  padding-block: 5px;
  color: var(--link-color);
  text-decoration: none;
  font-weight: 500;
}

.text-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .partners-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .partners-grid {
    grid-template-columns: 1fr;
  }
}
</style>
