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
</style>
