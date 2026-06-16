<template>
  <div class="mission-section">
    <h2><ITranslate path="home.mission.title" /></h2>

    <div class="mission-content">
      <div class="mission-text">
        <p><ITranslate path="home.mission.paragraph1" /></p>
        <p><ITranslate path="home.mission.paragraph2" /></p>
        <p><ITranslate path="home.mission.paragraph3" /></p>
      </div>

      <div class="action-card">
        <div class="card-content">
            <h3><ITranslate path="home.news.latestNews" /></h3>
            <p><ITranslate path="home.news.description" /></p>
            <div v-if="latestNewsItem" class="latest-news-item">
                <span class="news-date"></span>
                <h4 class="news-title">{{ latestNewsItem.date }} {{ latestNewsItem.title }}</h4>
                <p class="news-preview">{{ getNewsSummary(latestNewsItem.content) }}</p>
            </div>
          <router-link to="/news" class="card-link"><ITranslate path="home.news.button" /> →</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLocale } from '@/i18n';
import { type NewsEntry, news } from '@/data/news';

const locale = useLocale();
const newsByYear = computed(() => news[locale.value] ?? news.en);

// The most recent news item: first entry of the latest year that has any
// (entries within a year are authored newest-first).
const latestNewsItem = computed<NewsEntry | null>(() => {
    const years = Object.keys(newsByYear.value).sort((a, b) => parseInt(b) - parseInt(a));
    for (const year of years) {
        const items = newsByYear.value[year];
        if (items && items.length > 0) {
            return items[0];
        }
    }
    return null;
});

// Function to get a summary of the news content (first 100 characters)
const getNewsSummary = (content: string): string => {
    // Remove HTML tags
    const plainText = content.replace(/<[^>]*>/g, '');
    // Get first 100 characters
    return plainText.length > 100 ? `${plainText.substring(0, 100)}...` : plainText;
};
</script>

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
