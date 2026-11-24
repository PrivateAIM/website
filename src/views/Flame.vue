<template>
    <div class="flame-container">
        <PageHeader
            :title="title"
            :subtitle="subtitle"
        />

        <div class="flame-content">
            <p class="flame-status">
                <span
                    class="status-dot"
                    aria-hidden="true"
                />
                <ITranslate path="flame.status" />
            </p>
            <p class="flame-lead">
                <ITranslate path="flame.lead" />
            </p>
            <p class="flame-context">
                <ITranslate path="flame.context" />
            </p>

            <router-link
                :to="localePath('/federated-analysis')"
                class="explainer-banner"
            >
                <AppIcon
                    name="book"
                    :size="28"
                />
                <span class="explainer-text">
                    <strong><ITranslate path="flame.explainer.title" /></strong>
                    <span><ITranslate path="flame.explainer.text" /></span>
                </span>
                <AppIcon
                    name="arrow"
                    class="explainer-arrow"
                />
            </router-link>

            <section class="flame-section">
                <h2 class="section-heading">
                    <ITranslate path="flame.architecture.title" />
                </h2>
                <p class="section-body">
                    <ITranslate path="flame.architecture.body" />
                </p>
                <ol class="flame-steps">
                    <li
                        v-for="(step, index) in steps"
                        :key="step"
                        class="flame-step"
                    >
                        <span
                            class="step-number"
                            aria-hidden="true"
                        >{{ index + 1 }}</span>
                        <span><ITranslate :path="`flame.architecture.${step}`" /></span>
                    </li>
                </ol>
                <figure class="flame-figure">
                    <img
                        src="/images/flame/flame-architecture-light.webp"
                        :alt="figureAlt"
                        width="1596"
                        height="801"
                        loading="lazy"
                        class="figure-light"
                    >
                    <img
                        src="/images/flame/flame-architecture-dark.webp"
                        :alt="figureAlt"
                        width="1596"
                        height="801"
                        loading="lazy"
                        class="figure-dark"
                    >
                    <figcaption><ITranslate path="flame.architecture.figureCaption" /></figcaption>
                </figure>
            </section>

            <section class="flame-section">
                <h2 class="section-heading">
                    <ITranslate path="flame.safeguards.title" />
                </h2>
                <ul class="safeguard-grid">
                    <li
                        v-for="safeguard in safeguards"
                        :key="safeguard.key"
                        class="safeguard"
                    >
                        <span class="safeguard-icon">
                            <AppIcon :name="safeguard.icon" />
                        </span>
                        <span><ITranslate :path="`flame.safeguards.${safeguard.key}`" /></span>
                    </li>
                </ul>
            </section>

            <section class="flame-section limits-callout">
                <h2 class="callout-heading">
                    <AppIcon name="alert" />
                    <ITranslate path="flame.limits.title" />
                </h2>
                <p class="section-body">
                    <ITranslate path="flame.limits.body" />
                </p>
            </section>

            <section class="flame-section">
                <h2 class="section-heading">
                    <ITranslate path="flame.audiences.title" />
                </h2>
                <div class="audience-grid">
                    <div
                        v-for="audience in audiences"
                        :key="audience.key"
                        class="audience-card"
                    >
                        <span class="audience-icon">
                            <AppIcon :name="audience.icon" />
                        </span>
                        <h3 class="audience-title">
                            <ITranslate :path="`flame.audiences.${audience.key}.title`" />
                        </h3>
                        <p class="audience-body">
                            <ITranslate :path="`flame.audiences.${audience.key}.body`" />
                        </p>
                        <a
                            v-for="link in audience.links"
                            :key="link.href"
                            :href="link.href"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="audience-link"
                        ><ITranslate :path="`flame.audiences.${audience.key}.${link.label}`" /> →</a>
                    </div>
                </div>
            </section>

            <section class="flame-section">
                <h2 class="section-heading">
                    <ITranslate path="flame.resources.title" />
                </h2>
                <ul class="resource-grid">
                    <li
                        v-for="resource in resources"
                        :key="resource.key"
                    >
                        <router-link
                            v-if="resource.internal"
                            :to="localePath(resource.href)"
                            class="resource-card"
                        >
                            <AppIcon :name="resource.icon" />
                            <ITranslate :path="`flame.resources.${resource.key}`" />
                        </router-link>
                        <a
                            v-else
                            :href="resource.href"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="resource-card"
                        >
                            <AppIcon :name="resource.icon" />
                            <ITranslate :path="`flame.resources.${resource.key}`" />
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue';
import AppIcon from '@/components/shared/AppIcon.vue';
import { useLocalePath, useTranslation } from '@/i18n';

const title = useTranslation('flame.title');
const subtitle = useTranslation('flame.subtitle');
const figureAlt = useTranslation('flame.architecture.figureAlt');
const localePath = useLocalePath();

const steps = ['step1', 'step2', 'step3', 'step4'];
const safeguards = [
    { key: 'review', icon: 'eye' },
    { key: 'isolation', icon: 'box' },
    { key: 'encryption', icon: 'lock' },
    { key: 'hub', icon: 'server' },
    { key: 'privacy', icon: 'shield' },
    { key: 'access', icon: 'users' },
];

const DOCS = 'https://docs.privateaim.net';
const audiences = [
    {
        key: 'researchers', 
        icon: 'user', 
        links: [{ href: `${DOCS}/guide/user/run-your-first-analysis`, label: 'link' }], 
    },
    {
        key: 'sites', 
        icon: 'server', 
        links: [{ href: `${DOCS}/guide/deployment/node-installation`, label: 'link' }], 
    },
    {
        key: 'dpo',
        icon: 'shield',
        links: [
            { href: `${DOCS}/guide/faqs/faqs-of-security-privacy`, label: 'link' },
            { href: '/files/Flyer-Datenschutz.pdf', label: 'flyer' },
        ],
    },
    {
        key: 'patients', 
        icon: 'heart', 
        links: [{ href: '/files/Flyer-Patienten.pdf', label: 'link' }], 
    },
];

