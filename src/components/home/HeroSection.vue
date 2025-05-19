<template>
  <section class="hero-section">
    <div class="hero-container">
      <div class="hero-content">
        <h1 class="hero-title">{{ $t('home.hero.title') }}</h1>
        <p class="hero-subtitle">{{ $t('home.hero.subtitle') }}</p>

        <div class="hero-cta">
          <a href="https://docs.privateaim.net/" target="_blank" class="primary-button">
            {{ $t('home.hero.explorePlatform') }}
          </a>
          <router-link to="/partners" class="secondary-button">
            {{ $t('home.hero.joinNetwork') }}
          </router-link>
        </div>
      </div>

      <div class="hero-visual">
        <img src="/images/home/server-analysis.svg" alt="Server Analysis Graphic" class="hero-graphic" />
      </div>
    </div>

    <!-- Fixed Wave divider effect at bottom of hero -->
    <div class="wave-divider">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1150,100 1350,0 1440,50 L1440,100 L0,100 Z" class="wave-path"></path>
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  background: linear-gradient(135deg, var(--primary-color, #3182ce) 0%, #4299e1 100%);
  color: white;
  padding: 1rem 1rem 6rem;
  overflow: hidden;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  height: 75vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  position: relative;
  z-index: 2;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 500px;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.primary-button {
  display: inline-block;
  background-color: white;
  color: var(--primary-color, #3182ce);
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 2px solid white;
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.secondary-button {
  display: inline-block;
  background-color: transparent;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  border: 2px solid rgba(255, 255, 255, 0.5);
  transition: all 0.2s ease;
}

.secondary-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: white;
  transform: translateY(-2px);
}

/* Visual part */
.hero-visual {
  position: relative;
  height: 700px;
}

.hero-graphic {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Wave divider at bottom */
.wave-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 0;
  z-index: 1;
  overflow: hidden;
}

.wave-divider svg {
  width: 100%;
  height: 100px;
  display: block;
  /* This attribute is crucial for full width */
  preserveAspectRatio: none;
  /* Remove any potential strokes */
  stroke: none;
  stroke-width: 0;
}

.wave-path {
  fill: var(--body-bg, #ffffff);
  /* Remove any potential strokes */
  stroke: none;
  stroke-width: 0;
  /* Add a slight overlap to prevent any gap */
  transform: translateY(1px);
  /* Add transition to match other elements */
  transition: fill 0.3s ease;
}

/* Dark mode adjustments */
:global(.dark-mode) .wave-path {
  fill: var(--body-bg, #171923);
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-content {
    align-items: center;
  }

  .hero-visual {
    height: 300px;
    order: -1;
  }

  .hero-title {
    font-size: 2.75rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }
}

@media (max-width: 640px) {
  .hero-section {
    padding: 2rem 1rem 12rem;
  }

  .hero-container {
      gap: 0;
  }
  .hero-visual {
      position: relative;
      width: 100%;
  }

  .hero-title {
    font-size: 2.25rem;
  }

  .hero-cta {
    flex-direction: column;
      width: 70%;
      align-content: center;
  }

  .primary-button, .secondary-button {
    width: 100%;
    text-align: center;
  }
}
</style>
