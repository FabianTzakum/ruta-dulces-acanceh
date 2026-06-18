import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { routeDataService } from '@/services/route-data.service'
import type { RouteEvent } from '@/types/event.types'
import type { GalleryItem } from '@/types/gallery.types'
import type { PointCategory, PointStatus, PublicPointCategory, RoutePoint } from '@/types/point.types'
import type { RouteStateManifest } from '@/types/route-state.types'

export const useRouteStore = defineStore('route-store', () => {
  const manifest = ref<RouteStateManifest | null>(null)
  const points = ref<RoutePoint[]>([])
  const events = ref<RouteEvent[]>([])
  const gallery = ref<GalleryItem[]>([])

  const selectedCategory = ref<PublicPointCategory | 'all'>('all')
  const selectedStatus = ref<PointStatus | 'all'>('all')
  const searchTerm = ref('')

  const isLoading = ref(false)
  const isRefreshing = ref(false)
  const errorMessage = ref<string | null>(null)

  const publicPoints = computed(() => {
    return points.value.filter((point) => point.category !== 'event')
  })

  const activeEvents = computed(() => {
    return events.value.filter((event) => event.status === 'active')
  })

  const pointsWithCandies = computed(() => {
    return publicPoints.value.filter((point) => point.status === 'with_candies')
  })

  const pointsFewCandies = computed(() => {
    return publicPoints.value.filter((point) => point.status === 'few_candies')
  })

  const pointsNoCandies = computed(() => {
    return publicPoints.value.filter((point) => point.status === 'no_candies')
  })

  const filteredPoints = computed(() => {
    const term = searchTerm.value.trim().toLowerCase()

    return publicPoints.value.filter((point) => {
      const matchesCategory =
        selectedCategory.value === 'all' || point.category === selectedCategory.value

      const matchesStatus = selectedStatus.value === 'all' || point.status === selectedStatus.value

      const matchesTerm =
        term.length === 0 ||
        point.name.toLowerCase().includes(term) ||
        point.address.toLowerCase().includes(term) ||
        point.category_label.toLowerCase().includes(term)

      return matchesCategory && matchesStatus && matchesTerm
    })
  })

  const stats = computed(() => ({
    total: publicPoints.value.length,
    active: publicPoints.value.length,
    withCandies: pointsWithCandies.value.length,
    fewCandies: pointsFewCandies.value.length,
    noCandies: pointsNoCandies.value.length,
    events: activeEvents.value.length,

    available: pointsWithCandies.value.length,
    low: pointsFewCandies.value.length,
    empty: pointsNoCandies.value.length,
  }))

  async function bootstrap() {
    if (isLoading.value) return

    isLoading.value = true
    errorMessage.value = null

    try {
      const nextManifest = await routeDataService.getManifest()

      const [nextPoints, nextEvents, nextGallery] = await Promise.all([
        routeDataService.getPoints(nextManifest.points_url),
        routeDataService.getEvents(nextManifest.events_url),
        routeDataService.getGallery(nextManifest.gallery_url),
      ])

      manifest.value = nextManifest
      points.value = nextPoints
      events.value = nextEvents
      gallery.value = nextGallery
    } catch (error) {
      errorMessage.value =
        error instanceof Error ? error.message : 'No se pudieron cargar los datos de la ruta.'
    } finally {
      isLoading.value = false
    }
  }

  async function refreshIfNeeded() {
    if (isRefreshing.value) return

    isRefreshing.value = true

    try {
      const nextManifest = await routeDataService.getManifest()

      if (!manifest.value || nextManifest.version !== manifest.value.version) {
        const [nextPoints, nextEvents, nextGallery] = await Promise.all([
          routeDataService.getPoints(nextManifest.points_url),
          routeDataService.getEvents(nextManifest.events_url),
          routeDataService.getGallery(nextManifest.gallery_url),
        ])

        manifest.value = nextManifest
        points.value = nextPoints
        events.value = nextEvents
        gallery.value = nextGallery
      }
    } catch (error) {
      errorMessage.value =
        error instanceof Error ? error.message : 'No se pudo actualizar la información.'
    } finally {
      isRefreshing.value = false
    }
  }

  function findPointBySlug(slug: string) {
    return points.value.find((point) => point.slug === slug) ?? null
  }

  function findActiveEventByPointSlug(slug: string) {
    return activeEvents.value.find((event) => event.point_slug === slug) ?? null
  }

  function setCategory(category: PublicPointCategory | 'all') {
    selectedCategory.value = category
  }

  function setStatus(status: PointStatus | 'all') {
    selectedStatus.value = status
  }

  function setSearchTerm(value: string) {
    searchTerm.value = value
  }

  function clearFilters() {
    selectedCategory.value = 'all'
    selectedStatus.value = 'all'
    searchTerm.value = ''
  }

  return {
    manifest,
    points,
    publicPoints,
    events,
    gallery,
    selectedCategory,
    selectedStatus,
    searchTerm,
    isLoading,
    isRefreshing,
    errorMessage,
    activeEvents,
    pointsWithCandies,
    pointsFewCandies,
    pointsNoCandies,
    filteredPoints,
    stats,
    bootstrap,
    refreshIfNeeded,
    findPointBySlug,
    findActiveEventByPointSlug,
    setCategory,
    setStatus,
    setSearchTerm,
    clearFilters,
  }
})
