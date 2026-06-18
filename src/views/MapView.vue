<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

import { useRouteStore } from '@/app/stores/route.store'
import MapFilterBar from '@/components/map/MapFilterBar.vue'
import MapLegend from '@/components/map/MapLegend.vue'
import MapLoading from '@/components/map/MapLoading.vue'
import MapPointDesktopPanel from '@/components/map/MapPointDesktopPanel.vue'
import MapPointSheet from '@/components/map/MapPointSheet.vue'
import MapStatusBanner from '@/components/map/MapStatusBanner.vue'
import RouteMap from '@/components/map/RouteMap.vue'
import type { RoutePoint } from '@/types/point.types'

const routeStore = useRouteStore()

const selectedPoint = ref<RoutePoint | null>(null)
const isMapLoading = ref(true)
const routeMap = ref<InstanceType<typeof RouteMap> | null>(null)

let intervalId: number | null = null

function selectPoint(point: RoutePoint) {
  selectedPoint.value = point
}

function closePoint() {
  selectedPoint.value = null
}

function recenterMap() {
  selectedPoint.value = null
  routeMap.value?.fitToAllPoints()
}

async function forceRefresh() {
  await routeStore.refreshIfNeeded()
}

onMounted(() => {
  intervalId = window.setInterval(() => {
    void routeStore.refreshIfNeeded()
  }, 60000)
})

onUnmounted(() => {
  if (intervalId) {
    window.clearInterval(intervalId)
  }
})
</script>

<template>
  <section class="map-view">
    <RouteMap
      ref="routeMap"
      @select-point="selectPoint"
      @loading-change="isMapLoading = $event"
    />

    <MapLoading v-if="isMapLoading || routeStore.isLoading" />

    <div class="map-view__top">
      <MapStatusBanner />
      <MapFilterBar />
    </div>

    <MapPointDesktopPanel :point="selectedPoint" @close="closePoint" />

    <div class="map-view__controls">
      <button type="button" class="map-control-button" aria-label="Recentrar mapa" @click="recenterMap">
        <span class="material-symbols-outlined">center_focus_strong</span>
      </button>

      <button type="button" class="map-control-button" aria-label="Actualizar datos" @click="forceRefresh">
        <span class="material-symbols-outlined" :class="{ 'map-control-button__spin': routeStore.isRefreshing }">
          refresh
        </span>
      </button>

      <RouterLink class="map-control-button map-control-button--link" to="/puntos" aria-label="Ver lista">
        <span class="material-symbols-outlined">format_list_bulleted</span>
      </RouterLink>
    </div>

    <div class="map-view__counter">
      <span class="material-symbols-outlined">explore</span>

      <div>
        <strong>{{ routeStore.filteredPoints.length }}</strong>
        <small>puntos visibles</small>
      </div>
    </div>

    <MapLegend />

    <MapPointSheet :point="selectedPoint" @close="closePoint" />
  </section>
</template>
