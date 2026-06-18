<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import * as maplibregl from 'maplibre-gl'
import type {
  ExpressionSpecification,
  GeoJSONSource,
  Map,
  MapLayerMouseEvent,
  StyleSpecification,
} from 'maplibre-gl'

import { useRouteStore } from '@/app/stores/route.store'
import { getPointBounds, pointsToGeoJson } from '@/services/maps.service'
import type { RoutePoint } from '@/types/point.types'

const ACANCEH_CENTER: [number, number] = [-89.4565, 20.814]
const ACANCEH_ZOOM = 14.15

const POINT_SOURCE_ID = 'route-points'

const CLUSTER_HALO_LAYER_ID = 'route-clusters-halo-layer'
const CLUSTER_LAYER_ID = 'route-clusters-layer'
const CLUSTER_COUNT_LAYER_ID = 'route-clusters-count-layer'

const POINT_HALO_LAYER_ID = 'route-points-halo-layer'
const POINT_LAYER_ID = 'route-points-layer'
const POINT_ICON_LAYER_ID = 'route-points-icon-layer'
const POINT_LABEL_LAYER_ID = 'route-points-label-layer'

const routeStore = useRouteStore()

const emit = defineEmits<{
  selectPoint: [point: RoutePoint]
  mapReady: []
  loadingChange: [value: boolean]
}>()

const mapContainer = ref<HTMLDivElement | null>(null)

let map: Map | null = null

const visiblePoints = computed(() => routeStore.filteredPoints)

const mapStyle: StyleSpecification = {
  version: 8,
  glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors',
    },
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm',
      paint: {
        'raster-saturation': -0.9,
        'raster-brightness-min': 0.04,
        'raster-brightness-max': 0.48,
        'raster-contrast': 0.3,
      },
    },
    {
      id: 'route-night-background',
      type: 'background',
      paint: {
        'background-color': 'rgba(18, 15, 44, 0.34)',
      },
    },
  ],
}

const statusColorExpression: ExpressionSpecification = [
  'match',
  ['get', 'status'],
  'with_candies',
  '#4ade80',
  'few_candies',
  '#fbbf24',
  'no_candies',
  '#fb7185',
  '#4ade80',
]

const pointRadiusExpression: ExpressionSpecification = [
  'case',
  ['==', ['get', 'category'], 'institution'],
  10,
  9,
]

const pointIconExpression: ExpressionSpecification = [
  'match',
  ['get', 'category'],
  'business',
  '◆',
  'house',
  '⌂',
  'institution',
  '▣',
  'event',
  '✦',
  '•',
]

const clusterColorExpression: ExpressionSpecification = [
  'step',
  ['get', 'point_count'],
  '#deb7ff',
  20,
  '#ffb785',
  60,
  '#ff8200',
  120,
  '#e9c400',
]

const clusterRadiusExpression: ExpressionSpecification = [
  'step',
  ['get', 'point_count'],
  18,
  20,
  23,
  60,
  29,
  120,
  36,
]

function createMap() {
  if (!mapContainer.value) return

  emit('loadingChange', true)

  const nextMap = new maplibregl.Map({
    container: mapContainer.value,
    style: mapStyle,
    center: ACANCEH_CENTER,
    zoom: ACANCEH_ZOOM,
    minZoom: 12,
    maxZoom: 19,
    pitch: 42,
    bearing: -16,
    attributionControl: false,
  })

  map = nextMap

  nextMap.addControl(
    new maplibregl.NavigationControl({
      visualizePitch: true,
      showCompass: true,
      showZoom: false,
    }),
    'top-right',
  )

  nextMap.addControl(
    new maplibregl.AttributionControl({
      compact: true,
    }),
    'bottom-left',
  )

  nextMap.on('load', () => {
    addPointLayers()
    updatePointSource()
    fitToAllPoints(false)

    emit('loadingChange', false)
    emit('mapReady')
  })
}

