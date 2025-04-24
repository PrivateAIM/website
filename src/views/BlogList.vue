<template>
    <div class="blog-container">
        <div class="blog-header">
            <div class="blog-content">
                <h1>PrivateAIM Blog</h1>
                <p class="blog-intro">Explore the latest insights, tutorials, and developments in privacy-preserving medical analytics.</p>
            </div>

            <div class="blog-visual">
                <img src="/images/blog/management-information-system.svg" alt="Server Analysis Graphic" class="blog-graphic" />
            </div>
        </div>

        <!-- Rest of code remains the same -->
        <!-- Category Filter -->
        <div class="category-filter">
            <button
                class="category-btn"
                :class="{ active: selectedCategory === '' }"
                @click="selectedCategory = ''"
            >
                All Topics
            </button>
            <button
                v-for="category in categories"
                :key="category"
                class="category-btn"
                :class="{ active: selectedCategory === category }"
                @click="selectedCategory = category"
            >
                {{ category }}
            </button>
        </div>

        <!-- Search and Tag Filters -->
        <div class="blog-filter">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search posts..."
                class="search-input"
            />

            <div class="tag-filters">
                <button
                    class="tag-filter"
                    :class="{ active: selectedTag === '' }"
                    @click="selectedTag = ''"
                >
                    All Tags
                </button>
                <button
                    v-for="tag in topTags"
                    :key="tag"
                    class="tag-filter"
                    :class="{ active: selectedTag === tag }"
                    @click="selectedTag = tag"
                >
                    {{ tag }}
                </button>
            </div>
        </div>

        <!-- Featured Post (if any) -->
        <div v-if="featuredPost && !searchQuery && !selectedTag && !selectedCategory" class="featured-post">
            <div class="featured-post-image">
                <img :src="featuredPost.image" :alt="featuredPost.title" />
            </div>
            <div class="featured-post-content">
                <div class="featured-badge">Featured</div>
                <h2 class="featured-post-title">{{ featuredPost.title }}</h2>
                <p class="featured-post-description">{{ featuredPost.description }}</p>
                <div class="featured-post-meta">
                    <span class="author">By {{ featuredPost.author.name }}</span>
                    <span class="date">{{ formatDate(featuredPost.date) }}</span>
                    <span class="read-time">{{ featuredPost.readTime }} min read</span>
                </div>
                <router-link :to="`/blog/${featuredPost.slug}`" class="featured-read-more">
                    Read Article →
                </router-link>
            </div>
        </div>

        <!-- Posts Grid -->
        <div class="posts-grid">
            <div
                v-for="post in filteredPosts"
                :key="post.id"
                class="post-card"
            >
                <div class="post-image-container">
                    <img
                        v-if="post.image"
                        :src="post.image"
                        :alt="post.title"
                        class="post-image"
                    />
                </div>
                <div class="post-content">
                    <div class="post-category">{{ post.category }}</div>
                    <h2 class="post-title">{{ post.title }}</h2>
                    <p class="post-meta">
                        <span>By {{ post.author.name }}</span>
                        <span> • {{ formatDate(post.date) }}</span>
                        <span> • {{ post.readTime }} min read</span>
                    </p>
                    <p class="post-description">{{ post.description }}</p>
                    <div class="post-tags">
            <span
                v-for="tag in post.tags.slice(0, 3)"
                :key="tag"
                class="post-tag"
                @click.stop="selectedTag = tag"
            >
              {{ tag }}
            </span>
                    </div>
                    <router-link :to="`/blog/${post.slug}`" class="read-more">
                        Read article →
                    </router-link>
                </div>
            </div>
        </div>

        <!-- No Posts Found Message -->
        <div v-if="filteredPosts.length === 0" class="no-posts">
            <p>No posts found matching your criteria.</p>
            <button @click="resetFilters" class="reset-button">Reset filters</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { sortedBlogPosts } from '../data/blogs';
import type { BlogPost } from '../types/BlogPost';

const posts = ref<BlogPost[]>(sortedBlogPosts);
const searchQuery = ref('');
const selectedTag = ref('');
const selectedCategory = ref('');

// Get featured post (if any)
const featuredPost = computed(() => {
    return posts.value.find(post => post.featured);
});

// Get all categories from posts
const categories = computed(() => {
    const categorySet = new Set<string>();
    posts.value.forEach(post => {
        categorySet.add(post.category);
    });
    return Array.from(categorySet);
});

// Get top tags (limited to most common for UI cleanliness)
const topTags = computed(() => {
    const tagCounts = new Map<string, number>();
    posts.value.forEach(post => {
        post.tags.forEach(tag => {
            tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        });
    });

    // Sort by count and take top 8
    return Array.from(tagCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(entry => entry[0]);
});

// Filter posts based on search query, selected tag, and category
const filteredPosts = computed(() => {
    // If featured post exists and no filters are applied, exclude it from regular listing
    const postsToFilter = featuredPost.value && !searchQuery.value && !selectedTag.value && !selectedCategory.value
        ? posts.value.filter(post => post.id !== featuredPost.value?.id)
        : posts.value;

    return postsToFilter.filter(post => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            post.author.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.value.toLowerCase());

        const matchesTag = selectedTag.value === '' ||
            post.tags.includes(selectedTag.value);

        const matchesCategory = selectedCategory.value === '' ||
            post.category === selectedCategory.value;

        return matchesSearch && matchesTag && matchesCategory;
    });
});

// Format date to a more readable format
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Reset all filters
const resetFilters = () => {
    searchQuery.value = '';
    selectedTag.value = '';
    selectedCategory.value = '';
};
</script>

