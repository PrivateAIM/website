import { defineLocale, defineNamespace, defineTranslations } from 'ilingo';

/**
 * English catalog.
 *
 * Each top-level section is an ilingo *namespace*; the object passed to
 * `defineTranslations` may be nested — a nested object extends the dotted
 * *key* path (e.g. `hero.title` lives under the `home` namespace and is
 * referenced as the path `home.hero.title`).
 *
 * Interpolation uses ilingo's `{{var}}` syntax (see `footer.copyright`).
 */
export default defineLocale('en', [
    defineNamespace('navigation', [defineTranslations({
        home: 'Home',
        flame: 'FLAME',
        news: 'News',
        team: 'Team',
        partners: 'Partners',
        publications: 'Publications',
        skipToContent: 'Skip to content',
        changeLanguage: 'Change language',
    })]),

    defineNamespace('home', [defineTranslations({
        hero: {
            title: 'Privacy-preserving analytics for medical research',
            subtitle: 'PrivateAIM develops FLAME, a federated platform that brings the analysis to the data at German university hospitals.',
            explorePlatform: 'Explore Our Platform',
            joinNetwork: 'Join Our Network',
        },
        intro: {
            title: 'What is PrivateAIM?',
            definition: 'PrivateAIM (Privacy-Preserving Analytics in Medicine) is a research consortium of 15 partners within Germany’s Medical Informatics Initiative (MII), funded by the Federal Ministry of Research, Technology and Space (BMFTR) from April 2023 until 31 March 2027. It develops [FLAME](/flame:internal) (Federated Learning and Analysis in Medicine), an open-source platform in productive use that analyzes medical data across university hospitals: patient data stays at each site, only the analysis code travels to the data, and only aggregated results are returned.',
            paragraph2: 'Medical research, and AI in particular, needs data from many hospitals to produce reliable results. But health data is sensitive and strictly protected. [Federated analysis](/federated-analysis:internal) resolves this conflict: instead of collecting data centrally, researchers send their analysis to the data.',
        },
        capabilities: {
            title: 'What you can do with FLAME',
            statistics: {
                title: 'Statistics and cohort counts',
                description: 'Count cohorts and compute descriptive statistics across sites, on FHIR data such as the MII core dataset or on files such as CSV or VCF.',
            },
            learning: {
                title: 'Federated learning',
                description: 'Train machine learning models over several rounds, while the training data never leaves the participating hospitals.',
            },
            privacy: {
                title: 'Privacy-enhancing technologies',
                description: 'Add local differential privacy to the results, or use homomorphic encryption so that only the combined result of all sites is visible.',
            },
            code: {
                title: 'Your own Python analysis',
                description: 'Write your analysis in Python with the FLAME SDK, test it locally and choose a master image with the dependencies you need.',
            },
            examples: 'Example analyses in the [FLAME documentation](https://docs.privateaim.net/guide/user/analysis-coding:external) cover long COVID (PASC), survival regression, logistic regression, image classification and quality control of genomic data.',
        },
        faq: {
            title: 'Frequently asked questions',
            q1: {
                question: 'Does patient data leave the hospital?',
                answer: 'No. Every participating site runs a FLAME Node next to its own data. Only the analysis code travels to the data, and only aggregated results are returned. The central FLAME Hub never has access to patient data.',
            },
            q2: {
                question: 'Are the results anonymous?',
                answer: 'Aggregation alone does not guarantee anonymity. That is why every site reviews each analysis before it runs, including whether its results are appropriate. Local differential privacy and homomorphic encryption can add further protection. The [FLAME page](/flame:internal) describes the safeguards and their limits.',
            },
            q3: {
                question: 'Who can use FLAME?',
                answer: 'Researchers submit analyses through the FLAME Hub. University hospitals and other institutions take part by running a FLAME Node and decide for each project whether they participate. The [FLAME page](/flame:internal) has entry points for researchers, sites, data protection officers and patients.',
            },
            q4: {
                question: 'Is FLAME open source?',
                answer: 'Yes. The source code of the FLAME Hub and Node is publicly available on [GitHub](https://github.com/PrivateAIM:external), and the [documentation](https://docs.privateaim.net/getting-started/:external) explains installation and use.',
            },
            q5: {
                question: 'Who is behind PrivateAIM?',
                answer: 'PrivateAIM brings together 15 [partners](/partners:internal) from all four consortia of the Medical Informatics Initiative (MII), coordinated by the University Hospital Tübingen, the Berlin Institute of Health at Charité and the Technical University of Munich. The project is funded by the BMFTR until 31 March 2027.',
            },
        },
        mission: {
            title: 'Our Mission',
            paragraph1: 'PrivateAIM (Privacy-preserving Analytics in Medicine) is dedicated to bridging the gap between data privacy and medical innovation. Following the "Code to Data" principle, patient data stays at each participating site: only analysis code travels to the data, and only aggregated results travel back.',
            paragraph2: 'Every site reviews and approves the analysis code before it runs. Because aggregation alone does not guarantee anonymity, this review also assesses whether the returned results are appropriate, supported by safeguards such as end-to-end encrypted exchange between sites and optional local differential privacy.',
            paragraph3: 'FLAME (Federated Learning and Analysis in Medicine) is at the heart of our initiative. It is the platform developed by PrivateAIM for secure distributed analysis of medical data within the Medical Informatics Initiative (MII).',
        },
        howItWorks: {
            title: 'How It Works',
            step1: {
                title: 'Data Remains Local',
                description: 'Patient data stays at each participating site and is never transferred to a central system or to other sites.',
            },
            step2: {
                title: 'Code to Data Approach',
                description: 'Analysis code travels to the data, and each site reviews and approves it before it runs.',
            },
            step3: {
                title: 'Federated Analysis',
                description: 'Only aggregated results are returned: the results of the sites are combined, and only this combined result is made available to the researcher.',
            },
            experienceFlame: 'Experience FLAME',
            flamePlatform: 'Our platform for secure distributed medical data analysis',
            explorePlatform: 'Explore the Platform',
        },
        facts: {
            title: 'Project at a Glance',
            funding: 'Funding',
            fundingValue: 'Federal Ministry of Research, Technology and Space (BMFTR)',
            network: 'Network',
            networkValue: '15 partners from all four consortia of the Medical Informatics Initiative (MII)',
            platform: 'Platform',
            platformValue: 'FLAME, in productive use',
            end: 'Regular project end',
            endValue: '31 March 2027',
            code: 'Code',
            codeValue: 'Open source on GitHub',
        },
        vision: {
            title: 'Our Vision',
            paragraph1: 'We envision a future where AI-driven medical research is seamlessly integrated with privacy-by-design principles. PrivateAIM is pioneering a new standard for secure, federated medical AI by fostering a collaborative network of hospitals, researchers, and patients.',
            paragraph2: 'PrivateAIM actively involves patients, [partners](/partners:internal), and the public through workshops, educational materials, and open dialogue to ensure broad acceptance and transparency. We aim to demystify AI and federated learning, making their safeguards, limits, and benefits understandable.',
            paragraph3: 'With [FLAME](/flame:internal), PrivateAIM provides the [MII](https://www.medizininformatik-initiative.de/de/start:external) with a secure and scalable solution for cross-institutional medical data analysis that is in productive use. We are shaping the future of trustworthy and impactful medical research by enabling AI-driven healthcare innovations while preserving patient privacy.',
            contribute: 'Open Source Contributions',
            explanation: 'Explore our code repositories and contribute to the future of privacy-preserving medical data research.',
            github: 'Visit GitHub',
        },
        partners: {
            title: 'Our Consortium Partners',
            viewAll: 'View All Partners',
        },
        news: {
            latestNews: 'Latest News',
            description: 'Here you can find the latest news and updates related to PrivateAIM.',
            button: 'Read More',
        },
    })]),

    defineNamespace('explainer', [defineTranslations({
        title: 'What is federated analysis?',
        subtitle: 'A short introduction to analyzing medical data without collecting it centrally',
        intro: 'Federated analysis means analyzing data that is spread across several institutions without bringing it together in one place. Instead of copying patient data into a central database, the analysis is sent to each institution, runs there next to the local data, and only the results come back. Combined, these results answer the same research question as a central analysis would.',
        problem: {
            title: 'Why not collect the data centrally?',
            body: 'Many research questions, from rare diseases to training reliable AI models, need data from more patients than a single hospital has. Collecting this data centrally raises legal, organizational and security hurdles: health data is especially protected, every transfer has to be justified, and a central database is an attractive target. Federated analysis avoids these hurdles because the data never has to leave the hospital.',
        },
        idea: {
            title: 'The idea: bring the analysis to the data',
            body: 'A researcher writes the analysis once. Each participating hospital reviews it, runs it on its own data and returns only an intermediate result, for example a count or a model update. An aggregator combines these intermediate results into the final result for the researcher.',
            researcher: 'Researcher',
            code: 'Analysis code',
            hospital: 'Hospital',
            data: 'Data stays here',
            result: 'Combined result',
        },
        kinds: {
            title: 'Federated analysis and federated learning',
            analysis: 'Federated analysis',
            analysisBody: 'Statistics such as counts, means or regression models are computed at each site and combined once. Example: how many patients across all sites have a certain diagnosis?',
            learning: 'Federated learning',
            learningBody: 'A machine learning model is trained over several rounds. In each round the sites train on their local data and share only the updated model parameters, which are combined into a better global model.',
        },
        shared: {
            title: 'What is shared, and what is not',
            sharedTitle: 'Travels between sites',
            shared1: 'The analysis code, after it has been reviewed',
            shared2: 'Intermediate and aggregated results, such as counts or model parameters',
            notSharedTitle: 'Stays at each site',
            notShared1: 'Patient-level data',
            notShared2: 'Direct access to the local databases',
        },
        protection: {
            title: 'Federated does not automatically mean anonymous',
            body: 'Aggregated results can still reveal information about individuals, for example when a group is very small. Federated analysis is therefore combined with further safeguards: each site reviews the code and its expected results before it runs, differential privacy adds calibrated noise to results, and homomorphic encryption lets sites combine values without seeing each other’s contributions.',
        },
        practice: {
            title: 'Federated analysis in practice: FLAME',
            body: 'FLAME (Federated Learning and Analysis in Medicine) is the platform developed by PrivateAIM for federated analysis and federated learning at German university hospitals within the Medical Informatics Initiative (MII). It is open source and in productive use.',
            flame: 'Learn how FLAME works',
            docs: 'Read the FLAME documentation',
        },
    })]),

    defineNamespace('flame', [defineTranslations({
        title: 'FLAME',
        subtitle: 'Federated Learning and Analysis in Medicine: the platform developed by PrivateAIM',
        status: 'FLAME is in productive use.',
        explainer: {
            title: 'New to federated analysis?',
            text: 'A short introduction: how analyzing data without collecting it works, and where its limits are.',
        },
        context: 'FLAME (Federated Learning and Analysis in Medicine) is developed by PrivateAIM, a consortium of the German Medical Informatics Initiative (MII) funded by the BMFTR. It is not related to other software projects named Flame.',
        lead: 'FLAME lets researchers analyze medical data from several institutions without the data ever leaving them. Instead of collecting data centrally, FLAME sends the analysis code to the data. Only aggregated results are returned.',
        architecture: {
            title: 'How FLAME works',
            body: 'FLAME consists of two parts: one central Hub and one Node at every participating site. The Hub coordinates, the Nodes compute.',
            step1: 'Every participating site runs a Node next to its own data. Patient data is never transferred to the Hub or to other sites.',
            step2: 'Every site decides whether it takes part in a project, reviews the analysis code before it runs, and starts the execution itself.',
            step3: 'The analysis runs at each site. The results of the sites are combined by an aggregator, and only this combined result is made available to the researcher.',
            step4: 'For iterative methods such as federated learning, this repeats over several rounds.',
            figureAlt: 'FLAME architecture: the Hub services build the analysis image and store results, and a Node in each hospital pulls the image and runs it next to the local data',
            figureCaption: 'Execution flow of an analysis in FLAME (source: FLAME documentation)',
        },
        safeguards: {
            title: 'Safeguards',
            review: 'An analysis is only built and executed after every participating node has approved its code.',
            isolation: 'Every analysis runs in its own container without internet access.',
            encryption: 'All connections use TLS. Messages and intermediate results exchanged between nodes are additionally encrypted end to end, so the Hub cannot read them.',
            hub: 'The Hub never has access to patient data.',
            privacy: 'Analyses can use privacy-enhancing techniques such as local differential privacy.',
            access: 'Users, roles and permissions are managed per organization. Starting an analysis and configuring data stores is reserved for the staff of the site.',
        },
        limits: {
            title: 'Limits',
            body: 'Aggregation alone does not guarantee anonymity. FLAME does not automatically enforce minimum cohort sizes, k-anonymity thresholds or other output checks, so whether the returned results are appropriate is assessed during the review of each analysis.',
        },
        resources: {
            title: 'Learn more',
            docs: 'Documentation for researchers and site administrators',
            code: 'Source code on GitHub',
            publications: 'Publications from the PrivateAIM consortium',
            predecessor: 'The predecessor project: Personal Health Train (PHT)',
            talk: 'Talk on the FLAME platform (MIDI colloquium, video)',
            slides: 'FLAME architecture and policy framework (GMDS 2025, slides)',
        },
        audiences: {
            title: 'Who is FLAME for?',
            researchers: {
                title: 'Researchers',
                body: 'Write an analysis, test it locally with the FLAME SDK and run it across several sites. You only ever receive aggregated results.',
                link: 'Run your first analysis',
            },
            sites: {
                title: 'Data integration centres and sites',
                body: 'Each site runs a FLAME Node on its own Kubernetes server. The Node only needs outbound HTTPS, with no inbound access from the internet. Analyses can query data in FHIR format, such as the MII core dataset.',
                link: 'Install a Node',
            },
            dpo: {
                title: 'Data protection officers',
                body: 'Every site reviews and approves each analysis before it runs. Analyses run in isolated containers, patient data stays on site, and only aggregated results are returned. See also the limits above.',
                link: 'Security and privacy FAQ',
                flyer: 'Data protection information (PDF, in German)',
            },
            patients: {
                title: 'Patients and the public',
                body: 'With FLAME, your data stays at your hospital. Researchers send their analysis to the data instead of collecting the data centrally.',
                link: 'Information for patients (PDF, in German)',
            },
        },
    })]),

    defineNamespace('footer', [defineTranslations({
        documentation: 'Documentation',
        flame: 'FLAME Platform',
        explainer: 'What is federated analysis?',
        github: 'GitHub',
        references: 'References',
        legal: 'Legal',
        imprint: 'Imprint',
        privacy: 'Privacy Policy',
        copyright: '© {{year}} PrivateAIM. All rights reserved.',
        sponsor: 'Funded by',
    })]),

    defineNamespace('imprint', [defineTranslations({
        title: 'Imprint',
        information: {
            entity: 'Berlin Institute of Health @Charité (BIH)',
            department: 'Translational Research Unit of the Charité - Universitätsmedizin Berlin',
            address1: 'Anna-Louisa-Karsch-Str. 2',
            address2: '10178 Berlin',
            contact: {
                phone: 'Tel.',
                fax: 'Fax',
                email: 'Email',
            },
        },
        representation: { title: 'Authorized representative' },
        contact: {
            title: 'Contact',
            department: 'AG Medizininformatik',
            institute: 'Berlin Institute of Health @Charité - Universitätsmedizin Berlin',
            address1: 'Charitéplatz 1',
            address2: '10117 Berlin',
            email: 'E-Mail',
        },
        disclaimer: {
            title: 'Disclaimer',
            content: {
                title: 'Accountability for content',
                text: "The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents' accuracy, completeness or topicality. According to statutory provisions, we are furthermore responsible for our own content on these web pages. In this matter, please note that we are not obliged to monitor the transmitted or saved information of third parties, or investigate circumstances pointing to illegal activity. Our obligations to remove or block the use of information under generally applicable laws remain unaffected by this as per §§ 8 to 10 of the Telemedia Act (TMG).",
            },
            links: {
                title: 'Accountability for links',
                text: 'Responsibility for the content of external links (to web pages of third parties) lies solely with the operators of the linked pages. No violations were evident to us at the time of linking. Should any legal infringement become known to us, we will remove the respective link immediately.',
            },
            copyright: {
                title: 'Copyright',
                text: 'Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law, every form of utilizing, reproducing or processing works subject to copyright protection on our web pages requires the prior consent of the respective owner of the rights. Individual reproductions of a work are only allowed for private use. The materials from these pages are copyrighted and any unauthorized use may violate copyright laws.',
            },
        },
    })]),

    defineNamespace('partners', [defineTranslations({
        title: 'Our partners',
        description: 'The PrivateAIM project involves a total of 15 partners from all four consortia of the Medical Informatics Initiative (MII). Three MII-funded junior research groups are also involved. The project is coordinated by the University Hospital of Tübingen, the Berlin Institute of Health at the Charité and the Technical University of Munich.\n\nHere you will find a list of participating universities and research institutes:',
        subsection1: 'Coordination',
        subsection2: 'Project partners',
        subsection3: 'Associated partners',
        partner: {
            info: 'Learn more →',
            name: 'University hospital',
        },
        network: {
            title: 'Join Our Network',
            subtitle: " Interested in collaborating with PrivateAIM? We're always looking to expand our network of partners who share our vision of privacy-preserving medical research.\n",
            box1: {
                title: 'Access to Cutting-Edge Technology',
                text: 'Work with our team to implement state-of-the-art federated learning systems.',
            },
            box2: {
                title: 'Collaborative Research Opportunities',
                text: 'Participate in multi-institutional studies without compromising data sovereignty.',
            },
            box3: {
                title: 'Shape the Future of Medical Research',
                text: 'Help define standards and best practices for privacy-preserving analytics.',
            },
        },
    })]),

    defineNamespace('privacy', [defineTranslations({ title: 'Privacy Policy' })]),

    defineNamespace('cookie', [defineTranslations({
        title: 'Cookie Settings',
        subtitle: 'This website uses cookies to improve your browsing experience and to perform analyses of website usage. You can choose which cookies you want to allow.\n',
        accept: 'Accept all',
        deny: 'Only necessary',
        customize: 'Customize',
        settings: 'Open cookie settings',
        preference: 'Save selection',
        setting: {
            required: {
                title: 'Necessary Cookies',
                description: 'These cookies are essential for the website to function and cannot be disabled.',
            },
            analysis: {
                title: 'Analysis Cookies',
                description: 'These optional cookies let us use Google Analytics to measure visits, traffic sources, and use of our website. Details are in our privacy policy.',
            },
        },
    })]),

    defineNamespace('team', [defineTranslations({
        title: 'Our Team',
        subtitle: 'Meet the dedicated individuals working to advance privacy-preserving analytics in medicine.',
        core: 'Core Team',
        leadership: 'Project Leads',
        alumni: 'Alumni',
        alumniNote: 'We thank our alumni for their valuable contributions to the project.',
    })]),

    defineNamespace('publications', [defineTranslations({
        title: 'Publications',
        subtitle: 'Discover our research and publications in the field of privacy-preserving medical analytics.',
        readMore: 'Read Paper',
        searchPlaceholder: 'Search by title, author, or venue...',
        results: 'publications',
        noResults: 'No publications found matching your search.',
        resetSearch: 'Reset search',
    })]),

    defineNamespace('news', [defineTranslations({
        title: 'News',
        subtitle: 'Here you will find an overview of the latest news in the context of PrivateAIM.',
        noItems: 'No news items available for this year.',
    })]),

    defineNamespace('references', [defineTranslations({
        successorHeading: 'Now part of FLAME',
        learnMore: 'Learn more about FLAME',
        publications: 'Publications',
        readPaper: 'Read paper',
        talks: 'Talks',
        slides: 'Slides',
        opensInNewTab: 'opens in a new tab',
        links: 'Links & code',
    })]),
]);
