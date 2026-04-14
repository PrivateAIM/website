<template>
    <div class="team-container">
        <PageHeader :title="$t('team.title')" :subtitle="$t('team.subtitle')" />

        <div class="team-content">
            <!-- Team Members -->
            <section class="team-section">
                <div class="team-grid">
                    <a
                        v-for="member in team"
                        :key="member.name"
                        :href="`https://github.com/${member.github}`"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="member-card"
                    >
                        <img
                            :src="`https://github.com/${member.github}.png`"
                            :alt="member.name"
                            class="member-photo"
                            loading="lazy"
                        />
                        <div class="member-info">
                            <h3 class="member-name">{{ member.name }}</h3>
                            <p class="member-role">{{ member.role }}</p>
                            <div class="member-links">
                                <span class="member-link-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                </span>
                                <span v-if="member.linkedin" class="member-link-item" @click.prevent="openLink(member.linkedin!)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </section>

            <!-- Project Leads -->
            <section class="team-section">
                <h2 class="section-heading">{{ $t('team.leadership') }}</h2>
                <div class="team-grid">
                    <a
                        v-for="member in leadership"
                        :key="member.name"
                        :href="`https://github.com/${member.github}`"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="member-card"
                    >
                        <img
                            :src="`https://github.com/${member.github}.png`"
                            :alt="member.name"
                            class="member-photo"
                            loading="lazy"
                        />
                        <div class="member-info">
                            <h3 class="member-name">{{ member.name }}</h3>
                            <p class="member-role">{{ member.role }}</p>
                            <div class="member-links">
                                <span class="member-link-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </section>

            <!-- Alumni -->
            <section class="team-section">
                <h2 class="section-heading">{{ $t('team.alumni') }}</h2>
                <p class="alumni-note">{{ $t('team.alumniNote') }}</p>
                <div class="team-grid">
                    <a
                        v-for="member in alumni"
                        :key="member.name"
                        :href="`https://github.com/${member.github}`"
                        target="_blank"
                        class="member-card member-card--alumni"
                    >
                        <img
                            :src="`https://github.com/${member.github}.png`"
                            :alt="member.name"
                            class="member-photo"
                            loading="lazy"
                        />
                        <div class="member-info">
                            <h3 class="member-name">{{ member.name }}</h3>
                            <p class="member-role">{{ member.role }}</p>
                            <div class="member-links">
                                <span class="member-link-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import PageHeader from '../components/PageHeader.vue';

interface TeamMember {
    name: string;
    role: string;
    github?: string;
    linkedin?: string;
}

const openLink = (url: string) => {
    window.open(url, '_blank');
};

const team: TeamMember[] = [
    { name: 'Peter Placzek', role: 'Hub Lead & Developer', github: 'tada5hi', linkedin: 'https://linkedin.com/in/peter-placzek-047a74210/' },
    { name: 'Marius Herr', role: 'Coordinator & Analyst', github: 'SirHerr', linkedin: 'https://de.linkedin.com/in/dr-marius-herr-60b89b18b' },
    { name: 'Bruce Schultz', role: 'Node Lead & Developer', github: 'brucetony' },
    { name: 'Alexander Twrdik', role: 'Developer', github: 'DiCanio' },
    { name: 'David Hieber', role: 'Developer & Analyst', github: 'antidodo' },
    { name: 'Alexander Röhl', role: 'Developer & Analyst', github: 'Nightknight3000' },
    { name: 'Mehrshad', role: 'Developer & Analyst', github: 'Mehrsary' },
    { name: 'Max Schaible', role: 'Developer', github: 'maxju' },
    { name: 'Paul Brassel', role: 'Developer', github: 'pbrassel' },
    { name: 'Hammam Abu Attieh', role: 'Privacy Engineer', github: 'AbuAttieh' },
    { name: 'Mehmed Halilovic', role: 'Privacy Engineer', github: 'mhalilovic' },
    { name: 'Cem Ata Baykara', role: 'Privacy Engineer', github: 'CemBykr' },
    { name: 'Jules Kreuer', role: 'Analyst', github: 'not-a-feature' },
    { name: 'Marlena Meyer', role: 'Analyst', github: 'marlenamey' },
    { name: 'Gherman Sergei', role: 'Analyst', github: 'Demokritus' },
    { name: 'Nayeli A. Silva', role: 'Analyst', github: 'NAS-Ragde' },
    { name: 'Basavaraj Hampiholi', role: 'Analyst', github: 'basavaraj-hampiholi' },
    { name: 'René Raab', role: 'Analyst', github: 'reneraab' },
    { name: 'Patric Tippmann', role: 'Analyst', github: 'tippmannp' },
];

const leadership: TeamMember[] = [
    { name: 'Oliver Kohlbacher', role: 'PI & Professor', github: 'okohlbacher' },
    { name: 'Fabian Prasser', role: 'PI & Professor', github: 'prasser' },
    { name: 'Daniel Rückert', role: 'PI & Professor', github: 'danielrueckert' },
    { name: 'Toralf Kirsten', role: 'Professor', github: 'tkirsten' },
    { name: 'Thomas Ganslandt', role: 'Professor', github: 'ganslats' },
    { name: 'Christoph Dieterich', role: 'Professor', github: 'dieterich-lab' },
    { name: 'Mete Akgün', role: 'Junior Professor', github: 'meteakgun' },
    { name: 'Nico Pfeifer', role: 'Professor', github: 'NicoPfeifer' },
    { name: 'Ralf Floca', role: 'Professor', github: 'rfloca' },
];

const alumni: TeamMember[] = [
    { name: 'Maximilian Jugl', role: 'Former Node Lead & Developer', github: 'mjugl' },
    { name: 'Raphael Rehms', role: 'Former Analyst', github: 'RaphaelRe' },
];
</script>

<style scoped>
.team-container {
    width: 100%;
}

.team-content {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.team-section {
    margin-bottom: 3rem;
}

.section-heading {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--text-color, #1a202c);
    border-bottom: 2px solid var(--primary-color, #3182ce);
    padding-bottom: 0.5rem;
}

.team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
}

.member-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background-color: var(--card-bg, #ffffff);
    border: 1px solid var(--border-color, #eaeaea);
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
}

.member-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.member-photo {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    background-color: var(--tag-bg, #f0f4f8);
}


.member-info {
    min-width: 0;
}

.member-name {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-color, #1a202c);
    margin: 0;
}

.member-role {
    font-size: 0.85rem;
    color: var(--primary-color, #3182ce);
    margin: 0.15rem 0 0;
}

.member-links {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.35rem;
}

.member-link-item {
    color: var(--nav-text, #4a5568);
    display: flex;
    align-items: center;
}

.member-link-item:hover {
    color: var(--primary-color, #3182ce);
}

.member-card--alumni {
    opacity: 0.75;
}

.alumni-note {
    font-size: 0.95rem;
    color: var(--nav-text, #4a5568);
    margin-bottom: 1rem;
    font-style: italic;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .team-grid {
        grid-template-columns: 1fr;
    }
}
</style>
