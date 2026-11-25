<template>
    <div class="publications-container">
        <PageHeader
            :title="title"
            :subtitle="subtitle"
        />

        <div class="publications-content">
            <div class="search-bar">
                <input
                    v-model="searchQuery"
                    type="search"
                    :placeholder="searchPlaceholder"
                    :aria-label="searchPlaceholder"
                    class="search-input"
                >
                <span class="result-count">{{ filteredPublications.length }} <ITranslate path="publications.results" /></span>
            </div>

            <div class="filters">
                <div
                    class="filter-group"
                    role="group"
                    :aria-label="typeLabel"
                >
                    <span class="filter-label">{{ typeLabel }}</span>
                    <button
                        v-for="type in TYPE_FILTERS"
                        :key="type"
                        type="button"
                        class="filter-chip"
                        :aria-pressed="selectedType === type"
                        @click="selectedType = type"
                    >
                        <ITranslate :path="`publications.types.${type}`" />
                        <span class="chip-count">{{ typeCounts[type] }}</span>
                    </button>
                </div>
                <div
                    class="filter-group"
                    role="group"
                    :aria-label="yearLabel"
                >
                    <span class="filter-label">{{ yearLabel }}</span>
                    <button
                        type="button"
                        class="filter-chip"
                        :aria-pressed="selectedYear === null"
                        @click="selectedYear = null"
                    >
                        <ITranslate path="publications.types.all" />
                    </button>
                    <button
                        v-for="year in allYears"
                        :key="year"
                        type="button"
                        class="filter-chip"
                        :aria-pressed="selectedYear === year"
                        @click="selectedYear = year"
                    >
                        {{ year }}
                    </button>
                </div>
            </div>

            <div
                v-for="year in filteredYears"
                :key="year"
                class="publications-year-section"
            >
                <h2 class="year-heading">
                    {{ year }}
                </h2>
                <div class="publications-list">
                    <div
                        v-for="(publication, index) in getFilteredPublicationsByYear(year)"
                        :key="index"
                        class="publication-item"
                    >
                        <div class="publication-details">
                            <h3 class="publication-heading">
                                <button
                                    type="button"
                                    class="publication-summary"
                                    :class="{ open: openKey === `${year}-${index}` }"
                                    :aria-expanded="openKey === `${year}-${index}`"
                                    :aria-controls="`publication-${year}-${index}`"
                                    @click="toggle(`${year}-${index}`)"
                                >
                                    <span
                                        class="type-badge"
                                        :class="`type-${publicationType(publication)}`"
                                    ><ITranslate :path="`publications.types.${publicationType(publication)}`" /></span>
                                    <span class="publication-title">{{ publication.title }}</span>
                                    <span class="publication-citation">{{ publication.citation }}</span>
                                </button>
                            </h3>
                            <div
                                v-show="openKey === `${year}-${index}`"
                                :id="`publication-${year}-${index}`"
                                class="publication-detail-content"
                            >
                                <div class="publication-authors">
                                    {{ publication.authors }}
                                </div>
                                <a
                                    v-if="publication.link"
                                    :href="publication.link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="publication-link"
                                >
                                    <template v-if="doiOf(publication.link)">DOI {{ doiOf(publication.link) }}</template>
                                    <template v-else-if="publication.link.endsWith('.pdf')">PDF</template>
                                    <ITranslate
                                        v-else
                                        path="publications.readMore"
                                    />
                                    <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <JsonLd :nodes="[publicationList]" />

            <div
                v-if="filteredPublications.length === 0"
                class="no-results"
            >
                <p><ITranslate path="publications.noResults" /></p>
                <button
                    class="reset-button"
                    @click="resetFilters"
                >
                    <ITranslate path="publications.resetSearch" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import JsonLd from '@/components/shared/JsonLd';
import { localePath, useLocale, useTranslation } from '@/i18n';
import { publicationListId } from '@/seo/structuredData';

const title = useTranslation('publications.title');
const subtitle = useTranslation('publications.subtitle');
const searchPlaceholder = useTranslation('publications.searchPlaceholder');

interface IPublication {
    authors: string;
    title: string;
    citation: string;
    year: number;
    link?: string;
}

