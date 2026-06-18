<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import * as maplibregl from 'maplibre-gl'
import type {
  GeoJSONSource,
  LngLatBoundsLike,
  Map,
  MapLayerMouseEvent,
  StyleSpecification,
} from 'maplibre-gl'

import { useRouteStore } from '@/app/stores/route.store'
import type { RoutePoint } from '@/types/point.types'

const ACANCEH_CENTER: [number, number] = [-89.4565, 20.814]
const ACANCEH_ZOOM = 14.25

const SOURCE_POINTS = 'route-points'
const SOURCE_SELECTED = 'selected-point-effect'
const SOURCE_EVENT = 'demo-event'

const LAYER_POINTS_CLUSTER_GLOW = 'route-points-cluster-glow'
const LAYER_POINTS_FALLBACK_BASE = 'route-points-fallback-base'
const LAYER_POINTS_FALLBACK_CORE = 'route-points-fallback-core'
const LAYER_POINTS_ICON = 'route-points-icon'

const LAYER_SELECTED_AURA = 'selected-point-aura'
const LAYER_SELECTED_GHOST = 'selected-point-ghost'

const LAYER_POINTS_LABELS = 'route-points-labels'
const LAYER_POINTS_HIT = 'route-points-hit'

const LAYER_EVENT_GLOW = 'demo-event-glow'
const LAYER_EVENT_RING = 'demo-event-ring'
const LAYER_EVENT_BASE = 'demo-event-base'
const LAYER_EVENT_CORE = 'demo-event-core'
const LAYER_EVENT_ICON = 'demo-event-icon'
const LAYER_EVENT_LABEL = 'demo-event-label'
const LAYER_EVENT_HIT = 'demo-event-hit'

const ICON_EVENT_STATIC = 'marker-event-active'
const ICON_EVENT_ANIMATED = 'event-active-spritesheet'
const ICON_SELECTED_GHOST = 'selected-ghost-spritesheet'

const SELECTED_GHOST_SPRITE = {
  id: ICON_SELECTED_GHOST,
  url: '/sprites/selected-ghost-spritesheet.png',
  frames: 8,
  outputWidth: 192,
  outputHeight: 192,
  fps: 4.8,
  padding: 4,
  bottomPadding: 0,
  offsetX: 0,
  offsetY: -2,
  iconOffsetX: 0,
  iconOffsetY: -14,
}

const EVENT_SPRITE = {
  id: ICON_EVENT_ANIMATED,
  url: '/sprites/event-active-spritesheet.png',
  frames: 8,
  outputWidth: 192,
  outputHeight: 192,
  fps: 4.2,
  padding: 2,
  bottomPadding: 0,
  offsetX: -6,
  offsetY: 0,
  iconOffsetX: 0,
  iconOffsetY: 0,
}

const CATEGORY_STATUS_IMAGES = [
  {
    key: 'business-with_candies',
    id: 'marker-business-with-candies',
    url: '/markers/marker-business-with-candies.png',
  },
  {
    key: 'business-few_candies',
    id: 'marker-business-few-candies',
    url: '/markers/marker-business-few-candies.png',
  },
  {
    key: 'business-no_candies',
    id: 'marker-business-no-candies',
    url: '/markers/marker-business-no-candies.png',
  },
  {
    key: 'house-with_candies',
    id: 'marker-house-with-candies',
    url: '/markers/marker-house-with-candies.png',
  },
  {
    key: 'house-few_candies',
    id: 'marker-house-few-candies',
    url: '/markers/marker-house-few-candies.png',
  },
  {
    key: 'house-no_candies',
    id: 'marker-house-no-candies',
    url: '/markers/marker-house-no-candies.png',
  },
  {
    key: 'institution-with_candies',
    id: 'marker-institution-with-candies',
    url: '/markers/marker-institution-with-candies.png',
  },
  {
    key: 'institution-few_candies',
    id: 'marker-institution-few-candies',
    url: '/markers/marker-institution-few-candies.png',
  },
  {
    key: 'institution-no_candies',
    id: 'marker-institution-no-candies',
    url: '/markers/marker-institution-no-candies.png',
  },
]

