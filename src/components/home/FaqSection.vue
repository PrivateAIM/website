<script setup lang="ts">
import { computed } from 'vue';
import JsonLd from '@/components/shared/JsonLd';
import LinkText from '@/components/shared/LinkText.vue';
import { useLocalePath, useTranslation } from '@/i18n';
import { faqId } from '@/seo/structuredData';

const keys = ['q1', 'q2', 'q3', 'q4', 'q5'];
const items = keys.map((key) => ({
    key,
    question: useTranslation(`home.faq.${key}.question`),
    answer: useTranslation(`home.faq.${key}.answer`),
}));

// Link markup "[text](url:type)" reduced to its text for the structured data
const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');

const localePath = useLocalePath();

const faqPage = computed(() => ({
    '@type': 'FAQPage',
    '@id': faqId(localePath('/')),
    mainEntity: items.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question.value,
        acceptedAnswer: { '@type': 'Answer', text: plain(answer.value) },
    })),
}));
</script>
<template>
    <section class="faq">
        <h2><ITranslate path="home.faq.title" /></h2>
        <div
            v-for="item in items"
            :key="item.key"
            class="faq-item"
        >
            <h3>{{ item.question.value }}</h3>
            <LinkText
                :text="item.answer.value"
                tag="p"
            />
        </div>
        <JsonLd :nodes="[faqPage]" />
    </section>
</template>

<style scoped>
.faq {
  max-width: 800px;
  margin: 0 auto 5rem;
}

h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--text-color);
}

.faq-item {
  margin-bottom: 1rem;
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--border-color);
  border-left: 4px solid var(--primary-color);
  border-radius: 0.75rem;
  background-color: var(--card-bg);
}

.faq-item h3 {
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.faq-item p {
  margin: 0;
  line-height: 1.7;
  color: var(--text-color);
}
</style>
