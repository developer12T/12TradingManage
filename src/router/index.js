import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores';
import zortRoutes from './zort.router'
import pocoRoutes from './poco.router'
import cnmRoutes from './cnmanage.router'

const routes = [
  { path: '/:id/login', name: 'Login', component: () => import('../authentication/login.vue'), props: true },
  { path: '/home', component: () => import('../views/home.vue') },
  { ...zortRoutes },
  { ...pocoRoutes },
  { ...cnmRoutes },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        authStore.logout();
        // next({ name: '/login' });
        window.location.href = "https://google.com/contact";
      },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// router.beforeEach(async (to) => {
//     const publicPages = ['/'];
//     const authRequired = !publicPages.includes(to.path);
//     const authStore = useAuthStore();

//     if (authRequired && !authStore.user) {
//         authStore.returnUrl = to.fullPath;
//         return '/';
//     }
// });

export default router;
