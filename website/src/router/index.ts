// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BlogList from '../views/BlogList.vue'
import Imprint from '../views/Imprint.vue'
import Privacy from '../views/Privacy.vue'
import Team from '../views/Team.vue'
import News from '../views/News.vue'
import Partners from '../views/Partners.vue'

// Define routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogList
  },
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: () => import('../views/BlogPost.vue')
  },
  {
    path: '/team',
    name: 'Team',
    component: Team
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/partners',
    name: 'Partners',
    component: Partners
  },
  {
    path: '/imprint',
    name: 'Imprint',
    component: Imprint
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Add scroll behavior configuration
  scrollBehavior() {
    // Always scroll to top when navigating to a new page
    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

export default router
