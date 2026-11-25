<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue';
import {
    computed, 
    onMounted, 
    onUnmounted, 
    ref, 
    watch,
} from 'vue';
import { Marked } from 'marked';
import { useLocale, useTranslation } from '@/i18n';
import policyEn from '@/data/privacy/privacy.en.md?raw';
import policyDe from '@/data/privacy/privacy.de.md?raw';

const locale = useLocale();
const pageTitle = useTranslation('privacy.title');

interface ISection {
    id: string;
    text: string;
}

/** "5. Hosting und Erfassung" → "5-hosting-und-erfassung" */
function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

// Render the Markdown with an id on every section heading, and collect the
// headings for the table of contents. Both locales are bundled so the policy
// is part of the prerendered page.
const policy = computed(() => {
    const sections: ISection[] = [];
    const marked = new Marked({
        renderer: {
            heading({
                tokens, 
                depth, 
                text, 
            }) {
                const id = slugify(text);

                if (depth === 2) {
                    sections.push({ id, text });
                }

                return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
            },
        },
    });
    const html = marked.parse(locale.value === 'de' ? policyDe : policyEn, { async: false });

    return { html, sections };
});

// Highlight the section being read
const policyRef = ref<HTMLElement | null>(null);
const activeId = ref<string>();
let observer: IntersectionObserver | undefined;

function observeSections() {
    observer?.disconnect();
    observer = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);

        if (visible.length > 0) {
            activeId.value = visible[0]?.target.id;
        }
    }, { rootMargin: '-80px 0px -70% 0px' });
    policyRef.value?.querySelectorAll('h2[id]').forEach((heading) => observer?.observe(heading));
}

onMounted(observeSections);
watch(locale, () => requestAnimationFrame(observeSections));
onUnmounted(() => observer?.disconnect());
</script>

<template>
    <div class="legal-container">
        <PageHeader :title="pageTitle" />

        <div class="legal-content">
            <!-- Language notice - only shown for English -->
            <div
                v-if="locale === 'en'"
                class="language-notice"
            >
                <p class="alert alert-info">
                    <strong>Note:</strong> This legal notice is in Germany not legally binding and has been created for your convenience only.
                    We apologize for any inconveniences caused and refer to the
                    <router-link to="/de/privacy">
                        legally binding German version
                    </router-link> available on this site.
                </p>
            </div>

            <div class="privacy-layout">
                <!-- Table of contents: a sticky sidebar on wide screens, a box above the text otherwise -->
                <nav
                    class="privacy-toc"
                    aria-labelledby="privacy-toc-heading"
                >
                    <h2
                        id="privacy-toc-heading"
                        class="toc-heading"
                    >
                        <ITranslate path="privacy.contents" />
                    </h2>
                    <ol class="toc-list">
                        <li
                            v-for="section in policy.sections"
                            :key="section.id"
                        >
                            <router-link
                                :to="{ hash: `#${section.id}` }"
                                class="toc-link"
                                :class="{ active: activeId === section.id }"
                                :aria-current="activeId === section.id ? 'location' : undefined"
                            >
                                {{ section.text }}
                            </router-link>
                        </li>
                    </ol>
                </nav>

                <!-- Render the converted Markdown content -->
                <div
                    ref="policyRef"
                    class="privacy-container"
                    v-html="policy.html"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.legal-container {
  width: 100%;
}



.legal-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1rem 5rem;
  color: var(--text-color);
  font-family: var(--font-family);
  font-size: 1rem;
  line-height: 1.6;
}

.privacy-container {
  min-width: 0;
}

.privacy-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2rem;
}

.privacy-toc {
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  background-color: var(--card-bg);
}

.toc-heading {
  margin: 0 0 0.75rem;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.toc-list li {
  margin: 0;
}

.toc-link {
  display: block;
  padding: 0.35rem 0 0.35rem 0.75rem;
  border-left: 2px solid transparent;
  color: var(--text-color);
  font-size: 0.9rem;
  line-height: 1.4;
  text-decoration: none;
}

.toc-link:hover {
  color: var(--link-color);
  text-decoration: underline;
}

.toc-link.active {
  border-left-color: var(--primary-color);
  color: var(--link-color);
  font-weight: 600;
}

/* Wide screens: the contents run alongside the text */
@media (min-width: 1100px) {
  .legal-content {
    max-width: 1140px;
  }

  .privacy-layout {
    grid-template-columns: 260px minmax(0, 800px);
    gap: 3rem;
  }

  .privacy-toc {
    position: sticky;
    top: 6rem;
    align-self: start;
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
  }
}

:deep(h2[id]) {
  scroll-margin-top: 5rem;
}

.language-notice {
  background-color: var(--card-bg);
  border-left: 4px solid var(--primary-color);
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.alert {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.alert-info {
  color: var(--text-color);
  background-color: var(--tag-bg);
  border-color: var(--border-color);
}

/* Add global styles for the markdown rendered content */
:deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
}

:deep(h3) {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  color: var(--text-color);
}

:deep(p) {
  margin-bottom: 1.2rem;
  line-height: 1.6;
}

:deep(ul), :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

:deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

:deep(a) {
  color: var(--link-color);
  text-decoration: underline;
  text-underline-offset: 2px;
}

:deep(a:hover) {
  text-decoration-thickness: 2px;
}

/* Responsive adjustments */
@media (max-width: 768px) {


  .legal-content {
    padding: 2rem 1rem 3rem;
  }
}
</style>
