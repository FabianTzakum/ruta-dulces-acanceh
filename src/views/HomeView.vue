<script setup lang="ts">
import { computed } from 'vue'

import { useRouteStore } from '@/app/stores/route.store'
import LoadingRoute from '@/components/common/LoadingRoute.vue'

const routeStore = useRouteStore()

const stats = computed(() => [
  {
    label: 'Puntos cargados',
    value: routeStore.stats.total,
    icon: 'location_on',
    tone: 'primary',
  },
  {
    label: 'Con dulces',
    value: routeStore.stats.withCandies,
    icon: 'bakery_dining',
    tone: 'green',
  },
  {
    label: 'Pocos dulces',
    value: routeStore.stats.fewCandies,
    icon: 'warning',
    tone: 'amber',
  },
  {
    label: 'Sin dulces',
    value: routeStore.stats.noCandies,
    icon: 'block',
    tone: 'red',
  },
])

const experienceItems = computed(() => [
  {
    title: 'Mapa nocturno',
    text: 'Explora la ruta completa, filtra puntos y abre la ubicación exacta en Google Maps.',
    icon: 'travel_explore',
    to: '/mapa',
    className: 'home-experience__card--map',
    metric: `${routeStore.filteredPoints.length} visibles`,
  },
  {
    title: 'Puntos participantes',
    text: 'Consulta negocios, casas e instituciones con estado actualizado de dulces.',
    icon: 'storefront',
    to: '/puntos',
    className: 'home-experience__card--points',
    metric: `${routeStore.stats.total} puntos`,
  },
  {
    title: 'Galería comunitaria',
    text: 'Revive momentos, disfraces, familias y fotografías de la comunidad.',
    icon: 'photo_library',
    to: '/galeria',
    className: 'home-experience__card--gallery',
    metric: `${routeStore.gallery.length} fotos`,
  },
  {
    title: 'Guía familiar',
    text: 'Reglas, recomendaciones y pasos para disfrutar el recorrido de forma segura.',
    icon: 'shield_person',
    to: '/guia',
    className: 'home-experience__card--guide',
    metric: 'Manual',
  },
])

const activeEvent = computed(() => routeStore.activeEvents[0] ?? null)

const updatedAt = computed(() => {
  if (!routeStore.manifest) return 'Cargando...'

  return new Date(routeStore.manifest.updated_at).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  })
})
</script>

