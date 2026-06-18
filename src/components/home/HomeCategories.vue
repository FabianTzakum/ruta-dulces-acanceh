<script setup lang="ts">
import { computed } from 'vue'
import { useRouteStore } from '@/app/stores/route.store'

const routeStore = useRouteStore()

const categories = computed(() => [
  {
    label: 'Negocios',
    icon: 'storefront',
    count: routeStore.points.filter((point) => point.category === 'business').length,
    to: '/puntos',
    className: 'home-categories__card--business',
  },
  {
    label: 'Casas',
    icon: 'cottage',
    count: routeStore.points.filter((point) => point.category === 'house').length,
    to: '/puntos',
    className: 'home-categories__card--house',
  },
  {
    label: 'Instituciones',
    icon: 'account_balance',
    count: routeStore.points.filter((point) => point.category === 'institution').length,
    to: '/puntos',
    className: 'home-categories__card--institution',
  },
  {
    label: 'Eventos',
    icon: 'festival',
    count: routeStore.points.filter((point) => point.category === 'event').length + routeStore.activeEvents.length,
    to: '/mapa',
    className: 'home-categories__card--event',
  },
])
</script>

<template>
  <section class="home-categories">
    <div class="home-section-heading">
      <p>Tipos de puntos</p>
      <h2>Todo el pueblo en una ruta</h2>
    </div>

    <div class="home-categories__grid">
      <RouterLink
        v-for="category in categories"
        :key="category.label"
        class="home-categories__card"
        :class="category.className"
        :to="category.to"
      >
        <span class="material-symbols-outlined">{{ category.icon }}</span>

        <div>
          <strong>{{ category.count }}</strong>
          <small>{{ category.label }}</small>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
