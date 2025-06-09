import { createRouter, createWebHistory } from 'vue-router'

import cm from '../components/cm.vue'
import CoordPick from '../components/gis/CoordPick.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/coord',
      name: 'coord',
      component: CoordPick
    },
    {
      path: '/cm',
      name: 'cm',
      component: cm
    }
  ]
})

export default router