<style scoped>
.blog-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.blog-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    gap: 2rem;
}

.blog-content {
    flex: 1;
    text-align: center;
}

.blog-content h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: var(--text-color, #1a202c);
}

.blog-intro {
    font-size: 1.25rem;
    color: var(--nav-text, #4a5568);
    margin: 0;
}

.blog-visual {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.blog-graphic {
    max-width: 100%;
    height: auto;
}

/* Category Filter */
.category-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    justify-content: center;
}

.category-btn {
    background: none;
    border: 1px solid var(--border-color, #e2e8f0);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    cursor: pointer;
    color: var(--nav-text, #4a5568);
    background-color: var(--card-bg, #ffffff);
    transition: all 0.2s ease;
}

.category-btn.active {
    background-color: var(--primary-color, #3182ce);
    color: white;
    border-color: var(--primary-color, #3182ce);
}

.category-btn:hover:not(.active) {
    border-color: var(--primary-color, #3182ce);
    color: var(--primary-color, #3182ce);
}

/* Blog Filters */
.blog-filter {
    margin-bottom: 2rem;
}

.search-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--border-color, #eaeaea);
    border-radius: 0.5rem;
    font-size: 1rem;
    margin-bottom: 1rem;
    background-color: var(--card-bg, #ffffff);
    color: var(--text-color, #1a202c);
}

.tag-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.tag-filter {
    background: none;
    border: 1px solid var(--border-color, #eaeaea);
    border-radius: 9999px;
    padding: 0.4rem 1rem;
    font-size: 0.85rem;
    cursor: pointer;
    color: var(--nav-text, #4a5568);
    background-color: var(--card-bg, #ffffff);
    transition: all 0.2s ease;
}

.tag-filter.active {
    background-color: var(--primary-color, #3182ce);
    color: white;
    border-color: var(--primary-color, #3182ce);
}

.tag-filter:hover:not(.active) {
    border-color: var(--primary-color, #3182ce);
    color: var(--primary-color, #3182ce);
}

/* Featured Post */
.featured-post {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
    background-color: var(--card-bg, #ffffff);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--border-color, #eaeaea);
}

.featured-post-image {
    height: 100%;
    overflow: hidden;
}

.featured-post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.featured-post-content {
    padding: 2rem;
    display: flex;
    flex-direction: column;
}

.featured-badge {
    background-color: var(--primary-color, #3182ce);
    color: white;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    display: inline-block;
    margin-bottom: 1rem;
    width: fit-content;
}

.featured-post-title {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: var(--text-color, #1a202c);
}

.featured-post-description {
    font-size: 1.1rem;
    color: var(--nav-text, #4a5568);
    margin-bottom: 1.5rem;
    flex-grow: 1;
}

.featured-post-meta {
    font-size: 0.9rem;
    color: var(--footer-text, #718096);
    margin-bottom: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.featured-read-more {
    display: inline-block;
    font-size: 1rem;
    font-weight: 500;
    color: var(--primary-color, #3182ce);
    text-decoration: none;
    align-self: flex-start;
}

.featured-read-more:hover {
    text-decoration: underline;
}

/* Posts Grid */
.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
}

.post-card {
    border: 1px solid var(--border-color, #eaeaea);
    border-radius: 0.75rem;
    overflow: hidden;
    background-color: var(--card-bg, #ffffff);
    transition: transform 0.2s, box-shadow 0.2s;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.post-image-container {
    height: 200px;
    overflow: hidden;
}

.post-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.post-card:hover .post-image {
    transform: scale(1.05);
}

.post-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.post-category {
    font-size: 0.8rem;
    color: var(--primary-color, #3182ce);
    margin-bottom: 0.75rem;
    font-weight: 500;
}

.post-title {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    color: var(--text-color, #1a202c);
    line-height: 1.4;
}

.post-meta {
    font-size: 0.85rem;
    color: var(--footer-text, #718096);
    margin-bottom: 0.75rem;
}

.post-description {
    font-size: 0.95rem;
    color: var(--nav-text, #4a5568);
    margin-bottom: 1.25rem;
    flex-grow: 1;
}

.post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
}

.post-tag {
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
    background-color: var(--tag-bg, #f1f1f1);
    border-radius: 9999px;
    color: var(--nav-text, #4a5568);
    cursor: pointer;
    transition: background-color 0.2s;
}

.post-tag:hover {
    background-color: var(--border-color, #e2e8f0);
}

.read-more {
    display: inline-block;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--primary-color, #3182ce);
    text-decoration: none;
    margin-top: auto;
}

.read-more:hover {
    text-decoration: underline;
}

.no-posts {
    text-align: center;
    padding: 3rem 0;
    color: var(--nav-text, #4a5568);
}

.reset-button {
    margin-top: 1rem;
    padding: 0.5rem 1.25rem;
    background-color: var(--primary-color, #3182ce);
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    font-size: 0.95rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .posts-grid {
        grid-template-columns: 1fr;
    }

    .featured-post {
        grid-template-columns: 1fr;
    }

    .featured-post-image {
        height: 250px;
    }

    .blog-header {
        flex-direction: column;
        text-align: center;
    }

    .blog-content {
        order: 1;
        text-align: center;
    }

    .blog-visual {
        order: 2;
        margin-top: 1.5rem;
    }
}

@media (max-width: 480px) {
    .category-filter, .tag-filters {
        justify-content: center;
    }

    .blog-content h1 {
        font-size: 2rem;
    }

    .blog-intro {
        font-size: 1.1rem;
    }
}
</style>
