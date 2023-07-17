import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/login/login.vue'
import Zort from '../views/zort/index_zort.vue'
import ZortStock from '../views/zort/stock.vue'
import ZortOrderInv from '../views/zort/orderInv.vue'
import pdf2vue from '../views/print/recipt.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
     {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/zort',
      name: 'zort',
      component: Zort
    },
    {
      path: '/stock',
      name: 'stock',
      component: ZortStock
    },
    {
      path: '/orderinv',
      name: 'orderinv',
      component: ZortOrderInv
    },
    {
      path: '/pdf',
      name: 'pdf2vue',
      component: pdf2vue
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
  ]
})

export default router
