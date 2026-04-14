<template>
    <div class="news-container">
        <PageHeader :title="t('news.title')" :subtitle="t('news.subtitle')" />

        <div class="news-content">
            <!-- News entries by year -->
            <div v-for="year in years" :key="year" class="news-year-section">
                <h2 class="year-heading">{{ year }}</h2>

                <div class="news-items">
                    <div v-for="(newsItem, index) in getNewsItemsByYear(year)" :key="index" class="news-item">
                        <div class="news-details">
                            <button class="news-summary" :class="{ open: openKey === `${year}-${index}` }" @click="toggle(`${year}-${index}`)">
                                <span class="news-date">{{ newsItem.date }}</span>
                                <span class="news-title">{{ newsItem.title }}</span>
                            </button>
                            <div v-if="openKey === `${year}-${index}`" class="news-detail-content">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHeader from '../components/PageHeader.vue'

// Define types for news items
interface NewsItem {
    date: string;
    title: string;
    content: string;
    images?: string[];
}
const { t, locale, messages } = useI18n()

const openKey = ref<string | null>(null)
const toggle = (key: string) => {
    openKey.value = openKey.value === key ? null : key
}

// Years derived dynamically from i18n data, in descending order
const years = computed<string[]>(() => {
    try {
        const currentLocaleMessages = messages.value[locale.value]
        if (typeof currentLocaleMessages?.news === 'string') return []
        const items = currentLocaleMessages?.news?.items
        if (!items || typeof items !== 'object') return []
        return Object.keys(items).sort((a, b) => parseInt(b) - parseInt(a))
    } catch {
        return []
    }
})

// Function to get image URL
const getImageUrl = (imagePath: string): string => {
    return `/images/news/${imagePath}`
}

// Function to get news items for a specific year
const getNewsItemsByYear = (year: string): NewsItem[] => {
    try {
        // Access the messages object directly using the current locale
        const currentLocaleMessages = messages.value[locale.value]

        if(typeof currentLocaleMessages?.news === 'string') {
            return [];
        }

        if (currentLocaleMessages?.news?.items?.[year]) {
            return currentLocaleMessages.news.items[year] as NewsItem[]
        }
    } catch (error) {
        console.warn(`Error getting news for year ${year}:`, error)
    }

    // Return empty array as fallback
    return []
}

</script>

<style scoped>
.news-container {
    width: 100%;
}

.news-content {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.news-year-section {
    margin-bottom: 2rem;
}

.year-heading {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-color, #1a202c);
    border-bottom: 2px solid var(--primary-color, #3182ce);
    padding-bottom: 0.5rem;
}

.news-items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
    padding: 1rem 3.5rem 1rem 1.25rem;
    display: flex;
    align-items: center;
    position: relative;
    font-weight: 600;
    width: 100%;
    border: none;
    background: none;
    text-align: left;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    border-radius: 0.5rem;
}

.news-summary:hover {
    background-color: var(--tag-bg, #f7fafc);
}

.news-summary:focus-visible {
    outline: 2px solid var(--primary-color, #3182ce);
    outline-offset: -2px;
}

.news-summary::after {
    content: "+";
    position: absolute;
    right: 1rem;
    font-size: 1.25rem;
    font-weight: 400;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 50%;
    background-color: var(--tag-bg, #f0f4f8);
    color: var(--primary-color, #3182ce);
}

.news-summary.open::after {
    content: "\2212";
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
    padding: 0 1.25rem 1rem;
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
