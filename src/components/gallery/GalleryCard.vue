<script setup lang="ts">
import { computed } from 'vue'

import { useRouteStore } from '@/app/stores/route.store'
import type { GalleryItem } from '@/types/gallery.types'

const props = defineProps<{
  item: GalleryItem
}>()

const routeStore = useRouteStore()

const point = computed(() => routeStore.findPointBySlug(props.item.point_slug))

const dateLabel = computed(() => {
  return new Date(props.item.created_at).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
  })
})
</script>

<template>
  <article class="gallery-card-premium">
    <RouterLink class="gallery-card-premium__image" :to="`/puntos/${item.point_slug}`">
      <img :src="item.image_url" :alt="item.caption" loading="lazy" />
    </RouterLink>

    <div class="gallery-card-premium__body">
      <div class="gallery-card-premium__meta">
        <RouterLink :to="`/puntos/${item.point_slug}`">
          <span class="material-symbols-outlined">location_on</span>
          {{ point?.name ?? 'Ruta de los Dulces' }}
        </RouterLink>

        <small>{{ dateLabel }}</small>
      </div>

      <p>{{ item.caption }}</p>

      <div class="gallery-card-premium__footer">
        <span>
          <span class="material-symbols-outlined">person</span>
          {{ item.author }}
        </span>

        <RouterLink :to="`/puntos/${item.point_slug}`">
          Ver punto
        </RouterLink>
      </div>
    </div>
  </article>
</template>
