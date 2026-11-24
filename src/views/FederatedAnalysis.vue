<template>
    <div class="explainer-container">
        <PageHeader
            :title="title"
            :subtitle="subtitle"
        />

        <div class="explainer-content">
            <p class="explainer-intro">
                <ITranslate path="explainer.intro" />
            </p>

            <section class="explainer-section">
                <h2><ITranslate path="explainer.problem.title" /></h2>
                <p><ITranslate path="explainer.problem.body" /></p>
            </section>

            <section class="explainer-section">
                <h2><ITranslate path="explainer.idea.title" /></h2>
                <p><ITranslate path="explainer.idea.body" /></p>

                <!-- Code to data: the analysis travels to each hospital, only results come back -->
                <div
                    class="flow"
                    role="img"
                    :aria-label="ideaBody"
                >
                    <div class="flow-node flow-researcher">
                        <AppIcon
                            name="user"
                            :size="32"
                        />
                        <strong><ITranslate path="explainer.idea.researcher" /></strong>
                        <span class="flow-tag">
                            <AppIcon
                                name="code"
                                :size="16"
                            />
                            <ITranslate path="explainer.idea.code" />
                        </span>
                    </div>
                    <div
                        class="flow-arrow"
                        aria-hidden="true"
                    >
                        <AppIcon name="arrow" />
                    </div>
                    <div class="flow-hospitals">
                        <div
                            v-for="site in ['A', 'B', 'C']"
                            :key="site"
                            class="flow-node flow-hospital"
                        >
                            <AppIcon name="server" />
                            <span>
                                <strong><ITranslate path="explainer.idea.hospital" /> {{ site }}</strong>
                                <small><ITranslate path="explainer.idea.data" /></small>
                            </span>
                        </div>
                    </div>
                    <div
                        class="flow-arrow"
                        aria-hidden="true"
                    >
                        <AppIcon name="arrow" />
                    </div>
                    <div class="flow-node flow-result">
                        <AppIcon
                            name="chart"
                            :size="32"
                        />
                        <strong><ITranslate path="explainer.idea.result" /></strong>
                    </div>
                </div>
            </section>

            <section class="explainer-section">
                <h2><ITranslate path="explainer.kinds.title" /></h2>
                <div class="two-columns">
                    <div class="kind-card">
                        <h3>
                            <AppIcon name="chart" />
                            <ITranslate path="explainer.kinds.analysis" />
                        </h3>
                        <p><ITranslate path="explainer.kinds.analysisBody" /></p>
                    </div>
                    <div class="kind-card">
                        <h3>
                            <AppIcon name="layers" />
                            <ITranslate path="explainer.kinds.learning" />
                        </h3>
                        <p><ITranslate path="explainer.kinds.learningBody" /></p>
                    </div>
                </div>
            </section>

            <section class="explainer-section">
                <h2><ITranslate path="explainer.shared.title" /></h2>
                <div class="two-columns">
                    <div class="share-card share-travels">
                        <h3><ITranslate path="explainer.shared.sharedTitle" /></h3>
                        <ul>
                            <li><ITranslate path="explainer.shared.shared1" /></li>
                            <li><ITranslate path="explainer.shared.shared2" /></li>
                        </ul>
                    </div>
                    <div class="share-card share-stays">
                        <h3><ITranslate path="explainer.shared.notSharedTitle" /></h3>
                        <ul>
                            <li><ITranslate path="explainer.shared.notShared1" /></li>
                            <li><ITranslate path="explainer.shared.notShared2" /></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="explainer-section protection-callout">
                <h2>
                    <AppIcon name="shield" />
                    <ITranslate path="explainer.protection.title" />
                </h2>
                <p><ITranslate path="explainer.protection.body" /></p>
            </section>

            <section class="explainer-section practice">
                <h2><ITranslate path="explainer.practice.title" /></h2>
                <p><ITranslate path="explainer.practice.body" /></p>
                <div class="practice-actions">
                    <router-link
                        :to="localePath('/flame')"
                        class="practice-button primary"
                    >
                        <ITranslate path="explainer.practice.flame" />
                    </router-link>
                    <a
                        href="https://docs.privateaim.net/getting-started/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="practice-button"
                    ><ITranslate path="explainer.practice.docs" /></a>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue';
