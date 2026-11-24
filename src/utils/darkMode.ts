import { onMounted, onUnmounted, ref } from 'vue';
import type { Ref } from 'vue';

/**
 * Whether the dark theme (body.dark-mode, set by ThemeToggle) is active.
 * Undefined until mounted: the prerendered HTML cannot know the theme.
 */
export function useDarkMode(): Ref<boolean | undefined> {
    const isDark = ref<boolean>();
    let observer: MutationObserver | undefined;

    onMounted(() => {
        const update = () => {
            isDark.value = document.body.classList.contains('dark-mode');
        };
        update();
        observer = new MutationObserver(update);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    });
    onUnmounted(() => observer?.disconnect());

    return isDark;
}