const STATUS_FALLBACK_IMAGES = [
  {
    key: 'with_candies',
    id: 'marker-with-candies',
    url: '/markers/marker-with-candies.png',
  },
  {
    key: 'few_candies',
    id: 'marker-few-candies',
    url: '/markers/marker-few-candies.png',
  },
  {
    key: 'no_candies',
    id: 'marker-no-candies',
    url: '/markers/marker-no-candies.png',
  },
]

const EVENT_STATIC_IMAGE = {
  id: ICON_EVENT_STATIC,
  url: '/markers/marker-event-active.png',
}

const DEMO_EVENT = {
  id: 'demo-event-parque-principal',
  slug: 'demo-event-parque-principal',
  name: 'Evento demo',
  description: 'Punto especial de prueba para visualizar cómo se verá un evento activado.',
  lng: -89.4527,
  lat: 20.8147,
}

type MapFeature = {
  type: 'Feature'
  geometry: {
    type: 'Point'
    coordinates: [number, number]
  }
  properties: Record<string, string | number | boolean>
}

type MapFeatureCollection = {
  type: 'FeatureCollection'
  features: MapFeature[]
}

type SpriteOptions = {
  id: string
  url: string
  frames: number
  outputWidth: number
  outputHeight: number
  fps: number
  padding: number
  bottomPadding: number
  offsetX: number
  offsetY: number
  iconOffsetX: number
  iconOffsetY: number
}

type SpriteBounds = {
  x: number
  y: number
  width: number
  height: number
}

type AnimatedSpriteImage = {
  width: number
  height: number
  data: Uint8ClampedArray
  onAdd: (mapInstance: Map) => void
  render: () => boolean
}

const props = defineProps<{
  demoEventActive: boolean
}>()

const emit = defineEmits<{
  selectPoint: [point: RoutePoint]
  loadingChange: [value: boolean]
}>()

const routeStore = useRouteStore()
const mapContainer = ref<HTMLDivElement | null>(null)

let map: Map | null = null
let eventIconId = ''
let selectedGhostReady = false
let eventAnimationFrame = 0
let eventAnimationRequest: number | null = null

const loadedIconByKey = new Map<string, string>()
const loadedStatusFallback = new Map<string, string>()
const selectedPoint = ref<RoutePoint | null>(null)

const visiblePoints = computed(() => routeStore.filteredPoints)

const statusColorExpression = [
  'match',
  ['get', 'status'],
  'with_candies',
  '#4ade80',
  'few_candies',
  '#fbbf24',
  'no_candies',
  '#fb7185',
  '#4ade80',
] as unknown as maplibregl.ExpressionSpecification

const selectedAuraColorExpression = [
  'match',
  ['get', 'status'],
  'with_candies',
  '#4ade80',
  'few_candies',
  '#fbbf24',
  'no_candies',
  '#fb7185',
  '#ffb785',
] as unknown as maplibregl.ExpressionSpecification

const normalIconSizeExpression = [
  'interpolate',
  ['linear'],
  ['zoom'],
  12,
  0.04,
  13,
  0.08,
  14,
  0.16,
  15,
  0.3,
  16,
  0.46,
  17,
  0.62,
  18,
  0.78,
  19,
  0.9,
] as unknown as maplibregl.ExpressionSpecification

const eventIconSizeExpression = [
  'interpolate',
  ['linear'],
  ['zoom'],
  12,
  0.16,
  14,
  0.32,
  15,
  0.5,
  16,
  0.72,
  17,
  0.92,
  18,
  1.08,
  19,
  1.2,
] as unknown as maplibregl.ExpressionSpecification

const selectedGhostSizeExpression = [
  'interpolate',
  ['linear'],
  ['zoom'],
  12,
  0.12,
  14,
  0.24,
  15,
  0.38,
  16,
  0.56,
  17,
  0.74,
  18,
  0.88,
  19,
  1.02,
] as unknown as maplibregl.ExpressionSpecification

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
      id: 'osm-night',
      type: 'raster',
      source: 'osm',
      paint: {
        'raster-saturation': -0.42,
        'raster-brightness-min': 0.08,
        'raster-brightness-max': 0.74,
        'raster-contrast': 0.08,
      },
    },
  ],
}

