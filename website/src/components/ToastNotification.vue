<template>
  <div
    class="toast-notification"
    role="alert"
    aria-live="assertive"
    @click="handleClose"
    ref="toastRef"
  >
    <div class="toast-content">
      <span>{{ message }}</span>
      <button
        class="toast-close-button"
        aria-label="Close notification"
        @click.stop="handleClose"
      >
        &times;
      </button>
    </div>
    <div class="toast-progress-bar"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface ToastNotificationProps {
  message: string;
  duration?: number;
}

const props = withDefaults(defineProps<ToastNotificationProps>(), {
  duration: 3000
});

const emit = defineEmits<{
  'close': [];
}>();

const toastRef = ref<HTMLDivElement | null>(null);
let closeTimeout: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  // Set up auto-close timeout
  closeTimeout = setTimeout(() => {
    emit('close');
  }, props.duration);

  // Set focus on the toast for accessibility
  if (toastRef.value) {
    toastRef.value.focus();
  }

  // Add event listener for escape key
  document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  // Clear timeout if component is unmounted
  if (closeTimeout) {
    clearTimeout(closeTimeout);
  }

  // Remove event listener
  document.removeEventListener('keydown', handleKeyDown);
});

const handleClose = () => {
  if (closeTimeout) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }
  emit('close');
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    handleClose();
  }
};
</script>

<style scoped>
.toast-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--primary-color, #3182ce);
  color: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 350px;
  overflow: hidden;
  animation: fadeIn 0.3s ease-out;
  outline: none;
}

.toast-content {
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.toast-close-button {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.toast-close-button:hover {
  opacity: 1;
}

.toast-close-button:focus {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 3px;
}

.toast-progress-bar {
  height: 3px;
  background-color: rgba(255, 255, 255, 0.7);
  animation: shrink 3s linear forwards;
  transform-origin: left;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .toast-notification {
    left: 20px;
    right: 20px;
    max-width: none;
    bottom: 10px;
  }
}
</style>
