import type { Ref } from 'vue';
import type {
    RouteRecordRaw,
    RouteRecordSingleView,
    Router,
    RouterScrollBehavior,
} from 'vue-router';
import { sendPageView } from '@/utils/analytics';
import { findReference, referenceContentForLocale } from '@/data/references';
import {
    DEFAULT_LOCALE,
    LOCALES,
    localeOfPath,
    localePath,
    stripLocale,
} from '@/i18n';

declare module 'vue-router' {
    interface RouteMeta {
        title?: string
        description?: string
        locale?: string
    }
}

type LocaleCode = (typeof LOCALES)[number]['code'];

interface PageMeta {
    title: string;
    description: string;
}

interface PageRoute {
    path: string;
    name: string;
    component: RouteRecordSingleView['component'];
    props?: boolean;
    meta: Record<LocaleCode, PageMeta>;
}

const pages: PageRoute[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
            en: {
                title: 'PrivateAIM — Privacy-Preserving Analytics in Medicine',
                description: 'PrivateAIM develops FLAME, a federated learning and analysis platform for medical data. Patient data stays at each site and only aggregated results are returned.',
            },
            de: {
                title: 'PrivateAIM — Datenschutzfreundliche Analytik in der Medizin',
                description: 'PrivateAIM entwickelt FLAME, eine Plattform für föderiertes Lernen und föderierte Analysen medizinischer Daten. Patientendaten bleiben am Standort, nur aggregierte Ergebnisse werden zurückgegeben.',
            },
        },
    },
    {
        path: '/flame',
        name: 'Flame',
        component: () => import('@/views/Flame.vue'),
        meta: {
            en: {
                title: 'FLAME — Federated Learning and Analysis in Medicine — PrivateAIM',
                description: 'FLAME is the PrivateAIM platform for federated analysis of medical data: one Hub coordinates, a Node at each site computes, and only aggregated results leave the sites.',
            },
            de: {
                title: 'FLAME — Föderiertes Lernen und Analysen in der Medizin — PrivateAIM',
                description: 'FLAME ist die PrivateAIM-Plattform für föderierte Analysen medizinischer Daten: Ein Hub koordiniert, ein Node an jedem Standort rechnet, und nur aggregierte Ergebnisse verlassen die Standorte.',
            },
        },
    },
    {
        path: '/team',
        name: 'Team',
        component: () => import('@/views/Team.vue'),
        meta: {
            en: {
                title: 'Our Team — PrivateAIM',
                description: 'Meet the researchers, developers, and privacy engineers behind PrivateAIM and the FLAME federated learning platform.',
            },
            de: {
                title: 'Unser Team — PrivateAIM',
                description: 'Lernen Sie die Forschenden und Entwickelnden hinter PrivateAIM und der föderierten Lernplattform FLAME kennen.',
            },
        },
    },
    {
        path: '/news',
        name: 'News',
        component: () => import('@/views/News.vue'),
        meta: {
            en: {
                title: 'News — PrivateAIM',
                description: 'Latest news, events, workshops, and project milestones from the PrivateAIM privacy-preserving analytics consortium.',
            },
            de: {
                title: 'Neuigkeiten — PrivateAIM',
                description: 'Aktuelle Neuigkeiten, Veranstaltungen, Workshops und Meilensteine des PrivateAIM-Konsortiums für datenschutzfreundliche Analytik.',
            },
        },
    },
    {
        path: '/partners',
        name: 'Partners',
        component: () => import('@/views/Partners.vue'),
        meta: {
            en: {
                title: 'Partners — PrivateAIM',
                description: 'University hospitals and research institutions collaborating on privacy-preserving federated learning for medical data analysis in Germany.',
            },
            de: {
                title: 'Partner — PrivateAIM',
                description: 'Universitätskliniken und Forschungseinrichtungen, die gemeinsam an datenschutzfreundlichem föderiertem Lernen für die Analyse medizinischer Daten in Deutschland arbeiten.',
            },
        },
    },
    {
        path: '/publications',
        name: 'Publications',
        component: () => import('@/views/Publications.vue'),
        meta: {
            en: {
                title: 'Publications — PrivateAIM',
                description: 'Publications and preprints on federated learning, differential privacy, secure computation, and privacy-preserving medical data analysis from the PrivateAIM consortium.',
            },
            de: {
                title: 'Publikationen — PrivateAIM',
                description: 'Publikationen und Preprints des PrivateAIM-Konsortiums zu föderiertem Lernen, Differential Privacy, sicherer Berechnung und datenschutzfreundlicher Analyse medizinischer Daten.',
            },
        },
    },
    {
        path: '/imprint',
        name: 'Imprint',
        component: () => import('@/views/Imprint.vue'),
        meta: {
            en: {
                title: 'Imprint — PrivateAIM',
                description: 'Legal information and imprint for the PrivateAIM website.',
            },
            de: {
                title: 'Impressum — PrivateAIM',
                description: 'Rechtliche Angaben und Impressum der PrivateAIM-Website.',
            },
        },
    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: () => import('@/views/Privacy.vue'),
        meta: {
            en: {
                title: 'Privacy Policy — PrivateAIM',
                description: 'Privacy policy for the PrivateAIM website.',
            },
            de: {
                title: 'Datenschutzerklärung — PrivateAIM',
                description: 'Datenschutzerklärung der PrivateAIM-Website.',
            },
        },
    },
    {
        path: '/references/:slug',
        name: 'ReferenceProject',
        component: () => import('@/views/ReferenceProject.vue'),
        props: true,
        meta: {
            en: {
                title: 'References — PrivateAIM',
                description: 'Predecessor projects of PrivateAIM and FLAME, their publications, talks, and code.',
            },
            de: {
                title: 'Referenzprojekte — PrivateAIM',
                description: 'Vorgängerprojekte von PrivateAIM und FLAME mit Publikationen, Vorträgen und Code.',
            },
        },
    },
];

