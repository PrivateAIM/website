import type { ReferenceProject } from '@/types/ReferenceProject';

const MANIFESTO_URL = 'https://www.go-fair.org/wp-content/uploads/2019/05/Personal-Health-Train-Implementation-Network-Manifesto.pdf';
const GO_FAIR_URL = 'https://www.go-fair.org/implementation-networks/overview/personal-health-train/';
const GITHUB_URL = 'https://github.com/PHT-Medic';
const DOCS_URL = 'https://pht-medic.github.io/documentation/';
const MII_URL = 'https://www.medizininformatik-initiative.de/en/about-initiative';

const TALK_LINKS = {
    cord: 'https://docs.google.com/presentation/d/1CjFEUr07faHTNhVhcwDW-p1saVszcc3IkWS897Z-W-g/edit?usp=sharing',
    fairConvergence: 'https://drive.google.com/file/d/1_CjetwQB1uT7XgFyxLtg1xCUqVQCqSZS/view?usp=sharing',
    miiWorkshop: 'https://drive.google.com/file/d/1p3jC132ftYgQRgyiL_S8QzCxvwFqV-r8/view?usp=sharing',
    difuture2019: 'https://difuture.de/wp-content/uploads/2019/10/Marius-Herr_DIFUTURE_Symposium_exported_High_quality.pdf',
    difuture2018: 'https://difuture.de/wp-content/uploads/2018/12/dhs_05_oliver_kohlbacher.pdf',
};

