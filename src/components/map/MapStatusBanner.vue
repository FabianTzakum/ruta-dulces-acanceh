<script setup lang="ts">
import { computed } from 'vue'
import { useRouteStore } from '@/app/stores/route.store'

const routeStore = useRouteStore()

const event = computed(() => routeStore.activeEvents[0] ?? null)

const updatedAt = computed(() => {
  if (!routeStore.manifest) return 'Actualizando...'

  return new Date(routeStore.manifest.updated_at).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  })
})
</script>

<template>
  <Transition name="banner-drop">
    <div class="map-status-banner">
      <span class="map-status-banner__icon">
        {{ event ? '👻' : '🎃' }}
      </span>

      <div class="map-status-banner__text">
        <strong>{{ event ? event.title : 'Ruta de los Dulces activa' }}</strong>
        <span>
          {{
            event
              ? event.description
              : `Última actualización ${updatedAt}. Consulta disponibilidad antes de ir.`
          }}
        </span>
      </div>

      <small class="map-status-banner__live">
        {{ routeStore.stats.active }}
      </small>
    </div>
  </Transition>
</template>
