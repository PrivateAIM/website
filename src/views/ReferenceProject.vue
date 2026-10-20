<template>
    <div
        v-if="project && content"
        class="reference-container"
    >
        <PageHeader
            :title="content.name"
            :subtitle="content.tagline"
        >
            <p
                v-if="project.period"
                class="reference-period"
            >
                {{ project.period }}
            </p>
        </PageHeader>

        <div class="reference-content">
            <aside
                class="successor-notice"
                :aria-label="successorHeading"
            >
                <h2 class="successor-heading">
                    {{ successorHeading }}
                </h2>
                <div
                    class="successor-body markdown-body"
                    v-html="renderMarkdown(content.successorNote)"
                />
                <a
                    href="https://docs.privateaim.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="successor-button"
                >
                    <ITranslate path="references.learnMore" /> <span aria-hidden="true">→</span>
                </a>
            </aside>

            <section
                v-for="(section, index) in content.sections"
                :key="index"
                class="reference-section"
            >
                <h2 class="section-heading">
                    {{ section.title }}
                </h2>
                <div
                    class="section-body markdown-body"
                    v-html="renderMarkdown(section.body)"
                />
            </section>

            <section
                v-if="publications.length > 0"
                class="reference-section"
            >
                <h2 class="section-heading">
                    <ITranslate path="references.publications" />
                </h2>
                <ul class="item-list">
                    <li
                        v-for="(publication, index) in publications"
                        :key="index"
                        class="item-card"
                    >
                        <span class="item-title">{{ publication.title }}</span>
                        <span class="item-authors">{{ publication.authors }}</span>
                        <span class="item-meta">{{ publication.citation }}</span>
                        <a
                            v-if="publication.link"
                            :href="publication.link"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="item-link"
                            :aria-label="`${readPaperLabel}: ${publication.title} (${newTabLabel})`"
                        >
                            <ITranslate path="references.readPaper" /> <span aria-hidden="true">→</span>
                        </a>
                    </li>
                </ul>
            </section>

            <section
                v-if="content.talks.length > 0"
                class="reference-section"
            >
                <h2 class="section-heading">
                    <ITranslate path="references.talks" />
                </h2>
                <ul class="item-list">
                    <li
                        v-for="(talk, index) in content.talks"
                        :key="index"
                        class="item-card item-card-row"
                    >
                        <span class="item-date">{{ talk.date }}</span>
                        <span class="item-main">
                            <span class="item-title">{{ talk.title }}</span>
                            <span class="item-meta">{{ talk.venue }}</span>
                        </span>
                        <a
                            v-if="talk.link"
                            :href="talk.link"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="item-link"
                            :aria-label="`${slidesLabel}: ${talk.title} (${newTabLabel})`"
                        >
                            <ITranslate path="references.slides" /> <span aria-hidden="true">→</span>
                        </a>
                    </li>
                </ul>
            </section>

            <section
                v-if="content.links.length > 0"
                class="reference-section"
            >
                <h2 class="section-heading">
                    <ITranslate path="references.links" />
                </h2>
                <ul class="link-list">
                    <li
                        v-for="(link, index) in content.links"
                        :key="index"
                    >
                        <a
                            :href="link.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="link-item"
                        >
                            <span class="link-label">{{ link.label }}</span>
                            <span class="link-url">{{ displayUrl(link.url) }}</span>
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    </div>

    <NotFound v-else />
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import PageHeader from '@/components/PageHeader.vue';
import NotFound from '@/views/NotFound.vue';
import { useLocale, useTranslation } from '@/i18n';
import { findReference, referenceContentForLocale } from '@/data/references';

const props = defineProps<{ slug: string }>();

const locale = useLocale();
const route = useRoute();
const successorHeading = useTranslation('references.successorHeading');
const slidesLabel = useTranslation('references.slides');
const readPaperLabel = useTranslation('references.readPaper');
const newTabLabel = useTranslation('references.opensInNewTab');

const project = computed(() => findReference(props.slug));
const content = computed(() => (project.value ? referenceContentForLocale(project.value, locale.value) : undefined));
const publications = computed(() => [...(project.value?.publications ?? [])].sort((a, b) => b.year - a.year));

/** Render markdown; external links open in a new tab. */
function renderMarkdown(markdown: string): string {
    const html = marked.parse(markdown, { async: false, gfm: true });
    return html.replace(/<a href="(https?:\/\/[^"]*)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');
}

