<template>
    <div class="news-container">
        <PageHeader
            :title="title"
            :subtitle="subtitle"
        />

        <div class="news-content">
            <!-- News entries by year, as a timeline -->
            <section
                v-for="year in years"
                :key="year"
                class="news-year-section"
            >
                <h2 class="year-heading">
                    {{ year }}
                </h2>

                <ol class="news-items">
                    <li
                        v-for="(newsItem, index) in getNewsItemsByYear(year)"
                        :id="anchorFor(newsItem)"
                        :key="index"
                        class="news-item"
                        :class="{ 'is-open': openKey === `${year}-${index}` }"
                    >
                        <span
                            class="timeline-dot"
                            :class="`dot-${categoryOf(newsItem)}`"
                            aria-hidden="true"
                        />
                        <div class="news-card">
                            <h3 class="news-heading">
                                <button
                                    type="button"
                                    class="news-summary"
                                    :aria-expanded="openKey === `${year}-${index}`"
                                    :aria-controls="`${anchorFor(newsItem)}-content`"
                                    @click="toggle(`${year}-${index}`)"
                                >
                                    <span class="news-thumb">
                                        <img
                                            v-if="newsItem.images?.[0]"
                                            :src="getImageUrl(newsItem.images[0])"
                                            alt=""
                                            loading="lazy"
                                            width="120"
                                            height="90"
                                        >
                                        <AppIcon
                                            v-else
                                            :name="CATEGORY_ICONS[categoryOf(newsItem)]"
                                            :size="28"
                                        />
                                    </span>
                                    <span class="news-meta">
                                        <span class="news-meta-line">
                                            <time
                                                class="news-date"
                                                :datetime="isoDate(newsItem.date)"
                                            >{{ newsItem.date }}</time>
                                            <span
                                                class="news-tag"
                                                :class="`tag-${categoryOf(newsItem)}`"
                                            ><ITranslate :path="`news.categories.${categoryOf(newsItem)}`" /></span>
                                        </span>
                                        <span class="news-title">{{ newsItem.title }}</span>
                                    </span>
                                    <span
                                        class="news-toggle"
                                        aria-hidden="true"
                                    />
                                </button>
                            </h3>
                            <div
                                v-show="openKey === `${year}-${index}`"
                                :id="`${anchorFor(newsItem)}-content`"
                                class="news-detail-content"
                            >
                                <p v-html="newsItem.content" />
                                <ul
                                    v-if="newsItem.images && newsItem.images.length > 0"
                                    class="news-gallery"
                                >
                                    <li
                                        v-for="(image, imgIndex) in newsItem.images"
                                        :key="imgIndex"
                                    >
                                        <button
                                            type="button"
                                            class="gallery-item"
                                            :aria-label="t('news.gallery.open', { index: imgIndex + 1, count: newsItem.images.length })"
                                            @click="openGallery(newsItem, imgIndex)"
                                        >
                                            <img
                                                :src="getImageUrl(image)"
                                                :alt="newsItem.title"
                                                loading="lazy"
                                            >
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ol>
            </section>
        </div>

        <ImageLightbox
            v-model:index="galleryIndex"
            :images="galleryImages"
            :alt="galleryAlt"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import AppIcon from '@/components/shared/AppIcon.vue';
import ImageLightbox from '@/components/shared/ImageLightbox.vue';
import { useLocale, useTranslation, useTranslator } from '@/i18n';
import {
    type NewsCategory,
    type NewsEntry,
    anchorFor,
    categoryOf,
    isoDate,
    newsForLocale,
} from '@/data/news';

const title = useTranslation('news.title');
const subtitle = useTranslation('news.subtitle');

const locale = useLocale();
const newsByYear = computed(() => newsForLocale(locale.value));

const t = useTranslator();

const CATEGORY_ICONS: Record<NewsCategory, string> = {
    conference: 'users',
    retreat: 'heart',
    workshop: 'code',
    milestone: 'award',
};

// The newest entry starts open; a link with a hash opens its entry instead
const openKey = ref<string | null>(null);
const toggle = (key: string) => {
    openKey.value = openKey.value === key ? null : key;
};

// Years derived from the news data, in descending order
const years = computed<string[]>(() =>
    Object.keys(newsByYear.value).sort((a, b) => Number.parseInt(b, 10) - Number.parseInt(a, 10)));

openKey.value = years.value[0] ? `${years.value[0]}-0` : null;

// Photo gallery of the entry whose image was clicked
const galleryIndex = ref<number | null>(null);
const galleryImages = ref<string[]>([]);
const galleryAlt = ref('');
const openGallery = (item: NewsEntry, index: number) => {
    galleryImages.value = (item.images ?? []).map((image) => getImageUrl(image));
    galleryAlt.value = item.title;
    galleryIndex.value = index;
};

// Function to get image URL
const getImageUrl = (imagePath: string): string => `/images/news/${imagePath}`;

// Function to get news items for a specific year
const getNewsItemsByYear = (year: string): NewsEntry[] => newsByYear.value[year] ?? [];

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
.news-container {
    width: 100%;
}

