<script setup lang="ts">
import { computed } from 'vue'

import PointStatusBadge from '@/components/points/PointStatusBadge.vue'
import type { RoutePoint } from '@/types/point.types'

const props = defineProps<{
  currentPoint: RoutePoint
  points: RoutePoint[]
}>()

function getDistanceMeters(pointA: RoutePoint, pointB: RoutePoint) {
  const earthRadius = 6371000
  const latA = (pointA.lat * Math.PI) / 180
  const latB = (pointB.lat * Math.PI) / 180
  const deltaLat = ((pointB.lat - pointA.lat) * Math.PI) / 180
  const deltaLng = ((pointB.lng - pointA.lng) * Math.PI) / 180

  const value =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(latA) * Math.cos(latB) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2)

  const curve = 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value))

  return Math.round(earthRadius * curve)
}

function formatDistance(meters: number) {
  if (meters < 1000) return `${meters} m`
  return `${(meters / 1000).toFixed(1)} km`
}

const nearbyPoints = computed(() => {
  return props.points
    .filter((point) => point.id !== props.currentPoint.id)
    .map((point) => ({
      point,
      distance: getDistanceMeters(props.currentPoint, point),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5)
})
</script>

<template>
  <section v-if="nearbyPoints.length" class="nearby-points">
    <div class="point-detail__section-heading">
      <span class="material-symbols-outlined">near_me</span>
      <h2>Puntos cercanos</h2>
    </div>

    <div class="nearby-points__list">
      <RouterLink
        v-for="item in nearbyPoints"
        :key="item.point.id"
        class="nearby-points__item"
        :to="`/puntos/${item.point.slug}`"
      >
        <img :src="item.point.main_image" :alt="item.point.name" loading="lazy" />

        <div class="nearby-points__content">
          <div>
            <p>{{ item.point.category_label }}</p>
            <h3>{{ item.point.name }}</h3>
          </div>

          <div class="nearby-points__meta">
            <PointStatusBadge :status="item.point.status" :label="item.point.status_label" />
            <small>{{ formatDistance(item.distance) }}</small>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