const resources = [
    {
        key: 'docs', 
        icon: 'book', 
        href: `${DOCS}/`, 
    },
    {
        key: 'code', 
        icon: 'code', 
        href: 'https://github.com/PrivateAIM', 
    },
    {
        key: 'talk', 
        icon: 'play', 
        href: 'https://www.youtube.com/watch?v=tXfg3kb0AIg', 
    },
    {
        key: 'slides', 
        icon: 'file', 
        href: '/files/FLAME-GMDS2025.pdf', 
    },
    {
        key: 'publications', 
        icon: 'file', 
        href: '/publications', 
        internal: true,
    },
    {
        key: 'predecessor', 
        icon: 'archive', 
        href: '/references/pht', 
        internal: true,
    },
];
</script>

<style scoped>
.flame-container {
    width: 100%;
}

.flame-content {
    max-width: 960px;
    margin: 0 auto;
    padding: 1rem 1rem 3rem;
}

.flame-status {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
    padding: 0.35rem 0.9rem;
    border-radius: 999px;
    background-color: var(--tag-bg);
    color: var(--link-color);
    font-weight: 600;
}

.status-dot {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background-color: var(--success);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--success) 25%, transparent);
}

.flame-lead {
    font-size: 1.25rem;
    line-height: 1.7;
    color: var(--text-color);
    margin-bottom: 1rem;
}

.flame-context {
    line-height: 1.7;
    color: var(--text-color);
    opacity: 0.85;
    margin-bottom: 2rem;
}

.explainer-banner {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3rem;
    padding: 1.25rem 1.5rem;
    border-radius: 0.75rem;
    background-color: var(--tag-bg);
    border: 1px solid color-mix(in srgb, var(--primary-color) 35%, transparent);
    color: var(--link-color);
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.explainer-banner:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px color-mix(in srgb, var(--primary-color) 18%, transparent);
}

.explainer-text {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    flex-grow: 1;
    color: var(--text-color);
}

.explainer-text strong {
    color: var(--link-color);
    font-size: 1.1rem;
}

.explainer-arrow {
    flex-shrink: 0;
}

.flame-section {
    margin-bottom: 3rem;
}

.section-heading {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
    color: var(--text-color);
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 0.5rem;
}

.section-body {
    color: var(--text-color);
    line-height: 1.8;
    font-size: 1.05rem;
}

.flame-steps {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}

.flame-step {
    display: flex;
    gap: 0.9rem;
    align-items: flex-start;
    padding: 1.1rem 1.25rem;
    border-radius: 0.75rem;
    background-color: var(--tag-bg);
    color: var(--text-color);
    line-height: 1.6;
}

.step-number {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: var(--on-primary);
    font-weight: 700;
}

.flame-figure {
    margin: 2rem 0 0;
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    background-color: var(--card-bg);
}

.flame-figure img {
    width: 100%;
    height: auto;
}

.figure-dark {
    display: none;
}

.dark-mode .figure-light {
    display: none;
}

.dark-mode .figure-dark {
    display: block;
}

.flame-figure figcaption {
    margin-top: 0.75rem;
    font-size: 0.9rem;
    text-align: center;
    color: var(--text-color);
    opacity: 0.8;
}

.safeguard-grid {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}

.safeguard {
    display: flex;
    gap: 0.9rem;
    align-items: flex-start;
    padding: 1rem 1.25rem;
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    background-color: var(--card-bg);
    color: var(--text-color);
    line-height: 1.6;
}

.safeguard-icon,
.audience-icon {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.6rem;
    background-color: var(--tag-bg);
    color: var(--link-color);
}

.limits-callout {
    padding: 1.5rem;
    border-left: 4px solid var(--flame);
    border-radius: 0.5rem;
    background-color: var(--flame-tint);
}

.callout-heading {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.35rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: var(--flame-text);
}

.limits-callout .section-body {
    margin: 0;
}

.audience-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}

.audience-card {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    background-color: var(--card-bg);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.audience-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px color-mix(in srgb, var(--shadow-color) 8%, transparent);
}

.audience-icon {
    margin-bottom: 0.75rem;
}

.audience-title {
    font-size: 1.15rem;
    margin: 0 0 0.5rem;
    color: var(--text-color);
}

.audience-body {
    flex-grow: 1;
    line-height: 1.6;
    margin-bottom: 0.75rem;
    color: var(--text-color);
}

.audience-link {
    display: inline-block;
    padding: 0.25rem 0;
    color: var(--link-color);
    font-weight: 500;
    text-decoration: none;
}

.audience-link:hover {
    text-decoration: underline;
}

.resource-grid {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
}

.resource-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    height: 100%;
    padding: 1rem 1.25rem;
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    background-color: var(--card-bg);
    color: var(--link-color);
    font-weight: 500;
    line-height: 1.4;
    text-decoration: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.resource-card:hover {
    border-color: var(--primary-color);
    box-shadow: 0 4px 14px color-mix(in srgb, var(--primary-color) 15%, transparent);
}

.resource-card svg {
    flex-shrink: 0;
}

@media (max-width: 768px) {
    .resource-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 640px) {
    .flame-steps,
    .safeguard-grid,
    .audience-grid,
    .resource-grid {
        grid-template-columns: minmax(0, 1fr);
    }
}
</style>
