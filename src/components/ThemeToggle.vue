<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isDarkMode = ref(false);

// Check for saved theme preference in local storage
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  isDarkMode.value = savedTheme === 'dark';
  applyTheme();
});

// Toggle between light and dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
  applyTheme();
};

// Apply the current theme to the document
const applyTheme = () => {
  if (isDarkMode.value) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
};
</script>

<template>
  <button
    class="theme-toggle"
    :class="{ 'checked': isDarkMode }"
    :aria-label="isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'"
    role="switch"
    type="button"
    :aria-checked="isDarkMode"
    @click="toggleDarkMode"
  >
    <span
      class="theme-toggle-thumb"
      :class="{ 'checked': isDarkMode }"
    >
      <!-- Sun icon for light mode -->
      <svg
        v-if="!isDarkMode"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        class="toggle-icon"
      >
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
        </g>
      </svg>

      <!-- Moon icon for dark mode -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        class="toggle-icon"
      >
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9m8 0v4m2-2h-4"></path>
      </svg>
    </span>
  </button>
</template>

<style scoped>
.theme-toggle {
  width: 44px;
  height: 24px;
  display: flex;
  background-color: var(--tag-bg, #f1f1f1);
  border: 1px solid rgba(100, 116, 139, 0.1);
  border-radius: 999px;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  padding: 0;
}

.theme-toggle.checked {
  background-color: var(--primary-color, #3182ce);
}

.theme-toggle-thumb {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 20px;
  height: 20px;
  background-color: var(--card-bg, #ffffff);
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--nav-text, #64748b);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 999px;
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.theme-toggle-thumb.checked {
  transform: translateX(20px);
  color: var(--card-bg, #ffffff);
}

.toggle-icon {
  width: 12px;
  height: 12px;
}

/* For dark mode */
:global(.dark-mode) .theme-toggle {
  background-color: var(--primary-color, #3182ce);
}

:global(.dark-mode) .theme-toggle-thumb {
  color: white;
}
</style>