function createMap() {
  if (!mapContainer.value) return

  emit('loadingChange', true)

  map = new maplibregl.Map({
    container: mapContainer.value,
    style: mapStyle,
    center: ACANCEH_CENTER,
    zoom: ACANCEH_ZOOM,
    minZoom: 12,
    maxZoom: 19,
    pitch: 14,
    bearing: -2,
    attributionControl: false,
  })

  map.addControl(
    new maplibregl.AttributionControl({
      compact: true,
    }),
    'bottom-left',
  )

  map.on('load', async () => {
    await nextTick()

    await loadMarkerImages()

    addPointLayers()
    addEventLayers()
    bindInteractions()
    fitToAllPoints(false)

    emit('loadingChange', false)
  })
}

function getPointIconKey(point: RoutePoint) {
  return `${point.category}-${point.status}`
}

function resolvePointIconId(point: RoutePoint) {
  const categoryKey = getPointIconKey(point)
  const categoryIcon = loadedIconByKey.get(categoryKey)

  if (categoryIcon) return categoryIcon

  const fallbackIcon = loadedStatusFallback.get(point.status)

  if (fallbackIcon) return fallbackIcon

  return ''
}

function buildPointCollection(): MapFeatureCollection {
  return {
    type: 'FeatureCollection',
    features: visiblePoints.value.map((point) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [point.lng, point.lat],
      },
      properties: {
        id: point.id,
        slug: point.slug,
        name: point.name,
        status: point.status,
        status_label: point.status_label,
        category: point.category,
        category_label: point.category_label,
        icon_id: resolvePointIconId(point),
      },
    })),
  }
}

function buildSelectedCollection(): MapFeatureCollection {
  if (!selectedPoint.value) {
    return {
      type: 'FeatureCollection',
      features: [],
    }
  }

  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [selectedPoint.value.lng, selectedPoint.value.lat],
        },
        properties: {
          id: selectedPoint.value.id,
          slug: selectedPoint.value.slug,
          name: selectedPoint.value.name,
          status: selectedPoint.value.status,
          category: selectedPoint.value.category,
          icon_id: selectedGhostReady ? ICON_SELECTED_GHOST : '',
        },
      },
    ],
  }
}

function buildEventCollection(): MapFeatureCollection {
  if (!props.demoEventActive) {
    return {
      type: 'FeatureCollection',
      features: [],
    }
  }

  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [DEMO_EVENT.lng, DEMO_EVENT.lat],
        },
        properties: {
          id: DEMO_EVENT.id,
          slug: DEMO_EVENT.slug,
          name: DEMO_EVENT.name,
          description: DEMO_EVENT.description,
          type: 'demo_event',
          icon_id: eventIconId,
        },
      },
    ],
  }
}

function loadImageElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'

    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`No se pudo cargar ${url}`))

    image.src = `${url}?v=${Date.now()}`
  })
}

function getAlphaBounds(imageData: ImageData): SpriteBounds | null {
  const { data, width, height } = imageData

  let minX = width
  let minY = height
  let maxX = -1
  let maxY = -1

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alphaIndex = (y * width + x) * 4 + 3

      if (data[alphaIndex] > 8) {
        minX = Math.min(minX, x)
        minY = Math.min(minY, y)
        maxX = Math.max(maxX, x)
        maxY = Math.max(maxY, y)
      }
    }
  }

  if (maxX < minX || maxY < minY) return null

  return {
    x: minX,
    y: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  }
}

