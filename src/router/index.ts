import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/main-search-menu',
    name: 'main-search-menu',
    component: () => import('@/pages/MainSearchMenuPage.vue'),
  },
  {
    path: '/search-detail',
    name: 'search-detail',
    component: () => import('@/pages/SearchDetailPage.vue'),
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
  {
    path: '/result-1',
    name: 'ResultPage1',
    component: () => import('@/pages/ResultPage1.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
