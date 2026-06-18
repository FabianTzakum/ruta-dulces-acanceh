<script setup lang="ts">
import { computed, ref } from 'vue'

import { useRouteStore } from '@/app/stores/route.store'
import type { PointStatus, RoutePoint } from '@/types/point.types'

const routeStore = useRouteStore()

const selectedPointSlug = ref('')
const currentStatus = ref<PointStatus>('with_candies')
const isVisibleOnMap = ref(true)
const visitorCount = ref(128)
const lastSavedAt = ref<Date | null>(null)
const note = ref('')

const controlledPoint = computed<RoutePoint | null>(() => {
  if (selectedPointSlug.value) {
    const selected = routeStore.findPointBySlug(selectedPointSlug.value)

    if (selected) return selected
  }

  return routeStore.points[0] ?? null
})

const statusOptions = computed(() => [
  {
    value: 'with_candies' as PointStatus,
    title: 'Con dulces',
    text: 'El punto puede recibir visitantes y todavía tiene dulces disponibles.',
    icon: 'bakery_dining',
    tone: 'with',
    helper: 'Mostrar como disponible para el público.',
  },
  {
    value: 'few_candies' as PointStatus,
    title: 'Pocos dulces',
    text: 'El punto sigue activo, pero queda poca disponibilidad.',
    icon: 'warning',
    tone: 'few',
    helper: 'Avisar que puede agotarse pronto.',
  },
  {
    value: 'no_candies' as PointStatus,
    title: 'Sin dulces',
    text: 'El punto ya no debe recibir más visitantes por falta de dulces.',
    icon: 'block',
    tone: 'none',
    helper: 'Mostrar como agotado en la ruta.',
  },
])

const currentStatusLabel = computed(() => {
  return statusOptions.value.find((item) => item.value === currentStatus.value)?.title ?? 'Con dulces'
})

const currentStatusIcon = computed(() => {
  return statusOptions.value.find((item) => item.value === currentStatus.value)?.icon ?? 'bakery_dining'
})

const currentStatusTone = computed(() => {
  return statusOptions.value.find((item) => item.value === currentStatus.value)?.tone ?? 'with'
})

const pointOptions = computed(() => routeStore.points.slice(0, 40))

const activityItems = computed(() => [
  {
    title: 'Estado visible actualizado',
    text: currentStatusLabel.value,
    time: lastSavedAt.value ? formatTime(lastSavedAt.value) : 'Sin guardar',
    icon: currentStatusIcon.value,
  },
  {
    title: 'Visitantes registrados',
    text: `${visitorCount.value} personas estimadas`,
    time: 'Hoy',
    icon: 'groups',
  },
  {
    title: 'Visibilidad del mapa',
    text: isVisibleOnMap.value ? 'Punto visible para visitantes' : 'Punto oculto temporalmente',
    time: 'Ahora',
    icon: isVisibleOnMap.value ? 'visibility' : 'visibility_off',
  },
])

