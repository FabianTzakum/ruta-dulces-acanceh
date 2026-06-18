<script setup lang="ts">
const steps = [
  {
    number: '01',
    icon: 'travel_explore',
    title: 'Consulta el mapa',
    text: 'Ubica negocios, casas e instituciones participantes antes de iniciar el recorrido.',
  },
  {
    number: '02',
    icon: 'bakery_dining',
    title: 'Revisa los dulces',
    text: 'Cada punto puede aparecer como con dulces, pocos dulces o sin dulces.',
  },
  {
    number: '03',
    icon: 'near_me',
    title: 'Sigue la ruta',
    text: 'Abre Google Maps desde cada punto para llegar de forma más sencilla.',
  },
]

const rules = [
  {
    icon: 'family_restroom',
    title: 'Camina en familia',
    text: 'Acompaña siempre a niñas y niños. Evita que crucen calles sin supervisión.',
  },
  {
    icon: 'diversity_3',
    title: 'Respeta a los participantes',
    text: 'Cada casa, negocio o institución participa de forma voluntaria. Mantén orden y paciencia.',
  },
  {
    icon: 'delete',
    title: 'Cuida las calles',
    text: 'No tires basura y procura mantener limpia la ruta durante todo el recorrido.',
  },
  {
    icon: 'campaign',
    title: 'Atiende avisos',
    text: 'Si la organización activa un aviso o evento, aparecerá en la app cuando esté disponible.',
  },
]

const questions = [
  {
    title: '¿Los eventos aparecen siempre?',
    text: 'No. Los eventos solo aparecerán cuando la administración los active.',
  },
  {
    title: '¿Qué significa “pocos dulces”?',
    text: 'Significa que el punto aún tiene dulces, pero podría quedarse sin existencias pronto.',
  },
  {
    title: '¿La ruta funciona sin iniciar sesión?',
    text: 'Sí. El público puede consultar mapa, puntos, galería y guía sin acceder a un panel privado.',
  },
]
</script>

<template>
  <section class="guide-view">
    <header class="guide-hero">
      <div class="guide-hero__ambient">
        <span class="guide-hero__moon"></span>
        <span class="guide-hero__ghost">👻</span>
      </div>

      <div class="guide-hero__content">
        <p>Manual del visitante</p>

        <h1>
          Guía para recorrer
          <strong>la ruta</strong>
        </h1>

        <span>
          Reglas, recomendaciones y pasos para disfrutar la Ruta de los Dulces Acanceh de forma
          ordenada, familiar y segura.
        </span>

        <div class="guide-hero__actions">
          <RouterLink to="/mapa">
            Abrir mapa
            <span class="material-symbols-outlined">arrow_forward</span>
          </RouterLink>

          <RouterLink to="/puntos">
            Ver puntos
          </RouterLink>
        </div>
      </div>
    </header>

    <main class="guide-layout">
      <section class="guide-panel guide-panel--steps">
        <div class="guide-section-heading">
          <p>Primeros pasos</p>
          <h2>Cómo participar</h2>
        </div>

        <div class="guide-steps">
          <article v-for="step in steps" :key="step.title" class="guide-step">
            <span class="guide-step__number">{{ step.number }}</span>

            <div class="guide-step__icon">
              <span class="material-symbols-outlined">{{ step.icon }}</span>
            </div>

            <div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </div>
          </article>
        </div>
      </section>

      <aside class="guide-live-card">
        <span class="material-symbols-outlined">info</span>

        <h2>Estados oficiales</h2>

        <div class="guide-live-card__states">
          <span class="guide-live-card__state guide-live-card__state--with">Con dulces</span>
          <span class="guide-live-card__state guide-live-card__state--few">Pocos dulces</span>
          <span class="guide-live-card__state guide-live-card__state--none">Sin dulces</span>
        </div>

        <p>
          Estos son los únicos estados públicos de disponibilidad. Los eventos se muestran aparte
          únicamente cuando estén activos.
        </p>
      </aside>

      <section class="guide-panel guide-panel--rules">
        <div class="guide-section-heading">
          <p>Antes de salir</p>
          <h2>Reglas del recorrido</h2>
        </div>

        <div class="guide-rules">
          <article v-for="rule in rules" :key="rule.title" class="guide-rule">
            <span class="material-symbols-outlined">{{ rule.icon }}</span>

            <div>
              <h3>{{ rule.title }}</h3>
              <p>{{ rule.text }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="guide-panel guide-panel--faq">
        <div class="guide-section-heading">
          <p>Dudas rápidas</p>
          <h2>Preguntas frecuentes</h2>
        </div>

        <div class="guide-faq">
          <article v-for="question in questions" :key="question.title">
            <h3>{{ question.title }}</h3>
            <p>{{ question.text }}</p>
          </article>
        </div>
      </section>

      <section class="guide-final">
        <div>
          <p>Todo listo</p>
          <h2>Empieza tu recorrido</h2>
          <span>Abre el mapa, revisa los puntos y disfruta la noche.</span>
        </div>

        <RouterLink to="/mapa">
          Ir al mapa
          <span class="material-symbols-outlined">near_me</span>
        </RouterLink>
      </section>
    </main>
  </section>
</template>
