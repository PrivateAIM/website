<template>
    <section class="hero-section">
        <div class="hero-container">
            <div class="hero-content">
                <h1 class="hero-title">
                    <ITranslate path="home.hero.title" />
                </h1>
                <p class="hero-subtitle">
                    <ITranslate path="home.hero.subtitle" />
                </p>

                <div class="hero-cta">
                    <router-link
                        :to="localePath('/flame')"
                        class="primary-button"
                    >
                        <ITranslate path="home.hero.explorePlatform" />
                    </router-link>
                    <a
                        href="https://docs.privateaim.net/getting-started/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="secondary-button"
                    >
                        <ITranslate path="home.hero.joinNetwork" />
                    </a>
                </div>

                <ul class="hero-badges">
                    <li>
                        <AppIcon
                            name="award"
                            :size="16"
                        />
                        <ITranslate path="home.hero.badgeFunding" />
                    </li>
                    <li>
                        <AppIcon
                            name="share"
                            :size="16"
                        />
                        <ITranslate path="home.hero.badgeMii" />
                    </li>
                    <li>
                        <AppIcon
                            name="code"
                            :size="16"
                        />
                        <ITranslate path="home.hero.badgeOpenSource" />
                    </li>
                </ul>
            </div>

            <div class="hero-visual">
                <img
                    src="/images/home/server-analysis.svg"
                    alt="Illustration of an analysis running on servers at several sites"
                    width="2500"
                    height="2500"
                    fetchpriority="high"
                    class="hero-graphic"
                >
            </div>
        </div>

        <!-- Fixed Wave divider effect at bottom of hero -->
        <div class="wave-divider">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
            >
                <path
                    d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1150,100 1350,0 1440,50 L1440,100 L0,100 Z"
                    class="wave-path"
                />
            </svg>
        </div>
    </section>
</template>

<script setup lang="ts">
import AppIcon from '@/components/shared/AppIcon.vue';
import { useLocalePath } from '@/i18n';

const localePath = useLocalePath();
</script>

<style scoped>
.hero-section {
  position: relative;
  background-color: var(--band-bg);
  color: var(--on-band);
  padding: 1rem 1rem 6rem;
  overflow: hidden;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  height: clamp(400px, 75vh, 700px);
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
  overflow-wrap: break-word;
  margin-bottom: 1.5rem;
  color: var(--title-color);
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
  background-color: var(--brand-yellow);
  color: var(--on-brand-yellow);
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 2px solid var(--brand-yellow);
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px color-mix(in srgb, var(--shadow-color) 10%, transparent);
}

.secondary-button {
  display: inline-block;
  background-color: transparent;
  color: var(--on-band);
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  border: 2px solid color-mix(in srgb, var(--on-band) 50%, transparent);
  transition: all 0.2s ease;
}

.secondary-button:hover {
  background-color: color-mix(in srgb, var(--on-band) 10%, transparent);
  border-color: var(--on-band);
  transform: translateY(-2px);
}

/* Visual part */
.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
}

.hero-badges li {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--on-band) 35%, transparent);
  background-color: color-mix(in srgb, var(--on-band) 12%, transparent);
  font-size: 0.85rem;
  font-weight: 500;
}

.hero-visual {
  position: relative;
  height: 100%;
  max-height: 500px;
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
  fill: var(--body-bg);
  /* Remove any potential strokes */
  stroke: none;
  stroke-width: 0;
  /* Add a slight overlap to prevent any gap */
  transform: translateY(1px);
  /* Add transition to match other elements */
  transition: fill 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .hero-container {
    /* minmax(0, ...) lets the column shrink below its longest word */
    grid-template-columns: minmax(0, 1fr);
    /* Stacked layout: grow with the content instead of a fixed height */
    height: auto;
    gap: 2rem;
    text-align: center;
  }

  .hero-badges {
    justify-content: center;
  }

  .hero-content {
    align-items: center;
  }

  /* Text and calls to action before the illustration */
  .hero-visual {
    height: 300px;
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
    padding: 2rem 1rem 5rem;
  }

  .hero-container {
      gap: 1.5rem;
  }
  .hero-visual {
      position: relative;
      width: 100%;
      height: 220px;
  }

  .hero-title {
    font-size: 2.25rem;
    /* Long German compounds ("Datenschutzfreundliche") are wider than small phones */
    hyphens: auto;
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