function addPointLayers() {
  if (!map) return

  map.addSource(POINT_SOURCE_ID, {
    type: 'geojson',
    data: pointsToGeoJson(visiblePoints.value),
    cluster: true,
    clusterMaxZoom: 15,
    clusterRadius: 46,
  })

  map.addLayer({
    id: CLUSTER_HALO_LAYER_ID,
    type: 'circle',
    source: POINT_SOURCE_ID,
    filter: ['has', 'point_count'],
    paint: {
      'circle-radius': ['+', clusterRadiusExpression, 14],
      'circle-color': clusterColorExpression,
      'circle-opacity': 0.2,
      'circle-blur': 0.55,
    },
  })

  map.addLayer({
    id: CLUSTER_LAYER_ID,
    type: 'circle',
    source: POINT_SOURCE_ID,
    filter: ['has', 'point_count'],
    paint: {
      'circle-radius': clusterRadiusExpression,
      'circle-color': clusterColorExpression,
      'circle-opacity': 0.94,
      'circle-stroke-color': '#fff3d6',
      'circle-stroke-width': 2,
    },
  })

  map.addLayer({
    id: CLUSTER_COUNT_LAYER_ID,
    type: 'symbol',
    source: POINT_SOURCE_ID,
    filter: ['has', 'point_count'],
    layout: {
      'text-field': ['get', 'point_count_abbreviated'],
      'text-size': 13,
      'text-font': ['Noto Sans Bold'],
      'text-allow-overlap': true,
    },
    paint: {
      'text-color': '#16001f',
    },
  })

  map.addLayer({
    id: POINT_HALO_LAYER_ID,
    type: 'circle',
    source: POINT_SOURCE_ID,
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-radius': ['+', pointRadiusExpression, 10],
      'circle-color': statusColorExpression,
      'circle-opacity': 0.18,
      'circle-blur': 0.42,
    },
  })

  map.addLayer({
    id: POINT_LAYER_ID,
    type: 'circle',
    source: POINT_SOURCE_ID,
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-radius': pointRadiusExpression,
      'circle-color': statusColorExpression,
      'circle-stroke-color': '#fff3d6',
      'circle-stroke-width': 2,
      'circle-opacity': 0.98,
    },
  })

  map.addLayer({
    id: POINT_ICON_LAYER_ID,
    type: 'symbol',
    source: POINT_SOURCE_ID,
    filter: ['!', ['has', 'point_count']],
    layout: {
      'text-field': pointIconExpression,
      'text-size': [
        'case',
        ['==', ['get', 'category'], 'house'],
        17,
        ['==', ['get', 'category'], 'event'],
        19,
        16,
      ],
      'text-font': ['Noto Sans Bold'],
      'text-allow-overlap': true,
      'text-ignore-placement': true,
    },
    paint: {
      'text-color': '#16001f',
      'text-halo-color': 'rgba(255, 243, 214, 0.25)',
      'text-halo-width': 0.5,
    },
  })

  map.addLayer({
    id: POINT_LABEL_LAYER_ID,
    type: 'symbol',
    source: POINT_SOURCE_ID,
    filter: ['!', ['has', 'point_count']],
    minzoom: 16.25,
    layout: {
      'text-field': ['get', 'name'],
      'text-size': 11,
      'text-offset': [0, 1.6],
      'text-anchor': 'top',
      'text-font': ['Noto Sans Regular'],
      'text-max-width': 10,
    },
    paint: {
      'text-color': '#fff3d6',
      'text-halo-color': '#120f2c',
      'text-halo-width': 1.5,
    },
  })

  map.on('mouseenter', POINT_LAYER_ID, () => {
    if (!map) return
    map.getCanvas().style.cursor = 'pointer'
  })

  map.on('mouseleave', POINT_LAYER_ID, () => {
    if (!map) return
    map.getCanvas().style.cursor = ''
  })

  map.on('mouseenter', CLUSTER_LAYER_ID, () => {
    if (!map) return
    map.getCanvas().style.cursor = 'zoom-in'
  })

  map.on('mouseleave', CLUSTER_LAYER_ID, () => {
    if (!map) return
    map.getCanvas().style.cursor = ''
  })

  map.on('click', POINT_LAYER_ID, handlePointClick)
  map.on('click', CLUSTER_LAYER_ID, handleClusterClick)
}

function handleClusterClick(event: MapLayerMouseEvent) {
  if (!map) return

  const currentZoom = map.getZoom()

  map.easeTo({
    center: [event.lngLat.lng, event.lngLat.lat],
    zoom: Math.min(currentZoom + 1.7, 17),
    pitch: 46,
    bearing: map.getBearing(),
    duration: 720,
  })
}

function handlePointClick(event: MapLayerMouseEvent) {
  if (!map) return

  const feature = event.features?.[0]
  const slug = feature?.properties?.slug

  if (typeof slug !== 'string') return

  const point = routeStore.findPointBySlug(slug)
  if (!point) return

  map.easeTo({
    center: [point.lng, point.lat],
    zoom: Math.max(map.getZoom(), 16.4),
    pitch: 50,
    bearing: map.getBearing(),
    duration: 850,
    padding: {
      top: 94,
      right: window.innerWidth >= 900 ? 30 : 30,
      bottom: window.innerWidth >= 900 ? 80 : 340,
      left: window.innerWidth >= 900 ? 460 : 30,
    },
  })

  emit('selectPoint', point)
}

function updatePointSource() {
  if (!map) return

  const source = map.getSource(POINT_SOURCE_ID)

  if (!source) return

  const geoJsonSource = source as GeoJSONSource
  geoJsonSource.setData(pointsToGeoJson(visiblePoints.value))
}

function fitToAllPoints(animated = true) {
  if (!map) return

  const pointsForBounds = visiblePoints.value.length > 0 ? visiblePoints.value : routeStore.points
  const bounds = getPointBounds(pointsForBounds)

  if (!bounds) {
    map.easeTo({
      center: ACANCEH_CENTER,
      zoom: ACANCEH_ZOOM,
      pitch: 42,
      bearing: -16,
      duration: animated ? 800 : 0,
    })

    return
  }

  map.fitBounds(bounds, {
    padding: {
      top: window.innerWidth >= 900 ? 145 : 155,
      right: window.innerWidth >= 900 ? 120 : 46,
      bottom: window.innerWidth >= 900 ? 90 : 235,
      left: window.innerWidth >= 900 ? 460 : 46,
    },
    maxZoom: 15,
    duration: animated ? 950 : 0,
  })

  window.setTimeout(() => {
    if (!map) return

    map.easeTo({
      pitch: 42,
      bearing: -16,
      duration: animated ? 450 : 0,
    })
  }, animated ? 200 : 0)
}

function flyToUserApproximation() {
  if (!map) return

  map.easeTo({
    center: ACANCEH_CENTER,
    zoom: ACANCEH_ZOOM,
    pitch: 42,
    bearing: -16,
    duration: 900,
  })
}

defineExpose({
  fitToAllPoints,
  flyToUserApproximation,
})

watch(
  () => visiblePoints.value,
  async () => {
    await nextTick()
    updatePointSource()
    fitToAllPoints(true)
  },
  {
    deep: true,
  },
)

watch(
  () => routeStore.manifest?.version,
  async () => {
    await nextTick()
    updatePointSource()
  },
)

onMounted(() => {
  createMap()
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div ref="mapContainer" class="route-map"></div>
</template>
