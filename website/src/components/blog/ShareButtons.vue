<template>
  <div class="post-share">
    <span class="share-label">Share this article:</span>
    <div class="share-buttons" role="group" aria-label="Share options">
      <button
        class="share-button"
        @click="shareOnTwitter"
        aria-label="Share on Twitter"
        :disabled="isSharing"
      >
        Twitter
      </button>
      <button
        class="share-button"
        @click="shareOnLinkedIn"
        aria-label="Share on LinkedIn"
        :disabled="isSharing"
      >
        LinkedIn
      </button>
      <button
        class="share-button"
        @click="copyLink"
        aria-label="Copy link to clipboard"
        :disabled="isSharing"
        ref="copyButton"
      >
        Copy Link
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface ShareButtonsProps {
  title: string;
}

const props = defineProps<ShareButtonsProps>();
const emit = defineEmits<{
  'linkCopied': [],
  'copyError': []
}>();

const isSharing = ref(false);
const copyButton = ref<HTMLButtonElement | null>(null);

// Social sharing functions
const shareOnTwitter = () => {
  isSharing.value = true;
  try {
    const text = `Check out this article: "${props.title}"`;
    const url = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

    window.open(twitterUrl, '_blank');
  } catch (error) {
    console.error('Error sharing on Twitter:', error);
  } finally {
    isSharing.value = false;
  }
};

const shareOnLinkedIn = () => {
  isSharing.value = true;
  try {
    const url = window.location.href;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

    window.open(linkedInUrl, '_blank');
  } catch (error) {
    console.error('Error sharing on LinkedIn:', error);
  } finally {
    isSharing.value = false;
  }
};

const copyLink = async () => {
  isSharing.value = true;
  try {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    emit('linkCopied');

    // Focus management for accessibility
    if (copyButton.value) {
      copyButton.value.focus();
    }
  } catch (error) {
    console.error('Failed to copy link:', error);
    emit('copyError');
  } finally {
    isSharing.value = false;
  }
};

</script>

<style scoped>
.post-share {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.share-label {
  font-size: 0.95rem;
  color: var(--nav-text, #4a5568);
}

.share-buttons {
  display: flex;
  gap: 0.5rem;
}

.share-button {
  padding: 0.4rem 0.75rem;
  background-color: var(--tag-bg, #f1f1f1);
  border: none;
  border-radius: 0.375rem;
  font-size: 0.85rem;
  color: var(--nav-text, #4a5568);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.share-button:hover {
  background-color: var(--border-color, #eaeaea);
}

.share-button:focus {
  outline: 2px solid var(--primary-color, #3182ce);
  outline-offset: 2px;
}

.share-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .post-share {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 480px) {
  .share-buttons {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