function getGlobalSpriteBounds(image: HTMLImageElement, frames: number): SpriteBounds {
  const sourceFrameWidth = Math.floor(image.naturalWidth / frames)
  const sourceFrameHeight = image.naturalHeight

  const frameCanvas = document.createElement('canvas')
  const frameContext = frameCanvas.getContext('2d', {
    willReadFrequently: true,
  })

  frameCanvas.width = sourceFrameWidth
  frameCanvas.height = sourceFrameHeight

  if (!frameContext) {
    return {
      x: 0,
      y: 0,
      width: sourceFrameWidth,
      height: sourceFrameHeight,
    }
  }

  let globalMinX = sourceFrameWidth
  let globalMinY = sourceFrameHeight
  let globalMaxX = -1
  let globalMaxY = -1

  for (let frame = 0; frame < frames; frame += 1) {
    frameContext.clearRect(0, 0, sourceFrameWidth, sourceFrameHeight)
    frameContext.drawImage(
      image,
      frame * sourceFrameWidth,
      0,
      sourceFrameWidth,
      sourceFrameHeight,
      0,
      0,
      sourceFrameWidth,
      sourceFrameHeight,
    )

    const imageData = frameContext.getImageData(0, 0, sourceFrameWidth, sourceFrameHeight)
    const bounds = getAlphaBounds(imageData)

    if (!bounds) continue

    globalMinX = Math.min(globalMinX, bounds.x)
    globalMinY = Math.min(globalMinY, bounds.y)
    globalMaxX = Math.max(globalMaxX, bounds.x + bounds.width)
    globalMaxY = Math.max(globalMaxY, bounds.y + bounds.height)
  }

  if (globalMaxX < globalMinX || globalMaxY < globalMinY) {
    return {
      x: 0,
      y: 0,
      width: sourceFrameWidth,
      height: sourceFrameHeight,
    }
  }

  return {
    x: globalMinX,
    y: globalMinY,
    width: globalMaxX - globalMinX,
    height: globalMaxY - globalMinY,
  }
}

function createAnimatedSpriteImage(options: SpriteOptions & { image: HTMLImageElement }): AnimatedSpriteImage {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d', {
    willReadFrequently: true,
  })

  const sourceFrameWidth = Math.floor(options.image.naturalWidth / options.frames)
  const globalBounds = getGlobalSpriteBounds(options.image, options.frames)

  let mapInstance: Map | null = null

  const spriteImage: AnimatedSpriteImage = {
    width: options.outputWidth,
    height: options.outputHeight,
    data: new Uint8ClampedArray(options.outputWidth * options.outputHeight * 4),

    onAdd(nextMap: Map) {
      mapInstance = nextMap
      canvas.width = options.outputWidth
      canvas.height = options.outputHeight
    },

    render() {
      if (!context || !mapInstance) return false

      const frame = Math.floor((performance.now() / 1000) * options.fps) % options.frames

      const safePadding = Math.max(0, options.padding)
      const availableWidth = Math.max(1, options.outputWidth - safePadding * 2)
      const availableHeight = Math.max(
        1,
        options.outputHeight - safePadding * 2 - options.bottomPadding,
      )

      const scale = Math.min(
        availableWidth / globalBounds.width,
        availableHeight / globalBounds.height,
      )

      const drawWidth = globalBounds.width * scale
      const drawHeight = globalBounds.height * scale
      const drawX = (options.outputWidth - drawWidth) / 2 + options.offsetX
      const drawY = options.outputHeight - drawHeight - options.bottomPadding + options.offsetY

      context.clearRect(0, 0, options.outputWidth, options.outputHeight)
      context.drawImage(
        options.image,
        frame * sourceFrameWidth + globalBounds.x,
        globalBounds.y,
        globalBounds.width,
        globalBounds.height,
        drawX,
        drawY,
        drawWidth,
        drawHeight,
      )

      const imageData = context.getImageData(0, 0, options.outputWidth, options.outputHeight)
      spriteImage.data = imageData.data

      mapInstance.triggerRepaint()

      return true
    },
  }

  return spriteImage
}

async function loadAnimatedSpriteAsMapIcon(options: SpriteOptions): Promise<boolean> {
  if (!map) return false

  if (map.hasImage(options.id)) return true

  try {
    const image = await loadImageElement(options.url)

    const sprite = createAnimatedSpriteImage({
      ...options,
      image,
    })

    map.addImage(options.id, sprite as unknown as HTMLImageElement, {
      pixelRatio: 1,
    })

    return true
  } catch {
    return false
  }
}

