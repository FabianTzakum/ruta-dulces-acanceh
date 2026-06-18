export type MapSpecialEvent = {
  id: string
  slug: string
  name: string
  description: string
  location_name: string
  lng: number
  lat: number
  starts_at: string
  ends_at: string
  facebook_live_url?: string
  facebook_event_url?: string
  google_maps_url: string
}
