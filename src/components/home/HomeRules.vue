<script setup lang="ts">
const rules = [
  {
    icon: 'diversity_3',
    title: 'Respeta a cada participante',
    text: 'Cada negocio, casa o institución participa de forma voluntaria.',
  },
  {
    icon: 'child_care',
    title: 'Acompaña a niñas y niños',
    text: 'La ruta está pensada para familias. Caminen con cuidado y en grupo.',
  },
  {
    icon: 'delete',
    title: 'Cuida las calles',
    text: 'Evita dejar basura y mantén limpio el recorrido.',
  },
]
</script>

<template>
  <section class="home-rules">
    <div class="home-section-heading">
      <p>Antes de salir</p>
      <h2>Reglas del recorrido</h2>
    </div>

    <div class="home-rules__list">
      <article v-for="rule in rules" :key="rule.title" class="home-rules__item">
        <span class="material-symbols-outlined">{{ rule.icon }}</span>

        <div>
          <h3>{{ rule.title }}</h3>
          <p>{{ rule.text }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
