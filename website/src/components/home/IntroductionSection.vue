<template>
  <div class="intro-text">
    <p>
      {{ $t('home.intro.paragraph1') }}
    </p>
    <p>
      {{ $t('home.intro.paragraph2') }}
    </p>
  </div>
</template>

<style scoped>
.intro-text {
  max-width: 800px;
  margin: 0 auto 4rem;
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-color, #2d3748);
}
</style>
