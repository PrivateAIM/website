<template>
    <p
        v-if="date"
        class="last-updated"
    >
        <ITranslate
            :path="path"
            :data="{ date: formatted }"
        />
    </p>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useLocale } from '@/i18n';
import { pageDate } from '@/seo/pageDates';

/** Translation key with a {{date}} placeholder, e.g. 'flame.lastUpdated'. */
defineProps<{ path: string }>();

const route = useRoute();
const locale = useLocale();
const date = computed(() => pageDate(route.path));
const formatted = computed(() => (date.value ?
    new Intl.DateTimeFormat(locale.value, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(date.value)) :
    ''));
</script>

<style scoped>
.last-updated {
    margin: 2rem 0 0;
    font-size: 0.85rem;
    color: var(--text-muted);
}
</style>
