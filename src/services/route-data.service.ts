import type { RouteEvent } from '@/types/event.types'
import type { GalleryItem } from '@/types/gallery.types'
import type { CandiesLevel, PointCategory, PointStatus, RoutePoint } from '@/types/point.types'
import type { RouteStateManifest } from '@/types/route-state.types'

interface RawRoutePoint {
  id: number
  slug: string
  name: string
  category: string
  category_label?: string
  status: string
  status_label?: string
  candies_level?: string
  short_description?: string
  description?: string
  address?: string
  lat: number
  lng: number
  main_image?: string
  gallery?: string[]
  google_maps_url?: string
  updated_at?: string
  has_event?: boolean
}

async function getJson<T>(url: string, noStore = false): Promise<T> {
  const response = await fetch(url, {
    cache: noStore ? 'no-store' : 'default',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`No se pudo cargar ${url}. Código HTTP: ${response.status}`)
  }

  return (await response.json()) as T
}

function normalizeCategory(category: string): PointCategory {
  const value = category.trim().toLowerCase()

  if (value === 'business') return 'business'
  if (value === 'house') return 'house'
  if (value === 'institution') return 'institution'
  if (value === 'event') return 'event'

  return 'business'
}

function getCategoryLabel(category: PointCategory, currentLabel?: string) {
  if (currentLabel && currentLabel.trim().length > 0) return currentLabel

  const labels: Record<PointCategory, string> = {
    business: 'Negocio',
    house: 'Casa participante',
    institution: 'Institución',
    event: 'Evento',
  }

  return labels[category]
}

function normalizeStatus(status: string): PointStatus {
  const value = status.trim().toLowerCase()

  if (value === 'with_candies') return 'with_candies'
  if (value === 'few_candies') return 'few_candies'
  if (value === 'no_candies') return 'no_candies'

  if (value === 'available') return 'with_candies'
  if (value === 'low') return 'few_candies'
  if (value === 'empty') return 'no_candies'
  if (value === 'closed') return 'no_candies'
  if (value === 'unknown') return 'with_candies'
  if (value === 'event_active') return 'with_candies'

  return 'with_candies'
}

function getStatusLabel(status: PointStatus): string {
  const labels: Record<PointStatus, string> = {
    with_candies: 'Con dulces',
    few_candies: 'Pocos dulces',
    no_candies: 'Sin dulces',
  }

  return labels[status]
}

function getCandiesLevel(status: PointStatus, currentLevel?: string): CandiesLevel {
  if (currentLevel === 'high') return 'high'
  if (currentLevel === 'medium') return 'medium'
  if (currentLevel === 'low') return 'low'
  if (currentLevel === 'empty') return 'empty'

  const levels: Record<PointStatus, CandiesLevel> = {
    with_candies: 'high',
    few_candies: 'low',
    no_candies: 'empty',
  }

  return levels[status]
}

function fallbackImage(category: PointCategory) {
  const images: Record<PointCategory, string> = {
    business:
      'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=1200&q=80',
    house:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    institution:
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1200&q=80',
    event:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
  }

  return images[category]
}

function fallbackMapsUrl(point: RawRoutePoint) {
  return `https://www.google.com/maps?q=${point.lat},${point.lng}`
}

function normalizePoint(point: RawRoutePoint): RoutePoint {
  const category = normalizeCategory(point.category)
  const status = normalizeStatus(point.status)
  const mainImage = point.main_image || fallbackImage(category)

  return {
    id: point.id,
    slug: point.slug,
    name: point.name,
    category,
    category_label: getCategoryLabel(category, point.category_label),
    status,
    status_label: getStatusLabel(status),
    candies_level: getCandiesLevel(status, point.candies_level),
    short_description: point.short_description || 'Punto participante de la Ruta de los Dulces Acanceh.',
    description:
      point.description ||
      'Este punto forma parte de la Ruta de los Dulces Acanceh. Consulta su disponibilidad antes de visitarlo y sigue las recomendaciones de la guía.',
    address: point.address || 'Acanceh, Yucatán',
    lat: point.lat,
    lng: point.lng,
    main_image: mainImage,
    gallery: point.gallery?.length ? point.gallery : [mainImage],
    google_maps_url: point.google_maps_url || fallbackMapsUrl(point),
    updated_at: point.updated_at || new Date().toISOString(),
    has_event: Boolean(point.has_event),
  }
}

export const routeDataService = {
  getManifest() {
    return getJson<RouteStateManifest>('/data/route-state.json', true)
  },

  async getPoints(url: string) {
    const points = await getJson<RawRoutePoint[]>(url)
    return points.map(normalizePoint)
  },

  getEvents(url: string) {
    return getJson<RouteEvent[]>(url)
  },

  getGallery(url: string) {
    return getJson<GalleryItem[]>(url)
  },
}
