<script setup lang="ts">
import { computed } from 'vue'

import { useRouteStore } from '@/app/stores/route.store'

const routeStore = useRouteStore()

const event = computed(() => routeStore.activeEvents[0] ?? null)

const eventPoint = computed(() => {
  if (!event.value) return null
  return routeStore.findPointBySlug(event.value.point_slug)
})
</script>

<template>
  <section class="home-event">
    <div class="home-event__orb"></div>

    <div class="home-event__header">
      <span class="material-symbols-outlined">celebration</span>
      <div>
        <p>Actividad especial</p>
        <h2>{{ event ? event.title : 'Eventos de la ruta' }}</h2>
      </div>
    </div>

    <p class="home-event__text">
      {{
        event
          ? event.description
          : 'Durante la ruta podrán aparecer actividades especiales, zonas destacadas y avisos comunitarios.'
      }}
    </p>

    <div class="home-event__footer">
      <span>
        <span class="material-symbols-outlined">location_on</span>
        {{ eventPoint ? eventPoint.name : 'Acanceh, Yucatán' }}
      </span>

      <RouterLink :to="eventPoint ? `/puntos/${eventPoint.slug}` : '/mapa'">
        Ver más
      </RouterLink>
    </div>
  </section>
</template>
