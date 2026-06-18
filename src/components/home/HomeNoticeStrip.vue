<script setup lang="ts">
import { computed } from 'vue'
import { useRouteStore } from '@/app/stores/route.store'

const routeStore = useRouteStore()

const updatedAt = computed(() => {
  if (!routeStore.manifest) return 'Cargando información...'

  return new Date(routeStore.manifest.updated_at).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  })
})
</script>

<template>
  <section class="home-notice">
    <span class="home-notice__icon">🎃</span>

    <div class="home-notice__text">
      <strong>Ruta en actualización</strong>
      <span>Último corte {{ updatedAt }} · revisa disponibilidad antes de visitar cada punto.</span>
    </div>

    <RouterLink class="home-notice__action" to="/mapa">
      Mapa
    </RouterLink>
  </section>
</template>
