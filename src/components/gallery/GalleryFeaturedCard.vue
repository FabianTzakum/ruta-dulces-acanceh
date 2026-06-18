<script setup lang="ts">
import { computed } from 'vue'

import { useRouteStore } from '@/app/stores/route.store'

const routeStore = useRouteStore()

const featured = computed(() => routeStore.gallery[0] ?? null)

const point = computed(() => {
  if (!featured.value) return null
  return routeStore.findPointBySlug(featured.value.point_slug)
})
</script>

<template>
  <section v-if="featured" class="gallery-featured">
    <img :src="featured.image_url" :alt="featured.caption" loading="lazy" />

    <div class="gallery-featured__shade"></div>

    <div class="gallery-featured__content">
      <span class="gallery-featured__pill">
        <span class="material-symbols-outlined">auto_awesome</span>
        Destacado
      </span>

      <h2>{{ point ? point.name : 'Ruta de los Dulces' }}</h2>

      <p>{{ featured.caption }}</p>

      <RouterLink :to="point ? `/puntos/${point.slug}` : '/galeria'">
        Ver punto
      </RouterLink>
    </div>
  </section>
</template>
