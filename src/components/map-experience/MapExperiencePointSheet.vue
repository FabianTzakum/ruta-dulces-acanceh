<script setup lang="ts">
import { computed } from 'vue'
import type { RoutePoint } from '@/types/point.types'

const props = defineProps<{
  point: RoutePoint | null
}>()

const emit = defineEmits<{
  close: []
}>()

const statusIcon = computed(() => {
  if (!props.point) return 'bakery_dining'

  const icons: Record<string, string> = {
    with_candies: 'bakery_dining',
    few_candies: 'warning',
    no_candies: 'block',
  }

  return icons[props.point.status] ?? 'bakery_dining'
})

const categoryIcon = computed(() => {
  if (!props.point) return 'location_on'

  const icons: Record<string, string> = {
    business: 'storefront',
    house: 'home',
    institution: 'account_balance',
  }

  return icons[props.point.category] ?? 'location_on'
})

const statusClass = computed(() => {
  if (!props.point) return ''

  return `cf-point-sheet__status--${props.point.status}`
})

const updatedTime = computed(() => {
  if (!props.point) return ''

  return new Date(props.point.updated_at).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  })
})

const updatedDate = computed(() => {
  if (!props.point) return ''

  return new Date(props.point.updated_at).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
  })
})
</script>

<template>
  <Transition name="cf-point-sheet">
    <aside v-if="point" class="cf-point-sheet">
      <button class="cf-point-sheet__close" type="button" aria-label="Cerrar punto" @click="emit('close')">
        <span class="material-symbols-outlined">close</span>
      </button>

      <div class="cf-point-sheet__hero">
        <div class="cf-point-sheet__hero-media">
          <img :src="point.main_image" :alt="point.name" loading="lazy" />
          <div class="cf-point-sheet__hero-shade"></div>

          <div class="cf-point-sheet__hero-chips">
            <span class="cf-point-sheet__chip cf-point-sheet__chip--category">
              <span class="material-symbols-outlined">{{ categoryIcon }}</span>
              {{ point.category_label }}
            </span>

            <span class="cf-point-sheet__chip" :class="statusClass">
              <span class="material-symbols-outlined">{{ statusIcon }}</span>
              {{ point.status_label }}
            </span>
          </div>
        </div>

        <div class="cf-point-sheet__hero-body">
          <div class="cf-point-sheet__eyebrow">
            Punto seleccionado
          </div>

          <h2>{{ point.name }}</h2>

          <p>
            {{ point.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Punto participante dentro de la Ruta de los Dulces Acanceh.' }}
          </p>
        </div>
      </div>

      <div class="cf-point-sheet__content">
        <section class="cf-point-sheet__panel cf-point-sheet__panel--meta">
          <article>
            <span class="material-symbols-outlined">schedule</span>
            <div>
              <small>Horario</small>
              <strong>18:00 – 22:00</strong>
            </div>
          </article>

          <article>
            <span class="material-symbols-outlined">update</span>
            <div>
              <small>Última actualización</small>
              <strong>{{ updatedTime }}</strong>
              <em>{{ updatedDate }}</em>
            </div>
          </article>
        </section>

        <section class="cf-point-sheet__panel">
          <div class="cf-point-sheet__section-title">
            <span class="material-symbols-outlined">photo_library</span>
            <strong>Galería de la comunidad</strong>
          </div>

          <div class="cf-point-sheet__skeleton-grid">
            <i></i>
            <i></i>
            <i></i>
          </div>
        </section>

        <section class="cf-point-sheet__actions">
          <a :href="point.google_maps_url" target="_blank" rel="noreferrer">
            <span class="material-symbols-outlined">near_me</span>
            Cómo llegar
          </a>

          <button type="button">
            <span class="material-symbols-outlined">flag</span>
            Reportar cambio
          </button>
        </section>
      </div>
    </aside>
  </Transition>
</template>
