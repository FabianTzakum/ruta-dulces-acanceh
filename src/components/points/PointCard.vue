<script setup lang="ts">
import { computed } from 'vue'

import { useRouteStore } from '@/app/stores/route.store'
import PointCategoryIcon from '@/components/points/PointCategoryIcon.vue'
import PointStatusBadge from '@/components/points/PointStatusBadge.vue'
import type { RoutePoint } from '@/types/point.types'

const props = defineProps<{
  point: RoutePoint
}>()

const routeStore = useRouteStore()

const activeEvent = computed(() => routeStore.findActiveEventByPointSlug(props.point.slug))

const updatedAt = computed(() => {
  return new Date(props.point.updated_at).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  })
})
</script>

<template>
  <article class="point-card">
    <RouterLink class="point-card__image" :to="`/puntos/${point.slug}`">
      <img :src="point.main_image" :alt="point.name" loading="lazy" />

      <div class="point-card__shade"></div>

      <div class="point-card__badges">
        <PointStatusBadge :status="point.status" :label="point.status_label" />

        <span v-if="activeEvent" class="point-card__event">
          <span class="material-symbols-outlined">festival</span>
          Evento
        </span>
      </div>
    </RouterLink>

    <div class="point-card__body">
      <div class="point-card__category">
        <PointCategoryIcon :category="point.category" />
        <span>{{ point.category_label }}</span>
      </div>

      <RouterLink :to="`/puntos/${point.slug}`">
        <h3>{{ point.name }}</h3>
      </RouterLink>

      <p>{{ point.short_description }}</p>

      <div class="point-card__meta">
        <span>
          <span class="material-symbols-outlined">location_on</span>
          {{ point.address }}
        </span>

        <span>
          <span class="material-symbols-outlined">schedule</span>
          {{ updatedAt }}
        </span>
      </div>

      <div class="point-card__actions">
        <a :href="point.google_maps_url" target="_blank" rel="noreferrer">
          Cómo llegar
        </a>

        <RouterLink :to="`/puntos/${point.slug}`">
          Detalle
        </RouterLink>
      </div>
    </div>
  </article>
</template>
