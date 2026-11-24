<template>
    <section class="mission-section">
        <h2><ITranslate path="home.mission.title" /></h2>
        <div class="mission-text">
            <p class="mission-lead">
                <ITranslate path="home.mission.paragraph1" />
            </p>
            <p><ITranslate path="home.mission.paragraph2" /></p>
            <p><ITranslate path="home.mission.paragraph3" /></p>
        </div>
    </section>
</template>

<style scoped>
.mission-section {
  max-width: 800px;
  margin: 0 auto 5rem;
}

h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--text-color, #1a202c);
}

.mission-text {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--text-color, #2d3748);
}

.mission-text p {
  margin-bottom: 1.5rem;
}

.mission-lead {
  padding-left: 1.25rem;
  border-left: 4px solid var(--primary-color, #3182ce);
  font-size: 1.25rem;
}
</style>
