/**
 * Schema.org JSON-LD nodes, rendered into each page via <JsonLd>. Nodes reference
 * each other by `@id`, so every page can link to the project without repeating it.
 */
export const SITE_URL = 'https://privateaim.de';

const PROJECT_ID = `${SITE_URL}/#project`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const FLAME_ID = `${SITE_URL}/#flame`;

export type JsonLdNode = Record<string, unknown>;

export const projectNode: JsonLdNode = {
    '@type': 'ResearchProject',
    '@id': PROJECT_ID,
    name: 'PrivateAIM',
    alternateName: 'Privacy-Preserving Analytics in Medicine',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/og-image.png`,
    description: 'PrivateAIM develops FLAME, a federated learning and analysis platform for privacy-preserving medical data analysis within ' +
        'Germany\'s Medical Informatics Initiative (MII). Patient data stays at each participating site, and only aggregated results are returned.',
    foundingDate: '2023-04-01',
    funder: {
        '@type': 'GovernmentOrganization',
        name: 'Bundesministerium für Forschung, Technologie und Raumfahrt (BMFTR)',
        alternateName: 'Bundesministerium für Bildung und Forschung (BMBF)',
        url: 'https://www.bmftr.bund.de/',
    },
    // The coordinating institutions, as named on the partners page
    member: [
        ['University Hospital Tübingen', 'https://www.medizin.uni-tuebingen.de/'],
        ['Berlin Institute of Health at Charité (BIH)', 'https://www.bihealth.org/'],
        ['Technical University of Munich', 'https://www.tum.de/'],
    ].map(([name, url]) => ({
        '@type': 'OrganizationRole',
        roleName: 'Coordinator',
        member: {
            '@type': 'Organization',
            name,
            url,
        },
    })),
    parentOrganization: {
        '@type': 'Organization',
        name: 'Medical Informatics Initiative (MII)',
        url: 'https://www.medizininformatik-initiative.de',
    },
    knowsAbout: [
        'Federated Learning',
        'Privacy-Preserving Analytics',
        'Differential Privacy',
        'Secure Multi-Party Computation',
        'Medical Data Analysis',
    ],
    sameAs: [
        'https://github.com/PrivateAIM',
        'https://www.gesundheitsforschung-bmftr.de/de/privateaim-medizininformatik-plattform-privatspharen-schutzende-analytik-in-der-medizin-16491.php',
    ],
};

export const flameNode: JsonLdNode = {
    '@type': 'SoftwareApplication',
    '@id': FLAME_ID,
    name: 'FLAME',
    alternateName: 'Federated Learning and Analysis in Medicine',
    description: 'FLAME is the platform developed by PrivateAIM for secure distributed analysis of medical data. One central Hub coordinates, ' +
        'and a Node at every participating site computes next to its own data.',
    disambiguatingDescription: 'The federated analysis platform of the PrivateAIM consortium in the Medical Informatics Initiative (MII), ' +
        'not to be confused with other software named Flame.',
    applicationCategory: 'Research software',
    url: `${SITE_URL}/flame`,
    license: 'https://www.apache.org/licenses/LICENSE-2.0',
    softwareHelp: { '@type': 'CreativeWork', url: 'https://docs.privateaim.net/' },
    sameAs: ['https://github.com/PrivateAIM', 'https://docs.privateaim.net/'],
    creator: { '@id': PROJECT_ID },
};

/** Pages other than the home page reference the project by @id; this keeps the reference resolvable on every page. */
export const projectReferenceNode: JsonLdNode = {
    '@type': 'ResearchProject',
    '@id': PROJECT_ID,
    name: 'PrivateAIM',
    url: `${SITE_URL}/`,
};

export const websiteNode: JsonLdNode = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'PrivateAIM',
    url: `${SITE_URL}/`,
    inLanguage: ['en', 'de'],
    publisher: { '@id': PROJECT_ID },
};

interface WebPageInput {
    path: string;
    name: string;
    description?: string;
    locale: string;
    /** schema.org WebPage subtype, e.g. CollectionPage or AboutPage */
    type?: string;
    /** @id of the page's main entity */
    mainEntity?: string;
}

export function webPageNode({
    path, 
    name, 
    description, 
    locale, 
    type = 'WebPage', 
    mainEntity,
}: WebPageInput): JsonLdNode {
    const url = `${SITE_URL}${path}`;
    return {
        '@type': type,
        '@id': `${url}#webpage`,
        url,
        name,
        ...(description ? { description } : {}),
        inLanguage: locale,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PROJECT_ID },
        ...(mainEntity ? { mainEntity: { '@id': mainEntity } } : {}),
    };
}

/** Home > page, for every page below the home page. */
export function breadcrumbNode(homePath: string, homeName: string, path: string, name: string): JsonLdNode {
    return {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}${path}#breadcrumb`,
        itemListElement: [
            {
                '@type': 'ListItem', 
                position: 1, 
                name: homeName, 
                item: `${SITE_URL}${homePath}`,
            },
            {
                '@type': 'ListItem', 
                position: 2, 
                name, 
                item: `${SITE_URL}${path}`,
            },
        ],
    };
}

/** The publication list of a locale's publications page. */
export function publicationListId(path: string): string {
    return `${SITE_URL}${path}#list`;
}
