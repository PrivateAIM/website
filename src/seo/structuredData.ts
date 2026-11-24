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
    applicationCategory: 'Research software',
    url: 'https://docs.privateaim.net/',
    sameAs: ['https://github.com/PrivateAIM'],
    creator: { '@id': PROJECT_ID },
};

export const websiteNode: JsonLdNode = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'PrivateAIM',
    url: `${SITE_URL}/`,
    inLanguage: ['en', 'de'],
    publisher: { '@id': PROJECT_ID },
};

export function webPageNode(path: string, name: string, description: string | undefined, locale: string): JsonLdNode {
    const url = `${SITE_URL}${path}`;
    return {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name,
        ...(description ? { description } : {}),
        inLanguage: locale,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PROJECT_ID },
    };
}
