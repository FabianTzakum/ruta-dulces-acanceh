import { createRouter, createWebHistory } from 'vue-router'

import MapExperienceView from '@/views/MapExperienceView.vue'

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
  routes: [
    {
      path: '/',
      name: 'map-home',
      component: MapExperienceView,
      meta: {
        fullscreen: true,
      },
    },
    {
      path: '/mapa',
      name: 'map',
      component: MapExperienceView,
      meta: {
        fullscreen: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})
