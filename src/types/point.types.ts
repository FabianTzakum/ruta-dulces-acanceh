export type PointCategory = 'business' | 'house' | 'institution' | 'event'

export type PublicPointCategory = 'business' | 'house' | 'institution'

export type PointStatus = 'with_candies' | 'few_candies' | 'no_candies'

export type CandiesLevel = 'high' | 'medium' | 'low' | 'empty'

export interface RoutePoint {
  id: number
  slug: string
  name: string
  category: PointCategory
  category_label: string
  status: PointStatus
  status_label: string
  candies_level: CandiesLevel
  short_description: string
  description: string
  address: string
  lat: number
  lng: number
  main_image: string
  gallery: string[]
  google_maps_url: string
  updated_at: string
  has_event: boolean
}