const publications: IPublication[] = [
    // 2026
    {
        authors: 'Öztürk, H., Afonja, T., Jälkö, J., Binkyte, R., Rodriguez-Mier, P., Lobentanzer, S., Wicks, A., Kreuer, J., Ouaari, S., Pfeifer, N., Menzies, S., Pentyala, S., Filienko, D., Golob, S., McKeever, P., Banerjee, J., Foschini, L., De Cock, M., Saez-Rodriguez, J., Fritz, M., Stegle, O., Honkela, A.',
        title: 'Community benchmarking of generative models for privacy-preserving synthetic bulk RNA-seq data generation.',
        citation: 'Genome Biology, 27, 355, 2026.',
        year: 2026,
        link: 'https://doi.org/10.1186/s13059-026-04326-1',
    },
    {
        authors: 'Kirchhoff, Y. et al.',
        title: 'Dataset Collections: Challenges of Large-Scale Data Aggregation in 3D Medical Image Datasets.',
        citation: 'arXiv preprint, 2026.',
        year: 2026,
        link: 'https://arxiv.org/abs/2611.10144',
    },
    {
        authors: 'Parampottupadam, S., Martínez Mora, A., Bounias, D., Sav, S., Maier-Hein, K., Floca, R.',
        title: 'Privacy Leakage in Federated Learning in Radiology Reports: Comparative Evaluation of Tokenizer and Batch-Size Privacy Risks.',
        citation: 'JMIR Medical Informatics, 14, e88390, 2026.',
        year: 2026,
        link: 'https://doi.org/10.2196/88390',
    },
    {
        authors: 'Bujotzek, M., Bounias, D., Denner, S., Floca, R., Fischer, M., Neher, P., Maier-Hein, K.',
        title: 'Federated Medical Image Segmentation under Real-World Label Noise: A Benchmark Suite for Noisy Label Learning Method Selection.',
        citation: 'Journal of Imaging Informatics in Medicine, 2026.',
        year: 2026,
        link: 'https://doi.org/10.1007/s10278-026-02205-6',
    },
    {
        authors: 'Eckhardt-Bellmann, P., Taha, N. A., Werle, S. D., Kraus, J. M., Ikonomi, N., Kestler, H. A.',
        title: 'Systematic detection of predictive gene sets by semantics-based selection.',
        citation: 'BMC Bioinformatics, 27, 221, 2026.',
        year: 2026,
        link: 'https://doi.org/10.1186/s12859-026-06570-5',
    },
    {
        authors: 'Herr, M., Placzek, P., Abu Attieh, H., Schultz, B., Hieber, D., Röhl, A., Jaberansary, M., Twrdik, A., Brassel, P., Schaible, M., Halilovic, M., Prasser, F., Kirsten, T., Kohlbacher, O.',
        title: 'Enabling Privacy-Preserving Federated Learning in Healthcare: The FLAME Architecture and Policy Framework.',
        citation: 'Studies in Health Technology and Informatics, 336, 1589–1590 (MIE 2026), 2026.',
        year: 2026,
        link: 'https://doi.org/10.3233/SHTI260485',
    },
    {
        authors: 'Abu Attieh, H., Halilovic, M., Herr, M., Hieber, D., Placzek, P., Röhl, A., Kuntzer, J., Ziller, A., Kohlbacher, O., Rueckert, D., Prasser, F.',
        title: 'A Maturity Model for the Enforcement of PETs in Federated Settings.',
        citation: 'Studies in Health Technology and Informatics, 336, 1593–1594 (MIE 2026), 2026.',
        year: 2026,
        link: 'https://doi.org/10.3233/SHTI260487',
    },
    {
        authors: 'Meurers, T., Halilovic, M., Abu Attieh, H., Despraz, J., Kaabachi, B., Otte, K., Papapostolou, G., Raisaro, J. L., Prasser, F.',
        title: 'Unequal Flows? Economic Dimensions of Sharing Anonymized Data in Biomedical Research.',
        citation: 'Studies in Health Technology and Informatics, 336, 2061–2065 (MIE 2026), 2026.',
        year: 2026,
        link: 'https://doi.org/10.3233/SHTI260614',
    },
    {
        authors: 'Abu Attieh, H., Halilovic, M., Kerkouche, R., Rahimian, S., Wang, H.-P., Rehms, R., Kaissis, G., Ziller, A., Kuntzer, J., Otte, K., Meurers, T., Fritz, M., Rueckert, D., Prasser, F.',
        title: 'An Exploratory Survey Study Toward a Conceptual Framework for Structuring the Integration of Privacy-Enhancing Technologies in Federated Learning and Analytics.',
        citation: 'IEEE Access, 14, 41508–41528, 2026.',
        year: 2026,
        link: 'https://doi.org/10.1109/ACCESS.2026.3672991',
    },
    {
        authors: 'Swaminathan, A., Akgün, M.',
        title: 'Accelerating Targeted Hard-Label Adversarial Attacks in Low-Query Black-Box Settings.',
        citation: 'IEEE Conference on Secure and Trustworthy Machine Learning (SaTML), pp. 756–767, 2026.',
        year: 2026,
        link: 'https://doi.org/10.1109/SaTML68715.2026.00048',
    },
    {
        authors: 'Kaiser, J., Ziller, A., Triantafillou, E., Rueckert, D., Kaissis, G.',
        title: 'Your Privacy Depends on Others: Collusion Vulnerabilities in Individual Differential Privacy.',
        citation: 'IEEE Conference on Secure and Trustworthy Machine Learning (SaTML), pp. 481–499, 2026.',
        year: 2026,
        link: 'https://doi.org/10.1109/SaTML68715.2026.00034',
    },
    {
        authors: 'Kreuer, J., Ouaari, S., Pfeifer, N.',
        title: 'How Private Are DNA Embeddings? Inverting Foundation Model Representations of Genomic Sequences.',
        citation: 'arXiv preprint, 2026.',
        year: 2026,
        link: 'https://arxiv.org/abs/2603.06950',
    },
    // 2025
    {
        authors: 'Mağara, Ş. S., Dietrich, N., Ünal, A. B., Akgün, M.',
        title: 'Accelerating probabilistic privacy-preserving medical record linkage: A three-party MPC approach.',
        citation: 'Journal of Biomedical Informatics, 171, 104920, 2025.',
        year: 2025,
        link: 'https://doi.org/10.1016/j.jbi.2025.104920',
    },
    {
        authors: 'Stolnicu, A., Eckhardt-Bellmann, P., Kestler, A. M. R., Kestler, H. A.',
        title: 'Identification of ordinal relations and alternative suborders within high-dimensional molecular data.',
        citation: 'Frontiers in Bioinformatics, 5, 1665892, 2025.',
        year: 2025,
        link: 'https://doi.org/10.3389/fbinf.2025.1665892',
    },
    {
        authors: 'Thiam, P., Schwenker, F., Kestler, H. A.',
        title: 'Dealing with Class Overlap Through Cluster-Based Sample Weighting.',
        citation: 'Computers, 14(11), 457, 2025.',
        year: 2025,
        link: 'https://doi.org/10.3390/computers14110457',
    },
    {
        authors: 'Zhioua, S., Binkyte, R., Ouni, A., Ktata, F. B.',
        title: 'Revisiting Sampling Bias: Implications on Fairness Measurement and Mitigation.',
        citation: 'Research Square preprint, 2025.',
        year: 2025,
        link: 'https://doi.org/10.21203/rs.3.rs-6332112/v1',
    },
    {
        authors: 'Baykara, C. A., Ünal, A. B., Pfeifer, N., Akgün, M.',
        title: 'Privacy-preserving federated unsupervised domain adaptation with application to age prediction from DNA methylation data.',
        citation: 'Bioinformatics, 41(10), btaf465, 2025.',
        year: 2025,
        link: 'https://doi.org/10.1093/bioinformatics/btaf465',
    },
    {
        authors: 'Baykara, C. A., Pandey, S. R., Ünal, A. B., Lee, H., Akgün, M.',
        title: 'Federated Learning for Epileptic Seizure Prediction Across Heterogeneous EEG Datasets.',
        citation: 'arXiv preprint, 2025.',
        year: 2025,
        link: 'https://arxiv.org/abs/2508.08159',
    },
    {
        authors: 'Abu Attieh, H., Müller, A., Wirth, F. N., Prasser, F.',
        title: 'Pseudonymization tools for medical research: a systematic review.',
        citation: 'BMC Medical Informatics and Decision Making, 25, 128, 2025.',
        year: 2025,
        link: 'https://doi.org/10.1186/s12911-025-02958-0',
    },
    {
        authors: 'Swaminathan, A., Hannemann, A., Inal, A. B., Pfeifer, N., Akgün, M.',
        title: 'PP-GWAS: Privacy-Preserving Multi-Site Genome-wide Association Studies.',
        citation: 'Nature Communications, 2025.',
        year: 2025,
        link: 'https://www.nature.com/articles/s41467-025-66771-z',
    },
    {
        authors: 'Herr, M., Baykara, C. A., Ünal, A. B., Pfeifer, N., Akgün, M.',
        title: 'Privacy-preserving AUC computation in distributed machine learning with PHT-meDIC.',
        citation: 'PLOS Digital Health, 4(11), e0000753, 2025.',
        year: 2025,
        link: 'https://journals.plos.org/digitalhealth/article?id=10.1371/journal.pdig.0000753',
    },
    {
        authors: 'Schwethelm, K., Kaiser, J., Knolle, M., Lockfisch, S., Rueckert, D., Ziller, A.',
        title: 'Visual Privacy Auditing with Diffusion Models.',
        citation: 'Transactions on Machine Learning Research (TMLR), 2025.',
        year: 2025,
        link: 'https://openreview.net/forum?id=D3DA7pgpvn',
    },
    {
        authors: 'Afonja, T., Sheth, I., Binkyte, R., Hanif, W., Ulas, T., Becker, M., Fritz, M.',
        title: 'LLM4GRN: Discovering Causal Gene Regulatory Networks with LLMs — Evaluation through Synthetic Data Generation.',
        citation: 'Under submission, 2025.',
        year: 2025,
        link: 'https://arxiv.org/pdf/2410.15828',
    },
    {
        authors: 'Lorenz, T., Kwiatkowska, M., Fritz, M.',
        title: 'BiCert: A Bilinear Mixed Integer Programming Formulation for Precise Certified Bounds Against Data Poisoning Attacks.',
        citation: 'arXiv preprint, 2025.',
        year: 2025,
        link: 'https://arxiv.org/pdf/2412.10186',
    },
    {
        authors: 'Afonja, T., Wang, H.-P., Kerkouche, R., Fritz, M.',
        title: 'DP-2Stage: Adapting Language Models as Differentially Private Tabular Data Generators.',
        citation: 'Transactions on Machine Learning Research (TMLR), 2025.',
        year: 2025,
        link: 'https://arxiv.org/pdf/2412.02467',
    },
    {
        authors: 'Parampottupadam, S. et al.',
        title: 'Client Security Alone Fails in Federated Learning: 2D and 3D Attack Insights.',
        citation: 'Communications in Computer and Information Science, vol 2240. Springer, 2025.',
        year: 2025,
        link: 'https://doi.org/10.1007/978-3-031-79103-1_24',
    },
    {
        authors: 'Johann, T. I., Otte, K., Prasser, F., Dieterich, C., on behalf of the HiGHmed UCC Study Group.',
        title: 'Anonymize or synthesize? Privacy-preserving methods for heart failure score analytics.',
        citation: 'European Heart Journal - Digital Health, 6(1), 147–154, 2025.',
        year: 2025,
        link: 'https://academic.oup.com/ehjdh/article/6/1/147/905163',
    },
    // 2024
    {
        authors: 'Kaess, P., Ziller, A., Mantz, L., Rueckert, D., Fintelmann, F. J., Kaissis, G.',
        title: 'Fair and Private CT Contrast Agent Detection.',
        citation: 'MICCAI Workshop on Fairness of AI in Medical Imaging, pp. 34–45, 2024.',
        year: 2024,
        link: 'https://link.springer.com/chapter/10.1007/978-3-031-72787-0_4',
    },
    {
        authors: 'Bak, M., Madai, V. I., Celi, L. A., Kaissis, G. A., Cornet, R., Maris, M., Rueckert, D., Buyx, A., McLennan, S.',
        title: 'Federated learning is not a cure-all for data ethics.',
        citation: 'Nature Machine Intelligence, 6(4), 370–372, 2024.',
        year: 2024,
        link: 'https://www.nature.com/articles/s42256-024-00813-x',
    },
    {
        authors: 'Müller, P., Kaissis, G., Rueckert, D.',
        title: 'ChEX: Interactive Localization and Region Description in Chest X-rays.',
        citation: 'European Conference on Computer Vision (ECCV), 2024.',
        year: 2024,
        link: 'https://arxiv.org/pdf/2404.15770',
    },
    {
        authors: 'Usynin, D., Rueckert, D., Kaissis, G.',
        title: 'Incentivising the federation: gradient-based metrics for data selection and valuation in private decentralised training.',
        citation: 'European Interdisciplinary Cybersecurity Conference, pp. 179–185, 2024.',
        year: 2024,
        link: 'https://arxiv.org/pdf/2305.02942',
    },
    {
        authors: 'Kaissis, G., Kolek, S., Balle, B., Hayes, J., Rueckert, D.',
        title: 'Beyond the Calibration Point: Mechanism Comparison in Differential Privacy.',
        citation: 'Forty-first International Conference on Machine Learning (ICML), 2024.',
        year: 2024,
        link: 'https://arxiv.org/pdf/2406.08918',
    },
    {
        authors: 'Kulynych, B., Gomez, J. F., Kaissis, G., Calmon, F. D. P., Troncoso, C.',
        title: 'Attack-Aware Noise Calibration for Differential Privacy.',
        citation: 'NeurIPS 2024.',
        year: 2024,
        link: 'https://proceedings.neurips.cc/paper_files/paper/2024/file/f33e853ba1f5f038268f9839e37821d5-Paper-Conference.pdf',
    },
    {
        authors: 'Hager, P., Jungmann, F., Holland, R., Bhagat, K., Hubrecht, I., Knauer, M., Vielhauer, J., Makowski, M., Braren, R., Kaissis, G., Rueckert, D.',
        title: 'Evaluation and mitigation of the limitations of large language models in clinical decision-making.',
        citation: 'Nature Medicine, 2024.',
        year: 2024,
        link: 'https://www.nature.com/articles/s41591-024-03097-1',
    },
    {
        authors: 'Nasirigerdeh, R., Razmi, N., Schnabel, J. A., Rueckert, D., Kaissis, G.',
        title: 'Machine Unlearning for Medical Imaging.',
        citation: 'arXiv preprint arXiv:2407.07539, 2024.',
        year: 2024,
        link: 'https://arxiv.org/pdf/2407.07539',
    },
    {
        authors: 'Wirth, F. N., Abu Attieh, H., Prasser, F.',
        title: 'OHDSI-compliance: a set of document templates facilitating the implementation and operation of a software stack for real-world evidence generation.',
        citation: 'Frontiers in Medicine, 11:1378866, 2024.',
        year: 2024,
        link: 'https://pubmed.ncbi.nlm.nih.gov/38818399/',
    },
    {
        authors: 'Tayebi Arasteh, S., Ziller, A., Kuhl, C., Makowski, M., Nebelung, S., Braren, R., Rueckert, D., Truhn, D., Kaissis, G.',
        title: 'Preserving fairness and diagnostic accuracy in private large-scale AI models for medical imaging.',
        citation: 'Communications Medicine, 2024.',
        year: 2024,
        link: 'https://www.nature.com/articles/s43856-024-00462-6',
    },
    {
        authors: 'Ziller, A., Mueller, T. T., Stieger, S. et al.',
        title: 'Reconciling privacy and accuracy in AI for medical imaging.',
        citation: 'Nature Machine Intelligence, 6, 764–774, 2024.',
        year: 2024,
        link: 'https://www.nature.com/articles/s42256-024-00858-y',
    },
    {
        authors: 'Baykara, C. A., Inal, A. B., Pfeifer, N., Akgün, M.',
        title: 'Privacy-Preserving Federated Unsupervised Domain Adaptation for Regression on Small-Scale and High-Dimensional Biological Data.',
        citation: 'CoRR abs/2411.17287, 2024.',
        year: 2024,
        link: 'https://dblp.org/rec/journals/corr/abs-2411-17287',
    },
    {
        authors: 'Baykara, C. A., Inal, A. B., Akgün, M.',
        title: 'FHAUC: Privacy Preserving AUC Calculation for Federated Learning using Fully Homomorphic Encryption.',
        citation: 'CoRR abs/2403.14428, 2024.',
        year: 2024,
        link: 'https://dblp.org/rec/journals/corr/abs-2403-14428.html',
    },
    {
        authors: 'Schalk, D., Rehms, R., Hoffmann, V. S. et al.',
        title: 'Distributed non-disclosive validation of predictive models by a modified ROC-GLM.',
        citation: 'BMC Medical Research Methodology, 24, 190, 2024.',
        year: 2024,
        link: 'https://doi.org/10.1186/s12874-024-02312-4',
    },
    {
        authors: 'Wang, H.-P., Fritz, M.',
        title: 'Language Models as Zero-shot Lossless Gradient Compressors: Towards General Neural Parameter Prior Models.',
        citation: 'NeurIPS 2024.',
        year: 2024,
        link: 'https://arxiv.org/pdf/2409.17836',
    },
    {
        authors: 'Chen, D., Kerkouche, R., Fritz, M.',
        title: 'Federated Learning with Differential Privacy.',
        citation: 'OpenReview, 2024.',
        year: 2024,
        link: 'https://openreview.net/pdf/33bc91e7e9d889c74b0fb428de0724427dba398c.pdf',
    },
    {
        authors: 'Zhang, B., Li, Z., Yang, Z., He, X., Backes, M., Fritz, M., Zhang, Y.',
        title: 'Generated Distributions Are All You Need for Membership Inference Attacks Against Generative Models.',
        citation: 'arXiv preprint arXiv:2310.12665, 2024.',
        year: 2024,
        link: 'https://arxiv.org/pdf/2310.12665',
    },
    {
        authors: 'Welten, S., de Arruda Botelho Herr, M., Hempel, L., Hieber, D., Placzek, P., Graf, M., Weber, S., Neumann, L., Jugl, M., Tirpitz, L., Kindermann, K., Geisler, S., Bonino da Silva Santos, L. O., Decker, S., Pfeifer, N., Kohlbacher, O., Kirsten, T.',
        title: 'A study on interoperability between two Personal Health Train infrastructures in leukodystrophy data analysis.',
        citation: 'Scientific Data, 11, 1663, 2024.',
        year: 2024,
        link: 'https://pubmed.ncbi.nlm.nih.gov/38909050/',
    },
    // 2023
    {
        authors: 'Kaissis, G., Ziller, A., Kolek, S., Riess, A., Rueckert, D.',
        title: 'Optimal privacy guarantees for a relaxed threat model: Addressing sub-optimal adversaries in differentially private machine learning.',
        citation: 'Advances in Neural Information Processing Systems (NeurIPS), 36, 2023.',
        year: 2023,
        link: 'https://dl.acm.org/doi/10.5555/3666122.3668557',
    },
    {
        authors: 'Wang, H.-P., Chen, D., Kerkouche, R., Fritz, M.',
        title: 'FedLap-DP: Federated learning by sharing differentially private loss approximations.',
        citation: 'Proceedings on Privacy Enhancing Technologies, 2024.',
        year: 2023,
        link: 'https://arxiv.org/pdf/2302.01068',
    },
    {
        authors: 'Kerkouche, R., Ács, G., Fritz, M.',
        title: 'Federated Learning with Partially Labeled Data.',
        citation: 'arXiv preprint arXiv:2303.03908, 2023.',
        year: 2023,
        link: 'https://arxiv.org/pdf/2303.03908',
    },
    // 2022
    {
        authors: 'Herr, M., Graf, M., Placzek, P., König, F., Bötte, F., Stickel, T., Hieber, D., Zimmermann, L., Slupina, M., Mohr, C., Biergans, S., Akgün, M., Pfeifer, N., Kohlbacher, O.',
        title: 'Bringing the Algorithms to the Data — Secure Distributed Medical Analytics using the Personal Health Train (PHT-meDIC).',
        citation: 'arXiv (Cornell University), 2022.',
        year: 2022,
        link: 'https://doi.org/10.48550/arxiv.2212.03481',
    },
    // 2021
    {
        authors: 'Ziller, A., Trask, A., Lopardo, A., Szymkow, B., Wagner, B., Bluemke, E., Nounahon, J., Passerat-Palmbach, J., Prakash, K., Rose, N., Ryffel, T., Reza, Z. N., Kaissis, G.',
        title: 'PySyft: A Library for Easy Federated Learning.',
        citation: 'In Springer eBooks, pp. 111–139, 2021.',
        year: 2021,
        link: 'https://doi.org/10.1007/978-3-030-70604-3_5',
    },
    {
        authors: 'Kaissis, G., Ziller, A., Passerat-Palmbach, J., Ryffel, T., Usynin, D., Trask, A., Lima, I., Mancuso, J., Jungmann, F., Steinborn, M., Saleh, A., Makowski, M. R., Rueckert, D., Braren, R.',
        title: 'End-to-end privacy preserving deep learning on multi-institutional medical imaging.',
        citation: 'Nature Machine Intelligence, 3(6), 473–484, 2021.',
        year: 2021,
        link: 'https://doi.org/10.1038/s42256-021-00337-8',
    },
    {
        authors: 'Wirth, F., Meurers, T., Johns, M., Prasser, F.',
        title: 'Privacy-preserving data sharing infrastructures for medical research: systematization and comparison.',
        citation: 'BMC Medical Informatics and Decision Making, 21(1), 2021.',
        year: 2021,
        link: 'https://doi.org/10.1186/s12911-021-01602-x',
    },
    // 2020
    {
        authors: 'Scherer, J., Nolden, M., Kleesiek, J., Metzger, J., Kades, K., Schneider, V., Bach, M., Sedlaczek, O., Bucher, A. M., Vogl, T. J., Grünwald, F., Kuhn, J., Hoffmann, R., Kotzerke, J., Bethge, O. T., Schimmöller, L., Antoch, G., Müller, H., Daul, A., Maier-Hein, K. H.',
        title: 'Joint Imaging Platform for Federated Clinical Data Analytics.',
        citation: 'JCO Clinical Cancer Informatics, 4, 1027–1038, 2020.',
        year: 2020,
        link: 'https://doi.org/10.1200/cci.20.00045',
    },
    // 2014
    {
        authors: 'Prasser, F., Kohlmayer, F., Lautenschläger, R., Kuhn, K. A.',
        title: 'ARX — A comprehensive tool for anonymizing biomedical data.',
        citation: 'AMIA Annual Symposium Proceedings, Vol. 2014, p. 984, 2014.',
        year: 2014,
        link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4419984/',
    },
];