import AppIcon from '@/components/shared/AppIcon.vue';
import { useLocalePath, useTranslation } from '@/i18n';

const title = useTranslation('explainer.title');
const subtitle = useTranslation('explainer.subtitle');
const ideaBody = useTranslation('explainer.idea.body');
const localePath = useLocalePath();
</script>

<style scoped>
.explainer-container {
    width: 100%;
}

.explainer-content {
    max-width: 860px;
    margin: 0 auto;
    padding: 1rem 1rem 3rem;
    color: var(--text-color);
}

.explainer-intro {
    font-size: 1.25rem;
    line-height: 1.75;
    margin-bottom: 2.5rem;
}

.explainer-section {
    margin-bottom: 3rem;
}

.explainer-section h2 {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.explainer-section p {
    line-height: 1.8;
    font-size: 1.05rem;
}

/* Flow diagram */
.flow {
    display: grid;
    grid-template-columns: 1fr auto 1.3fr auto 1fr;
    align-items: center;
    gap: 0.75rem;
    margin-top: 1.5rem;
    padding: 1.5rem;
    border-radius: 1rem;
    background-color: var(--tag-bg);
}

.flow-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    padding: 1rem;
    border-radius: 0.75rem;
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    text-align: center;
    color: var(--link-color);
}

.flow-node strong {
    color: var(--text-color);
}

.flow-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background-color: color-mix(in srgb, var(--primary-color) 12%, transparent);
    font-size: 0.85rem;
    font-weight: 600;
}

.flow-hospitals {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

.flow-hospital {
    flex-direction: row;
    justify-content: flex-start;
    text-align: left;
    padding: 0.6rem 0.9rem;
}

.flow-hospital span {
    display: flex;
    flex-direction: column;
}

/* Yellow is unreadable as text on light backgrounds, so light mode uses it as a highlight */
.flow-hospital small {
    align-self: flex-start;
    padding: 0 0.35rem;
    border-radius: 0.25rem;
    background-color: var(--brand-yellow);
    color: var(--on-brand-yellow);
    font-weight: 600;
}

.dark-mode .flow-hospital small {
    padding: 0;
    background-color: transparent;
    color: var(--brand-yellow);
}

.flow-arrow {
    color: var(--link-color);
}

.flow-result {
    border-color: var(--primary-color);
}

/* Cards */
.two-columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}

.kind-card,
.share-card {
    padding: 1.5rem;
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    background-color: var(--card-bg);
}

.kind-card h3,
.share-card h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.kind-card h3 svg {
    color: var(--link-color);
}

.kind-card p {
    margin: 0;
}

.share-card ul {
    margin: 0;
    padding-left: 1.2rem;
    line-height: 1.7;
}

.share-travels {
    border-top: 4px solid var(--link-color);
}

.share-stays {
    border-top: 4px solid var(--brand-yellow);
}

.protection-callout {
    padding: 1.5rem;
    border-left: 4px solid var(--link-color);
    border-radius: 0.5rem;
    background-color: var(--brand-yellow-tint);
}

.protection-callout h2 {
    color: var(--text-color);
    font-size: 1.35rem;
}

.protection-callout p {
    margin: 0;
}

.practice {
    padding: 2rem;
    border-radius: 1rem;
    background: var(--band-bg);
    color: var(--on-band);
}

.practice h2 {
    color: var(--on-band);
}

.practice-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.25rem;
}

.practice-button {
    display: inline-block;
    padding: 0.75rem 1.4rem;
    border-radius: 0.5rem;
    border: 2px solid var(--on-band);
    color: var(--on-band);
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.2s ease;
}

.practice-button.primary {
    border-color: var(--brand-yellow);
    background-color: var(--brand-yellow);
    color: var(--on-brand-yellow);
}

.practice-button:hover {
    background-color: color-mix(in srgb, var(--on-band) 15%, transparent);
}

.practice-button.primary:hover {
    background-color: var(--primary-hover);
}

@media (max-width: 760px) {
    .flow {
        grid-template-columns: minmax(0, 1fr);
    }

    .flow-arrow {
        justify-self: center;
        transform: rotate(90deg);
    }
}

@media (max-width: 640px) {
    .two-columns {
        grid-template-columns: minmax(0, 1fr);
    }

    .practice {
        padding: 1.5rem;
    }
}
</style>