// Every page exists once per locale: /news (default locale) and /de/news
export const routes: RouteRecordRaw[] = [
    ...pages.flatMap(({ meta, ...page }) => LOCALES.map(({ code }): RouteRecordSingleView => ({
        ...page,
        path: localePath(page.path, code),
        name: code === DEFAULT_LOCALE ? page.name : `${page.name}-${code}`,
        meta: { ...meta[code], locale: code },
    }))),
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
        meta: { title: 'Page Not Found — PrivateAIM' },
    },
];

// Always scroll to top when navigating to a new page
export const scrollBehavior: RouterScrollBehavior = () => ({
    top: 0,
    behavior: 'smooth',
});

export function installRouterHooks(router: Router, locale: Ref<string>) {
    // GitHub Pages also serves the prerendered files at their .html URLs
    router.beforeEach((to) => {
        if (!to.path.endsWith('.html')) {
            return undefined;
        }

        return {
            path: to.path.replace(/(\/index)?\.html$/, '') || '/',
            query: to.query,
            hash: to.hash,
            replace: true,
        };
    });

    // The URL decides the language
    router.beforeEach((to) => {
        locale.value = to.meta.locale ?? localeOfPath(to.path);
    });

    // Resolve the dynamic title/description of reference pages before afterEach
    // writes them (and sends the page view). The view refines them per locale.
    router.beforeResolve((to) => {
        if (to.name !== 'ReferenceProject') {
            return;
        }

        const { slug } = to.params;
        const project = typeof slug === 'string' ? findReference(slug) : undefined;
        if (!project) {
            to.meta.title = 'Page Not Found — PrivateAIM';
            return;
        }

        const content = referenceContentForLocale(project, to.meta.locale ?? DEFAULT_LOCALE);
        to.meta.title = `${content.name} — PrivateAIM`;
        to.meta.description = content.tagline;
    });

    // Update document title and meta description on each navigation.
    // Prerendered pages get these tags from scripts/prerender.ts instead.
    router.afterEach((to) => {
        if (import.meta.env.SSR) {
            return;
        }

        const defaultTitle = 'PrivateAIM — Privacy-Preserving Analytics in Medicine';
        const title = to.meta.title || defaultTitle;
        document.title = title;

        const setMeta = (selector: string, value?: string) => {
            if (value) {
                document.querySelector(selector)?.setAttribute('content', value);
            }
        };
        setMeta('meta[name="description"]', to.meta.description);
        setMeta('meta[property="og:title"]', title);
        setMeta('meta[property="og:description"]', to.meta.description);
        setMeta('meta[name="twitter:title"]', title);
        setMeta('meta[name="twitter:description"]', to.meta.description);

        // Update canonical URL
        const url = `https://privateaim.de${to.path}`;
        document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
        setMeta('meta[property="og:url"]', url);

        const base = stripLocale(to.path);
        const setAlternate = (hreflang: string, path: string) => {
            document.querySelector(`link[hreflang="${hreflang}"]`)?.setAttribute('href', `https://privateaim.de${path}`);
        };
        for (const { code } of LOCALES) {
            setAlternate(code, localePath(base, code));
        }
        setAlternate('x-default', base);

        // Send GA4 page view for SPA navigation
        sendPageView(to.path, document.title);
    });
}
