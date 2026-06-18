<script setup lang="ts">
import { computed } from 'vue'

import { useRouteStore } from '@/app/stores/route.store'

const routeStore = useRouteStore()

const stories = computed(() => {
  return routeStore.gallery.slice(0, 8).map((item) => {
    const point = routeStore.findPointBySlug(item.point_slug)

    return {
      id: item.id,
      image: item.image_url,
      label: point?.name ?? 'Ruta',
      to: point ? `/puntos/${point.slug}` : '/galeria',
    }
  })
})
</script>

<template>
  <section class="gallery-stories" aria-label="Historias de la comunidad">
    <RouterLink
      v-for="story in stories"
      :key="story.id"
      class="gallery-stories__item"
      :to="story.to"
    >
      <span class="gallery-stories__ring">
        <img :src="story.image" :alt="story.label" loading="lazy" />
      </span>

      <small>{{ story.label }}</small>
    </RouterLink>
  </section>
</template>
