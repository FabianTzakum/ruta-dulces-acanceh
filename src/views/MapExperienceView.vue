<script setup lang="ts">
import { ref } from 'vue'
import { driver } from 'driver.js'

import { appConfig } from '@/config/app.config'
import { useRouteStore } from '@/app/stores/route.store'
import MapExperienceCanvas from '@/components/map-experience/MapExperienceCanvas.vue'
import MapExperiencePointSheet from '@/components/map-experience/MapExperiencePointSheet.vue'
import type { RoutePoint } from '@/types/point.types'

const routeStore = useRouteStore()

const selectedPoint = ref<RoutePoint | null>(null)
const isMapLoading = ref(true)
const isDemoEventActive = ref(false)
const mapCanvas = ref<InstanceType<typeof MapExperienceCanvas> | null>(null)

function selectPoint(point: RoutePoint) {
  selectedPoint.value = point
}

function closePoint() {
  selectedPoint.value = null
  mapCanvas.value?.clearSelection()
}

function recenterMap() {
  selectedPoint.value = null
  mapCanvas.value?.fitToAllPoints()
}

function toggleDemoEvent() {
  isDemoEventActive.value = !isDemoEventActive.value

  if (isDemoEventActive.value) {
    window.setTimeout(() => {
      mapCanvas.value?.flyToDemoEvent()
    }, 120)
  }
}

async function forceRefresh() {
  await routeStore.refreshIfNeeded()
}

function startGuide() {
  const tour = driver({
    showProgress: true,
    animate: true,
    allowClose: true,
    overlayOpacity: 0.64,
    popoverClass: 'cf-driver-popover',
    nextBtnText: 'Siguiente',
    prevBtnText: 'Atrás',
    doneBtnText: 'Listo',
    steps: [
      {
        element: '[data-tour="map-title"]',
        popover: {
          title: 'Ruta de los Dulces Acanceh',
          description:
            'Este mapa es el centro de la experiencia. Aquí podrás ver casas, negocios e instituciones participantes.',
          side: 'bottom',
          align: 'start',
        },
      },
      {
        element: '[data-tour="event-toggle"]',
        popover: {
          title: 'Eventos especiales',
          description:
            'Este botón activa un evento de prueba para ver cómo destacará un punto importante dentro del mapa.',
          side: 'left',
          align: 'center',
        },
      },
      {
        element: '[data-tour="map-actions"]',
        popover: {
          title: 'Controles del mapa',
          description:
            'Puedes regresar al encuadre principal o actualizar los datos cuando la ruta esté conectada a la API.',
          side: 'left',
          align: 'center',
        },
      },
      {
        element: '[data-tour="map-canvas"]',
        popover: {
          title: 'Marcadores por categoría y estado',
          description:
            'Desde lejos verás puntos pequeños. Al acercarte aparecerán los iconos y después los nombres de los puntos.',
          side: 'top',
          align: 'center',
        },
      },
    ],
  })

  tour.drive()
}
</script>

<template>
  <section class="cf-map">
    <MapExperienceCanvas
      ref="mapCanvas"
      :demo-event-active="isDemoEventActive"
      @select-point="selectPoint"
      @loading-change="isMapLoading = $event"
    />

    <div v-if="isMapLoading || routeStore.isLoading" class="cf-map-loader">
      <div class="cf-map-loader__orb"></div>

      <div class="cf-map-loader__sprite-stage">
        <div class="cf-map-loader__sprite-float">
          <div class="cf-map-loader__sprite" aria-hidden="true"></div>
        </div>
      </div>

      <strong>Cargando mapa</strong>
      <small>Preparando la Ruta de los Dulces</small>
    </div>

    <header class="cf-map-minibar" data-tour="map-title">
      <div>
        <strong>Ruta de los Dulces</strong>
        <small>Acanceh · {{ appConfig.isLocalData ? 'JSON local' : 'API conectada' }}</small>
      </div>

      <button type="button" aria-label="Iniciar guía" @click="startGuide">
        <span class="material-symbols-outlined">help</span>
      </button>
    </header>

    <aside
      class="cf-map-demo-toggle"
      :class="{ 'cf-map-demo-toggle--active': isDemoEventActive }"
      data-tour="event-toggle"
    >
      <div class="cf-map-demo-toggle__icon">
        <span class="material-symbols-outlined">festival</span>
      </div>

      <div>
        <small>Prueba visual</small>
        <strong>{{ isDemoEventActive ? 'Evento activo' : 'Activar evento' }}</strong>
        <span>Animación segura con MapLibre</span>
      </div>

      <button
        type="button"
        class="cf-map-switch"
        :class="{ 'cf-map-switch--active': isDemoEventActive }"
        aria-label="Activar evento demo"
        @click="toggleDemoEvent"
      >
        <i></i>
      </button>
    </aside>

    <Transition name="cf-map-banner">
      <section v-if="isDemoEventActive" class="cf-map-event-card">
        <span class="material-symbols-outlined">auto_awesome</span>

        <div>
          <strong>Evento demo activo</strong>
          <small>Parque Principal · Punto especial de prueba</small>
        </div>
      </section>
    </Transition>

    <div class="cf-map-actions" data-tour="map-actions">
      <button type="button" aria-label="Centrar mapa" @click="recenterMap">
        <span class="material-symbols-outlined">center_focus_strong</span>
      </button>

      <button type="button" aria-label="Actualizar datos" @click="forceRefresh">
        <span class="material-symbols-outlined" :class="{ 'cf-map-spin': routeStore.isRefreshing }">
          refresh
        </span>
      </button>
    </div>

    <MapExperiencePointSheet
      :point="selectedPoint"
      @close="closePoint"
    />
  </section>
</template>
