<template>
    <div class="publications-container">
        <div class="page-header">
            <h1>{{ $t('publications.title') }}</h1>
            <p class="header-subtitle">
                {{ $t('publications.subtitle') }}
            </p>
        </div>

        <div class="publications-content">
            <div v-for="year in years" :key="year" class="publications-year-section">
                <h2 class="year-heading">{{ year }}</h2>
                <div class="publications-list">
                    <div v-for="(publication, index) in getPublicationsByYear(year)" :key="index" class="publication-item">
                        <details class="publication-details">
                            <summary class="publication-summary">
                                <span class="publication-title">{{ publication.title }}</span>
                                <span class="publication-citation">{{ publication.citation }}</span>
                            </summary>
                            <div class="publication-detail-content">
                                <div class="publication-authors">{{ publication.authors }}</div>
                                <a v-if="publication.link" :href="publication.link" target="_blank" class="publication-link">
                                    {{ $t('publications.readMore') }} →
                                </a>
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Publication {
    authors: string;
    title: string;
    citation: string;
    year: number;
    link?: string;
}

const publications: Publication[] = [
    // 2025
    {
        authors: 'Swaminathan, A., Hannemann, A., Inal, A. B., Pfeifer, N., Akgün, M.',
        title: 'PP-GWAS: Privacy-Preserving Multi-Site Genome-wide Association Studies.',
        citation: 'Nature Communications, 2025.',
        year: 2025,
        link: 'https://www.nature.com/articles/s41467-025-66771-z'
    },
    {
        authors: 'Schwethelm, K., Kaiser, J., Knolle, M., Lockfisch, S., Rueckert, D., Ziller, A.',
        title: 'Visual Privacy Auditing with Diffusion Models.',
        citation: 'Transactions on Machine Learning Research (TMLR), 2025.',
        year: 2025,
        link: 'https://openreview.net/forum?id=D3DA7pgpvn'
    },
    {
        authors: 'Afonja, T., Sheth, I., Binkyte, R., Hanif, W., Ulas, T., Becker, M., Fritz, M.',
        title: 'LLM4GRN: Discovering Causal Gene Regulatory Networks with LLMs — Evaluation through Synthetic Data Generation.',
        citation: 'Under submission, 2025.',
        year: 2025,
        link: 'https://arxiv.org/pdf/2410.15828'
    },
    {
        authors: 'Lorenz, T., Kwiatkowska, M., Fritz, M.',
        title: 'BiCert: A Bilinear Mixed Integer Programming Formulation for Precise Certified Bounds Against Data Poisoning Attacks.',
        citation: 'arXiv preprint, 2025.',
        year: 2025,
        link: 'https://arxiv.org/pdf/2412.10186'
    },
    {
        authors: 'Afonja, T., Wang, H.-P., Kerkouche, R., Fritz, M.',
        title: 'DP-2Stage: Adapting Language Models as Differentially Private Tabular Data Generators.',
        citation: 'Transactions on Machine Learning Research (TMLR), 2025.',
        year: 2025,
        link: 'https://arxiv.org/pdf/2412.02467'
    },
    {
        authors: 'Parampottupadam, S. et al.',
        title: 'Client Security Alone Fails in Federated Learning: 2D and 3D Attack Insights.',
        citation: 'Communications in Computer and Information Science, vol 2240. Springer, 2025.',
        year: 2025,
        link: 'https://doi.org/10.1007/978-3-031-79103-1_24'
    },
    {
        authors: 'Johann, T. I., Otte, K., Prasser, F., Dieterich, C., on behalf of the HiGHmed UCC Study Group.',
        title: 'Anonymize or synthesize? Privacy-preserving methods for heart failure score analytics.',
        citation: 'European Heart Journal - Digital Health, 6(1), 147–154, 2025.',
        year: 2025,
        link: 'https://academic.oup.com/ehjdh/article/6/1/147/905163'
    },
    // 2024
    {
        authors: 'Kaess, P., Ziller, A., Mantz, L., Rueckert, D., Fintelmann, F. J., Kaissis, G.',
        title: 'Fair and Private CT Contrast Agent Detection.',
        citation: 'MICCAI Workshop on Fairness of AI in Medical Imaging, pp. 34–45, 2024.',
        year: 2024,
        link: 'https://link.springer.com/chapter/10.1007/978-3-031-72787-0_4'
    },
    {
        authors: 'Bak, M., Madai, V. I., Celi, L. A., Kaissis, G. A., Cornet, R., Maris, M., Rueckert, D., Buyx, A., McLennan, S.',
        title: 'Federated learning is not a cure-all for data ethics.',
        citation: 'Nature Machine Intelligence, 6(4), 370–372, 2024.',
        year: 2024,
        link: 'https://www.nature.com/articles/s42256-024-00813-x'
    },
    {
        authors: 'Müller, P., Kaissis, G., Rueckert, D.',
        title: 'ChEX: Interactive Localization and Region Description in Chest X-rays.',
        citation: 'European Conference on Computer Vision (ECCV), 2024.',
        year: 2024,
        link: 'https://arxiv.org/pdf/2404.15770'
    },
    {
        authors: 'Usynin, D., Rueckert, D., Kaissis, G.',
        title: 'Incentivising the federation: gradient-based metrics for data selection and valuation in private decentralised training.',
        citation: 'European Interdisciplinary Cybersecurity Conference, pp. 179–185, 2024.',
        year: 2024,
        link: 'https://arxiv.org/pdf/2305.02942'
    },
    {
        authors: 'Kaissis, G., Kolek, S., Balle, B., Hayes, J., Rueckert, D.',
        title: 'Beyond the Calibration Point: Mechanism Comparison in Differential Privacy.',
        citation: 'Forty-first International Conference on Machine Learning (ICML), 2024.',
        year: 2024,
        link: 'https://arxiv.org/pdf/2406.08918'
    },
    {
        authors: 'Kulynych, B., Gomez, J. F., Kaissis, G., Calmon, F. D. P., Troncoso, C.',
        title: 'Attack-Aware Noise Calibration for Differential Privacy.',
        citation: 'NeurIPS 2024.',
        year: 2024,
        link: 'https://proceedings.neurips.cc/paper_files/paper/2024/file/f33e853ba1f5f038268f9839e37821d5-Paper-Conference.pdf'
    },
    {
        authors: 'Hager, P., Jungmann, F., Holland, R., Bhagat, K., Hubrecht, I., Knauer, M., Vielhauer, J., Makowski, M., Braren, R., Kaissis, G., Rueckert, D.',
        title: 'Evaluation and mitigation of the limitations of large language models in clinical decision-making.',
        citation: 'Nature Medicine, 2024.',
        year: 2024,
        link: 'https://www.nature.com/articles/s41591-024-03097-1'
    },
    {
        authors: 'Nasirigerdeh, R., Razmi, N., Schnabel, J. A., Rueckert, D., Kaissis, G.',
        title: 'Machine Unlearning for Medical Imaging.',
        citation: 'arXiv preprint arXiv:2407.07539, 2024.',
        year: 2024,
        link: 'https://arxiv.org/pdf/2407.07539'
    },
    {
        authors: 'Wirth, F. N., Abu Attieh, H., Prasser, F.',
        title: 'OHDSI-compliance: a set of document templates facilitating the implementation and operation of a software stack for real-world evidence generation.',
        citation: 'Frontiers in Medicine, 11:1378866, 2024.',
        year: 2024,
        link: 'https://pubmed.ncbi.nlm.nih.gov/38818399/'
    },
    {
        authors: 'Tayebi Arasteh, S., Ziller, A., Kuhl, C., Makowski, M., Nebelung, S., Braren, R., Rueckert, D., Truhn, D., Kaissis, G.',
        title: 'Preserving fairness and diagnostic accuracy in private large-scale AI models for medical imaging.',
        citation: 'Communications Medicine, 2024.',
        year: 2024,
        link: 'https://www.nature.com/articles/s43856-024-00462-6'
    },
    {
        authors: 'Ziller, A., Mueller, T. T., Stieger, S. et al.',
        title: 'Reconciling privacy and accuracy in AI for medical imaging.',
        citation: 'Nature Machine Intelligence, 6, 764–774, 2024.',
        year: 2024,
        link: 'https://www.nature.com/articles/s42256-024-00858-y'
    },
    {
        authors: 'Baykara, C. A., Inal, A. B., Pfeifer, N., Akgün, M.',
        title: 'Privacy-Preserving Federated Unsupervised Domain Adaptation for Regression on Small-Scale and High-Dimensional Biological Data.',
        citation: 'CoRR abs/2411.17287, 2024.',
        year: 2024,
        link: 'https://dblp.org/rec/journals/corr/abs-2411-17287'
    },
    {
        authors: 'Baykara, C. A., Inal, A. B., Akgün, M.',
        title: 'FHAUC: Privacy Preserving AUC Calculation for Federated Learning using Fully Homomorphic Encryption.',
        citation: 'CoRR abs/2403.14428, 2024.',
        year: 2024,
        link: 'https://dblp.org/rec/journals/corr/abs-2403-14428.html'
    },
    {
        authors: 'Schalk, D., Rehms, R., Hoffmann, V. S. et al.',
        title: 'Distributed non-disclosive validation of predictive models by a modified ROC-GLM.',
        citation: 'BMC Medical Research Methodology, 24, 190, 2024.',
        year: 2024,
        link: 'https://doi.org/10.1186/s12874-024-02312-4'
    },
    {
        authors: 'Wang, H.-P., Fritz, M.',
        title: 'Language Models as Zero-shot Lossless Gradient Compressors: Towards General Neural Parameter Prior Models.',
        citation: 'NeurIPS 2024.',
        year: 2024,
        link: 'https://arxiv.org/pdf/2409.17836'
    },
    {
        authors: 'Chen, D., Kerkouche, R., Fritz, M.',
        title: 'Federated Learning with Differential Privacy.',
        citation: 'OpenReview, 2024.',
        year: 2024,
        link: 'https://openreview.net/pdf/33bc91e7e9d889c74b0fb428de0724427dba398c.pdf'
    },
    {
        authors: 'Zhang, B., Li, Z., Yang, Z., He, X., Backes, M., Fritz, M., Zhang, Y.',
        title: 'Generated Distributions Are All You Need for Membership Inference Attacks Against Generative Models.',
        citation: 'arXiv preprint arXiv:2310.12665, 2024.',
        year: 2024,
        link: 'https://arxiv.org/pdf/2310.12665'
    },
    {
        authors: 'Welten, S., de Arruda Botelho Herr, M., Hempel, L., Hieber, D., Placzek, P., Graf, M., Weber, S., Neumann, L., Jugl, M., Tirpitz, L., Kindermann, K., Geisler, S., Bonino da Silva Santos, L. O., Decker, S., Pfeifer, N., Kohlbacher, O., Kirsten, T.',
        title: 'A study on interoperability between two Personal Health Train infrastructures in leukodystrophy data analysis.',
        citation: 'Scientific Data, 11, 1663, 2024.',
        year: 2024,
        link: 'https://pubmed.ncbi.nlm.nih.gov/38909050/'
    },
    // 2023
    {
        authors: 'Kaissis, G., Ziller, A., Kolek, S., Riess, A., Rueckert, D.',
        title: 'Optimal privacy guarantees for a relaxed threat model: Addressing sub-optimal adversaries in differentially private machine learning.',
        citation: 'Advances in Neural Information Processing Systems (NeurIPS), 36, 2023.',
        year: 2023,
        link: 'https://dl.acm.org/doi/10.5555/3666122.3668557'
    },
    {
        authors: 'Wang, H.-P., Chen, D., Kerkouche, R., Fritz, M.',
        title: 'FedLap-DP: Federated learning by sharing differentially private loss approximations.',
        citation: 'Proceedings on Privacy Enhancing Technologies, 2024.',
        year: 2023,
        link: 'https://arxiv.org/pdf/2302.01068'
    },
    {
        authors: 'Kerkouche, R., Ács, G., Fritz, M.',
        title: 'Federated Learning with Partially Labeled Data.',
        citation: 'arXiv preprint arXiv:2303.03908, 2023.',
        year: 2023,
        link: 'https://arxiv.org/pdf/2303.03908'
    },
    // 2022
    {
        authors: 'Herr, M., Graf, M., Placzek, P., König, F., Bötte, F., Stickel, T., Hieber, D., Zimmermann, L., Slupina, M., Mohr, C., Biergans, S., Akgün, M., Pfeifer, N., Kohlbacher, O.',
        title: 'Bringing the Algorithms to the Data — Secure Distributed Medical Analytics using the Personal Health Train (PHT-meDIC).',
        citation: 'arXiv (Cornell University), 2022.',
        year: 2022,
        link: 'https://doi.org/10.48550/arxiv.2212.03481'
    },
    // 2021
    {
        authors: 'Ziller, A., Trask, A., Lopardo, A., Szymkow, B., Wagner, B., Bluemke, E., Nounahon, J., Passerat-Palmbach, J., Prakash, K., Rose, N., Ryffel, T., Reza, Z. N., Kaissis, G.',
        title: 'PySyft: A Library for Easy Federated Learning.',
        citation: 'In Springer eBooks, pp. 111–139, 2021.',
        year: 2021,
        link: 'https://doi.org/10.1007/978-3-030-70604-3_5'
    },
    {
        authors: 'Kaissis, G., Ziller, A., Passerat-Palmbach, J., Ryffel, T., Usynin, D., Trask, A., Lima, I., Mancuso, J., Jungmann, F., Steinborn, M., Saleh, A., Makowski, M. R., Rueckert, D., Braren, R.',
        title: 'End-to-end privacy preserving deep learning on multi-institutional medical imaging.',
        citation: 'Nature Machine Intelligence, 3(6), 473–484, 2021.',
        year: 2021,
        link: 'https://doi.org/10.1038/s42256-021-00337-8'
    },
    {
        authors: 'Wirth, F., Meurers, T., Johns, M., Prasser, F.',
        title: 'Privacy-preserving data sharing infrastructures for medical research: systematization and comparison.',
        citation: 'BMC Medical Informatics and Decision Making, 21(1), 2021.',
        year: 2021,
        link: 'https://doi.org/10.1186/s12911-021-01602-x'
    },
    // 2020
    {
        authors: 'Scherer, J., Nolden, M., Kleesiek, J., Metzger, J., Kades, K., Schneider, V., Bach, M., Sedlaczek, O., Bucher, A. M., Vogl, T. J., Grünwald, F., Kuhn, J., Hoffmann, R., Kotzerke, J., Bethge, O. T., Schimmöller, L., Antoch, G., Müller, H., Daul, A., Maier-Hein, K. H.',
        title: 'Joint Imaging Platform for Federated Clinical Data Analytics.',
        citation: 'JCO Clinical Cancer Informatics, 4, 1027–1038, 2020.',
        year: 2020,
        link: 'https://doi.org/10.1200/cci.20.00045'
    },
    // 2014
    {
        authors: 'Prasser, F., Kohlmayer, F., Lautenschläger, R., Kuhn, K. A.',
        title: 'ARX — A comprehensive tool for anonymizing biomedical data.',
        citation: 'AMIA Annual Symposium Proceedings, Vol. 2014, p. 984, 2014.',
        year: 2014,
        link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4419984/'
    }
];

