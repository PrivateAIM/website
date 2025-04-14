<template>
  <div class="post-header">
    <div class="post-category">{{ category }}</div>
    <h1 class="post-title">{{ title }}</h1>

    <div class="post-author-container">
      <div class="author-avatar" v-if="author.avatar">
        <img :src="author.avatar" :alt="author.name" />
      </div>
      <div class="author-info">
        <div class="author-name">{{ author.name }}</div>
        <div class="author-role" v-if="author.role">{{ author.role }}</div>
      </div>
      <div class="post-details">
        <span class="post-date">{{ formattedDate }}</span>
        <span class="post-read-time" v-if="readTime">{{ readTime }} min read</span>
      </div>
    </div>

    <div class="post-tags" aria-label="Post tags">
      <span
        v-for="tag in tags"
        :key="tag"
        class="post-tag"
        role="listitem"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Author } from '../../types/BlogPost';

interface PostHeaderProps {
  category: string;
  title: string;
  author: Author;
  date: string;
  readTime?: number;
  tags: string[];
}

const props = defineProps<PostHeaderProps>();

// Format date to readable format
const formattedDate = computed(() => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(props.date).toLocaleDateString(undefined, options);
});
</script>

<style scoped>
.post-header {
  margin-bottom: 2rem;
}

.post-category {
  font-size: 0.9rem;
  color: var(--primary-color, #3182ce);
  margin-bottom: 1rem;
  font-weight: 500;
}

.post-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-color, #1a202c);
  line-height: 1.3;
}

.post-author-container {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  color: var(--text-color, #1a202c);
  font-size: 1rem;
}

.author-role {
  color: var(--footer-text, #718096);
  font-size: 0.85rem;
}

.post-details {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: var(--footer-text, #718096);
  font-size: 0.9rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.post-tag {
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  background-color: var(--tag-bg, #f1f1f1);
  border-radius: 9999px;
  color: var(--nav-text, #4a5568);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .post-title {
    font-size: 2rem;
  }

  .post-author-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .post-details {
    margin-left: 0;
    margin-top: 1rem;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .post-title {
    font-size: 1.75rem;
  }

  .post-tags {
    justify-content: flex-start;
  }
}
</style>
