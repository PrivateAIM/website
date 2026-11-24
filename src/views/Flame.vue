<template>
    <div class="flame-container">
        <PageHeader
            :title="title"
            :subtitle="subtitle"
        />

        <div class="flame-content">
            <p class="flame-status">
                <ITranslate path="flame.status" />
            </p>
            <p class="flame-lead">
                <ITranslate path="flame.lead" />
            </p>
            <p class="flame-context">
                <ITranslate path="flame.context" />
            </p>

            <section class="flame-section">
                <h2 class="section-heading">
                    <ITranslate path="flame.architecture.title" />
                </h2>
                <p class="section-body">
                    <ITranslate path="flame.architecture.body" />
                </p>
                <ol class="section-body flame-steps">
                    <li
                        v-for="step in steps"
                        :key="step"
                    >
                        <ITranslate :path="`flame.architecture.${step}`" />
                    </li>
                </ol>
            </section>

            <section class="flame-section">
                <h2 class="section-heading">
                    <ITranslate path="flame.safeguards.title" />
                </h2>
                <ul class="section-body">
                    <li
                        v-for="safeguard in safeguards"
                        :key="safeguard"
                    >
                        <ITranslate :path="`flame.safeguards.${safeguard}`" />
                    </li>
                </ul>
            </section>

            <section class="flame-section">
                <h2 class="section-heading">
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
                <ul class="section-body flame-resources">
                    <li>
                        <a
                            href="https://docs.privateaim.net/"
                            target="_blank"
                            rel="noopener noreferrer"
                        ><ITranslate path="flame.resources.docs" /></a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/PrivateAIM"
                            target="_blank"
                            rel="noopener noreferrer"
                        ><ITranslate path="flame.resources.code" /></a>
                    </li>
                    <li>
                        <a
                            href="https://www.youtube.com/watch?v=tXfg3kb0AIg"
                            target="_blank"
                            rel="noopener noreferrer"
                        ><ITranslate path="flame.resources.talk" /></a>
                    </li>
                    <li>
                        <a
                            href="/files/FLAME-GMDS2025.pdf"
                            target="_blank"
                        ><ITranslate path="flame.resources.slides" /></a>
                    </li>
                    <li>
                        <router-link :to="localePath('/publications')">
                            <ITranslate path="flame.resources.publications" />
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="localePath('/references/pht')">
                            <ITranslate path="flame.resources.predecessor" />
                        </router-link>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue';
import { useLocalePath, useTranslation } from '@/i18n';

const title = useTranslation('flame.title');
const subtitle = useTranslation('flame.subtitle');
const localePath = useLocalePath();

const steps = ['step1', 'step2', 'step3', 'step4'];
const safeguards = ['review', 'isolation', 'encryption', 'hub', 'privacy', 'access'];

const DOCS = 'https://docs.privateaim.net';
const audiences = [
    { key: 'researchers', links: [{ href: `${DOCS}/guide/user/run-your-first-analysis`, label: 'link' }] },
    { key: 'sites', links: [{ href: `${DOCS}/guide/deployment/node-installation`, label: 'link' }] },
    {
        key: 'dpo',
        links: [
            { href: `${DOCS}/guide/faqs/faqs-of-security-privacy`, label: 'link' },
            { href: '/files/Flyer-Datenschutz.pdf', label: 'flyer' },
        ],
    },
    { key: 'patients', links: [{ href: '/files/Flyer-Patienten.pdf', label: 'link' }] },
];
</script>

<style scoped>
.flame-container {
    width: 100%;
}

.flame-content {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.flame-status {
    display: inline-block;
    margin-bottom: 1.25rem;
    padding: 0.35rem 0.9rem;
    border-radius: 999px;
    background-color: var(--tag-bg, #f0f4f8);
    color: var(--primary-color, #3182ce);
    font-weight: 600;
}

.flame-lead {
    font-size: 1.2rem;
    line-height: 1.7;
    color: var(--text-color, #1a202c);
    margin-bottom: 1rem;
}

.flame-context {
    line-height: 1.7;
    color: var(--text-color, #1a202c);
    opacity: 0.85;
    margin-bottom: 2.5rem;
}

.flame-section {
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

.section-body li {
    margin-bottom: 0.5rem;
}

.flame-resources a {
    display: inline-block;
    padding-block: 3px;
    color: var(--primary-color, #3182ce);
    font-weight: 500;
}
.audience-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}

@media (max-width: 640px) {
    .audience-grid {
        grid-template-columns: minmax(0, 1fr);
    }
}

.audience-card {
    display: flex;
    flex-direction: column;
    padding: 1.25rem;
    border: 1px solid var(--border-color, #e2e8f0);
    border-radius: 0.5rem;
    background-color: var(--card-bg, #ffffff);
}

.audience-title {
    font-size: 1.1rem;
    margin: 0 0 0.5rem;
    color: var(--text-color, #1a202c);
}

.audience-body {
    flex-grow: 1;
    line-height: 1.6;
    margin-bottom: 0.75rem;
    color: var(--text-color, #1a202c);
}

.audience-link {
    display: inline-block;
    padding: 0.25rem 0;
    color: var(--primary-color, #3182ce);
    font-weight: 500;
    text-decoration: none;
}

.audience-link:hover {
    text-decoration: underline;
}
</style>
