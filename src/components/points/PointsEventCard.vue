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
  <section class="points-event-card">
    <img
      src="https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?auto=format&fit=crop&w=1200&q=70"
      alt="Evento especial de la ruta"
      loading="lazy"
    />

    <div class="points-event-card__shade"></div>

    <div class="points-event-card__content">
      <span>Evento especial</span>

      <h2>{{ event ? event.title : 'Actividad comunitaria' }}</h2>

      <p>
        {{
          event
            ? event.description
            : 'Consulta las actividades especiales disponibles durante la Ruta de los Dulces.'
        }}
      </p>

      <RouterLink :to="eventPoint ? `/puntos/${eventPoint.slug}` : '/mapa'">
        Ver más
      </RouterLink>
    </div>
  </section>
</template>