function loadStaticImageAsMapIcon(id: string, url: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!map) {
      resolve(false)
      return
    }

    if (map.hasImage(id)) {
      resolve(true)
      return
    }

    const image = new Image()
    image.crossOrigin = 'anonymous'

    image.onload = () => {
      if (!map) {
        resolve(false)
        return
      }

      try {
        if (!map.hasImage(id)) {
          map.addImage(id, image, {
            pixelRatio: 1,
          })
        }

        resolve(true)
      } catch {
        resolve(false)
      }
    }

    image.onerror = () => {
      resolve(false)
    }

    image.src = `${url}?v=${Date.now()}`
  })
}

async function loadMarkerImages() {
  loadedIconByKey.clear()
  loadedStatusFallback.clear()
  selectedGhostReady = false
  eventIconId = ''

  await Promise.all(
    CATEGORY_STATUS_IMAGES.map(async (item) => {
      const loaded = await loadStaticImageAsMapIcon(item.id, item.url)

      if (loaded) {
        loadedIconByKey.set(item.key, item.id)
      }
    }),
  )

  await Promise.all(
    STATUS_FALLBACK_IMAGES.map(async (item) => {
      const loaded = await loadStaticImageAsMapIcon(item.id, item.url)

      if (loaded) {
        loadedStatusFallback.set(item.key, item.id)
      }
    }),
  )

  selectedGhostReady = await loadAnimatedSpriteAsMapIcon(SELECTED_GHOST_SPRITE)

  const eventSpriteReady = await loadAnimatedSpriteAsMapIcon(EVENT_SPRITE)

  if (eventSpriteReady) {
    eventIconId = ICON_EVENT_ANIMATED
  } else {
    const staticEventReady = await loadStaticImageAsMapIcon(
      EVENT_STATIC_IMAGE.id,
      EVENT_STATIC_IMAGE.url,
    )

    eventIconId = staticEventReady ? ICON_EVENT_STATIC : ''
  }

  console.info('[Ruta Dulces] Marker icons loaded:', {
    categoryIcons: Array.from(loadedIconByKey.keys()),
    fallbackIcons: Array.from(loadedStatusFallback.keys()),
    selectedGhostReady,
    eventIconId,
  })
}

