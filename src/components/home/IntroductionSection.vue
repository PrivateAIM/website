<script setup lang="ts">
import LinkText from '@/components/shared/LinkText.vue';
import { useTranslation } from '@/i18n';

// A self-contained definition of PrivateAIM and FLAME, quotable on its own
const definition = useTranslation('home.intro.definition');
</script>
<template>
    <section class="intro-text">
        <h2><ITranslate path="home.intro.title" /></h2>
        <LinkText
            :text="definition"
            tag="p"
            class="intro-definition"
        />
        <p>
            <ITranslate path="home.intro.paragraph2" />
        </p>
    </section>
</template>

<style scoped>
.intro-text {
  max-width: 800px;
  margin: 0 auto 4rem;
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-color, #2d3748);
}

h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--text-color, #1a202c);
}

.intro-definition {
  font-size: 1.2rem;
}
</style>
