<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useRouteStore } from '@/app/stores/route.store'
import PointCategoryIcon from '@/components/points/PointCategoryIcon.vue'
import PointStatusBadge from '@/components/points/PointStatusBadge.vue'

const route = useRoute()
const routeStore = useRouteStore()

const slug = computed(() => String(route.params.slug ?? ''))

const point = computed(() => routeStore.findPointBySlug(slug.value))

const activeEventForPoint = computed(() => {
  if (!point.value) return null

  return routeStore.activeEvents.find((event) => event.point_slug === point.value?.slug) ?? null
})

const nearbyPoints = computed(() => {
  if (!point.value) return []

  return routeStore.points
    .filter((item) => item.slug !== point.value?.slug)
    .filter((item) => item.category === point.value?.category || item.status === 'with_candies')
    .slice(0, 4)
})

const communityPhotos = computed(() => {
  if (!point.value) return []

  return routeStore.gallery.filter((item) => item.point_slug === point.value?.slug).slice(0, 6)
})

const galleryImages = computed(() => {
  if (!point.value) return []

  const baseGallery = point.value.gallery ?? []
  const communityGallery = communityPhotos.value.map((item) => item.image_url)

  return [...baseGallery, ...communityGallery].slice(0, 8)
})

const updatedAt = computed(() => {
  if (!point.value) return ''

  return new Date(point.value.updated_at).toLocaleString('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
})

const candyLevel = computed(() => {
  if (!point.value) return 0

  const values: Record<string, number> = {
    with_candies: 86,
    few_candies: 38,
    no_candies: 0,
  }

  return values[point.value.status] ?? 0
})

const candyText = computed(() => {
  if (!point.value) return ''

  const values: Record<string, string> = {
    with_candies: 'Este punto reporta dulces disponibles para recibir visitantes.',
    few_candies: 'Este punto reporta pocos dulces. Puede quedarse sin dulces pronto.',
    no_candies: 'Este punto reporta que ya no tiene dulces disponibles por ahora.',
  }

  return values[point.value.status] ?? 'Consulta el estado antes de visitar el punto.'
})

const candyShortText = computed(() => {
  if (!point.value) return ''

  const values: Record<string, string> = {
    with_candies: 'Buen nivel',
    few_candies: 'Nivel bajo',
    no_candies: 'Sin dulces',
  }

  return values[point.value.status] ?? 'Estado'
})

const detailStats = computed(() => {
  if (!point.value) return []

  return [
    {
      label: 'Tipo de punto',
      value: point.value.category_label,
      icon: 'category',
    },
    {
      label: 'Estado',
      value: point.value.status_label,
      icon: 'bakery_dining',
    },
    {
      label: 'Nivel',
      value: `${candyLevel.value}%`,
      icon: 'monitoring',
    },
  ]
})
</script>

<template>
  <section v-if="point" class="point-detail-premium">
    <header class="point-detail-premium__hero">
      <div class="point-detail-premium__media">
        <img :src="point.main_image" :alt="point.name" />
      </div>

      <div class="point-detail-premium__veil"></div>

      <RouterLink class="point-detail-premium__back" to="/puntos">
        <span class="material-symbols-outlined">arrow_back</span>
        <span>Volver</span>
      </RouterLink>

      <div class="point-detail-premium__hero-inner">
        <div class="point-detail-premium__hero-content">
          <div class="point-detail-premium__badges">
            <PointStatusBadge :status="point.status" :label="point.status_label" />

            <span class="point-detail-premium__category">
              <PointCategoryIcon :category="point.category" />
              {{ point.category_label }}
            </span>

            <span v-if="activeEventForPoint" class="point-detail-premium__event">
              <span class="material-symbols-outlined">festival</span>
              Evento activo
            </span>
          </div>

          <h1>{{ point.name }}</h1>

          <p>
            <span class="material-symbols-outlined">location_on</span>
            {{ point.address }}
          </p>

          <div class="point-detail-premium__hero-actions">
            <a :href="point.google_maps_url" target="_blank" rel="noreferrer">
              <span class="material-symbols-outlined">near_me</span>
              Cómo llegar
            </a>

            <RouterLink to="/mapa">
              Ver en mapa
            </RouterLink>
          </div>
        </div>

        <aside class="point-detail-premium__hero-panel">
          <div class="point-detail-premium__hero-panel-top">
            <span class="material-symbols-outlined">inventory_2</span>

            <div>
              <strong>{{ candyShortText }}</strong>
              <small>{{ point.status_label }}</small>
            </div>
          </div>

          <div class="point-detail-premium__meter">
            <div>
              <span>Nivel de dulces</span>
              <strong>{{ candyLevel }}%</strong>
            </div>

            <div class="point-detail-premium__meter-track">
              <i :style="{ width: `${candyLevel}%` }"></i>
            </div>

            <p>{{ candyText }}</p>
          </div>
        </aside>
      </div>
    </header>

    <main class="point-detail-premium__content">
      <section class="point-detail-premium__stats">
        <article v-for="stat in detailStats" :key="stat.label">
          <span class="material-symbols-outlined">{{ stat.icon }}</span>

          <div>
            <strong>{{ stat.value }}</strong>
            <small>{{ stat.label }}</small>
          </div>
        </article>
      </section>

      <div class="point-detail-premium__grid">
        <div class="point-detail-premium__main">
          <section class="point-detail-panel point-detail-panel--story">
            <div class="point-detail-section-head">
              <span>Historia del punto</span>
              <h2>Qué encontrarás aquí</h2>
            </div>

            <p>{{ point.description }}</p>

            <div class="point-detail-panel__note">
              <span class="material-symbols-outlined">auto_awesome</span>

              <div>
                <strong>Recorrido recomendado</strong>
                <small>
                  Consulta el estado antes de llegar. La disponibilidad puede cambiar durante la noche.
                </small>
              </div>
            </div>
          </section>

          <section v-if="activeEventForPoint" class="point-detail-panel point-detail-panel--event">
            <div class="point-detail-panel__event-icon">
              <span class="material-symbols-outlined">festival</span>
            </div>

            <div>
              <span>Evento activo</span>
              <h2>{{ activeEventForPoint.title }}</h2>
              <p>{{ activeEventForPoint.description }}</p>
            </div>
          </section>

          <section class="point-detail-panel point-detail-panel--gallery">
            <div class="point-detail-section-head">
              <span>Memoria visual</span>
              <h2>Galería del punto</h2>
            </div>

            <div v-if="galleryImages.length" class="point-detail-gallery-grid">
              <img
                v-for="(image, index) in galleryImages"
                :key="`${image}-${index}`"
                :class="{ 'point-detail-gallery-grid__main': index === 0 }"
                :src="image"
                :alt="`Imagen de ${point.name}`"
                loading="lazy"
              />
            </div>

            <div v-else class="point-detail-empty-gallery">
              <span class="material-symbols-outlined">photo_camera</span>
              <h3>Aún no hay fotos</h3>
              <p>Cuando la comunidad suba fotos de este punto aparecerán aquí.</p>
            </div>
          </section>

          <section v-if="communityPhotos.length" class="point-detail-panel point-detail-panel--community">
            <div class="point-detail-section-head">
              <span>Comunidad</span>
              <h2>Publicaciones recientes</h2>
            </div>

            <div class="point-detail-community-list">
              <article v-for="photo in communityPhotos" :key="photo.id">
                <img :src="photo.image_url" :alt="photo.caption" loading="lazy" />

                <div>
                  <strong>{{ photo.author }}</strong>
                  <p>{{ photo.caption }}</p>
                </div>
              </article>
            </div>
          </section>
        </div>

        <aside class="point-detail-premium__aside">
          <section class="point-detail-action-card">
            <div>
              <span class="point-detail-action-card__icon material-symbols-outlined">near_me</span>
              <h2>Ir a este punto</h2>
              <p>Abre la ubicación exacta del punto en Google Maps para iniciar el recorrido.</p>
            </div>

            <a :href="point.google_maps_url" target="_blank" rel="noreferrer">
              Abrir Google Maps
              <span class="material-symbols-outlined">arrow_forward</span>
            </a>

            <RouterLink to="/mapa">
              Ver dentro del mapa
            </RouterLink>
          </section>

          <section class="point-detail-side-panel">
            <div class="point-detail-section-head">
              <span>Actualización</span>
              <h2>Estado actual</h2>
            </div>

            <PointStatusBadge :status="point.status" :label="point.status_label" />

            <p>{{ candyText }}</p>

            <small>
              <span class="material-symbols-outlined">schedule</span>
              Actualizado {{ updatedAt }}
            </small>
          </section>

          <section v-if="nearbyPoints.length" class="point-detail-side-panel">
            <div class="point-detail-section-head">
              <span>Cerca de aquí</span>
              <h2>También puedes visitar</h2>
            </div>

            <div class="point-detail-nearby-list">
              <RouterLink
                v-for="nearby in nearbyPoints"
                :key="nearby.id"
                :to="`/puntos/${nearby.slug}`"
              >
                <img :src="nearby.main_image" :alt="nearby.name" loading="lazy" />

                <div>
                  <strong>{{ nearby.name }}</strong>
                  <small>{{ nearby.status_label }}</small>
                </div>
              </RouterLink>
            </div>
          </section>
        </aside>
      </div>
    </main>
  </section>

  <section v-else class="point-detail-not-found">
    <span class="material-symbols-outlined">travel_explore</span>

    <h1>Punto no encontrado</h1>

    <p>Puede que el enlace haya cambiado o que el punto aún no esté disponible.</p>

    <RouterLink to="/puntos">
      Volver a puntos
    </RouterLink>
  </section>
</template>
