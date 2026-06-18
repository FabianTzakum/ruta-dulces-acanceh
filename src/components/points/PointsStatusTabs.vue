<script setup lang="ts">
import { computed } from 'vue'
import { useRouteStore } from '@/app/stores/route.store'

const routeStore = useRouteStore()

const statuses = computed(() => [
  {
    label: 'Todos',
    value: 'all',
    count: routeStore.stats.total,
  },
  {
    label: 'Con dulces',
    value: 'with_candies',
    count: routeStore.stats.withCandies,
  },
  {
    label: 'Pocos dulces',
    value: 'few_candies',
    count: routeStore.stats.fewCandies,
  },
  {
    label: 'Sin dulces',
    value: 'no_candies',
    count: routeStore.stats.noCandies,
  },
] as const)
</script>

<template>
  <section class="points-status-tabs" aria-label="Filtrar por estado">
    <button
      v-for="status in statuses"
      :key="status.value"
      class="points-status-tabs__item"
      :class="{ 'points-status-tabs__item--active': routeStore.selectedStatus === status.value }"
      type="button"
      @click="routeStore.setStatus(status.value)"
    >
      <span>{{ status.label }}</span>
      <small>{{ status.count }}</small>
    </button>
  </section>
</template>
