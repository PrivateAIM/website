<template>
    <div class="publications-container">
        <div class="page-header">
            <h1>{{ $t('publications.title') }}</h1>
            <p class="header-subtitle">
                {{ $t('publications.subtitle') }}
            </p>
        </div>

        <div class="publications-content">
            <section class="publications-section">
                <div class="publications-list">
                    <div v-for="(publication, index) in publications" :key="index" class="publication-item">
                        <div class="publication-content">
                            <div class="publication-authors">{{ publication.authors }}</div>
                            <div class="publication-title">{{ publication.title }}</div>
                            <div class="publication-citation">{{ publication.citation }}</div>
                            <a v-if="publication.link" :href="publication.link" target="_blank" class="publication-link">
                                {{ $t('publications.readMore') }} →
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Publication {
    authors: string;
    title: string;
    citation: string;
    link?: string;
}

// Add animation when component mounts
onMounted(() => {
    const items = document.querySelectorAll('.publication-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            (item as HTMLElement).style.opacity = '1';
            (item as HTMLElement).style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

const publications = ref<Publication[]>([
    {
        authors: 'Herr, M., Graf, M., Placzek, P., König, F., Bötte, F., Stickel, T., Hieber, D., Zimmermann, L., Slupina, M., Mohr, C., Biergans, S., Akgün, M., Pfeifer, N., & Kohlbacher, O. (2022)',
        title: 'Bringing the Algorithms to the Data - Secure Distributed Medical Analytics using the Personal Health Train (PHT-meDIC).',
        citation: 'arXiv (Cornell University).',
        link: 'https://doi.org/10.48550/arxiv.2212.03481'
    },
    {
        authors: 'Ziller, A., Trask, A., Lopardo, A., Szymkow, B., Wagner, B., Bluemke, E., Nounahon, J., Passerat-Palmbach, J., Prakash, K., Rose, N., Ryffel, T., Reza, Z. N., & Kaissis, G. (2021).',
        title: 'PySyft: A Library for Easy Federated Learning.',
        citation: 'In Springer eBooks (pp. 111–139).',
        link: 'https://doi.org/10.1007/978-3-030-70604-3_5'
    },
    {
        authors: 'Kaissis, G., Ziller, A., Passerat-Palmbach, J., Ryffel, T., Usynin, D., Trask, A., Lima, I., Mancuso, J., Jungmann, F., Steinborn, M., Saleh, A., Makowski, M. R., Rueckert, D., & Braren, R. (2021).',
        title: 'End-to-end privacy preserving deep learning on multi-institutional medical imaging.',
        citation: 'Nature Machine Intelligence, 3(6), 473–484.',
        link: 'https://doi.org/10.1038/s42256-021-00337-8'
    },
    {
        authors: 'Prasser, F., Kohlmayer, F., Lautenschläger, R., & Kuhn, K. A. (2014).',
        title: 'ARX - A comprehensive tool for anonymizing biomedical data.',
        citation: 'In AMIA Annual Symposium Proceedings (Vol. 2014, p. 984). American Medical Informatics Association. [Washington DC, 15.-19. November 2014: AMIA Annual Symposium, 2014]',
        link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4419984/'
    },
    {
        authors: 'Wirth, F., Meurers, T., Johns, M., & Prasser, F. (2021).',
        title: 'Privacy-preserving data sharing infrastructures for medical research: systematization and comparison.',
        citation: 'BMC Medical Informatics and Decision Making, 21(1).',
        link: 'https://doi.org/10.1186/s12911-021-01602-x'
    },
    {
        authors: 'Scherer, J., Nolden, M., Kleesiek, J., Metzger, J., Kades, K., Schneider, V., Bach, M., Sedlaczek, O., Bucher, A. M., Vogl, T. J., Grünwald, F., Kuhn, J., Hoffmann, R., Kotzerke, J., Bethge, O. T., Schimmöller, L., Antoch, G., Müller, H., Daul, A., . . . Maier-Hein, K. H. (2020).',
        title: 'Joint Imaging Platform for Federated Clinical Data Analytics.',
        citation: 'JCO Clinical Cancer Informatics, 4, 1027–1038.',
        link: 'https://doi.org/10.1200/cci.20.00045'
    }
]);
</script>

<style scoped>
.publications-container {
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

.publications-content {
    max-width: 900px;
    margin: 0 auto;
    padding: 3rem 1rem;
}

.section-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: var(--text-color, #1a202c);
    border-bottom: 2px solid var(--primary-color, #3182ce);
    padding-bottom: 0.5rem;
}

/* Publications list */
.publications-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 4rem;
}

.publication-item {
    background-color: var(--card-bg, #ffffff);
    border-radius: 0.5rem;
    overflow: hidden;
    border: 1px solid var(--border-color, #eaeaea);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.3s ease, transform 0.5s ease, opacity 0.5s ease;
    opacity: 0;
    transform: translateY(20px);
}

.publication-item:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.publication-content {
    padding: 1.5rem;
}

.publication-authors {
    font-size: 0.9rem;
    color: var(--nav-text, #4a5568);
    margin-bottom: 0.5rem;
}

.publication-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-color, #1a202c);
    margin-bottom: 0.5rem;
    line-height: 1.5;
}

.publication-citation {
    font-size: 0.95rem;
    color: var(--nav-text, #4a5568);
    margin-bottom: 1rem;
    line-height: 1.6;
}

.publication-link {
    display: inline-block;
    color: var(--primary-color, #3182ce);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
}

.publication-link:hover {
    text-decoration: underline;
}

/* Research section */
.research-section {
    margin-top: 2rem;
    padding: 2.5rem;
    background-color: var(--tag-bg, #f7fafc);
    border-radius: 1rem;
}

.research-text {
    font-size: 1.15rem;
    color: var(--text-color, #1a202c);
    margin-bottom: 2rem;
    line-height: 1.6;
}

.github-container {
    display: flex;
    justify-content: center;
}

.github-button {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background-color: #24292e;
    color: white;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.github-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.github-icon {
    width: 24px;
    height: 24px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .page-header h1 {
        font-size: 2.5rem;
    }

    .research-section {
        padding: 2rem 1.5rem;
    }

    .section-title {
        font-size: 1.75rem;
    }
}

@media (max-width: 480px) {
    .page-header h1 {
        font-size: 2rem;
    }

    .publication-content {
        padding: 1.25rem;
    }
}
</style>