function displayUrl(url: string): string {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function setMeta(selector: string, attribute: string, value: string) {
    document.querySelector(selector)?.setAttribute(attribute, value);
}

// router.afterEach writes the (English) reference meta resolved in beforeResolve;
// refine it for the active locale. Also re-run on every navigation that reuses
// this instance, since afterEach overwrites the meta each time.
// flush: 'post' runs after afterEach.
watch([content, () => route.fullPath], () => {
    if (!content.value) {
        document.title = 'Page Not Found — PrivateAIM';
        return;
    }

    const title = `${content.value.name} — PrivateAIM`;
    document.title = title;
    setMeta('meta[name="description"]', 'content', content.value.tagline);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', content.value.tagline);
}, { immediate: true, flush: 'post' });
</script>

<style scoped>
.reference-container {
    width: 100%;
}

.reference-period {
    margin-top: 0.75rem;
    font-size: 1rem;
    opacity: 0.85;
}

.reference-content {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.successor-notice {
    background-color: var(--card-bg, #ffffff);
    border: 1px solid var(--border-color, #eaeaea);
    border-left: 4px solid var(--primary-color, #3182ce);
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    padding: 1.5rem 1.75rem;
    margin-bottom: 2.5rem;
}

.successor-heading {
    font-size: 1.35rem;
    font-weight: 700;
    margin: 0 0 0.75rem;
    color: var(--text-color, #1a202c);
}

.successor-body {
    color: var(--text-color, #1a202c);
    line-height: 1.7;
}

.successor-button {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.6rem 1.25rem;
    background-color: var(--primary-color, #3182ce);
    color: #ffffff !important;
    border-radius: 0.375rem;
    text-decoration: none;
    font-weight: 600;
}

.successor-button:hover {
    opacity: 0.9;
}

.successor-button:focus-visible {
    outline: 2px solid var(--text-color, #1a202c);
    outline-offset: 2px;
}

.reference-section {
    margin-bottom: 2.5rem;
}

.section-heading {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-color, #1a202c);
    border-bottom: 2px solid var(--primary-color, #3182ce);
    padding-bottom: 0.5rem;
}

.section-body {
    color: var(--text-color, #1a202c);
    line-height: 1.8;
    font-size: 1.05rem;
}

/* Markdown content (v-html) is not covered by scoped selectors without :deep */
.markdown-body :deep(p) {
    margin-bottom: 1rem;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
}

.markdown-body :deep(li) {
    margin-bottom: 0.4rem;
}

.markdown-body :deep(a) {
    color: var(--primary-color, #3182ce);
    text-decoration: none;
}

.markdown-body :deep(a:hover) {
    text-decoration: underline;
}

.markdown-body :deep(h3) {
    font-size: 1.25rem;
    margin: 1.5rem 0 0.75rem;
    color: var(--text-color, #1a202c);
}

.markdown-body :deep(blockquote) {
    border-left: 3px solid var(--border-color, #eaeaea);
    padding-left: 1rem;
    color: var(--nav-text, #4a5568);
    margin: 0 0 1rem;
}

.item-list,
.link-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.item-card {
    background-color: var(--card-bg, #ffffff);
    border: 1px solid var(--border-color, #eaeaea);
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.item-card-row {
    flex-direction: row;
    align-items: baseline;
    gap: 1rem;
}

.item-main {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
    min-width: 0;
}

.item-date {
    flex: 0 0 6.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--nav-text, #4a5568);
}

.item-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text-color, #1a202c);
    line-height: 1.5;
}

.item-authors {
    font-size: 0.9rem;
    color: var(--nav-text, #4a5568);
}

.item-meta {
    font-size: 0.9rem;
    color: var(--primary-color, #3182ce);
    line-height: 1.4;
}

.item-link {
    color: var(--primary-color, #3182ce);
    text-decoration: none;
    font-weight: 500;
    white-space: nowrap;
}

.item-link:hover {
    text-decoration: underline;
}

.link-item {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    background-color: var(--card-bg, #ffffff);
    border: 1px solid var(--border-color, #eaeaea);
    border-radius: 0.5rem;
    padding: 0.85rem 1.25rem;
    text-decoration: none;
    transition: border-color 0.2s;
}

.link-item:hover {
    border-color: var(--primary-color, #3182ce);
}

.link-label {
    font-weight: 600;
    color: var(--text-color, #1a202c);
}

.link-url {
    font-size: 0.85rem;
    color: var(--primary-color, #3182ce);
    overflow-wrap: anywhere;
}

@media (max-width: 768px) {
    .successor-notice {
        padding: 1.25rem;
    }

    .section-heading {
        font-size: 1.5rem;
    }

    .item-card-row {
        flex-direction: column;
        gap: 0.25rem;
    }

    .item-date {
        flex-basis: auto;
    }
}
</style>
