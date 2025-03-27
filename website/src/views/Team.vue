<template>
  <div class="page-container">
    <div class="page-header">
      <h1>Our Team</h1>
      <p class="header-subtitle">
        Meet the dedicated individuals working to advance privacy-preserving analytics in medicine.
      </p>
    </div>

    <TeamSection />
  </div>
</template>

<script setup lang="ts">
import TeamSection from '../components/TeamSection.vue';
</script>

<style scoped>
.page-container {
  width: 100%;
}

.page-header {
  background-color: var(--primary-color, #3182ce);
  color: white;
  padding: 4rem 1rem;
  text-align: center;
}

.page-header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.header-subtitle {
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}
</style>
