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
                <router-link
                    :to="localePath('/flame')"
                    class="successor-button"
                >
                    <ITranslate path="references.learnMore" /> <span aria-hidden="true">→</span>
                </router-link>
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
                v-if="timeline.length > 0"
                class="reference-section"
            >
                <h2 class="section-heading">
                    <ITranslate path="references.timeline" />
                </h2>
                <ol class="timeline">
                    <li
                        v-for="group in timeline"
                        :key="group.year"
                        class="timeline-year"
                    >
                        <h3 class="timeline-year-label">
                            {{ group.year }}
                        </h3>
                        <ul class="item-list">
                            <li
                                v-for="(entry, index) in group.entries"
                                :key="index"
                                class="item-card"
                                :class="`entry-${entry.kind}`"
                            >
                                <span class="entry-kind">
                                    <ITranslate :path="`references.kinds.${entry.kind}`" />
                                    <template v-if="entry.kind === 'talk'"> · {{ entry.talk.date }}</template>
                                </span>
                                <template v-if="entry.kind === 'milestone'">
                                    <span class="item-title">{{ entry.milestone.text }}</span>
                                </template>
                                <template v-else-if="entry.kind === 'talk'">
                                    <span class="item-title">{{ entry.talk.title }}</span>
                                    <span class="item-meta">{{ entry.talk.venue }}</span>
                                    <a
                                        v-if="entry.talk.link"
                                        :href="entry.talk.link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="item-link"
                                        :aria-label="`${slidesLabel}: ${entry.talk.title} (${newTabLabel})`"
                                    >
                                        <ITranslate path="references.slides" /> <span aria-hidden="true">→</span>
                                    </a>
                                </template>
                                <template v-else>
                                    <span class="item-title">{{ entry.publication.title }}</span>
                                    <span class="item-authors">{{ entry.publication.authors }}</span>
                                    <span class="item-meta">{{ entry.publication.citation }}</span>
                                    <a
                                        v-if="entry.publication.link"
                                        :href="entry.publication.link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="item-link"
                                        :aria-label="`${readPaperLabel}: ${entry.publication.title} (${newTabLabel})`"
                                    >
                                        <ITranslate path="references.readPaper" /> <span aria-hidden="true">→</span>
                                    </a>
                                </template>
                            </li>
                        </ul>
                    </li>
                </ol>
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
import { useLocale, useLocalePath, useTranslation } from '@/i18n';
import { findReference, referenceContentForLocale, referenceTitle } from '@/data/references';
import type { IReferenceMilestone, IReferencePublication, IReferenceTalk } from '@/data/references/types';

const props = defineProps<{ slug: string }>();

const locale = useLocale();
const localePath = useLocalePath();
const route = useRoute();
const successorHeading = useTranslation('references.successorHeading');
const slidesLabel = useTranslation('references.slides');
const readPaperLabel = useTranslation('references.readPaper');
const newTabLabel = useTranslation('references.opensInNewTab');

const project = computed(() => findReference(props.slug));
const content = computed(() => (project.value ? referenceContentForLocale(project.value, locale.value) : undefined));
type TimelineEntry =    | { kind: 'milestone'; milestone: IReferenceMilestone } |
    { kind: 'talk'; talk: IReferenceTalk } |
    { kind: 'publication'; publication: IReferencePublication };

// Milestones, talks and publications in one list per year, oldest first
const timeline = computed(() => {
    if (!project.value || !content.value) {
        return [];
    }

    const entries: { year: number; entry: TimelineEntry }[] = [
        ...content.value.milestones.map((milestone) => ({ year: milestone.year, entry: { kind: 'milestone' as const, milestone } })),
        ...content.value.talks.map((talk) => ({ year: Number(talk.date.match(/\d{4}/)?.[0]), entry: { kind: 'talk' as const, talk } })),
        ...project.value.publications.map((publication) => ({ year: publication.year, entry: { kind: 'publication' as const, publication } })),
    ];
    const years = [...new Set(entries.map(({ year }) => year))].sort((a, b) => a - b);

    return years.map((year) => ({ year, entries: entries.filter((item) => item.year === year).map(({ entry }) => entry) }));
});

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
    if (import.meta.env.SSR) {
        return;
    }

    if (!content.value) {
        document.title = 'Page Not Found — PrivateAIM';

        return;
    }

    const title = referenceTitle(content.value, locale.value);

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
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-left: 4px solid var(--primary-color);
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px color-mix(in srgb, var(--shadow-color) 5%, transparent);
    padding: 1.5rem 1.75rem;
    margin-bottom: 2.5rem;
}

.successor-heading {
    font-size: 1.35rem;
    font-weight: 700;
    margin: 0 0 0.75rem;
    color: var(--text-color);
}

.successor-body {
    color: var(--text-color);
    line-height: 1.7;
}

.successor-button {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.6rem 1.25rem;
    background-color: var(--primary-color);
    color: var(--on-primary) !important;
    border-radius: 0.375rem;
    text-decoration: none;
    font-weight: 600;
}

.successor-button:hover {
    opacity: 0.9;
}

.successor-button:focus-visible {
    outline: 2px solid var(--text-color);
    outline-offset: 2px;
}

.reference-section {
    margin-bottom: 2.5rem;
}

.section-heading {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-color);
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 0.5rem;
}

.section-body {
    color: var(--text-color);
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
    color: var(--link-color);
    text-decoration: underline;
    text-underline-offset: 2px;
}

.markdown-body :deep(a:hover) {
    text-decoration-thickness: 2px;
}

.markdown-body :deep(h3) {
    font-size: 1.25rem;
    margin: 1.5rem 0 0.75rem;
    color: var(--text-color);
}

.markdown-body :deep(blockquote) {
    border-left: 3px solid var(--border-color);
    padding-left: 1rem;
    color: var(--nav-text);
    margin: 0 0 1rem;
}

.timeline {
    list-style: none;
    margin: 0;
    padding: 0 0 0 1.5rem;
    border-left: 2px solid var(--border-color);
}

.timeline-year {
    position: relative;
    margin-bottom: 1.75rem;
}

.timeline-year::before {
    content: "";
    position: absolute;
    top: 0.45rem;
    left: calc(-1.5rem - 7px);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--primary-color);
}

.timeline-year-label {
    margin: 0 0 0.75rem;
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--text-color);
}

.entry-kind {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-muted);
}

.item-card.entry-milestone {
    border-left: 4px solid var(--brand-yellow);
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
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px color-mix(in srgb, var(--shadow-color) 5%, transparent);
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}




.item-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text-color);
    line-height: 1.5;
}

.item-authors {
    font-size: 0.9rem;
    color: var(--nav-text);
}

.item-meta {
    font-size: 0.9rem;
    color: var(--link-color);
    line-height: 1.4;
}

.item-link {
    display: inline-block;
    padding-block: 5px;
    color: var(--link-color);
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
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    padding: 0.85rem 1.25rem;
    text-decoration: none;
    transition: border-color 0.2s;
}

.link-item:hover {
    border-color: var(--primary-color);
}

.link-label {
    font-weight: 600;
    color: var(--text-color);
}

.link-url {
    font-size: 0.85rem;
    color: var(--link-color);
    overflow-wrap: anywhere;
}

@media (max-width: 768px) {
    .successor-notice {
        padding: 1.25rem;
    }

    .section-heading {
        font-size: 1.5rem;
    }
}
</style>
