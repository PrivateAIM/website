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
            <div v-if="latestNewsItem" class="latest-news-item">
                <span class="news-date"></span>
                <h4 class="news-title">{{ latestNewsItem.date }} {{ latestNewsItem.title }}</h4>
                <p class="news-preview">{{ getNewsSummary(latestNewsItem.content) }}</p>
            </div>
            <p v-else>{{ $t('home.news.description') }}</p>
          <router-link to="/news" class="card-link">{{ $t('home.news.button') }} →</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, messages } = useI18n();

// Define types for news items
interface NewsItem {
    date: string;
    title: string;
    content: string;
    images?: string[];
}

// Function to get news items for most recent year
const getMostRecentNewsItems = (): NewsItem[] => {
    try {
        // Access the messages object directly using the current locale
        const currentLocaleMessages = messages.value[locale.value];

        if (typeof currentLocaleMessages?.news === 'string') {
            return [];
        }

        // Get the news items structure
        const newsItems = currentLocaleMessages?.news?.items;
        if (!newsItems) return [];

        // Find the most recent year with news
        const years = Object.keys(newsItems).sort((a, b) => parseInt(b) - parseInt(a));
        if (years.length === 0) return [];

        const mostRecentYear = years[0];
        return newsItems[mostRecentYear] as NewsItem[] || [];
    } catch (error) {
        console.warn('Error getting most recent news items:', error);
        return [];
    }
};

// Get the latest news item
const latestNewsItem = computed<NewsItem | null>(() => {
    const recentItems = getMostRecentNewsItems();
    if (recentItems.length === 0) return null;

    // Sort by date (assuming date is in a format that can be sorted correctly)
    // For simplicity, assuming date is in format DD.MM.YYYY or similar
    return recentItems.sort((a, b) => {
        const dateA = new Date(a.date.split('.').reverse().join('-'));
        const dateB = new Date(b.date.split('.').reverse().join('-'));
        return dateB.getTime() - dateA.getTime();
    })[0];
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
