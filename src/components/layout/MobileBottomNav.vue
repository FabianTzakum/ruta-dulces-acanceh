<script setup lang="ts">
const items = [
  {
    label: 'Inicio',
    icon: 'home',
    to: '/inicio',
  },
  {
    label: 'Mapa',
    icon: 'map',
    to: '/mapa',
  },
  {
    label: 'Puntos',
    icon: 'bakery_dining',
    to: '/puntos',
  },
  {
    label: 'Galería',
    icon: 'photo_library',
    to: '/galeria',
  },
  {
    label: 'Guía',
    icon: 'shield_person',
    to: '/guia',
  },
]
</script>

<template>
  <nav class="mobile-nav" aria-label="Navegación móvil">
    <RouterLink
      v-for="item in items"
      :key="item.to"
      class="mobile-nav__item"
      :to="item.to"
    >
      <span class="material-symbols-outlined">{{ item.icon }}</span>
      <small>{{ item.label }}</small>
    </RouterLink>
  </nav>
</template>
