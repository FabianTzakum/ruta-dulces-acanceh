<script setup lang="ts">
import { computed } from 'vue'
import { useRouteStore } from '@/app/stores/route.store'

const routeStore = useRouteStore()

const categories = computed(() => [
  {
    label: 'Todos',
    value: 'all',
    icon: 'travel_explore',
    count: routeStore.stats.total,
  },
  {
    label: 'Negocios',
    value: 'business',
    icon: 'storefront',
    count: routeStore.publicPoints.filter((point) => point.category === 'business').length,
  },
  {
    label: 'Casas',
    value: 'house',
    icon: 'cottage',
    count: routeStore.publicPoints.filter((point) => point.category === 'house').length,
  },
  {
    label: 'Instituciones',
    value: 'institution',
    icon: 'account_balance',
    count: routeStore.publicPoints.filter((point) => point.category === 'institution').length,
  },
] as const)
</script>

<template>
  <section class="points-tabs" aria-label="Filtrar por categoría">
    <button
      v-for="category in categories"
      :key="category.value"
      class="points-tabs__item"
      :class="{ 'points-tabs__item--active': routeStore.selectedCategory === category.value }"
      type="button"
      @click="routeStore.setCategory(category.value)"
    >
      <span class="material-symbols-outlined">{{ category.icon }}</span>

      <span>
        <strong>{{ category.label }}</strong>
        <small>{{ category.count }} puntos</small>
      </span>
    </button>
  </section>
</template>
