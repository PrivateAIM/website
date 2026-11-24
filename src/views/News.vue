<template>
    <div class="news-container">
        <PageHeader
            :title="title"
            :subtitle="subtitle"
        />

        <div class="news-content">
            <!-- News entries by year -->
            <div
                v-for="year in years"
                :key="year"
                class="news-year-section"
            >
                <h2 class="year-heading">
                    {{ year }}
                </h2>

                <div class="news-items">
                    <div
                        v-for="(newsItem, index) in getNewsItemsByYear(year)"
                        :id="anchorFor(newsItem)"
                        :key="index"
                        class="news-item"
                    >
                        <div class="news-details">
                            <h3 class="news-heading">
                                <button
                                    type="button"
                                    class="news-summary"
                                    :class="{ open: openKey === `${year}-${index}` }"
                                    :aria-expanded="openKey === `${year}-${index}`"
                                    :aria-controls="`${anchorFor(newsItem)}-content`"
                                    @click="toggle(`${year}-${index}`)"
                                >
                                    <time
                                        class="news-date"
                                        :datetime="isoDate(newsItem.date)"
                                    >{{ newsItem.date }}</time>
                                    <span class="news-title">{{ newsItem.title }}</span>
                                </button>
                            </h3>
                            <div
                                v-show="openKey === `${year}-${index}`"
                                :id="`${anchorFor(newsItem)}-content`"
                                class="news-detail-content"
                            >
                                <p v-html="newsItem.content" />
                                <div
                                    v-if="newsItem.images && newsItem.images.length > 0"
                                    class="news-images"
                                >
                                    <img
                                        v-for="(image, imgIndex) in newsItem.images"
                                        :key="imgIndex"
                                        :src="getImageUrl(image)"
                                        :alt="newsItem.title"
                                        loading="lazy"
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
import { computed, onMounted, ref } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import { useLocale, useTranslation } from '@/i18n';
import { type NewsEntry, newsForLocale } from '@/data/news';

const title = useTranslation('news.title');
const subtitle = useTranslation('news.subtitle');

const locale = useLocale();
const newsByYear = computed(() => newsForLocale(locale.value));

const openKey = ref<string | null>(null);
const toggle = (key: string) => {
    openKey.value = openKey.value === key ? null : key;
};

// Years derived from the news data, in descending order
const years = computed<string[]>(() =>
    Object.keys(newsByYear.value).sort((a, b) => Number.parseInt(b, 10) - Number.parseInt(a, 10)));

// Function to get image URL
const getImageUrl = (imagePath: string): string => `/images/news/${imagePath}`;

// Function to get news items for a specific year
const getNewsItemsByYear = (year: string): NewsEntry[] => newsByYear.value[year] ?? [];

/** Start date of a display date such as `19-22/05/2026` as ISO `2026-05-19`. */
function isoDate(date: string): string | undefined {
    const match = date.match(/^(\d{1,2})(?:-\d{1,2})?\/(\d{1,2})\/(\d{4})$/);
    if (!match) {
        return undefined;
    }
    const [, day, month, year] = match;
    return `${year}-${month!.padStart(2, '0')}-${day!.padStart(2, '0')}`;
}

/** Stable anchor per entry, e.g. #news-2026-05-19-mie-2026 */
function anchorFor(item: NewsEntry): string {
    const slug = item.title
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 40)
        .replace(/-$/, '');
    return `news-${isoDate(item.date) ?? item.date}-${slug}`;
}

// Open the entry a link points to (/news#news-…)
onMounted(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) {
        return;
    }
    for (const year of years.value) {
        const index = getNewsItemsByYear(year).findIndex((item) => anchorFor(item) === id);
        if (index !== -1) {
            openKey.value = `${year}-${index}`;
            document.getElementById(id)?.scrollIntoView();
            return;
        }
    }
});

</script>

<style scoped>
.news-heading {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
}

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
