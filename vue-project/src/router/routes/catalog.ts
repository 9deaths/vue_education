import type { RouteRecordRaw } from 'vue-router'

/** Маршруты каталога. */
const catalogRoutes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('../../views/HomePage.vue') },
]

export default catalogRoutes