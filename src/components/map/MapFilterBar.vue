<script setup lang="ts">
import { computed } from 'vue'
import { useRouteStore } from '@/app/stores/route.store'

const routeStore = useRouteStore()

const filters = computed(() => [
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
  <div class="map-filter-bar">
    <button
      v-for="filter in filters"
      :key="filter.value"
      class="map-filter-bar__chip"
      :class="{ 'map-filter-bar__chip--active': routeStore.selectedCategory === filter.value }"
      type="button"
      @click="routeStore.setCategory(filter.value)"
    >
      <span class="material-symbols-outlined">{{ filter.icon }}</span>

      <span class="map-filter-bar__label">
        <small>{{ filter.label }}</small>
        <b>{{ filter.count }}</b>
      </span>
    </button>
  </div>
</template>
