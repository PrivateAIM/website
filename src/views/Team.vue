<template>
    <div class="team-container">
        <div class="team-header">
            <div class="team-content">
                <h1>Our Team</h1>
                <p class="team-intro">Meet the dedicated individuals working to advance privacy-preserving analytics in medicine.</p>
            </div>

            <div class="team-visual right">
                <img src="/images/team/team-security.svg" alt="Team Security Graphic Right" class="team-graphic" />
            </div>
        </div>

        <TeamSection />
    </div>
</template>

<script setup lang="ts">
import TeamSection from '../components/TeamSection.vue';
</script>

<style scoped>
.team-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.team-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    gap: 2rem;
}

.team-content {
    flex: 2;
    text-align: center;
}

.team-content h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: var(--text-color, #1a202c);
}

.team-intro {
    font-size: 1.25rem;
    color: var(--nav-text, #4a5568);
    margin: 0;
}

.team-visual {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.team-visual.left {
    justify-content: flex-end;
}

.team-visual.right {
    justify-content: flex-start;
}

.team-graphic {
    max-width: 100%;
    height: auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .team-header {
        flex-direction: column;
        text-align: center;
    }

    .team-visual.left {
        order: 2;
        justify-content: center;
        margin-top: 1.5rem;
    }

    .team-content {
        order: 1;
    }

    .team-visual.right {
        order: 3;
        justify-content: center;
        margin-top: 1.5rem;
    }
}

@media (max-width: 480px) {
    .team-content h1 {
        font-size: 2rem;
    }

    .team-intro {
        font-size: 1.1rem;
    }
}
</style>
