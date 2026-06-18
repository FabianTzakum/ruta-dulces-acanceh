import type { Feature, FeatureCollection, Point } from 'geojson'
import type { RoutePoint } from '@/types/point.types'

export interface RoutePointGeoJsonProperties {
  id: number
  slug: string
  name: string
  category: string
  category_label: string
  status: string
  status_label: string
  candies_level: string
  short_description: string
  address: string
  main_image: string
  google_maps_url: string
  updated_at: string
  has_event: boolean
}

export type RoutePointFeature = Feature<Point, RoutePointGeoJsonProperties>

function pointToFeature(point: RoutePoint): RoutePointFeature {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [point.lng, point.lat],
    },
    properties: {
      id: point.id,
      slug: point.slug,
      name: point.name,
      category: point.category,
      category_label: point.category_label,
      status: point.status,
      status_label: point.status_label,
      candies_level: point.candies_level,
      short_description: point.short_description,
      address: point.address,
      main_image: point.main_image,
      google_maps_url: point.google_maps_url,
      updated_at: point.updated_at,
      has_event: point.has_event,
    },
  }
}

export function pointsToGeoJson(points: RoutePoint[]): FeatureCollection<Point, RoutePointGeoJsonProperties> {
  return {
    type: 'FeatureCollection',
    features: points.map(pointToFeature),
  }
}

export function getPointBounds(points: RoutePoint[]): [[number, number], [number, number]] | null {
  if (points.length === 0) return null

  const lngs = points.map((point) => point.lng)
  const lats = points.map((point) => point.lat)

  return [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)],
  ]
}

export function getGoogleMapsUrl(lat: number, lng: number) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
}
