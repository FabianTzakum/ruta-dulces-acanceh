<script setup lang="ts">
import { computed } from 'vue'
import type { MapSpecialEvent } from '@/types/map-event.types'

const props = defineProps<{
  event: MapSpecialEvent | null
}>()

const emit = defineEmits<{
  close: []
}>()

const eventDate = computed(() => {
  if (!props.event) return ''

  return new Date(props.event.starts_at).toLocaleDateString('es-MX', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  })
})

const eventTime = computed(() => {
  if (!props.event) return ''

  const start = new Date(props.event.starts_at).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const end = new Date(props.event.ends_at).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return `${start} – ${end}`
})
</script>

<template>
  <Transition name="cf-event-sheet">
    <aside v-if="event" class="cf-event-sheet">
      <button class="cf-event-sheet__close" type="button" aria-label="Cerrar evento" @click="emit('close')">
        <span class="material-symbols-outlined">close</span>
      </button>

      <div class="cf-event-sheet__hero">
        <div class="cf-event-sheet__orb">
          <span class="material-symbols-outlined">auto_awesome</span>
        </div>

        <div>
          <small>Evento especial activo</small>
          <h2>{{ event.name }}</h2>
          <p>{{ event.description }}</p>
        </div>
      </div>

      <div class="cf-event-sheet__content">
        <section class="cf-event-sheet__meta">
          <article>
            <span class="material-symbols-outlined">calendar_month</span>
            <div>
              <small>Fecha</small>
              <strong>{{ eventDate }}</strong>
            </div>
          </article>

          <article>
            <span class="material-symbols-outlined">schedule</span>
            <div>
              <small>Hora</small>
              <strong>{{ eventTime }}</strong>
            </div>
          </article>

          <article>
            <span class="material-symbols-outlined">location_on</span>
            <div>
              <small>Ubicación</small>
              <strong>{{ event.location_name }}</strong>
            </div>
          </article>
        </section>

        <section class="cf-event-sheet__live">
          <div>
            <span class="material-symbols-outlined">stream</span>
            <strong>Transmisión y enlaces</strong>
          </div>

          <p v-if="event.facebook_live_url">
            La transmisión en vivo estará disponible desde Facebook cuando inicie el evento.
          </p>

          <p v-else>
            Por ahora no hay transmisión en vivo registrada para este evento.
          </p>
        </section>

        <div class="cf-event-sheet__actions">
          <a
            v-if="event.facebook_live_url"
            :href="event.facebook_live_url"
            target="_blank"
            rel="noreferrer"
            class="cf-event-sheet__action cf-event-sheet__action--live"
          >
            <span class="material-symbols-outlined">live_tv</span>
            Ver en vivo
          </a>

          <a
            v-if="event.facebook_event_url"
            :href="event.facebook_event_url"
            target="_blank"
            rel="noreferrer"
            class="cf-event-sheet__action"
          >
            <span class="material-symbols-outlined">event</span>
            Evento Facebook
          </a>

          <a
            :href="event.google_maps_url"
            target="_blank"
            rel="noreferrer"
            class="cf-event-sheet__action cf-event-sheet__action--route"
          >
            <span class="material-symbols-outlined">near_me</span>
            Cómo llegar
          </a>
        </div>
      </div>
    </aside>
  </Transition>
</template>
