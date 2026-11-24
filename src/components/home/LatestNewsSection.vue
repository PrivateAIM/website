<template>
    <section class="latest-news">
        <div class="latest-news-header">
            <h2><ITranslate path="home.news.latestNews" /></h2>
            <router-link
                :to="localePath('/news')"
                class="all-news"
            >
                <ITranslate path="home.news.allNews" />
                <AppIcon
                    name="arrow"
                    :size="18"
                />
            </router-link>
        </div>
        <div class="news-grid">
            <router-link
                v-for="item in items"
                :key="anchorFor(item)"
                :to="{ path: localePath('/news'), hash: `#${anchorFor(item)}` }"
                class="news-card"
            >
                <div class="news-card-image">
                    <img
                        v-if="item.images?.[0]"
                        :src="thumbnail(`news/${item.images[0]}`, 640)"
                        alt=""
                        loading="lazy"
                        width="400"
                        height="300"
                    >
                    <AppIcon
                        v-else
                        name="file"
                        :size="40"
                    />
                </div>
                <div class="news-card-body">
                    <time :datetime="isoDate(item.date)">{{ item.date }}</time>
                    <h3>{{ item.title }}</h3>
                    <p>{{ summary(item.content) }}</p>
                </div>
            </router-link>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppIcon from '@/components/shared/AppIcon.vue';
import { anchorFor, isoDate, latestNews } from '@/data/news';
import { useLocale, useLocalePath } from '@/i18n';
import { thumbnail } from '@/utils/thumbnail';

const locale = useLocale();
const localePath = useLocalePath();
const items = computed(() => latestNews(locale.value, 3));

// First sentence-ish preview of the HTML content
const summary = (content: string): string => {
    const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    return text.length > 140 ? `${text.slice(0, 140).replace(/\s+\S*$/, '')}…` : text;
};
</script>

<style scoped>
.latest-news {
  margin-bottom: 5rem;
}

.latest-news-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.25rem 1rem;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
}

.all-news {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0;
  color: var(--link-color);
  font-weight: 600;
  text-decoration: none;
}

.all-news:hover {
  text-decoration: underline;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.news-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  background-color: var(--card-bg);
  color: var(--text-color);
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.news-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px color-mix(in srgb, var(--shadow-color) 10%, transparent);
}

.news-card-image {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: var(--tag-bg);
  color: var(--link-color);
}

.news-card-image img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Portrait photos: keep faces in the crop */
  object-position: center 20%;
}

.news-card-body {
  padding: 1.25rem;
}

.news-card-body time {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--link-color);
}

.news-card-body h3 {
  font-size: 1.15rem;
  margin: 0.35rem 0 0.5rem;
}

.news-card-body p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.85;
}

@media (max-width: 900px) {
  .news-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .news-card {
    flex-direction: row;
  }

  .news-card-image {
    flex: 0 0 38%;
    aspect-ratio: auto;
    min-height: 9rem;
  }
}

@media (max-width: 480px) {
  .news-card {
    flex-direction: column;
  }

  .news-card-image {
    aspect-ratio: 16 / 9;
  }
}
</style>
