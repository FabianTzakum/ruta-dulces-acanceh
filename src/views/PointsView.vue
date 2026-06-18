<script setup lang="ts">
import { computed } from 'vue'

import { useRouteStore } from '@/app/stores/route.store'
import PointCard from '@/components/points/PointCard.vue'
import PointsCategoryTabs from '@/components/points/PointsCategoryTabs.vue'
import PointsDesktopCard from '@/components/points/PointsDesktopCard.vue'
import PointsEmptyState from '@/components/points/PointsEmptyState.vue'
import PointsEventCard from '@/components/points/PointsEventCard.vue'
import PointsFeaturedRail from '@/components/points/PointsFeaturedRail.vue'
import PointsHero from '@/components/points/PointsHero.vue'
import PointsRouteSummary from '@/components/points/PointsRouteSummary.vue'
import PointsStatusTabs from '@/components/points/PointsStatusTabs.vue'

const routeStore = useRouteStore()

const desktopStats = computed(() => [
  {
    label: 'Total',
    value: routeStore.stats.total,
    icon: 'location_on',
  },
  {
    label: 'Con dulces',
    value: routeStore.stats.withCandies,
    icon: 'bakery_dining',
  },
  {
    label: 'Pocos dulces',
    value: routeStore.stats.fewCandies,
    icon: 'warning',
  },
  {
    label: 'Sin dulces',
    value: routeStore.stats.noCandies,
    icon: 'block',
  },
])

const featuredDesktopPoint = computed(() => routeStore.filteredPoints[0] ?? null)
const secondaryDesktopPoints = computed(() => routeStore.filteredPoints.slice(1))

function clearFilters() {
  routeStore.clearFilters()
}
</script>

<template>
  <section class="points-view points-view--premium">
    <div class="points-mobile-layer">
      <PointsHero />

      <div class="points-view__search points-view__search--floating">
        <span class="material-symbols-outlined">search</span>

        <input
          :value="routeStore.searchTerm"
          type="search"
          placeholder="Buscar negocio, casa o institución..."
          @input="routeStore.setSearchTerm(($event.target as HTMLInputElement).value)"
        />

        <button
          v-if="routeStore.searchTerm"
          type="button"
          aria-label="Limpiar búsqueda"
          @click="routeStore.setSearchTerm('')"
        >
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <PointsCategoryTabs />

      <PointsStatusTabs />

      <PointsEventCard />

      <PointsRouteSummary />

      <PointsFeaturedRail />

      <section class="points-list-section">
        <div class="points-list-section__header">
          <div>
            <p>Resultados</p>
            <h2>{{ routeStore.filteredPoints.length }} puntos encontrados</h2>
          </div>

          <RouterLink to="/mapa">
            <span class="material-symbols-outlined">map</span>
            Mapa
          </RouterLink>
        </div>

        <div v-if="routeStore.filteredPoints.length" class="points-view__list">
          <PointCard v-for="point in routeStore.filteredPoints" :key="point.id" :point="point" />
        </div>

        <PointsEmptyState v-else @clear="clearFilters" />
      </section>

      <RouterLink class="points-floating-map" to="/mapa">
        <span class="material-symbols-outlined">travel_explore</span>
        Abrir mapa
      </RouterLink>
    </div>

    <div class="points-desktop-layer">
      <header class="points-desktop-hero">
        <div class="points-desktop-hero__content">
          <span class="points-desktop-kicker">Explora la ruta</span>

          <h1>
            Puntos de
            <strong>dulces</strong>
          </h1>

          <p>
            Encuentra negocios, casas e instituciones participantes. Consulta disponibilidad,
            ubicación y recomendaciones antes de iniciar tu recorrido.
          </p>
        </div>

        <aside class="points-desktop-hero__panel">
          <div class="points-desktop-hero__panel-icon">
            <span class="material-symbols-outlined">route</span>
          </div>

          <div>
            <strong>{{ routeStore.filteredPoints.length }}</strong>
            <small>puntos visibles según tus filtros</small>
          </div>

          <RouterLink to="/mapa">
            Abrir mapa
            <span class="material-symbols-outlined">arrow_forward</span>
          </RouterLink>
        </aside>
      </header>

      <section class="points-desktop-stats">
        <article v-for="stat in desktopStats" :key="stat.label">
          <span class="material-symbols-outlined">{{ stat.icon }}</span>

          <div>
            <strong>{{ stat.value }}</strong>
            <small>{{ stat.label }}</small>
          </div>
        </article>
      </section>

      <section class="points-desktop-toolbar">
        <div class="points-desktop-search">
          <span class="material-symbols-outlined">search</span>

          <input
            :value="routeStore.searchTerm"
            type="search"
            placeholder="Buscar punto, calle, negocio o institución..."
            @input="routeStore.setSearchTerm(($event.target as HTMLInputElement).value)"
          />

          <button
            v-if="routeStore.searchTerm"
            type="button"
            aria-label="Limpiar búsqueda"
            @click="routeStore.setSearchTerm('')"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div class="points-desktop-filter-group">
          <button
            type="button"
            :class="{ 'points-desktop-filter--active': routeStore.selectedCategory === 'all' }"
            @click="routeStore.setCategory('all')"
          >
            Todos
          </button>

          <button
            type="button"
            :class="{ 'points-desktop-filter--active': routeStore.selectedCategory === 'business' }"
            @click="routeStore.setCategory('business')"
          >
            Negocios
          </button>

          <button
            type="button"
            :class="{ 'points-desktop-filter--active': routeStore.selectedCategory === 'house' }"
            @click="routeStore.setCategory('house')"
          >
            Casas
          </button>

          <button
            type="button"
            :class="{ 'points-desktop-filter--active': routeStore.selectedCategory === 'institution' }"
            @click="routeStore.setCategory('institution')"
          >
            Instituciones
          </button>
        </div>

        <div class="points-desktop-filter-group points-desktop-filter-group--states">
          <button
            type="button"
            :class="{ 'points-desktop-filter--active': routeStore.selectedStatus === 'all' }"
            @click="routeStore.setStatus('all')"
          >
            Todos
          </button>

          <button
            type="button"
            :class="{ 'points-desktop-filter--active': routeStore.selectedStatus === 'with_candies' }"
            @click="routeStore.setStatus('with_candies')"
          >
            Con dulces
          </button>

          <button
            type="button"
            :class="{ 'points-desktop-filter--active': routeStore.selectedStatus === 'few_candies' }"
            @click="routeStore.setStatus('few_candies')"
          >
            Pocos dulces
          </button>

          <button
            type="button"
            :class="{ 'points-desktop-filter--active': routeStore.selectedStatus === 'no_candies' }"
            @click="routeStore.setStatus('no_candies')"
          >
            Sin dulces
          </button>
        </div>
      </section>

      <section class="points-desktop-results">
        <div class="points-desktop-results__head">
          <div>
            <span class="points-desktop-kicker">Resultados</span>
            <h2>{{ routeStore.filteredPoints.length }} puntos encontrados</h2>
          </div>

          <button type="button" @click="clearFilters">
            Limpiar filtros
          </button>
        </div>

        <div v-if="routeStore.filteredPoints.length" class="points-desktop-grid">
          <PointsDesktopCard
            v-if="featuredDesktopPoint"
            :point="featuredDesktopPoint"
            featured
          />

          <PointsDesktopCard
            v-for="point in secondaryDesktopPoints"
            :key="point.id"
            :point="point"
          />
        </div>

        <PointsEmptyState v-else @clear="clearFilters" />
      </section>
    </div>
  </section>
</template>
