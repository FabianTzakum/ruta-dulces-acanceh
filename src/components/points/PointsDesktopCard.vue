<script setup lang="ts">
import { computed } from 'vue'

import PointCategoryIcon from '@/components/points/PointCategoryIcon.vue'
import PointStatusBadge from '@/components/points/PointStatusBadge.vue'
import type { RoutePoint } from '@/types/point.types'

const props = defineProps<{
  point: RoutePoint
  featured?: boolean
}>()

const updatedAt = computed(() => {
  return new Date(props.point.updated_at).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  })
})

const candyLevel = computed(() => {
  const values: Record<string, number> = {
    with_candies: 86,
    few_candies: 38,
    no_candies: 0,
  }

  return values[props.point.status] ?? 0
})
</script>

<template>
  <RouterLink
    class="points-desktop-card"
    :class="{ 'points-desktop-card--featured': featured }"
    :to="`/puntos/${point.slug}`"
  >
    <div class="points-desktop-card__media">
      <img :src="point.main_image" :alt="point.name" loading="lazy" />

      <div class="points-desktop-card__shade"></div>

      <div class="points-desktop-card__badges">
        <PointStatusBadge :status="point.status" :label="point.status_label" />

        <span v-if="point.has_event" class="points-desktop-card__event">
          <span class="material-symbols-outlined">festival</span>
          Actividad
        </span>
      </div>
    </div>

    <div class="points-desktop-card__body">
      <div class="points-desktop-card__category">
        <PointCategoryIcon :category="point.category" />
        <span>{{ point.category_label }}</span>
      </div>

      <h3>{{ point.name }}</h3>

      <p>{{ point.short_description }}</p>

      <div class="points-desktop-card__meter">
        <div>
          <span>Nivel de dulces</span>
          <strong>{{ candyLevel }}%</strong>
        </div>

        <div class="points-desktop-card__track">
          <i :style="{ width: `${candyLevel}%` }"></i>
        </div>
      </div>

      <div class="points-desktop-card__footer">
        <small>
          <span class="material-symbols-outlined">schedule</span>
          {{ updatedAt }}
        </small>

        <small>
          <span class="material-symbols-outlined">arrow_forward</span>
          Ver detalle
        </small>
      </div>
    </div>
  </RouterLink>
</template>