.news-content {
    max-width: 960px;
    margin: 0 auto;
    padding: 1rem 1rem 3rem;
}

.news-year-section {
    margin-bottom: 2.5rem;
}

.year-heading {
    display: inline-block;
    margin: 0 0 1.25rem;
    padding: 0.3rem 1rem;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--primary-color, #3182ce) 0%, #4299e1 100%);
    color: #ffffff;
    font-size: 1.25rem;
    font-weight: 700;
}

/* Timeline */
.news-items {
    position: relative;
    margin: 0;
    padding: 0 0 0 2rem;
    list-style: none;
}

.news-items::before {
    content: '';
    position: absolute;
    top: 0.5rem;
    bottom: 0.5rem;
    left: 0.55rem;
    border-left: 2px solid var(--border-color, #e2e8f0);
}

.news-item {
    position: relative;
    margin-bottom: 0.9rem;
    scroll-margin-top: 5rem;
}

.timeline-dot {
    position: absolute;
    top: 2.1rem;
    left: -1.85rem;
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    border: 3px solid var(--body-bg, #ffffff);
    background-color: var(--primary-color, #3182ce);
    box-shadow: 0 0 0 2px var(--primary-color, #3182ce);
}

.dot-retreat { background-color: #38a169; box-shadow: 0 0 0 2px #38a169; }
.dot-workshop { background-color: #dd6b20; box-shadow: 0 0 0 2px #dd6b20; }
.dot-milestone { background-color: #805ad5; box-shadow: 0 0 0 2px #805ad5; }

.news-card {
    overflow: hidden;
    border: 1px solid var(--border-color, #e2e8f0);
    border-radius: 0.75rem;
    background-color: var(--card-bg, #ffffff);
    transition: box-shadow 0.2s ease;
}

.news-item.is-open .news-card,
.news-card:hover {
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
}

.news-heading {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
}

.news-summary {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    background: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    text-align: left;
    cursor: pointer;
}

.news-summary:focus-visible {
    outline: 2px solid var(--primary-color, #3182ce);
    outline-offset: -2px;
}

.news-thumb {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 96px;
    height: 72px;
    overflow: hidden;
    border-radius: 0.5rem;
    background-color: var(--tag-bg, #ebf8ff);
    color: var(--primary-color, #3182ce);
}

.news-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.news-meta {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    flex-grow: 1;
    min-width: 0;
}

.news-meta-line {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
}

.news-date {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--primary-color, #3182ce);
    white-space: nowrap;
}

.news-tag {
    padding: 0.1rem 0.55rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    background-color: rgba(30, 144, 255, 0.12);
    color: var(--primary-color, #3182ce);
}

.tag-retreat { background-color: rgba(56, 161, 105, 0.14); color: #2f855a; }
.tag-workshop { background-color: rgba(221, 107, 32, 0.14); color: #c05621; }
.tag-milestone { background-color: rgba(128, 90, 213, 0.14); color: #6b46c1; }

.dark-mode .tag-retreat { color: #68d391; }
.dark-mode .tag-workshop { color: #f6ad55; }
.dark-mode .tag-milestone { color: #b794f4; }

.news-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-color, #1a202c);
}

.news-toggle {
    flex-shrink: 0;
    position: relative;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: var(--tag-bg, #f0f4f8);
}

.news-toggle::before,
.news-toggle::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.8rem;
    height: 2px;
    background-color: var(--primary-color, #3182ce);
    transform: translate(-50%, -50%);
    transition: transform 0.2s ease;
}

.news-toggle::after {
    transform: translate(-50%, -50%) rotate(90deg);
}

.is-open .news-toggle::after {
    transform: translate(-50%, -50%) rotate(0deg);
}

.news-detail-content {
    padding: 0.25rem 1.25rem 1.25rem;
    color: var(--text-color, #4a5568);
    line-height: 1.7;
}

/* Keep the paragraph breaks (\n) of the news texts */
.news-detail-content > p {
    white-space: pre-line;
}

.news-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 0.75rem;
    margin: 1rem 0 0;
    padding: 0;
    list-style: none;
}

.gallery-item {
    display: block;
    width: 100%;
    padding: 0;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--tag-bg, #ebf8ff);
    cursor: zoom-in;
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 25%;
    transition: transform 0.3s ease;
}

.gallery-item:hover img,
.gallery-item:focus-visible img {
    transform: scale(1.04);
}

.gallery-item:focus-visible {
    outline: 3px solid var(--primary-color, #3182ce);
    outline-offset: 2px;
}

@media (max-width: 640px) {
    .news-items {
        padding-left: 1.5rem;
    }

    .news-items::before {
        left: 0.3rem;
    }

    .timeline-dot {
        left: -1.6rem;
    }

    .news-thumb {
        width: 64px;
        height: 64px;
    }

    .news-summary {
        gap: 0.75rem;
        padding: 0.6rem 0.75rem;
    }

    .news-title {
        font-size: 1rem;
    }

    .news-gallery {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
</style>
