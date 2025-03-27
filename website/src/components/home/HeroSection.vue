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
        <div class="hero-graphic">
          <!-- Decorative elements -->
          <div class="graphic-element graphic-circle-1"></div>
          <div class="graphic-element graphic-circle-2"></div>
          <div class="graphic-element graphic-square"></div>
          <div class="graphic-element graphic-line-1"></div>
          <div class="graphic-element graphic-line-2"></div>

          <!-- Simplified visual representation of federated learning -->
          <div class="network-visualization">
            <div class="node node-1">
              <div class="node-inner"></div>
            </div>
            <div class="node node-2">
              <div class="node-inner"></div>
            </div>
            <div class="node node-3">
              <div class="node-inner"></div>
            </div>
            <div class="node node-4">
              <div class="node-inner"></div>
            </div>
            <div class="node node-central">
              <div class="node-inner"></div>
            </div>
            <div class="connection connection-1"></div>
            <div class="connection connection-2"></div>
            <div class="connection connection-3"></div>
            <div class="connection connection-4"></div>
          </div>
        </div>
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
  padding: 6rem 1rem 8rem;
  overflow: hidden;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
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
  height: 400px;
}

.hero-graphic {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Decorative elements */
.graphic-element {
  position: absolute;
  opacity: 0.1;
  background-color: white;
}

.graphic-circle-1 {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  top: 10%;
  left: 10%;
  opacity: 0.05;
}

.graphic-circle-2 {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  bottom: 5%;
  right: 5%;
  opacity: 0.07;
}

.graphic-square {
  width: 100px;
  height: 100px;
  transform: rotate(45deg);
  top: 40%;
  right: 25%;
  opacity: 0.05;
}

.graphic-line-1 {
  width: 200px;
  height: 2px;
  top: 20%;
  right: 15%;
  transform: rotate(-30deg);
  opacity: 0.05;
}

.graphic-line-2 {
  width: 150px;
  height: 2px;
  bottom: 30%;
  left: 20%;
  transform: rotate(45deg);
  opacity: 0.05;
}

/* Network visualization */
.network-visualization {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
}

.node {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
}

.node-inner {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
}

.node-central {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 2;
}

.node-central .node-inner {
  width: 40px;
  height: 40px;
  background-color: white;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
}

.node-1 {
  top: 10%;
  left: 30%;
}

.node-2 {
  top: 30%;
  right: 10%;
}

.node-3 {
  bottom: 10%;
  right: 30%;
}

.node-4 {
  bottom: 30%;
  left: 10%;
}

.connection {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 1;
}

.connection-1 {
  width: 120px;
  height: 2px;
  top: 35%;
  left: 35%;
  transform: rotate(-45deg);
}

.connection-2 {
  width: 120px;
  height: 2px;
  top: 35%;
  right: 35%;
  transform: rotate(45deg);
}

.connection-3 {
  width: 120px;
  height: 2px;
  bottom: 35%;
  right: 35%;
  transform: rotate(-45deg);
}

.connection-4 {
  width: 120px;
  height: 2px;
  bottom: 35%;
  left: 35%;
  transform: rotate(45deg);
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

/* Animation */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

.node-inner {
  animation: pulse 2s infinite;
}

.node-1 .node-inner { animation-delay: 0s; }
.node-2 .node-inner { animation-delay: 0.5s; }
.node-3 .node-inner { animation-delay: 1s; }
.node-4 .node-inner { animation-delay: 1.5s; }

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
    padding: 5rem 1rem 7rem;
  }

  .hero-title {
    font-size: 2.25rem;
  }

  .hero-cta {
    flex-direction: column;
    width: 100%;
  }

  .primary-button, .secondary-button {
    width: 100%;
    text-align: center;
  }

  .network-visualization {
    width: 250px;
    height: 250px;
  }
}
</style>