function addPointLayers() {
  if (!map || map.getSource(SOURCE_POINTS)) return

  map.addSource(SOURCE_POINTS, {
    type: 'geojson',
    data: buildPointCollection(),
  })

  map.addSource(SOURCE_SELECTED, {
    type: 'geojson',
    data: buildSelectedCollection(),
  })

  map.addLayer({
    id: LAYER_POINTS_CLUSTER_GLOW,
    type: 'circle',
    source: SOURCE_POINTS,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 12, 3, 14, 5, 16, 8, 18, 14],
      'circle-color': statusColorExpression,
      'circle-opacity': ['interpolate', ['linear'], ['zoom'], 12, 0.82, 14, 0.42, 16, 0.18],
      'circle-blur': 0.58,
    },
  })

  map.addLayer({
    id: LAYER_POINTS_FALLBACK_BASE,
    type: 'circle',
    source: SOURCE_POINTS,
    filter: ['==', ['get', 'icon_id'], ''],
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 12, 4, 15, 7, 18, 12],
      'circle-color': statusColorExpression,
      'circle-opacity': 0.96,
      'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 12, 1, 16, 2],
      'circle-stroke-color': 'rgba(255, 243, 214, 0.86)',
    },
  })

  map.addLayer({
    id: LAYER_POINTS_FALLBACK_CORE,
    type: 'circle',
    source: SOURCE_POINTS,
    filter: ['==', ['get', 'icon_id'], ''],
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 12, 1.6, 15, 2.4, 18, 4],
      'circle-color': '#fff7e8',
      'circle-opacity': 0.86,
    },
  })

  map.addLayer({
    id: LAYER_SELECTED_AURA,
    type: 'circle',
    source: SOURCE_SELECTED,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 12, 8, 15, 14, 18, 22],
      'circle-color': selectedAuraColorExpression,
      'circle-opacity': 0.18,
      'circle-blur': 0.96,
    },
  })

  map.addLayer({
    id: LAYER_POINTS_ICON,
    type: 'symbol',
    source: SOURCE_POINTS,
    filter: ['!=', ['get', 'icon_id'], ''],
    layout: {
      'icon-image': ['get', 'icon_id'],
      'icon-size': normalIconSizeExpression,
      'icon-anchor': 'bottom',
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
      'icon-padding': 0,
    },
    paint: {
      'icon-opacity': ['interpolate', ['linear'], ['zoom'], 12, 0, 13.4, 0.72, 14, 1],
    },
  })

  if (selectedGhostReady) {
    map.addLayer({
      id: LAYER_SELECTED_GHOST,
      type: 'symbol',
      source: SOURCE_SELECTED,
      filter: ['!=', ['get', 'icon_id'], ''],
      layout: {
        'icon-image': ['get', 'icon_id'],
        'icon-size': selectedGhostSizeExpression,
        'icon-anchor': 'bottom',
        'icon-offset': ['literal', [SELECTED_GHOST_SPRITE.iconOffsetX, SELECTED_GHOST_SPRITE.iconOffsetY]],
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
        'icon-padding': 0,
      },
      paint: {
        'icon-opacity': ['interpolate', ['linear'], ['zoom'], 12, 0.82, 15, 0.96, 18, 1],
      },
    })
  }

  map.addLayer({
    id: LAYER_POINTS_LABELS,
    type: 'symbol',
    source: SOURCE_POINTS,
    minzoom: 15.35,
    layout: {
      'text-field': ['get', 'name'],
      'text-font': ['Open Sans Bold'],
      'text-size': ['interpolate', ['linear'], ['zoom'], 15, 10, 17, 12, 19, 14],
      'text-anchor': 'bottom',
      'text-offset': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        ['literal', [0, -2.4]],
        19,
        ['literal', [0, -4.2]],
      ],
      'text-max-width': 10,
      'text-allow-overlap': false,
      'text-ignore-placement': false,
      'text-padding': 4,
    },
    paint: {
      'text-color': '#fff7e8',
      'text-halo-color': 'rgba(18, 15, 44, 0.92)',
      'text-halo-width': 2.4,
      'text-opacity': ['interpolate', ['linear'], ['zoom'], 15.35, 0, 15.9, 1],
    },
  })

  map.addLayer({
    id: LAYER_POINTS_HIT,
    type: 'circle',
    source: SOURCE_POINTS,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 12, 10, 15, 17, 18, 27],
      'circle-color': '#ffffff',
      'circle-opacity': 0,
    },
  })
}

