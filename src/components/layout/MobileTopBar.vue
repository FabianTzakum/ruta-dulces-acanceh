<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useRouteStore } from '@/app/stores/route.store'

const route = useRoute()
const routeStore = useRouteStore()

const pageTitle = computed(() => {
  if (route.name === 'home') return 'Dulces Acanceh'
  if (route.name === 'map') return 'Mapa nocturno'
  if (route.name === 'points') return 'Puntos'
  if (route.name === 'gallery') return 'Galería'
  if (route.name === 'guide') return 'Guía'
  if (route.name === 'point-detail') return 'Detalle'
  return 'Ruta de los Dulces'
})
</script>

<template>
  <header class="mobile-topbar">
    <RouterLink class="mobile-topbar__brand" to="/inicio" aria-label="Ir al inicio">
      <span class="mobile-topbar__mark">
        <span class="material-symbols-outlined">fort</span>
      </span>

      <span>
        <strong>{{ pageTitle }}</strong>
        <small>{{ routeStore.stats.total }} puntos en Acanceh</small>
      </span>
    </RouterLink>

    <div class="mobile-topbar__actions">
      <RouterLink class="mobile-topbar__icon" to="/guia" aria-label="Abrir guía">
        <span class="material-symbols-outlined">shield_person</span>
      </RouterLink>

      <button class="mobile-topbar__icon" type="button" aria-label="Notificaciones">
        <span class="material-symbols-outlined">notifications</span>
      </button>
    </div>
  </header>
</template>