const searchQuery = ref('');
const typeLabel = useTranslation('publications.filterType');
const yearLabel = useTranslation('publications.filterYear');

type PublicationType = 'journal' | 'conference' | 'book' | 'preprint';

const TYPE_FILTERS = ['all', 'journal', 'conference', 'book', 'preprint'] as const;

/** Type from the citation and link, so entries need no extra field. */
function publicationType({ citation, link }: IPublication): PublicationType {
    if (/preprint|arxiv|corr abs|biorxiv|medrxiv|research square|openreview/i.test(citation) || link?.includes('arxiv.org')) {
        return 'preprint';
    }

    if (/conference|proceedings|symposium|workshop|studies in health technology|\(MIE|lecture notes|computer and information science|miccai|neurips|icml|saTML/i.test(citation)) {
        return 'conference';
    }

    if (/ebooks|book/i.test(citation)) {
        return 'book';
    }

    return 'journal';
}

function doiOf(link: string): string | undefined {
    return link.match(/doi\.org\/(10\..+)$/)?.[1];
}

const selectedType = ref<(typeof TYPE_FILTERS)[number]>('all');
const selectedYear = ref<number | null>(null);
const allYears = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);

const resetFilters = () => {
    searchQuery.value = '';
    selectedType.value = 'all';
    selectedYear.value = null;
};
const openKey = ref<string | null>(null);
const toggle = (key: string) => {
    openKey.value = openKey.value === key ? null : key;
};

