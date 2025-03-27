<template>
  <div class="vision-section">
    <h2>{{ $t('home.vision.title') }}</h2>

    <div class="vision-content">
      <div class="vision-text">
        <p v-html="$t('home.vision.paragraph1')"></p>
        <p v-html="$t('home.vision.paragraph2')"></p>
        <p v-html="$t('home.vision.paragraph3')"></p>
      </div>

      <div class="action-card">
        <div class="card-content">
          <h3>Open Source Contributions</h3>
          <p>Explore our code repositories and contribute to the future of privacy-preserving medical research.</p>
          <a href="https://github.com/PrivateAIM" target="_blank" class="card-link">Visit GitHub →</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vision-section {
  margin-bottom: 5rem;
}

h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--text-color, #1a202c);
}

.vision-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: start;
}

.vision-text {
  font-size: 1.125rem;
  line-height: 1.7;
}

.vision-text p {
  margin-bottom: 1.5rem;
}

.action-card {
  background-color: var(--card-bg, #ffffff);
  border: 1px solid var(--border-color, #eaeaea);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  height: fit-content;
}

.card-content {
  padding: 2rem;
}

.card-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color, #1a202c);
}

.card-link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--primary-color, #3182ce);
  font-weight: 500;
  text-decoration: none;
}

.card-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .vision-content {
    grid-template-columns: 1fr;
  }
}
</style>
