<template>
    <section class="project-facts">
        <h2 class="facts-title">
            <ITranslate path="home.facts.title" />
        </h2>
        <dl class="facts-list">
            <div
                v-for="fact in facts"
                :key="fact"
                class="fact"
            >
                <dt><ITranslate :path="`home.facts.${fact}`" /></dt>
                <dd>
                    <a
                        v-if="fact === 'code'"
                        href="https://github.com/PrivateAIM"
                        target="_blank"
                        rel="noopener noreferrer"
                    ><ITranslate :path="`home.facts.${fact}Value`" /></a>
                    <router-link
                        v-else-if="fact === 'platform'"
                        :to="localePath('/flame')"
                    >
                        <ITranslate :path="`home.facts.${fact}Value`" />
                    </router-link>
                    <ITranslate
                        v-else
                        :path="`home.facts.${fact}Value`"
                    />
                </dd>
            </div>
        </dl>
    </section>
</template>

<script setup lang="ts">
import { useLocalePath } from '@/i18n';

const localePath = useLocalePath();
const facts = ['funding', 'network', 'platform', 'end', 'code'];
</script>

<style scoped>
.project-facts {
    margin: 3rem 0;
}

.facts-title {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
    color: var(--text-color, #1a202c);
}

.facts-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 0;
}

.fact {
    padding: 1rem 1.25rem;
    background-color: var(--card-bg, #ffffff);
    border: 1px solid var(--border-color, #eaeaea);
    border-radius: 0.5rem;
}

.fact dt {
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--nav-text, #64748b);
    margin-bottom: 0.35rem;
}

.fact dd {
    margin: 0;
    color: var(--text-color, #1a202c);
    line-height: 1.5;
}

.fact a {
    display: inline-block;
    padding-block: 5px;
    color: var(--primary-color, #3182ce);
    font-weight: 500;
}
</style>