// Linked publications as schema.org articles (authors stay text: no Person entities from "et al.")
const locale = useLocale();
const publicationList = computed(() => ({
    '@type': 'ItemList',
    '@id': publicationListId(localePath('/publications', locale.value)),
    name: 'PrivateAIM publications',
    itemListElement: publications
        .filter((publication) => publication.link)
        .map((publication, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'ScholarlyArticle',
                headline: publication.title.replace(/\.$/, ''),
                datePublished: String(publication.year),
                url: publication.link,
                ...(publication.link?.includes('doi.org/') ? { sameAs: publication.link } : {}),
            },
        })),
}));

const matchesSearch = (p: IPublication, query: string) => !query ||
    p.title.toLowerCase().includes(query) ||
    p.authors.toLowerCase().includes(query) ||
    p.citation.toLowerCase().includes(query);

// Search and year narrow the list; the type counts follow them
const searchedPublications = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();

    return publications.filter((p) => matchesSearch(p, query) && (selectedYear.value === null || p.year === selectedYear.value));
});

const typeCounts = computed(() => {
    const counts = {
        all: searchedPublications.value.length,
        journal: 0,
        conference: 0,
        book: 0,
        preprint: 0,
    };

    for (const publication of searchedPublications.value) {
        counts[publicationType(publication)]++;
    }

    return counts;
});