<template>
  <LoadingRoute v-if="routeStore.isLoading" />

  <section v-else class="home-premium">
    <header class="home-premium-hero">
      <div class="home-premium-hero__media">
        <img
          src="https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?auto=format&fit=crop&w=1800&q=80"
          alt="Noche festiva con luces cálidas"
        />
      </div>

      <div class="home-premium-hero__veil"></div>

      <div class="home-premium-hero__ornament home-premium-hero__ornament--one"></div>
      <div class="home-premium-hero__ornament home-premium-hero__ornament--two"></div>

      <div class="home-premium-hero__inner">
        <div class="home-premium-hero__content">
          <div class="home-premium-hero__status">
            <span></span>
            Ruta comunitaria · Acanceh
          </div>

          <h1>
            La noche de los dulces
            <strong>ha llegado</strong>
          </h1>

          <p>
            Una experiencia digital para recorrer negocios, casas e instituciones participantes
            durante la Ruta de los Dulces Acanceh.
          </p>

          <div class="home-premium-hero__actions">
            <RouterLink class="home-premium-hero__primary" to="/mapa">
              Iniciar recorrido
              <span class="material-symbols-outlined">arrow_forward</span>
            </RouterLink>

            <RouterLink class="home-premium-hero__secondary" to="/puntos">
              Ver puntos
            </RouterLink>
          </div>
        </div>

        <aside class="home-premium-hero__panel">
          <div class="home-premium-hero__panel-top">
            <span class="material-symbols-outlined">auto_awesome</span>

            <div>
              <strong>Estado de la ruta</strong>
              <small>Última actualización {{ updatedAt }}</small>
            </div>
          </div>

          <div class="home-premium-hero__panel-grid">
            <article>
              <span>{{ routeStore.stats.withCandies }}</span>
              <small>con dulces</small>
            </article>

            <article>
              <span>{{ routeStore.stats.fewCandies }}</span>
              <small>pocos dulces</small>
            </article>

            <article>
              <span>{{ routeStore.stats.noCandies }}</span>
              <small>sin dulces</small>
            </article>
          </div>

          <RouterLink to="/mapa">
            Ver mapa completo
            <span class="material-symbols-outlined">map</span>
          </RouterLink>
        </aside>
      </div>
    </header>

    <main class="home-premium__content">
      <section class="home-premium-stats">
        <article
          v-for="stat in stats"
          :key="stat.label"
          class="home-premium-stats__item"
          :class="`home-premium-stats__item--${stat.tone}`"
        >
          <span class="material-symbols-outlined">{{ stat.icon }}</span>

          <div>
            <strong>{{ stat.value }}</strong>
            <small>{{ stat.label }}</small>
          </div>
        </article>
      </section>

      <section class="home-premium-tradition">
        <div class="home-premium-tradition__image">
          <img
            src="https://images.unsplash.com/photo-1603618090561-412154b4bd1b?auto=format&fit=crop&w=1400&q=80"
            alt="Luces cálidas de una celebración comunitaria"
            loading="lazy"
          />

          <div class="home-premium-tradition__quote">
            <span class="material-symbols-outlined">format_quote</span>
            <p>Una ruta para caminar en familia, compartir tradición y celebrar la comunidad.</p>
          </div>
        </div>

        <div class="home-premium-tradition__text">
          <span class="home-premium-kicker">Tradición viva</span>

          <h2>Acanceh convertido en una ruta familiar</h2>

          <p>
            La Ruta de los Dulces reúne a la comunidad en una experiencia nocturna donde cada punto
            participante puede compartir dulces, actividades y momentos especiales con las familias.
          </p>

          <p>
            La app ayuda a ubicar los puntos, consultar la disponibilidad de dulces y recorrer de
            forma más ordenada las calles de Acanceh.
          </p>

          <div class="home-premium-tradition__features">
            <article>
              <span class="material-symbols-outlined">groups</span>
              <strong>Comunidad</strong>
              <small>Casas, negocios e instituciones en una sola ruta.</small>
            </article>

            <article>
              <span class="material-symbols-outlined">family_restroom</span>
              <strong>Familias</strong>
              <small>Recorrido pensado para niñas, niños y acompañantes.</small>
            </article>
          </div>
        </div>
      </section>

      <section class="home-experience">
        <div class="home-premium-section-head">
          <span class="home-premium-kicker">Explora</span>
          <h2>Una app para vivir la ruta</h2>
          <p>
            Cada sección está pensada para resolver una necesidad real del recorrido: ubicación,
            disponibilidad, guía y memoria visual.
          </p>
        </div>

        <div class="home-experience__grid">
          <RouterLink
            v-for="item in experienceItems"
            :key="item.title"
            class="home-experience__card"
            :class="item.className"
            :to="item.to"
          >
            <div class="home-experience__icon">
              <span class="material-symbols-outlined">{{ item.icon }}</span>
            </div>

            <span class="home-experience__metric">{{ item.metric }}</span>

            <div class="home-experience__text">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>

            <span class="home-experience__arrow material-symbols-outlined">arrow_forward</span>
          </RouterLink>
        </div>
      </section>

      <section class="home-route-state">
        <div class="home-route-state__content">
          <span class="home-premium-kicker">Disponibilidad</span>

          <h2>Estados simples para tomar decisiones rápidas</h2>

          <p>
            La ruta pública usa únicamente tres estados: con dulces, pocos dulces y sin dulces.
            Los eventos aparecerán aparte cuando sean activados por administración.
          </p>
        </div>

        <div class="home-route-state__states">
          <article class="home-route-state__state home-route-state__state--with">
            <span class="material-symbols-outlined">bakery_dining</span>
            <strong>Con dulces</strong>
            <small>{{ routeStore.stats.withCandies }} puntos</small>
          </article>

          <article class="home-route-state__state home-route-state__state--few">
            <span class="material-symbols-outlined">warning</span>
            <strong>Pocos dulces</strong>
            <small>{{ routeStore.stats.fewCandies }} puntos</small>
          </article>

          <article class="home-route-state__state home-route-state__state--none">
            <span class="material-symbols-outlined">block</span>
            <strong>Sin dulces</strong>
            <small>{{ routeStore.stats.noCandies }} puntos</small>
          </article>
        </div>
      </section>

      <section v-if="activeEvent" class="home-event-premium">
        <div>
          <span class="home-premium-kicker">Evento activo</span>
          <h2>{{ activeEvent.title }}</h2>
          <p>{{ activeEvent.description }}</p>
        </div>

        <RouterLink to="/mapa">
          Ver en mapa
          <span class="material-symbols-outlined">festival</span>
        </RouterLink>
      </section>

      <section class="home-final-premium">
        <div class="home-final-premium__ambient"></div>

        <div>
          <span class="home-premium-kicker">Todo listo</span>

          <h2>
            Abre el mapa y empieza
            <strong>tu recorrido</strong>
          </h2>

          <p>
            Encuentra puntos cercanos, revisa la disponibilidad y disfruta la Ruta de los Dulces
            Acanceh con una experiencia más clara y ordenada.
          </p>

          <RouterLink to="/mapa">
            Iniciar ruta
            <span class="material-symbols-outlined">near_me</span>
          </RouterLink>
        </div>
      </section>
    </main>
  </section>
</template>
