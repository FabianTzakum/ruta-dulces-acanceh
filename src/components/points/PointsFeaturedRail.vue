<script setup lang="ts">
import { computed } from 'vue'

import { useRouteStore } from '@/app/stores/route.store'
import PointStatusBadge from '@/components/points/PointStatusBadge.vue'

const routeStore = useRouteStore()

const featuredPoints = computed(() => {
  return [...routeStore.publicPoints]
    .filter((point) => point.status === 'with_candies')
    .slice(0, 10)
})
</script>

<template>
  <section v-if="featuredPoints.length" class="points-featured">
    <div class="points-section-heading">
      <p>Recomendados ahora</p>
      <h2>Puntos para visitar</h2>
    </div>

    <div class="points-featured__rail">
      <RouterLink
        v-for="point in featuredPoints"
        :key="point.id"
        class="points-featured__card"
        :to="`/puntos/${point.slug}`"
      >
        <img :src="point.main_image" :alt="point.name" loading="lazy" />

        <div class="points-featured__shade"></div>

        <div class="points-featured__content">
          <PointStatusBadge :status="point.status" :label="point.status_label" />

          <h3>{{ point.name }}</h3>

          <span>{{ point.category_label }}</span>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
