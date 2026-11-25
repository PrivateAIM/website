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
                                            :src="thumbnail(`news/${newsItem.images[0]}`, 192)"
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
                                                :src="thumbnail(`news/${image}`, 640)"
                                                :alt="`${newsItem.title}, ${t('news.gallery.photo', { index: imgIndex + 1, count: newsItem.images.length })}`"
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
import { thumbnail } from '@/utils/thumbnail';
import { useLocale, useTranslation, useTranslator } from '@/i18n';
import {
    type INewsEntry,
    type NewsCategory,
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
const openGallery = (item: INewsEntry, index: number) => {
    galleryImages.value = (item.images ?? []).map((image) => getImageUrl(image));
    galleryAlt.value = item.title;
    galleryIndex.value = index;
};

// Function to get image URL
const getImageUrl = (imagePath: string): string => `/images/news/${imagePath}`;

// Function to get news items for a specific year
const getNewsItemsByYear = (year: string): INewsEntry[] => newsByYear.value[year] ?? [];

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
    background-color: var(--primary-color);
    color: var(--on-primary);
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
    border-left: 2px solid var(--border-color);
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
    border: 3px solid var(--body-bg);
    background-color: var(--link-color);
    box-shadow: 0 0 0 2px var(--link-color);
}

/* Categories differ by fill strength: event solid navy, workshop ring, retreat yellow ring, milestone solid yellow */
.dot-workshop { background-color: var(--body-bg); }
.dot-retreat { background-color: var(--brand-yellow-tint); box-shadow: 0 0 0 2px var(--brand-yellow); }
.dot-milestone { background-color: var(--brand-yellow); box-shadow: 0 0 0 2px var(--brand-yellow); }

.news-card {
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    background-color: var(--card-bg);
    transition: box-shadow 0.2s ease;
}

.news-item.is-open .news-card,
.news-card:hover {
    box-shadow: 0 8px 22px color-mix(in srgb, var(--shadow-color) 8%, transparent);
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
    outline: 2px solid var(--primary-color);
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
    background-color: var(--tag-bg);
    color: var(--link-color);
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
    color: var(--link-color);
    white-space: nowrap;
}

.news-tag {
    padding: 0.1rem 0.55rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    border: 1px solid transparent;
    background-color: var(--tag-bg);
    color: var(--tag-text);
}

.tag-workshop { border-color: var(--link-color); background-color: transparent; color: var(--link-color); }
.tag-retreat { border-color: var(--brand-yellow); background-color: var(--brand-yellow-tint); color: var(--text-color); }
.tag-milestone { background-color: var(--brand-yellow); color: var(--on-brand-yellow); }

.news-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-color);
}

.news-toggle {
    flex-shrink: 0;
    position: relative;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: var(--tag-bg);
}

.news-toggle::before,
.news-toggle::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.8rem;
    height: 2px;
    background-color: var(--primary-color);
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
    color: var(--text-color);
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
    background-color: var(--tag-bg);
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
    outline: 3px solid var(--primary-color);
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
