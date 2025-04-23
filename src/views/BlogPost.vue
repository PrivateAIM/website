<template>
  <div class="blog-post-container">
    <div v-if="post" class="blog-post">
      <PostHeader
        :category="post.category"
        :title="post.title"
        :author="post.author"
        :date="post.date"
        :readTime="post.readTime"
        :tags="post.tags"
      />

      <div v-if="post.image" class="post-featured-image">
        <img
          :src="post.image"
          :alt="post.title"
        />
      </div>

      <div class="post-content markdown-body" v-html="renderedContent"></div>

      <div class="post-footer">
        <ShareButtons
          :title="post.title"
          @link-copied="showNotification('Link copied to clipboard!')"
          @copy-error="showNotification('Failed to copy link. Please try again.')"
        />

        <router-link to="/blog" class="back-to-blog">
          <span aria-hidden="true">←</span> Back to all posts
        </router-link>
      </div>
    </div>

    <div v-else-if="loading" class="loading-state">
      <p>Loading post...</p>
    </div>

    <div v-else class="not-found" role="alert">
      <h1>Post Not Found</h1>
      <p>Sorry, the blog post you're looking for doesn't exist or has been removed.</p>
      <router-link to="/blog" class="back-to-blog">
        <span aria-hidden="true">←</span> Back to all posts
      </router-link>
    </div>

    <ToastNotification
      v-if="showToast"
      :message="toastMessage"
      @close="showToast = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { sortedBlogPosts } from '../data/blogs';
import { marked } from 'marked';
import type { BlogPost } from '../types/BlogPost';
import PostHeader from '@/components/blog/PostHeader.vue';
import ShareButtons from '@/components/blog/ShareButtons.vue';
import ToastNotification from '../components/ToastNotification.vue';

const route = useRoute();
const postSlug = computed(() => route.params.id as string);
const loading = ref(true);
const post = ref<BlogPost | null>(null);
const showToast = ref(false);
const toastMessage = ref('');

onMounted(() => {
  // Find the post by slug
  const foundPost = sortedBlogPosts.find(p => p.slug === postSlug.value);

  if (foundPost) {
    post.value = foundPost;
  }

  loading.value = false;
});

// Render markdown content
const renderedContent = computed(() => {
  if (!post.value) return '';

  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true,
    // headerIds: true,
    // mangle: false // Prevent mangling email links
  });

  return marked(post.value.content);
});

// Display toast notification
const showNotification = (message: string) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};
</script>

<style>
/* These styles are not scoped to allow styling of markdown content */
.blog-post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  position: relative;
}

.post-featured-image {
  margin-bottom: 2.5rem;
  border-radius: 0.75rem;
  overflow: hidden;
  position: relative;
  min-height: 100px;
}

.post-featured-image img {
  width: 100%;
  height: auto;
  display: block;
}

.post-content {
  margin-bottom: 3rem;
  line-height: 1.8;
  color: var(--text-color, #1a202c);
  font-size: 1.1rem;
}

/* Markdown styling */
.markdown-body h1 {
  font-size: 2.25rem;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-color, #1a202c);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color, #eaeaea);
}

.markdown-body h2 {
  font-size: 1.75rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--text-color, #1a202c);
  padding-bottom: 0.25rem;
}

.markdown-body h3 {
  font-size: 1.5rem;
  margin-top: 1.75rem;
  margin-bottom: 1rem;
  color: var(--text-color, #1a202c);
}

.markdown-body h4 {
  font-size: 1.25rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--text-color, #1a202c);
}

.markdown-body p {
  margin-bottom: 1.5rem;
}

.markdown-body ul, .markdown-body ol {
  margin-bottom: 1.5rem;
  padding-left: 1.75rem;
}

.markdown-body li {
  margin-bottom: 0.5rem;
}

.markdown-body code {
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  background-color: var(--tag-bg, #f1f1f1);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.9em;
}

.markdown-body pre {
  background-color: var(--tag-bg, #f1f1f1);
  padding: 1.25rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1.75rem;
}

.markdown-body pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  font-size: 0.9em;
  color: var(--text-color, #1a202c);
}

.markdown-body a {
  color: var(--primary-color, #3182ce);
  text-decoration: none;
}

.markdown-body a:hover {
  text-decoration: underline;
}

.markdown-body blockquote {
  border-left: 4px solid var(--primary-color, #3182ce);
  padding: 0.5rem 0 0.5rem 1.5rem;
  color: var(--footer-text, #718096);
  font-style: italic;
  margin: 1.5rem 0;
  background-color: var(--tag-bg, #f1f1f1);
  border-radius: 0 0.5rem 0.5rem 0;
}

.markdown-body img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 2rem auto;
  border-radius: 0.5rem;
}

.post-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color, #eaeaea);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.back-to-blog {
  display: inline-block;
  color: var(--primary-color, #3182ce);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
}

.back-to-blog:hover {
  text-decoration: underline;
}

.loading-state, .not-found {
  text-align: center;
  padding: 4rem 0;
}

.not-found h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-color, #1a202c);
}

.not-found p {
  margin-bottom: 2rem;
  color: var(--nav-text, #4a5568);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .markdown-body h1 {
    font-size: 1.75rem;
  }

  .markdown-body h2 {
    font-size: 1.5rem;
  }

  .post-footer {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .post-featured-image {
    border-radius: 0.5rem;
  }
}
</style>
