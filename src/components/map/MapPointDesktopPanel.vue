<script setup lang="ts">
import { computed } from 'vue'

import { useRouteStore } from '@/app/stores/route.store'
import PointCategoryIcon from '@/components/points/PointCategoryIcon.vue'
import PointStatusBadge from '@/components/points/PointStatusBadge.vue'
import type { RoutePoint } from '@/types/point.types'

const props = defineProps<{
  point: RoutePoint | null
}>()

const emit = defineEmits<{
  close: []
}>()

const routeStore = useRouteStore()

const activeEvent = computed(() => {
  if (!props.point) return null

  return routeStore.findActiveEventByPointSlug(props.point.slug)
})

const updatedAt = computed(() => {
  if (!props.point) return ''

  return new Date(props.point.updated_at).toLocaleString('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
})

const candyMeter = computed(() => {
  if (!props.point) return 0

  const values: Record<string, number> = {
    with_candies: 86,
    few_candies: 38,
    no_candies: 0,
  }

  return values[props.point.status] ?? 0
})

const candyText = computed(() => {
  if (!props.point) return ''

  const values: Record<string, string> = {
    with_candies: 'Buen nivel de dulces',
    few_candies: 'Quedan pocos dulces',
    no_candies: 'Sin dulces por ahora',
  }

  return values[props.point.status] ?? 'Estado de dulces'
})
</script>

<template>
  <Transition name="desktop-panel">
    <aside v-if="point" class="map-desktop-panel">
      <div class="map-desktop-panel__media">
        <img :src="point.main_image" :alt="point.name" loading="lazy" />

        <div class="map-desktop-panel__shade"></div>

        <button class="map-desktop-panel__close" type="button" aria-label="Cerrar panel" @click="emit('close')">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>

        <div class="map-desktop-panel__status">
          <PointStatusBadge :status="point.status" :label="point.status_label" />

          <span v-if="activeEvent" class="map-desktop-panel__event">
            <span class="material-symbols-outlined">festival</span>
            Evento
          </span>
        </div>
      </div>

      <div class="map-desktop-panel__body">
        <div class="map-desktop-panel__heading">
          <p>
            <PointCategoryIcon :category="point.category" />
            <span>{{ point.category_label }}</span>
          </p>

          <h2>{{ point.name }}</h2>

          <small>
            <span class="material-symbols-outlined">location_on</span>
            {{ point.address }}
          </small>
        </div>

        <div class="map-desktop-panel__metrics">
          <article>
            <span>Tipo</span>
            <strong>{{ point.category_label }}</strong>
          </article>

          <article>
            <span>Estado</span>
            <strong>{{ point.status_label }}</strong>
          </article>
        </div>

        <section class="map-desktop-panel__meter">
          <div class="map-desktop-panel__meter-head">
            <h3>Nivel de dulces</h3>
            <span>{{ candyMeter }}%</span>
          </div>

          <div class="map-desktop-panel__meter-track">
            <div :style="{ width: `${candyMeter}%` }"></div>
          </div>

          <p>{{ candyText }}</p>
        </section>

        <section v-if="activeEvent" class="map-desktop-panel__active-event">
          <span class="material-symbols-outlined">festival</span>

          <div>
            <strong>{{ activeEvent.title }}</strong>
            <p>{{ activeEvent.description }}</p>
          </div>
        </section>

        <section class="map-desktop-panel__description">
          <h3>Información</h3>
          <p>{{ point.short_description }}</p>
        </section>

        <div class="map-desktop-panel__updated">
          <span class="material-symbols-outlined">schedule</span>
          Actualizado {{ updatedAt }}
        </div>

        <div class="map-desktop-panel__actions">
          <a :href="point.google_maps_url" target="_blank" rel="noreferrer">
            <span class="material-symbols-outlined">near_me</span>
            Ir en Google Maps
          </a>

          <RouterLink :to="`/puntos/${point.slug}`">
            Ver detalle
          </RouterLink>
        </div>
      </div>
    </aside>
  </Transition>
</template>
