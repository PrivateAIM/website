<script lang="ts">
import { defineComponent } from 'vue';
import LinkText from '@/components/shared/LinkText.vue';

export default defineComponent({
    components: {
        LinkText
    }
})
</script>
<template>
    <div class="vision-section">
        <h2>{{ $t('home.vision.title') }}</h2>

        <div class="vision-content">
            <div class="vision-text">
                <LinkText :text="$t('home.vision.paragraph1')" tag="p" />
                <LinkText :text="$t('home.vision.paragraph2')" tag="p" />
                <LinkText :text="$t('home.vision.paragraph3')" tag="p" />
            </div>

            <div class="action-card">
                <div class="card-content">
                    <h3>{{ $t('home.vision.contribute') }}</h3>
                    <p>{{ $t('home.vision.explanation') }}</p>
                    <a href="https://github.com/PrivateAIM" target="_blank" class="card-link">{{ $t('home.vision.github') }} →</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.vision-section {
    margin-bottom: 5rem;
}

h2 {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--text-color, #1a202c);
}

.vision-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    align-items: start;
}

.vision-text {
    font-size: 1.125rem;
    line-height: 1.7;
}

.vision-text p {
    margin-bottom: 1.5rem;
}

.action-card {
    background-color: var(--card-bg, #ffffff);
    border: 1px solid var(--border-color, #eaeaea);
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    height: fit-content;
}

.card-content {
    padding: 2rem;
}

.card-content h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-color, #1a202c);
}

.card-link {
    display: inline-block;
    margin-top: 1rem;
    color: var(--primary-color, #3182ce);
    font-weight: 500;
    text-decoration: none;
}

.card-link:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .vision-content {
        grid-template-columns: 1fr;
    }
}
</style>