const pht: ReferenceProject = {
    slug: 'pht',
    content: {
        en: {
            name: 'Personal Health Train (PHT)',
            tagline: 'Bringing the algorithm to the data: privacy-preserving, distributed analysis of medical data across hospitals.',
            successorNote: 'The Personal Health Train has become part of **FLAME**; the work continues in FLAME within **PrivateAIM**.',
            sections: [
                {
                    title: 'The idea',
                    body: [
                        'Meaningful medical data is spread across many sites, stored in different formats and highly sensitive. ' +
                        'Collecting it centrally creates data silos that are hard to maintain, and the data cannot be shared without ' +
                        'the explicit consent of the patient.',
                        '',
                        'The Personal Health Train turned this around: *bring the algorithm to the data*. ' +
                        'Instead of moving data to a central analysis site, the analysis is packaged as a **train** that travels between ' +
                        'the participating sites, the **stations** (e.g. hospitals), and runs where the data lives. ' +
                        'Patient data never has to leave the hospital.',
                        '',
                        `PHT was a paradigm proposed within the GO FAIR initiative. Its [manifesto](${MANIFESTO_URL}) was introduced by the ` +
                        `Dutch Techcentre for Life Sciences (DTL), and PHT became a [GO FAIR Implementation Network](${GO_FAIR_URL}).`,
                        '',
                        'DIFUTURE Tübingen joined the PHT Implementation Network in 2018 and developed a deployment-ready, fully open-source ' +
                        'implementation, PHT-meDIC. It was built on container technology, so that even complex workflows such as genomics ' +
                        'pipelines or deep-learning algorithms could travel between sites.',
                        '',
                        `Within the [Medical Informatics Initiative](${MII_URL}), Data Integration Centers (DICs) are being introduced at ` +
                        'each medical center as local hubs providing secure access to integrated data.',
                    ].join('\n'),
                },
                {
                    title: 'How it worked',
                    body: [
                        'The Tübingen implementation relied on a set of central services to submit, route and control trains: researchers ' +
                        'submitted and signed their analyses through a central user interface, a train builder packaged them, and a train ' +
                        'router moved each train along its route from station to station.',
                        '',
                        'Every train had to be **manually reviewed and accepted** at a station before it was allowed to run. ' +
                        'Execution at a station was split into three phases:',
                        '',
                        '1. **Pre-run security check**: the algorithm is validated against manipulation and the model is decrypted using envelope encryption.',
                        '2. **Execution**: the train image, including all software requirements wrapped in the container, runs locally at the station.',
                        '3. **Post-run encryption**: the results are encrypted and the train is prepared for departure.',
                        '',
                        'Results were only ever stored centrally in encrypted form and had to be decrypted locally.',
                    ].join('\n'),
                },
            ],
            talks: [
                {
                    date: 'Nov 2021',
                    title: 'Demo of the Tübingen PHT for CORD-MI (slides in German)',
                    venue: '16th CORD-MI Web Workshop',
                    link: TALK_LINKS.cord,
                },
                {
                    date: 'Dec 2020',
                    title: 'Update on the Tübingen PHT',
                    venue: 'International FAIR Convergence Symposium 2020',
                    link: TALK_LINKS.fairConvergence,
                },
                {
                    date: 'Oct 2020',
                    title: 'Joint status update with Aachen: Tübingen architecture, demo in Aachen and next steps',
                    venue: 'MII workshop on distributed analysis in Germany',
                    link: TALK_LINKS.miiWorkshop,
                },
                {
                    date: 'Oct 2019',
                    title: 'Status update on recent progress in Tübingen',
                    venue: 'DIFUTURE Symposium 2019, Tübingen',
                    link: TALK_LINKS.difuture2019,
                },
                {
                    date: 'Nov 2018',
                    title: 'First proof of concept: PHT architecture, workflow and train API',
                    venue: 'DIFUTURE Symposium 2018, Munich; GO FAIR meetings in Leiden and Berlin',
                    link: TALK_LINKS.difuture2018,
                },
            ],
            links: [
                { label: 'Source code on GitHub', url: GITHUB_URL },
                { label: 'Documentation', url: DOCS_URL },
                { label: 'PHT manifesto (PDF)', url: MANIFESTO_URL },
                { label: 'GO FAIR PHT Implementation Network', url: GO_FAIR_URL },
            ],
        },
        de: {
            name: 'Personal Health Train (PHT)',
            tagline: 'Der Algorithmus kommt zu den Daten: datenschutzfreundliche, verteilte Analyse medizinischer Daten über Kliniken hinweg.',
            successorNote: 'Der Personal Health Train ist heute Teil von **FLAME**; die Arbeit wird in FLAME im Rahmen von **PrivateAIM** fortgeführt.',
            sections: [
                {
                    title: 'Die Idee',
                    body: [
                        'Aussagekräftige medizinische Daten liegen verteilt an vielen Standorten, in unterschiedlichen Formaten, und sie sind hochsensibel. ' +
                        'Sie zentral zusammenzuführen, erzeugt schwer wartbare Datensilos, und ohne ausdrückliche Einwilligung der Patientinnen ' +
                        'und Patienten dürfen sie nicht weitergegeben werden.',
                        '',
                        'Der Personal Health Train kehrte dieses Prinzip um: *Der Algorithmus kommt zu den Daten*. ' +
                        'Statt Daten an einen zentralen Analyseort zu übertragen, wird die Analyse als **Zug** verpackt, der zwischen den ' +
                        'beteiligten Standorten, den **Stationen** (etwa Kliniken), reist und dort ausgeführt wird, wo die Daten liegen. ' +
                        'Patientendaten müssen das Krankenhaus dabei nie verlassen.',
                        '',
                        `PHT war ein innerhalb der GO-FAIR-Initiative vorgeschlagenes Paradigma. Das zugehörige [Manifest](${MANIFESTO_URL}) ` +
                        'wurde vom Dutch Techcentre for Life Sciences (DTL) vorgestellt; PHT wurde als ' +
                        `[GO FAIR Implementation Network](${GO_FAIR_URL}) organisiert.`,
                        '',
                        'DIFUTURE Tübingen trat dem PHT Implementation Network 2018 bei und entwickelte mit PHT-meDIC eine einsatzbereite, ' +
                        'vollständig quelloffene Implementierung. Sie setzte auf Container-Technologie, sodass auch komplexe Workflows wie ' +
                        'Genomik-Pipelines oder Deep-Learning-Verfahren zwischen den Standorten reisen konnten.',
                        '',
                        `Im Rahmen der [Medizininformatik-Initiative](${MII_URL}) werden an jedem medizinischen Zentrum ` +
                        'Datenintegrationszentren als lokale Knotenpunkte eingeführt, die einen sicheren Zugang zu integrierten Daten bieten.',
                    ].join('\n'),
                },
                {
                    title: 'So funktionierte es',
                    body: [
                        'Die Tübinger Implementierung stützte sich auf mehrere zentrale Dienste zum Einreichen, Steuern und Weiterleiten von Zügen: ' +
                        'Forschende reichten ihre Analysen über eine zentrale Oberfläche ein und signierten sie, ein Train Builder baute daraus ' +
                        'den Zug, und ein Train Router leitete ihn entlang seiner Route von Station zu Station.',
                        '',
                        'Jeder Zug musste an der jeweiligen Station **manuell geprüft und freigegeben** werden, bevor er ausgeführt werden durfte. ' +
                        'Die Ausführung an einer Station gliederte sich in drei Phasen:',
                        '',
                        '1. **Sicherheitsprüfung vor dem Lauf**: Der Algorithmus wird auf Manipulation geprüft und das Modell per Envelope Encryption entschlüsselt.',
                        '2. **Ausführung**: Das Image des Zugs mit allen im Container gebündelten Softwareabhängigkeiten läuft lokal an der Station.',
                        '3. **Verschlüsselung nach dem Lauf**: Die Ergebnisse werden verschlüsselt und der Zug wird für die Weiterfahrt vorbereitet.',
                        '',
                        'Zentral lagen Ergebnisse ausschließlich verschlüsselt vor; entschlüsselt wurden sie nur lokal.',
                    ].join('\n'),
                },
            ],
            talks: [
                {
                    date: 'Nov. 2021',
                    title: 'Demo des Tübinger PHT für CORD-MI',
                    venue: '16. CORD-MI-WebWorkshop',
                    link: TALK_LINKS.cord,
                },
                {
                    date: 'Dez. 2020',
                    title: 'Update zum Tübinger PHT',
                    venue: 'International FAIR Convergence Symposium 2020',
                    link: TALK_LINKS.fairConvergence,
                },
                {
                    date: 'Okt. 2020',
                    title: 'Gemeinsamer Statusbericht mit Aachen: Tübinger Architektur, Demo in Aachen und nächste Schritte',
                    venue: 'MII-Workshop zu verteilter Analyse in Deutschland',
                    link: TALK_LINKS.miiWorkshop,
                },
                {
                    date: 'Okt. 2019',
                    title: 'Statusbericht zu den jüngsten Fortschritten in Tübingen',
                    venue: 'DIFUTURE-Symposium 2019, Tübingen',
                    link: TALK_LINKS.difuture2019,
                },
                {
                    date: 'Nov. 2018',
                    title: 'Erster Proof of Concept: PHT-Architektur, Workflow und Train-API',
                    venue: 'DIFUTURE-Symposium 2018, München; GO-FAIR-Treffen in Leiden und Berlin',
                    link: TALK_LINKS.difuture2018,
                },
            ],
            links: [
                { label: 'Quellcode auf GitHub', url: GITHUB_URL },
                { label: 'Dokumentation', url: DOCS_URL },
                { label: 'PHT-Manifest (PDF)', url: MANIFESTO_URL },
                { label: 'GO FAIR PHT Implementation Network', url: GO_FAIR_URL },
            ],
        },
    },
    publications: [
        {
            authors: 'Herr, M., Baykara, C. A., Ünal, A. B., Pfeifer, N., Akgün, M.',
            title: 'Privacy-preserving AUC computation in distributed machine learning with PHT-meDIC',
            citation: 'PLOS Digital Health, 4(11), e0000753',
            year: 2025,
            link: 'https://journals.plos.org/digitalhealth/article?id=10.1371/journal.pdig.0000753',
        },
        {
            authors: 'Welten, S., de Arruda Botelho Herr, M., Hempel, L., Hieber, D., Placzek, P., Graf, M., Weber, S., Neumann, L., Jugl, M., ' +
                'Tirpitz, L., Kindermann, K., Geisler, S., Bonino da Silva Santos, L. O., Decker, S., Pfeifer, N., Kohlbacher, O., Kirsten, T.',
            title: 'A study on interoperability between two Personal Health Train infrastructures in leukodystrophy data analysis',
            citation: 'Scientific Data, 11, 1663',
            year: 2024,
            link: 'https://pubmed.ncbi.nlm.nih.gov/38909050/',
        },
        {
            authors: 'Herr, M., Graf, M., Placzek, P., König, F., Bötte, F., Stickel, T., Hieber, D., Zimmermann, L., Slupina, M., Mohr, C., ' +
                'Biergans, S., Akgün, M., Pfeifer, N., Kohlbacher, O.',
            title: 'Bringing the Algorithms to the Data — Secure Distributed Medical Analytics using the Personal Health Train (PHT-meDIC)',
            citation: 'arXiv (Cornell University)',
            year: 2022,
            link: 'https://doi.org/10.48550/arxiv.2212.03481',
        },
        {
            authors: 'Beyan, O., Choudhury, A., van Soest, J., Kohlbacher, O., Zimmermann, L., Stenzhorn, H., Karim, Md. R., Dumontier, M., ' +
                'Decker, S., da Silva Santos, L. O. B., Dekker, A.',
            title: 'Distributed Analytics on Sensitive Medical Data: The Personal Health Train',
            citation: 'Data Intelligence, 2(1-2), 96-107',
            year: 2020,
            link: 'https://doi.org/10.1162/dint_a_00032',
        },
    ],
};

export default pht;
