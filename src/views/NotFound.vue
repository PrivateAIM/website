<template>
    <div class="not-found">
        <div class="not-found-hero">
            <span
                class="not-found-code"
                aria-hidden="true"
            >404</span>
            <h1><ITranslate path="notFound.title" /></h1>
            <p><ITranslate path="notFound.text" /></p>
        </div>

        <nav
            class="not-found-links"
            :aria-label="linksLabel"
        >
            <router-link
                v-for="link in links"
                :key="link.path"
                :to="localePath(link.path)"
                class="not-found-card"
            >
                <span class="card-icon">
                    <AppIcon :name="link.icon" />
                </span>
                <span class="card-text">
                    <strong><ITranslate :path="`notFound.links.${link.key}.title`" /></strong>
                    <span><ITranslate :path="`notFound.links.${link.key}.text`" /></span>
                </span>
            </router-link>
        </nav>
    </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/shared/AppIcon.vue';
import { useLocalePath, useTranslation } from '@/i18n';

const localePath = useLocalePath();
const linksLabel = useTranslation('notFound.linksLabel');

const links = [
    {
        key: 'home', 
        path: '/', 
        icon: 'arrow', 
    },
    {
        key: 'flame', 
        path: '/flame', 
        icon: 'zap', 
    },
    {
        key: 'explainer', 
        path: '/federated-analysis', 
        icon: 'book', 
    },
    {
        key: 'news', 
        path: '/news', 
        icon: 'calendar', 
    },
];
</script>

<style scoped>
.not-found {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 1rem 5rem;
  text-align: center;
  color: var(--text-color);
}

.not-found-code {
  display: block;
  font-size: clamp(5rem, 18vw, 9rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--primary-color);
}

h1 {
  font-size: 2rem;
  margin: 1rem 0 0.75rem;
}

.not-found-hero p {
  max-width: 560px;
  margin: 0 auto 2.5rem;
  font-size: 1.15rem;
  line-height: 1.6;
  opacity: 0.85;
}

.not-found-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  text-align: left;
}

.not-found-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  background-color: var(--card-bg);
  color: var(--text-color);
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.not-found-card:hover {
  transform: translateY(-2px);
  border-color: var(--primary-color);
  box-shadow: 0 8px 20px color-mix(in srgb, var(--primary-color) 15%, transparent);
}

.card-icon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.6rem;
  background-color: var(--primary-color);
  color: var(--on-primary);
}

.card-text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.card-text strong {
  color: var(--link-color);
}

.card-text span {
  font-size: 0.95rem;
  opacity: 0.85;
}

@media (max-width: 560px) {
  .not-found-links {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
