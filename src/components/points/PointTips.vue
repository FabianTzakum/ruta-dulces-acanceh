<script setup lang="ts">
const tips = [
  {
    icon: 'schedule',
    title: 'Revisa la actualización',
    text: 'La disponibilidad puede cambiar durante la noche. Consulta la hora del último cambio antes de ir.',
  },
  {
    icon: 'family_restroom',
    title: 'Recorrido familiar',
    text: 'Camina con cuidado, acompaña a niñas y niños y respeta los accesos de cada punto participante.',
  },
  {
    icon: 'map',
    title: 'Usa Google Maps',
    text: 'El botón “Cómo llegar” abre la ubicación exacta para facilitar el recorrido.',
  },
]
</script>

<template>
  <section class="point-tips">
    <div class="point-detail__section-heading">
      <span class="material-symbols-outlined">tips_and_updates</span>
      <h2>Recomendaciones</h2>
    </div>

    <div class="point-tips__list">
      <article v-for="tip in tips" :key="tip.title" class="point-tips__item">
        <span class="material-symbols-outlined">{{ tip.icon }}</span>

        <div>
          <h3>{{ tip.title }}</h3>
          <p>{{ tip.text }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
