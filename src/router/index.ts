import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import HomePage from '@/pages/HomePage.vue'
import ResultPage from '@/pages/ResultPage.vue'
import AuthPage from '@/pages/AuthPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'HomePage',
          component: HomePage,
        },
        {
          path: 'result',
          name: 'ResultPage',
          component: ResultPage,
        },
        {
          path: '/auth',
          name: 'auth',
          component: () => import('@/pages/AuthPage.vue'),
          meta: { layout: 'auth' },
        }
      ],
    },
  ],
})

export default router
