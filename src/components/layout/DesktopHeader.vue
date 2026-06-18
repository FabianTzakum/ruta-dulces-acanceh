<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useRouteStore } from '@/app/stores/route.store'

const route = useRoute()
const routeStore = useRouteStore()

const navItems = [
  {
    label: 'Inicio',
    to: '/inicio',
  },
  {
    label: 'Mapa',
    to: '/mapa',
  },
  {
    label: 'Puntos',
    to: '/puntos',
  },
  {
    label: 'Galería',
    to: '/galeria',
  },
  {
    label: 'Guía',
    to: '/guia',
  },
]

const activeEventsText = computed(() => {
  if (routeStore.stats.events <= 0) return 'Sin eventos activos'
  if (routeStore.stats.events === 1) return '1 evento activo'
  return `${routeStore.stats.events} eventos activos`
})

const isMap = computed(() => route.name === 'map')
</script>

<template>
  <header class="desktop-header" :class="{ 'desktop-header--map': isMap }">
    <div class="desktop-header__inner">
      <RouterLink class="desktop-header__brand" to="/inicio" aria-label="Ir al inicio">
        <span class="desktop-header__brand-mark">
          <span class="material-symbols-outlined">fort</span>
        </span>

        <span>
          <strong>Ruta de los Dulces</strong>
          <small>Acanceh, Yucatán</small>
        </span>
      </RouterLink>

      <nav class="desktop-header__nav" aria-label="Navegación principal">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          class="desktop-header__link"
          :to="item.to"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="desktop-header__side">
        <div class="desktop-header__status">
          <span></span>
          <small>{{ activeEventsText }}</small>
        </div>

        <RouterLink class="desktop-header__cta" to="/mapa">
          Abrir mapa
          <span class="material-symbols-outlined">arrow_forward</span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>
