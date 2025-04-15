<template>
  <div class="news-container">
    <div class="page-header">
      <h1>{{ t('news.title') }}</h1>
      <p class="header-subtitle">
        {{ t('news.subtitle') }}
      </p>
    </div>

    <div class="news-content">
      <!-- News entries by year -->
      <div v-for="year in years" :key="year" class="news-year-section">
        <h2 class="year-heading">{{ year }}</h2>

        <div class="news-items">
          <div v-for="(newsItem, index) in getNewsItemsByYear(year)" :key="index" class="news-item">
            <details class="news-details">
              <summary class="news-summary">
                <span class="news-date">{{ newsItem.date }}</span>
                <span class="news-title">{{ newsItem.title }}</span>
              </summary>
              <div class="news-detail-content">
                <p v-html="newsItem.content"></p>
                <div v-if="newsItem.images && newsItem.images.length > 0" class="news-images">
                  <img
                      v-for="(image, imgIndex) in newsItem.images"
                      :key="imgIndex"
                      :src="getImageUrl(image)"
                      :alt="newsItem.title"
                      class="news-image"
                  >
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

// Define types for news items
interface NewsItem {
  date: string;
  title: string;
  content: string;
  images?: string[];
}
const { t, locale, messages } = useI18n()

// Years in descending order
const years = ref<string[]>(['2025', '2024', '2023'])

// Function to get image URL
const getImageUrl = (imagePath: string): string => {
  return `/images/news/${imagePath}`
}

// Function to get news items for a specific year
const getNewsItemsByYear = (year: string): NewsItem[] => {
  try {
    // Access the messages object directly using the current locale
    const currentLocaleMessages = messages.value[locale.value]

    if (currentLocaleMessages?.news?.items?.[year]) {
      return currentLocaleMessages.news.items[year] as NewsItem[]
    }
  } catch (error) {
    console.warn(`Error getting news for year ${year}:`, error)
  }

  // Return empty array as fallback
  return []
}

// Compute all news items grouped by year
computed<Record<string, NewsItem[]>>(() => {
  const result: Record<string, NewsItem[]> = {}

  for (const year of years.value) {
    result[year] = getNewsItemsByYear(year)
  }

  return result
});
</script>

<style scoped>
.news-container {
  width: 100%;
}

.page-header {
  background-color: var(--primary-color, #3182ce);
  color: white;
  padding: 3rem 1rem;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.header-subtitle {
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.news-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.news-year-section {
  margin-bottom: 3rem;
}

.year-heading {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-color, #1a202c);
  border-bottom: 2px solid var(--primary-color, #3182ce);
  padding-bottom: 0.5rem;
}

.news-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.news-item {
  background-color: var(--card-bg, #ffffff);
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid var(--border-color, #eaeaea);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.news-details {
  width: 100%;
}

.news-summary {
  cursor: pointer;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 600;
  list-style: none;
}

.news-summary::-webkit-details-marker {
  display: none;
}

.news-summary::after {
  content: "+";
  position: absolute;
  right: 1.25rem;
  font-size: 1.5rem;
  color: var(--primary-color, #3182ce);
}

details[open] .news-summary::after {
  content: "−";
}

.news-date {
  font-size: 0.9rem;
  color: var(--primary-color, #3182ce);
  margin-right: 1rem;
  white-space: nowrap;
}

.news-title {
  font-size: 1.1rem;
  color: var(--text-color, #1a202c);
}

.news-detail-content {
  padding: 0 1.25rem 1.25rem;
  color: var(--text-color, #4a5568);
  line-height: 1.6;
}

.news-images {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.news-image {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  max-height: 400px;
  object-fit: cover;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }

  .news-summary {
    flex-direction: column;
    align-items: flex-start;
  }

  .news-date {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }

  .news-title {
    padding-right: 2rem;
  }
}
</style>