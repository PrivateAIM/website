<script setup lang="ts">
import HeroSection from '../components/home/HeroSection.vue';
import IntroductionSection from '../components/home/IntroductionSection.vue';
import CapabilitiesSection from '../components/home/CapabilitiesSection.vue';
import FaqSection from '../components/home/FaqSection.vue';
import MissionSection from '../components/home/MissionSection.vue';
import ProjectFacts from '../components/home/ProjectFacts.vue';
import HowItWorksSection from '../components/home/HowItWorksSection.vue';
import VisionSection from '../components/home/VisionSection.vue';
import PartnersSection from '../components/home/PartnersSection.vue';
</script>
<template>
    <div class="home-container">
        <HeroSection />

        <section class="content-section">
            <div class="content-container">
                <IntroductionSection />
                <ProjectFacts />
                <HowItWorksSection />
                <CapabilitiesSection />
                <MissionSection />
                <VisionSection />
                <FaqSection />
            </div>
        </section>

        <PartnersSection />
    </div>
</template>
<style scoped>
.home-container {
  width: 100%;
}

.content-section {
  padding: 4rem 1rem;
}

.content-container {
  max-width: 1100px;
  margin: 0 auto;
}
</style>
