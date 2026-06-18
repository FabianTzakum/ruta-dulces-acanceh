<script setup lang="ts">
import { computed } from 'vue'
import { useRouteStore } from '@/app/stores/route.store'

const routeStore = useRouteStore()

const items = computed(() => [
  {
    label: 'Con dulces',
    value: routeStore.stats.withCandies,
    icon: 'bakery_dining',
    className: 'home-live__item--with',
  },
  {
    label: 'Pocos dulces',
    value: routeStore.stats.fewCandies,
    icon: 'warning',
    className: 'home-live__item--few',
  },
  {
    label: 'Sin dulces',
    value: routeStore.stats.noCandies,
    icon: 'block',
    className: 'home-live__item--none',
  },
])
</script>

<template>
  <section class="home-live">
    <div class="home-live__header">
      <div>
        <p>Disponibilidad</p>
        <h2>Estado de la ruta</h2>
      </div>

      <button type="button" @click="routeStore.refreshIfNeeded">
        <span class="material-symbols-outlined" :class="{ 'home-live__spin': routeStore.isRefreshing }">
          refresh
        </span>
      </button>
    </div>

    <div class="home-live__grid home-live__grid--three">
      <article
        v-for="item in items"
        :key="item.label"
        class="home-live__item"
        :class="item.className"
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        <strong>{{ item.value }}</strong>
        <small>{{ item.label }}</small>
      </article>
    </div>
  </section>
</template>