const years = computed(() => {
    const uniqueYears = [...new Set(publications.map(p => p.year))];
    return uniqueYears.sort((a, b) => b - a);
});

const getPublicationsByYear = (year: number): Publication[] => {
    return publications.filter(p => p.year === year);
};
</script>

<style scoped>
.publications-container {
    width: 100%;
}

.page-header {
    background-color: var(--primary-color, #3182ce);
    color: white;
    padding: 3rem 1rem;
    text-align: center;
}

.page-header h1 {
    font-size: 2.5rem;
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
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.publications-year-section {
    margin-bottom: 2rem;
}

.year-heading {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-color, #1a202c);
    border-bottom: 2px solid var(--primary-color, #3182ce);
    padding-bottom: 0.5rem;
}

.publications-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.publication-item {
    background-color: var(--card-bg, #ffffff);
    border-radius: 0.5rem;
    overflow: hidden;
    border: 1px solid var(--border-color, #eaeaea);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.publication-details {
    width: 100%;
}

.publication-summary {
    cursor: pointer;
    padding: 1rem 3.5rem 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    position: relative;
    list-style: none;
}

.publication-summary::-webkit-details-marker {
    display: none;
}

.publication-summary::after {
    content: "+";
    position: absolute;
    right: 1rem;
    top: 1rem;
    font-size: 1.25rem;
    font-weight: 400;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 50%;
    background-color: var(--tag-bg, #f0f4f8);
    color: var(--primary-color, #3182ce);
}

details[open] .publication-summary::after {
    content: "\2212";
}

.publication-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text-color, #1a202c);
    line-height: 1.5;
}

.publication-citation {
    font-size: 0.9rem;
    color: var(--primary-color, #3182ce);
    line-height: 1.4;
}

.publication-detail-content {
    padding: 0 1.25rem 1rem;
    color: var(--text-color, #4a5568);
    line-height: 1.6;
}

.publication-authors {
    font-size: 0.9rem;
    color: var(--nav-text, #4a5568);
    margin-bottom: 0.75rem;
}

.publication-link {
    display: inline-block;
    color: var(--primary-color, #3182ce);
    text-decoration: none;
    font-weight: 500;
}

.publication-link:hover {
    text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .page-header h1 {
        font-size: 2rem;
    }

    .publication-summary {
        padding-right: 2.5rem;
    }
}
</style>
