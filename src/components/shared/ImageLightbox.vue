<script setup lang="ts">
import {
    computed, 
    nextTick, 
    onBeforeUnmount, 
    ref, 
    watch,
} from 'vue';
import AppIcon from '@/components/shared/AppIcon.vue';
import { useTranslation } from '@/i18n';

const props = defineProps<{
    images: string[]; 
    alt: string; 
    index: number | null 
}>();
const emit = defineEmits<{ (e: 'update:index', value: number | null): void }>();

const closeLabel = useTranslation('news.gallery.close');
const previousLabel = useTranslation('news.gallery.previous');
const nextLabel = useTranslation('news.gallery.next');
const closeButton = ref<HTMLButtonElement | null>(null);
let returnFocus: HTMLElement | null = null;

const current = computed(() => (props.index === null ? undefined : props.images[props.index]));

const close = () => emit('update:index', null);
const step = (delta: number) => {
    if (props.index === null) return;
    const count = props.images.length;
    emit('update:index', (props.index + delta + count) % count);
};

const onKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
};

// Lock page scroll and move focus into the dialog while it is open
watch(() => props.index !== null, async (open) => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
        returnFocus = document.activeElement as HTMLElement | null;
        document.addEventListener('keydown', onKey);
        await nextTick();
        closeButton.value?.focus();
    } else {
        document.removeEventListener('keydown', onKey);
        returnFocus?.focus();
    }
});

onBeforeUnmount(() => {
    if (typeof document === 'undefined') return;
    document.removeEventListener('keydown', onKey);
    document.body.style.overflow = '';
});
</script>

<template>
    <div
        v-if="current"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="alt"
        @click.self="close"
    >
        <button
            ref="closeButton"
            type="button"
            class="lightbox-button lightbox-close"
            :aria-label="closeLabel"
            @click="close"
        >
            ✕
        </button>
        <button
            v-if="images.length > 1"
            type="button"
            class="lightbox-button lightbox-prev"
            :aria-label="previousLabel"
            @click="step(-1)"
        >
            <AppIcon
                name="arrow"
                :size="22"
                class="flip"
            />
        </button>
        <figure class="lightbox-figure">
            <img
                :src="current"
                :alt="alt"
            >
            <figcaption v-if="images.length > 1">
                {{ (index ?? 0) + 1 }} / {{ images.length }}
            </figcaption>
        </figure>
        <button
            v-if="images.length > 1"
            type="button"
            class="lightbox-button lightbox-next"
            :aria-label="nextLabel"
            @click="step(1)"
        >
            <AppIcon
                name="arrow"
                :size="22"
            />
        </button>
    </div>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 4rem;
  background-color: rgba(10, 12, 16, 0.9);
}

.lightbox-figure {
  margin: 0;
  max-width: 100%;
  max-height: 100%;
  text-align: center;
}

.lightbox-figure img {
  max-width: 100%;
  max-height: calc(100vh - 8rem);
  border-radius: 0.5rem;
  object-fit: contain;
}

.lightbox-figure figcaption {
  margin-top: 0.75rem;
  color: #e2e8f0;
  font-size: 0.9rem;
}

.lightbox-button {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  font-size: 1.1rem;
  cursor: pointer;
}

.lightbox-button:hover,
.lightbox-button:focus-visible {
  background-color: rgba(255, 255, 255, 0.3);
}

.lightbox-close {
  top: 1rem;
  right: 1rem;
}

.lightbox-prev {
  left: 1rem;
}

.lightbox-next {
  right: 1rem;
}

.flip {
  transform: rotate(180deg);
}

@media (max-width: 640px) {
  .lightbox {
    padding: 4rem 0.5rem;
  }

  .lightbox-prev,
  .lightbox-next {
    top: auto;
    bottom: 1rem;
  }

  .lightbox-prev {
    left: calc(50% - 3.5rem);
  }

  .lightbox-next {
    right: calc(50% - 3.5rem);
  }
}
</style>
