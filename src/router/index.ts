import type { RouteRecordRaw, Router, RouterScrollBehavior } from 'vue-router';
import { sendPageView } from '@/utils/analytics';
import { findReference, referenceContentForLocale } from '@/data/references';

declare module 'vue-router' {
    interface RouteMeta {
        title?: string
        description?: string
    }
}

// Define routes with proper typing
export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
            title: 'PrivateAIM — Privacy-Preserving Analytics in Medicine',
            description: 'PrivateAIM develops FLAME, a federated learning and analysis platform for medical data. Patient data stays at each site and only aggregated results are returned.',
        },
    },
    {
        path: '/team',
        name: 'Team',
        component: () => import('@/views/Team.vue'),
        meta: {
            title: 'Our Team — PrivateAIM',
            description: 'Meet the researchers, developers, and privacy engineers behind PrivateAIM and the FLAME federated learning platform.',
        },
    },
    {
        path: '/news',
        name: 'News',
        component: () => import('@/views/News.vue'),
        meta: {
            title: 'News — PrivateAIM',
            description: 'Latest news, events, workshops, and project milestones from the PrivateAIM privacy-preserving analytics consortium.',
        },
    },
    {
        path: '/partners',
        name: 'Partners',
        component: () => import('@/views/Partners.vue'),
        meta: {
            title: 'Partners — PrivateAIM',
            description: 'University hospitals and research institutions collaborating on privacy-preserving federated learning for medical data analysis in Germany.',
        },
    },
    {
        path: '/publications',
        name: 'Publications',
        component: () => import('@/views/Publications.vue'),
        meta: {
            title: 'Publications — PrivateAIM',
            description: 'Peer-reviewed publications on federated learning, differential privacy, secure computation, and privacy-preserving medical data analysis from the PrivateAIM consortium.',
        },
    },
    {
        path: '/imprint',
        name: 'Imprint',
        component: () => import('@/views/Imprint.vue'),
        meta: {
            title: 'Imprint — PrivateAIM',
            description: 'Legal information and imprint for the PrivateAIM website.',
        },
    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: () => import('@/views/Privacy.vue'),
        meta: {
            title: 'Privacy Policy — PrivateAIM',
            description: 'Privacy policy for the PrivateAIM website.',
        },
    },
    {
        path: '/references/:slug',
        name: 'ReferenceProject',
        component: () => import('@/views/ReferenceProject.vue'),
        props: true,
        meta: {
            title: 'References — PrivateAIM',
            description: 'Predecessor projects of PrivateAIM and FLAME, their publications, talks, and code.',
        },
    },
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

export function installRouterHooks(router: Router) {
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

        const content = referenceContentForLocale(project, 'en');
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

        // Send GA4 page view for SPA navigation
        sendPageView(to.path, document.title);
    });
}