const filteredPublications = computed(() => searchedPublications.value
    .filter((p) => selectedType.value === 'all' || publicationType(p) === selectedType.value));

const filteredYears = computed(() => {
    const uniqueYears = [...new Set(filteredPublications.value.map((p) => p.year))];

    return uniqueYears.sort((a, b) => b - a);
});

const getFilteredPublicationsByYear = (year: number): IPublication[] => filteredPublications.value.filter((p) => p.year === year);
</script>

<style scoped>
.publication-heading {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
}

.publications-container {
    width: 100%;
}

.publications-content {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.search-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.search-input {
    flex: 1;
    min-width: 0;
    padding: 0.75rem 1rem;
    border: 1px solid var(--text-muted);
    border-radius: 0.5rem;
    font-size: 1rem;
    background-color: var(--card-bg);
    color: var(--text-color);
}

.search-input::placeholder {
    color: var(--nav-text);
    opacity: 0.7;
}

.result-count {
    font-size: 0.9rem;
    color: var(--nav-text);
    white-space: nowrap;
}

.filters {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin: -1rem 0 2rem;
}

.filter-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
}

.filter-label {
    min-width: 3.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-muted);
}

.filter-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.85rem;
    border: 1px solid var(--border-color);
    border-radius: 999px;
    background-color: var(--card-bg);
    color: var(--text-color);
    font-family: inherit;
    font-size: 0.9rem;
    cursor: pointer;
}

