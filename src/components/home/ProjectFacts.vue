<template>
    <section class="project-facts">
        <h2 class="facts-title">
            <ITranslate path="home.facts.title" />
        </h2>
        <dl class="facts-list">
            <div
                v-for="fact in facts"
                :key="fact.key"
                class="fact"
            >
                <dt>
                    <AppIcon
                        :name="fact.icon"
                        :size="18"
                    />
                    <ITranslate :path="`home.facts.${fact.key}`" />
                </dt>
                <dd>
                    <a
                        v-if="fact.key === 'code'"
                        href="https://github.com/PrivateAIM"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="fact-headline"
                    ><ITranslate :path="`home.facts.${fact.key}Headline`" /></a>
                    <router-link
                        v-else-if="fact.key === 'platform'"
                        :to="localePath('/flame')"
                        class="fact-headline"
                    >
                        <ITranslate :path="`home.facts.${fact.key}Headline`" />
                    </router-link>
                    <span
                        v-else
                        class="fact-headline"
                    ><ITranslate :path="`home.facts.${fact.key}Headline`" /></span>
                    <span class="fact-detail"><ITranslate :path="`home.facts.${fact.key}Value`" /></span>
                </dd>
            </div>
        </dl>
    </section>
</template>

<script setup lang="ts">
import AppIcon from '@/components/shared/AppIcon.vue';
import { useLocalePath } from '@/i18n';

const localePath = useLocalePath();
const facts = [
    { key: 'funding', icon: 'award' },
    { key: 'network', icon: 'share' },
    { key: 'platform', icon: 'zap' },
    { key: 'end', icon: 'calendar' },
    { key: 'code', icon: 'code' },
];
</script>

<style scoped>
.project-facts {
    margin: 0 0 5rem;
    padding: 2rem;
    border-radius: 1rem;
    background:
        radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--on-band) 12%, transparent) 1px, transparent 0) 0 0 / 22px 22px,
        var(--band-bg);
    color: var(--on-band);
}

.facts-title {
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1.5rem;
    text-align: center;
    color: var(--band-accent);
}

.facts-list {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 1.5rem;
    margin: 0;
}

.fact {
    text-align: center;
}

.fact dt {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.85;
    margin-bottom: 0.5rem;
}

.fact dt svg {
    color: var(--band-accent);
}

.fact dd {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    margin: 0;
}

.fact-headline {
    font-size: 2rem;
    font-weight: 800;
    line-height: 1.1;
    color: var(--on-band);
    text-decoration: none;
}

a.fact-headline {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 4px;
    text-decoration-color: color-mix(in srgb, var(--on-band) 50%, transparent);
}

a.fact-headline:hover {
    text-decoration-color: var(--on-band);
}

.fact-detail {
    font-size: 0.9rem;
    line-height: 1.4;
    opacity: 0.9;
}

@media (max-width: 900px) {
    .facts-list {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 560px) {
    .project-facts {
        padding: 1.5rem 1rem;
    }

    .facts-list {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .fact-headline {
        font-size: 1.6rem;
    }
}
</style>
