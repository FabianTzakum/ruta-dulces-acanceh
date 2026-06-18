<script setup lang="ts">
import { computed } from 'vue'

import { useRouteStore } from '@/app/stores/route.store'
import GalleryCard from '@/components/gallery/GalleryCard.vue'

const routeStore = useRouteStore()

const featuredPhoto = computed(() => routeStore.gallery[0] ?? null)

const secondaryPhotos = computed(() => routeStore.gallery.slice(1))

const storyItems = computed(() => {
  return routeStore.gallery.slice(0, 8)
})

const galleryStats = computed(() => [
  {
    label: 'Fotos',
    value: routeStore.gallery.length,
    icon: 'photo_library',
  },
  {
    label: 'Puntos',
    value: new Set(routeStore.gallery.map((item) => item.point_slug)).size,
    icon: 'location_on',
  },
  {
    label: 'Activos',
    value: routeStore.stats.withCandies,
    icon: 'bakery_dining',
  },
])

function getPointName(slug: string) {
  return routeStore.findPointBySlug(slug)?.name ?? 'Ruta de los Dulces'
}

function getPointCategory(slug: string) {
  return routeStore.findPointBySlug(slug)?.category_label ?? 'Comunidad'
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
  })
}
</script>

<template>
  <section class="gallery-premium">
    <div class="gallery-mobile-layer">
      <header class="gallery-mobile-hero">
        <div class="gallery-mobile-hero__ambient">
          <span class="gallery-mobile-hero__moon"></span>
          <span class="gallery-mobile-hero__spark">✨</span>
        </div>

        <div class="gallery-mobile-hero__content">
          <p>Comunidad</p>

          <h1>
            Galería
            <strong>de la ruta</strong>
          </h1>

          <span>
            Fotos, disfraces y momentos compartidos por la comunidad durante la Ruta de los Dulces.
          </span>
        </div>
      </header>

      <section v-if="storyItems.length" class="gallery-stories-premium">
        <RouterLink
          v-for="item in storyItems"
          :key="item.id"
          class="gallery-stories-premium__item"
          :to="`/puntos/${item.point_slug}`"
        >
          <img :src="item.image_url" :alt="item.caption" loading="lazy" />

          <span>{{ getPointName(item.point_slug) }}</span>
        </RouterLink>
      </section>

      <section class="gallery-mobile-feed">
        <div class="gallery-mobile-feed__head">
          <div>
            <p>Recientes</p>
            <h2>{{ routeStore.gallery.length }} recuerdos</h2>
          </div>

          <RouterLink to="/mapa">
            <span class="material-symbols-outlined">map</span>
          </RouterLink>
        </div>

        <GalleryCard v-for="item in routeStore.gallery" :key="item.id" :item="item" />
      </section>
    </div>

    <div class="gallery-desktop-layer">
      <header class="gallery-desktop-hero">
        <div class="gallery-desktop-hero__content">
          <span class="gallery-desktop-kicker">Memoria comunitaria</span>

          <h1>
            Galería de
            <strong>la comunidad</strong>
          </h1>

          <p>
            Un espacio para revivir momentos de la Ruta de los Dulces Acanceh: familias,
            disfraces, puntos participantes y escenas de una noche llena de tradición.
          </p>

          <div class="gallery-desktop-hero__actions">
            <RouterLink to="/mapa">
              Abrir mapa
              <span class="material-symbols-outlined">arrow_forward</span>
            </RouterLink>

            <RouterLink to="/guia">
              Ver guía
            </RouterLink>
          </div>
        </div>

        <aside class="gallery-desktop-hero__panel">
          <article v-for="stat in galleryStats" :key="stat.label">
            <span class="material-symbols-outlined">{{ stat.icon }}</span>

            <div>
              <strong>{{ stat.value }}</strong>
              <small>{{ stat.label }}</small>
            </div>
          </article>
        </aside>
      </header>

      <main class="gallery-desktop-layout">
        <section v-if="featuredPhoto" class="gallery-featured">
          <div class="gallery-featured__image">
            <img :src="featuredPhoto.image_url" :alt="featuredPhoto.caption" loading="lazy" />
            <div class="gallery-featured__shade"></div>
          </div>

          <div class="gallery-featured__content">
            <span class="gallery-desktop-kicker">Foto destacada</span>

            <h2>{{ getPointName(featuredPhoto.point_slug) }}</h2>

            <p>{{ featuredPhoto.caption }}</p>

            <div class="gallery-featured__meta">
              <span>
                <span class="material-symbols-outlined">person</span>
                {{ featuredPhoto.author }}
              </span>

              <span>
                <span class="material-symbols-outlined">event</span>
                {{ formatDate(featuredPhoto.created_at) }}
              </span>

              <span>
                <span class="material-symbols-outlined">category</span>
                {{ getPointCategory(featuredPhoto.point_slug) }}
              </span>
            </div>

            <RouterLink :to="`/puntos/${featuredPhoto.point_slug}`">
              Ver punto
              <span class="material-symbols-outlined">arrow_forward</span>
            </RouterLink>
          </div>
        </section>

        <aside class="gallery-activity-panel">
          <div class="gallery-activity-panel__head">
            <span class="material-symbols-outlined">auto_awesome</span>

            <div>
              <h2>Actividad reciente</h2>
              <p>Últimas publicaciones de la comunidad.</p>
            </div>
          </div>

          <div class="gallery-activity-panel__list">
            <RouterLink
              v-for="item in routeStore.gallery.slice(0, 5)"
              :key="`activity-${item.id}`"
              :to="`/puntos/${item.point_slug}`"
            >
              <img :src="item.image_url" :alt="item.caption" loading="lazy" />

              <div>
                <strong>{{ getPointName(item.point_slug) }}</strong>
                <small>{{ item.author }} · {{ formatDate(item.created_at) }}</small>
              </div>
            </RouterLink>
          </div>
        </aside>

        <section class="gallery-desktop-feed">
          <div class="gallery-desktop-feed__head">
            <div>
              <span class="gallery-desktop-kicker">Recuerdos</span>
              <h2>Momentos de la ruta</h2>
            </div>

            <RouterLink to="/puntos">
              Explorar puntos
              <span class="material-symbols-outlined">near_me</span>
            </RouterLink>
          </div>

          <div v-if="secondaryPhotos.length" class="gallery-bento-grid">
            <RouterLink
              v-for="(item, index) in secondaryPhotos"
              :key="item.id"
              class="gallery-bento-card"
              :class="{
                'gallery-bento-card--wide': index % 7 === 0,
                'gallery-bento-card--tall': index % 5 === 0,
              }"
              :to="`/puntos/${item.point_slug}`"
            >
              <img :src="item.image_url" :alt="item.caption" loading="lazy" />

              <div class="gallery-bento-card__shade"></div>

              <div class="gallery-bento-card__content">
                <span>{{ getPointCategory(item.point_slug) }}</span>

                <h3>{{ getPointName(item.point_slug) }}</h3>

                <p>{{ item.caption }}</p>

                <small>
                  <span class="material-symbols-outlined">person</span>
                  {{ item.author }}
                </small>
              </div>
            </RouterLink>
          </div>

          <section v-else class="gallery-empty-premium">
            <span class="material-symbols-outlined">photo_camera</span>
            <h2>Aún no hay más fotos</h2>
            <p>Cuando la comunidad comparta nuevos momentos aparecerán en esta sección.</p>
          </section>
        </section>
      </main>
    </div>
  </section>
</template>
