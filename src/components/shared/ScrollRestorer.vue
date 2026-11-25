<script setup lang="ts">
import { useScrollRestoration } from 'vue-router/experimental';

// Registers the page for scroll restoration. It sits inside <router-view>, so the
// restore runs once the out-in page transition has shown the new route.
useScrollRestoration();
</script>

<template>
    <span hidden />
</template>