function addEventLayers() {
  if (!map || map.getSource(SOURCE_EVENT)) return

  map.addSource(SOURCE_EVENT, {
    type: 'geojson',
    data: buildEventCollection(),
  })

  map.addLayer({
    id: LAYER_EVENT_GLOW,
    type: 'circle',
    source: SOURCE_EVENT,
    paint: {
      'circle-radius': 36,
      'circle-color': '#8b5cf6',
      'circle-opacity': 0.26,
      'circle-blur': 0.82,
    },
  })

  map.addLayer({
    id: LAYER_EVENT_RING,
    type: 'circle',
    source: SOURCE_EVENT,
    paint: {
      'circle-radius': 24,
      'circle-color': 'rgba(233, 196, 0, 0)',
      'circle-stroke-width': 3.2,
      'circle-stroke-color': '#e9c400',
      'circle-opacity': 0.9,
    },
  })

  map.addLayer({
    id: LAYER_EVENT_BASE,
    type: 'circle',
    source: SOURCE_EVENT,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 12, 8, 15, 15, 18, 25],
      'circle-color': '#8b5cf6',
      'circle-stroke-width': 2.5,
      'circle-stroke-color': '#ffe171',
      'circle-opacity': eventIconId ? 0.12 : 1,
    },
  })

  map.addLayer({
    id: LAYER_EVENT_CORE,
    type: 'circle',
    source: SOURCE_EVENT,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 12, 3, 15, 6, 18, 10],
      'circle-color': '#ffe171',
      'circle-opacity': eventIconId ? 0 : 1,
    },
  })

  if (eventIconId) {
    map.addLayer({
      id: LAYER_EVENT_ICON,
      type: 'symbol',
      source: SOURCE_EVENT,
      filter: ['!=', ['get', 'icon_id'], ''],
      layout: {
        'icon-image': ['get', 'icon_id'],
        'icon-size': eventIconSizeExpression,
        'icon-anchor': 'bottom',
        'icon-offset': ['literal', [EVENT_SPRITE.iconOffsetX, EVENT_SPRITE.iconOffsetY]],
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
        'icon-padding': 0,
      },
      paint: {
        'icon-opacity': 1,
      },
    })
  }

  map.addLayer({
    id: LAYER_EVENT_LABEL,
    type: 'symbol',
    source: SOURCE_EVENT,
    minzoom: 14,
    layout: {
      'text-field': ['get', 'name'],
      'text-font': ['Open Sans Bold'],
      'text-size': ['interpolate', ['linear'], ['zoom'], 14, 11, 17, 14],
      'text-anchor': 'bottom',
      'text-offset': ['literal', [0, -4]],
      'text-allow-overlap': true,
      'text-ignore-placement': true,
    },
    paint: {
      'text-color': '#ffe171',
      'text-halo-color': 'rgba(18, 15, 44, 0.96)',
      'text-halo-width': 2.6,
      'text-opacity': 1,
    },
  })

  map.addLayer({
    id: LAYER_EVENT_HIT,
    type: 'circle',
    source: SOURCE_EVENT,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 12, 26, 15, 42, 18, 62],
      'circle-color': '#ffffff',
      'circle-opacity': 0,
    },
  })

  startEventAnimation()
}

function startEventAnimation() {
  stopEventAnimation()

  const animate = () => {
    if (!map || !map.getLayer(LAYER_EVENT_RING)) return

    eventAnimationFrame += 0.022

    const pulse = (Math.sin(eventAnimationFrame) + 1) / 2
    const radius = 20 + pulse * 18
    const opacity = 0.35 + (1 - pulse) * 0.55

    map.setPaintProperty(LAYER_EVENT_RING, 'circle-radius', [
      'interpolate',
      ['linear'],
      ['zoom'],
      12,
      radius * 0.55,
      15,
      radius,
      18,
      radius * 1.45,
    ])

    map.setPaintProperty(LAYER_EVENT_RING, 'circle-opacity', opacity)
    map.setPaintProperty(LAYER_EVENT_GLOW, 'circle-opacity', 0.18 + pulse * 0.14)

    eventAnimationRequest = window.requestAnimationFrame(animate)
  }

  eventAnimationRequest = window.requestAnimationFrame(animate)
}

function stopEventAnimation() {
  if (eventAnimationRequest) {
    window.cancelAnimationFrame(eventAnimationRequest)
    eventAnimationRequest = null
  }
}

function bindInteractions() {
  if (!map) return

  map.on('click', LAYER_POINTS_HIT, handlePointClick)
  map.on('mouseenter', LAYER_POINTS_HIT, setPointerCursor)
  map.on('mouseleave', LAYER_POINTS_HIT, resetCursor)

  map.on('click', LAYER_EVENT_HIT, handleEventClick)
  map.on('mouseenter', LAYER_EVENT_HIT, setPointerCursor)
  map.on('mouseleave', LAYER_EVENT_HIT, resetCursor)
}

function setPointerCursor() {
  if (!map) return
  map.getCanvas().style.cursor = 'pointer'
}

function resetCursor() {
  if (!map) return
  map.getCanvas().style.cursor = ''
}

function getNearestFeature(event: MapLayerMouseEvent) {
  if (!map) return null

  const features = map.queryRenderedFeatures(event.point, {
    layers: [LAYER_POINTS_HIT],
  })

  if (!features.length) return null

  let nearest = features[0]
  let nearestDistance = Number.POSITIVE_INFINITY

  for (const feature of features) {
    if (feature.geometry.type !== 'Point') continue

    const coordinates = feature.geometry.coordinates as [number, number]
    const projected = map.project(coordinates)
    const distance = Math.hypot(projected.x - event.point.x, projected.y - event.point.y)

    if (distance < nearestDistance) {
      nearest = feature
      nearestDistance = distance
    }
  }

  if (nearestDistance > 34) return null

  return nearest
}

