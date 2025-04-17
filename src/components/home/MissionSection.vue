<template>
  <div class="mission-section">
    <h2>{{ $t('home.mission.title') }}</h2>

    <div class="mission-content">
      <div class="mission-text">
        <p v-html="$t('home.mission.paragraph1')"></p>
        <p v-html="$t('home.mission.paragraph2')"></p>
        <p v-html="$t('home.mission.paragraph3')"></p>
      </div>

      <div class="action-card">
        <div class="card-content">
          <h3>{{ $t('home.news.latestNews') }}</h3>
          <p>{{ $t('home.news.description') }}</p>
          <router-link to="/news" class="card-link">{{ $t('home.news.button') }} →</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mission-section {
  margin-bottom: 5rem;
}

h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--text-color, #1a202c);
}

.mission-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: start;
}

.mission-text {
  font-size: 1.125rem;
  line-height: 1.7;
}

.mission-text p {
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
  .mission-content {
    grid-template-columns: 1fr;
  }
}
</style>
