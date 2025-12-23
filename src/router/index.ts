import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('@/pages/ResultPage.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/pages/AuthPage.vue'),
    meta: { layout: 'auth' },
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
