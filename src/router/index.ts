import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { sendPageView } from '@/utils/analytics'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
  }
}

// Define routes with proper typing
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'PrivateAIM — Privacy-Preserving Analytics in Medicine',
      description: 'PrivateAIM develops FLAME, a federated learning platform for secure, privacy-preserving medical data analysis across university hospitals within Germany\'s Medical Informatics Initiative.'
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/BlogList.vue'),
    meta: {
      title: 'Blog — PrivateAIM',
      description: 'Insights, tutorials, and developments in privacy-preserving medical analytics, federated learning, and secure computation from the PrivateAIM consortium.'
    }
  },
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: () => import('@/views/BlogPost.vue'),
    props: true,
    meta: {
      title: 'Blog — PrivateAIM',
      description: 'Read about privacy-preserving analytics and federated learning research from the PrivateAIM project.'
    }
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('@/views/Team.vue'),
    meta: {
      title: 'Our Team — PrivateAIM',
      description: 'Meet the researchers, developers, and privacy engineers behind PrivateAIM and the FLAME federated learning platform.'
    }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/News.vue'),
    meta: {
      title: 'News — PrivateAIM',
      description: 'Latest news, events, workshops, and project milestones from the PrivateAIM privacy-preserving analytics consortium.'
    }
  },
  {
    path: '/partners',
    name: 'Partners',
    component: () => import('@/views/Partners.vue'),
    meta: {
      title: 'Partners — PrivateAIM',
      description: 'University hospitals and research institutions collaborating on privacy-preserving federated learning for medical data analysis in Germany.'
    }
  },
  {
    path: '/publications',
    name: 'Publications',
    component: () => import('@/views/Publications.vue'),
    meta: {
      title: 'Publications — PrivateAIM',
      description: 'Peer-reviewed publications on federated learning, differential privacy, secure computation, and privacy-preserving medical data analysis from the PrivateAIM consortium.'
    }
  },
  {
    path: '/imprint',
    name: 'Imprint',
    component: () => import('@/views/Imprint.vue'),
    meta: {
      title: 'Imprint — PrivateAIM',
      description: 'Legal information and imprint for the PrivateAIM website.'
    }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/Privacy.vue'),
    meta: {
      title: 'Privacy Policy — PrivateAIM',
      description: 'Privacy policy for the PrivateAIM website.'
    }
  },
  {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      meta: {
        title: 'Page Not Found — PrivateAIM'
      }
  }
]

const router = createRouter({
  history: createWebHistory((import.meta as Record<string, any>).env.BASE_URL),
  routes,
  scrollBehavior() {
    // Always scroll to top when navigating to a new page
    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

// Update document title and meta description on each navigation
router.afterEach((to) => {
  const defaultTitle = 'PrivateAIM — Privacy-Preserving Analytics in Medicine'
  document.title = to.meta.title || defaultTitle

  const descriptionMeta = document.querySelector('meta[name="description"]')
  if (descriptionMeta && to.meta.description) {
    descriptionMeta.setAttribute('content', to.meta.description)
  }

  // Update Open Graph title and description
  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) {
    ogTitle.setAttribute('content', to.meta.title || defaultTitle)
  }
  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc && to.meta.description) {
    ogDesc.setAttribute('content', to.meta.description)
  }

  // Update canonical URL
  const canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) {
    canonical.setAttribute('href', `https://privateaim.de${to.path}`)
  }

  // Send GA4 page view for SPA navigation
  sendPageView(to.path, document.title)
})

export default router
