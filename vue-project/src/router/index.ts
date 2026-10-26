import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import catalogRoutes from './routes/catalog'
import cartRoutes from './routes/cart'
import checkoutRoutes from './routes/checkout'

/** Все маршруты приложения, собранные из отдельных модулей. */
const routes: RouteRecordRaw[] = [...catalogRoutes, ...cartRoutes, ...checkoutRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router