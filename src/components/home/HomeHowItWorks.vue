<script setup lang="ts">
const steps = [
  {
    icon: 'travel_explore',
    title: 'Abre el mapa',
    text: 'Consulta el panorama general de Acanceh y ubica los puntos participantes.',
  },
  {
    icon: 'inventory_2',
    title: 'Revisa estado',
    text: 'Cada punto puede aparecer como disponible, con pocos dulces o agotado.',
  },
  {
    icon: 'near_me',
    title: 'Sigue la ruta',
    text: 'Usa el botón de Google Maps para llegar al punto seleccionado.',
  },
]
</script>

<template>
  <section class="home-how">
    <div class="home-section-heading">
      <p>Cómo funciona</p>
      <h2>Recorre sin perderte</h2>
    </div>

    <div class="home-how__list">
      <article v-for="step in steps" :key="step.title" class="home-how__item">
        <span class="material-symbols-outlined">{{ step.icon }}</span>

        <div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
