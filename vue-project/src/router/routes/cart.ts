import type { RouteRecordRaw } from 'vue-router'

/** Маршруты корзины. */
const cartRoutes: RouteRecordRaw[] = [
  { path: '/cart', name: 'cart', component: () => import('../../views/CartPage.vue') },
]

export default cartRoutes