function formatTime(value: Date) {
  return value.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function selectStatus(value: PointStatus) {
  currentStatus.value = value
}

function increaseVisitors(amount: number) {
  visitorCount.value = Math.max(0, visitorCount.value + amount)
}

function saveChanges() {
  lastSavedAt.value = new Date()
}

function resetPanel() {
  currentStatus.value = 'with_candies'
  isVisibleOnMap.value = true
  visitorCount.value = 0
  note.value = ''
  lastSavedAt.value = null
}
</script>

<template>
  <section class="control-view">
    <header class="control-hero">
      <div class="control-hero__content">
        <span class="control-kicker">Panel staff</span>

        <h1>
          Control de
          <strong>punto</strong>
        </h1>

        <p>
          Actualiza la disponibilidad de dulces, registra flujo de visitantes y controla la
          visibilidad del punto dentro de la ruta.
        </p>
      </div>

      <aside class="control-hero__status">
        <span class="material-symbols-outlined" :class="`control-hero__status-icon--${currentStatusTone}`">
          {{ currentStatusIcon }}
        </span>

        <div>
          <strong>{{ currentStatusLabel }}</strong>
          <small>{{ isVisibleOnMap ? 'Visible en mapa público' : 'Oculto temporalmente' }}</small>
        </div>
      </aside>
    </header>

    <main class="control-layout">
      <section class="control-panel control-panel--main">
        <div class="control-panel__head">
          <div>
            <span class="control-kicker">Punto asignado</span>
            <h2>{{ controlledPoint?.name ?? 'Selecciona un punto' }}</h2>
          </div>

          <select v-model="selectedPointSlug" class="control-select" aria-label="Seleccionar punto">
            <option value="">Primer punto disponible</option>
            <option v-for="point in pointOptions" :key="point.id" :value="point.slug">
              {{ point.name }}
            </option>
          </select>
        </div>

        <div v-if="controlledPoint" class="control-point-card">
          <img :src="controlledPoint.main_image" :alt="controlledPoint.name" loading="lazy" />

          <div>
            <strong>{{ controlledPoint.category_label }}</strong>
            <p>{{ controlledPoint.address }}</p>
          </div>

          <RouterLink :to="`/puntos/${controlledPoint.slug}`">
            Ver ficha
          </RouterLink>
        </div>

        <section class="control-counter">
          <div>
            <span class="control-kicker">Visitantes hoy</span>
            <strong>{{ visitorCount }}</strong>
            <small>conteo estimado del punto</small>
          </div>

          <div class="control-counter__actions">
            <button type="button" @click="increaseVisitors(-10)">-10</button>
            <button type="button" @click="increaseVisitors(-1)">-1</button>
            <button type="button" @click="increaseVisitors(1)">+1</button>
            <button type="button" @click="increaseVisitors(10)">+10</button>
          </div>
        </section>
      </section>

      <section class="control-panel control-panel--status">
        <div class="control-panel__head">
          <div>
            <span class="control-kicker">Disponibilidad</span>
            <h2>Estado de dulces</h2>
          </div>
        </div>

        <div class="control-status-grid">
          <button
            v-for="status in statusOptions"
            :key="status.value"
            type="button"
            class="control-status-card"
            :class="[
              `control-status-card--${status.tone}`,
              { 'control-status-card--active': currentStatus === status.value },
            ]"
            @click="selectStatus(status.value)"
          >
            <span class="material-symbols-outlined">{{ status.icon }}</span>

            <strong>{{ status.title }}</strong>

            <p>{{ status.text }}</p>

            <small>{{ status.helper }}</small>
          </button>
        </div>
      </section>

      <aside class="control-side">
        <section class="control-side-card control-side-card--visibility">
          <div class="control-side-card__head">
            <span class="material-symbols-outlined">
              {{ isVisibleOnMap ? 'visibility' : 'visibility_off' }}
            </span>

            <div>
              <h2>Visibilidad</h2>
              <p>Controla si el punto aparece en la ruta pública.</p>
            </div>
          </div>

          <button
            type="button"
            class="control-toggle"
            :class="{ 'control-toggle--active': isVisibleOnMap }"
            @click="isVisibleOnMap = !isVisibleOnMap"
          >
            <span></span>
          </button>

          <small>
            {{ isVisibleOnMap ? 'El punto aparece en mapa y lista pública.' : 'El punto queda oculto temporalmente.' }}
          </small>
        </section>

        <section class="control-side-card">
          <div class="control-side-card__head">
            <span class="material-symbols-outlined">edit_note</span>

            <div>
              <h2>Nota interna</h2>
              <p>Mensaje visible solo para staff.</p>
            </div>
          </div>

          <textarea
            v-model="note"
            rows="5"
            placeholder="Ejemplo: quedan bolsas pequeñas, pedir apoyo a organización..."
          ></textarea>
        </section>

        <section class="control-side-card">
          <div class="control-side-card__head">
            <span class="material-symbols-outlined">history</span>

            <div>
              <h2>Actividad</h2>
              <p>Resumen operativo del punto.</p>
            </div>
          </div>

          <div class="control-activity">
            <article v-for="item in activityItems" :key="item.title">
              <span class="material-symbols-outlined">{{ item.icon }}</span>

              <div>
                <strong>{{ item.title }}</strong>
                <p>{{ item.text }}</p>
                <small>{{ item.time }}</small>
              </div>
            </article>
          </div>
        </section>
      </aside>

      <section class="control-actions-bar">
        <button type="button" class="control-actions-bar__secondary" @click="resetPanel">
          Reiniciar
        </button>

        <button type="button" class="control-actions-bar__primary" @click="saveChanges">
          Guardar cambios
          <span class="material-symbols-outlined">save</span>
        </button>
      </section>
    </main>
  </section>
</template>