function handlePointClick(event: MapLayerMouseEvent) {
  const feature = getNearestFeature(event)
  const slug = String(feature?.properties?.slug ?? '')
  const point = visiblePoints.value.find((item) => item.slug === slug)

  if (!point || !map) return

  selectedPoint.value = point
  updateSelectedSource()

  emit('selectPoint', point)

  map.easeTo({
    center: [point.lng, point.lat],
    zoom: Math.max(map.getZoom(), 16.35),
    pitch: 20,
    bearing: map.getBearing(),
    duration: 560,
    padding: {
      top: 110,
      right: window.innerWidth >= 1200 ? 560 : window.innerWidth >= 900 ? 470 : 32,
      bottom: window.innerWidth >= 900 ? 120 : 300,
      left: 32,
    },
  })
}

function handleEventClick() {
  flyToDemoEvent()
}

function updatePointSource() {
  if (!map) return

  const source = map.getSource(SOURCE_POINTS) as GeoJSONSource | undefined

  if (!source) return

  source.setData(buildPointCollection())
  updateSelectedSource()
}

function updateSelectedSource() {
  if (!map) return

  const source = map.getSource(SOURCE_SELECTED) as GeoJSONSource | undefined

  if (!source) return

  source.setData(buildSelectedCollection())
}

function updateEventSource() {
  if (!map) return

  const source = map.getSource(SOURCE_EVENT) as GeoJSONSource | undefined

  if (!source) return

  source.setData(buildEventCollection())
}

function getBounds(points: RoutePoint[]): LngLatBoundsLike | null {
  if (!points.length) return null

  const bounds = new maplibregl.LngLatBounds()

  points.forEach((point) => {
    bounds.extend([point.lng, point.lat])
  })

  return bounds
}

function fitToAllPoints(animated = true) {
  if (!map) return

  selectedPoint.value = null
  updateSelectedSource()

  const points = visiblePoints.value.length ? visiblePoints.value : routeStore.publicPoints
  const bounds = getBounds(points)

  if (!bounds) {
    map.easeTo({
      center: ACANCEH_CENTER,
      zoom: ACANCEH_ZOOM,
      pitch: 14,
      bearing: -2,
      duration: animated ? 700 : 0,
    })

    return
  }

  map.fitBounds(bounds, {
    padding: {
      top: 130,
      right: window.innerWidth >= 1200 ? 540 : window.innerWidth >= 900 ? 450 : 50,
      bottom: window.innerWidth >= 900 ? 90 : 220,
      left: 50,
    },
    maxZoom: 15.1,
    duration: animated ? 800 : 0,
  })

  window.setTimeout(() => {
    map?.easeTo({
      pitch: 14,
      bearing: -2,
      duration: animated ? 260 : 0,
    })
  }, 150)
}

function flyToDemoEvent() {
  if (!map) return

  map.easeTo({
    center: [DEMO_EVENT.lng, DEMO_EVENT.lat],
    zoom: 16.75,
    pitch: 24,
    bearing: -4,
    duration: 720,
    padding: {
      top: 145,
      right: window.innerWidth >= 1200 ? 560 : window.innerWidth >= 900 ? 470 : 32,
      bottom: window.innerWidth >= 900 ? 110 : 280,
      left: 32,
    },
  })
}

watch(
  () => visiblePoints.value.map((point) => `${point.id}-${point.status}`).join('|'),
  async () => {
    await nextTick()
    updatePointSource()
  },
)

watch(
  () => props.demoEventActive,
  async () => {
    await nextTick()
    updateEventSource()
  },
)

onMounted(() => {
  createMap()
})

onUnmounted(() => {
  stopEventAnimation()

  if (map) {
    map.remove()
    map = null
  }
})

defineExpose({
  fitToAllPoints,
  flyToDemoEvent,
})
</script>

<template>
  <div ref="mapContainer" class="cf-map-canvas" data-tour="map-canvas"></div>
</template>
