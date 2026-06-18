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

  return new Date(props.point.updated_at).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  })
})
</script>

<template>
  <Transition name="sheet-slide">
    <aside v-if="point" class="map-sheet">
      <button class="map-sheet__close" type="button" aria-label="Cerrar punto" @click="emit('close')">
        <span class="material-symbols-outlined">close</span>
      </button>

      <RouterLink class="map-sheet__image" :to="`/puntos/${point.slug}`">
        <img :src="point.main_image" :alt="point.name" loading="lazy" />

        <div class="map-sheet__image-shade"></div>

        <span class="map-sheet__floating-category">
          <PointCategoryIcon :category="point.category" />
          {{ point.category_label }}
        </span>

        <div class="map-sheet__badges">
          <PointStatusBadge :status="point.status" :label="point.status_label" />

          <span v-if="activeEvent" class="map-sheet__event">
            <span class="material-symbols-outlined">festival</span>
            Evento
          </span>
        </div>
      </RouterLink>

      <div class="map-sheet__body">
        <h2>{{ point.name }}</h2>

        <p class="map-sheet__description">
          {{ point.short_description }}
        </p>

        <div class="map-sheet__meta-list">
          <div>
            <span class="material-symbols-outlined">location_on</span>
            <small>{{ point.address }}</small>
          </div>

          <div>
            <span class="material-symbols-outlined">schedule</span>
            <small>Actualizado {{ updatedAt }}</small>
          </div>
        </div>

        <div class="map-sheet__actions">
          <a class="map-sheet__button" :href="point.google_maps_url" target="_blank" rel="noreferrer">
            Cómo llegar
          </a>

          <RouterLink class="map-sheet__button map-sheet__button--ghost" :to="`/puntos/${point.slug}`">
            Detalle
          </RouterLink>
        </div>
      </div>
    </aside>
  </Transition>
</template>