.filter-chip:hover {
    border-color: var(--primary-color);
}

.filter-chip[aria-pressed="true"] {
    border-color: var(--primary-color);
    background-color: var(--primary-color);
    color: var(--on-primary);
}

.chip-count {
    font-size: 0.8rem;
    opacity: 0.75;
}

.type-badge {
    align-self: flex-start;
    padding: 0.1rem 0.55rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    background-color: var(--tag-bg);
    color: var(--tag-text);
}

.type-conference {
    background-color: var(--brand-yellow-tint);
    color: var(--text-color);
}

.type-book {
    background-color: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-color);
}

.type-preprint {
    background-color: transparent;
    border: 1px dashed var(--text-muted);
    color: var(--text-muted);
}

.publications-year-section {
    margin-bottom: 2rem;
}

.year-heading {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-color);
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 0.5rem;
}

.publications-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.publication-item {
    background-color: var(--card-bg);
    border-radius: 0.5rem;
    overflow: hidden;
    border: 1px solid var(--border-color);
    box-shadow: 0 2px 4px color-mix(in srgb, var(--shadow-color) 5%, transparent);
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
    width: 100%;
    border: none;
    background: none;
    text-align: left;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    border-radius: 0.5rem;
}

.publication-summary:hover {
    background-color: var(--tag-bg);
}

.publication-summary:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: -2px;
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
    background-color: var(--tag-bg);
    color: var(--link-color);
}

.publication-summary.open::after {
    content: "\2212";
}

.publication-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text-color);
    line-height: 1.5;
}

.publication-citation {
    font-size: 0.9rem;
    color: var(--link-color);
    line-height: 1.4;
}

.publication-detail-content {
    padding: 0 1.25rem 1rem;
    color: var(--text-color);
    line-height: 1.6;
}

.publication-authors {
    font-size: 0.9rem;
    color: var(--nav-text);
    margin-bottom: 0.75rem;
}

.publication-link {
    display: inline-flex;
    gap: 0.35rem;
    color: var(--link-color);
    text-decoration: none;
    font-weight: 500;
    overflow-wrap: anywhere;
}

.publication-link:hover {
    text-decoration: underline;
}

.no-results {
    text-align: center;
    padding: 3rem 0;
    color: var(--nav-text);
}

.reset-button {
    margin-top: 1rem;
    padding: 0.5rem 1.25rem;
    background-color: var(--primary-color);
    color: var(--on-primary);
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    font-size: 0.95rem;
}

.reset-button:hover {
    opacity: 0.9;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .publication-summary {
        padding-right: 2.5rem;
    }
}
</style>
