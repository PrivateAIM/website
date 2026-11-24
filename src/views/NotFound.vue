<template>
    <div class="not-found">
        <h1>404 - Page Not Found</h1>
        <p>The page you’re looking for doesn’t exist.</p>
        <router-link :to="localePath('/')">
            Go back home
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { useLocalePath } from '@/i18n';

const localePath = useLocalePath();
</script>

<style scoped>
.not-found {
  padding: 4rem;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  margin-bottom: 2rem;
  font-size: 1.25rem;
}
</style>
