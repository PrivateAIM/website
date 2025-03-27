<template>
  <div class="how-it-works">
    <h2>{{ $t('home.howItWorks.title') }}</h2>

    <div class="steps-container">
      <div class="step">
        <div class="step-icon">1</div>
        <div class="step-content">
          <h3>{{ $t('home.howItWorks.step1.title') }}</h3>
          <p>{{ $t('home.howItWorks.step1.description') }}</p>
        </div>
      </div>

      <div class="step">
        <div class="step-icon">2</div>
        <div class="step-content">
          <h3>{{ $t('home.howItWorks.step2.title') }}</h3>
          <p>{{ $t('home.howItWorks.step2.description') }}</p>
        </div>
      </div>

      <div class="step">
        <div class="step-icon">3</div>
        <div class="step-content">
          <h3>{{ $t('home.howItWorks.step3.title') }}</h3>
          <p>{{ $t('home.howItWorks.step3.description') }}</p>
        </div>
      </div>
    </div>

    <div class="platform-cta">
      <h3>{{ $t('home.howItWorks.experienceFlame') }}</h3>
      <p>{{ $t('home.howItWorks.flamePlatform') }}</p>
      <a href="https://docs.privateaim.net/" target="_blank" class="cta-button primary">
        {{ $t('home.howItWorks.explorePlatform') }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.how-it-works {
  margin-bottom: 5rem;
  background-color: var(--tag-bg, #f7fafc);
  padding: 3rem;
  border-radius: 1rem;
}

h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--text-color, #1a202c);
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-icon {
  background-color: var(--primary-color, #3182ce);
  color: white;
  font-weight: 700;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-content h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--text-color, #1a202c);
}

.platform-cta {
  text-align: center;
  padding: 2rem;
  background-color: var(--card-bg, #ffffff);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.platform-cta h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color, #1a202c);
}

.platform-cta p {
  margin-bottom: 1.5rem;
}

.cta-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cta-button.primary {
  background-color: var(--primary-color, #3182ce);
  color: white;
}

.cta-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .how-it-works {
    padding: 2rem 1.5rem;
  }
}
</style>
