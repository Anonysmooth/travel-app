/**
 * Configuration du routeur Vue.
 * Définit les routes de l'application.
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/confirm-email',
      name: 'confirm-email',
      component: () => import('../views/ConfirmEmailView.vue'),
    },
    // TODO US-002: Ajouter la route /login
  ],
})

export default router
