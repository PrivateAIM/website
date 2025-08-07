import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Define routes with proper typing
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/BlogList.vue')
  },
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: () => import('@/views/BlogPost.vue'),
    props: true // Allow passing route params as props
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('@/views/Team.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/News.vue')
  },
  {
    path: '/partners',
    name: 'Partners',
    component: () => import('@/views/Partners.vue')
  },
  {
    path: '/publications',
    name: 'Publications',
    component: () => import('@/views/Publications.vue')
  },
  {
    path: '/imprint',
    name: 'Imprint',
    component: () => import('@/views/Imprint.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/Privacy.vue')
  },
  {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
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

export default router
