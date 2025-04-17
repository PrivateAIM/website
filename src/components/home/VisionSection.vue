<template>
  <div class="vision-section">
    <h2>{{ $t('home.vision.title') }}</h2>

    <div class="vision-content">
      <div class="vision-text">
        <p>
          <template v-for="(part, index) in splitText($t('home.vision.paragraph1'))" :key="`p1-${index}`">
            <LocalizedLink
                v-if="part.isLink"
                :url="part.url"
                :internal="part.internal"
            >{{ part.text }}</LocalizedLink>
            <span v-else>{{ part.text }}</span>
          </template>
        </p>
        <p>
          <template v-for="(part, index) in splitText($t('home.vision.paragraph2'))" :key="`p2-${index}`">
            <LocalizedLink
                v-if="part.isLink"
                :url="part.url"
                :internal="part.internal"
            >{{ part.text }}</LocalizedLink>
            <span v-else>{{ part.text }}</span>
          </template>
        </p>
        <p>
          <template v-for="(part, index) in splitText($t('home.vision.paragraph3'))" :key="`p3-${index}`">
            <LocalizedLink
                v-if="part.isLink"
                :url="part.url"
                :internal="part.internal"
            >{{ part.text }}</LocalizedLink>
            <span v-else>{{ part.text }}</span>
          </template>
        </p>
      </div>

      <div class="action-card">
        <div class="card-content">
          <h3>{{ $t('home.vision.contribute') }}</h3>
          <p>{{ $t('home.vision.explanation') }}</p>
          <a href="https://github.com/PrivateAIM" target="_blank" class="card-link">{{ $t('home.vision.github') }} →</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LocalizedLink from '@/components/shared/LocalizedLink.vue';

// Parse text with link placeholders like [text](url:internal/external)
function splitText(text) {
  const parts = [];
  const linkRegex = /\[([^\]]+)\]\(([^:)]+(?::\/\/[^)]+)?):([^)]+)\)/g;

  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push({
        isLink: false,
        text: text.substring(lastIndex, match.index)
      });
    }

    // Parse link details
    const linkText = match[1];
    let linkUrl = match[2].trim();
    const linkType = match[3].trim();
    const isInternal = linkType === 'internal';

    // Ensure external URLs have proper protocol WITHOUT duplicating it
    if (!isInternal && !linkUrl.match(/^https?:\/\//)) {
      linkUrl = `https://${linkUrl}`;
    }

    parts.push({
      isLink: true,
      text: linkText,
      url: linkUrl,
      internal: isInternal
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after the last link
  if (lastIndex < text.length) {
    parts.push({
      isLink: false,
      text: text.substring(lastIndex)
    });
  }

  return parts;
}
</script>

<style scoped>
.vision-section {
  margin-bottom: 5rem;
}

h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--text-color, #1a202c);
}

.vision-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: start;
}

.vision-text {
  font-size: 1.125rem;
  line-height: 1.7;
}

.vision-text p {
  margin-bottom: 1.5rem;
}

.action-card {
  background-color: var(--card-bg, #ffffff);
  border: 1px solid var(--border-color, #eaeaea);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  height: fit-content;
}

.card-content {
  padding: 2rem;
}

.card-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color, #1a202c);
}

.card-link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--primary-color, #3182ce);
  font-weight: 500;
  text-decoration: none;
}

.card-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .vision-content {
    grid-template-columns: 1fr;
  }
}
</style>
