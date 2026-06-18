export type RouteEventStatus = 'scheduled' | 'active' | 'finished'

export interface RouteEvent {
  id: number
  slug: string
  title: string
  description: string
  point_slug: string
  starts_at: string
  status: RouteEventStatus
  animation: string
}
