<template>
  <section class="partners-section">
    <div class="section-container">
      <h2>{{ $t('home.partners.title') }}</h2>
      <div class="partners-grid">
        <!-- Partner logos -->
        <div class="partner-logo">
          <img src="/images/partners/UKT.png" alt="University Hospital Tübingen" />
        </div>
        <div class="partner-logo">
          <img src="/images/partners/BIH.png" alt="Charité Berlin" />
        </div>
        <div class="partner-logo">
          <img src="/images/partners/TUM.svg" alt="TUM Munich" />
        </div>
        <div class="partner-logo">
          <img src="/images/partners/UKHD.png" alt="University Hospital Heidelberg" />
        </div>
        <div class="partner-logo">
          <img src="/images/partners/UKER.svg" alt="University Hospital Erlangen" />
        </div>
        <div class="partner-logo">
          <img src="/images/partners/UKL.png" alt="University Hospital Leipzig" />
        </div>
        <div class="partner-logo">
          <img src="/images/partners/UKFR.png" alt="University Hospital Freiburg" />
        </div>
        <div class="partner-logo">
          <img src="/images/partners/LMU.png" alt="LMU Munich" />
        </div>
      </div>
      <div class="partner-cta">
        <router-link to="/partners" class="text-link">{{ $t('home.partners.viewAll') }} →</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partners-section {
  background-color: var(--footer-bg, #f7fafc);
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
  color: var(--text-color, #1a202c);
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.partner-logo {
  height: 100px;
  background-color: var(--card-bg, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.partner-logo img {
  max-width: 80%;
  max-height: 60px;
  object-fit: contain;
}

.partner-cta {
  margin-top: 2rem;
}

.text-link {
  color: var(--primary-color, #3182ce);
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
<script setup lang="ts">
</script>
