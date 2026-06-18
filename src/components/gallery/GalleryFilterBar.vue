<script setup lang="ts">
const filters = [
  {
    label: 'Todos',
    icon: 'grid_view',
    active: true,
  },
  {
    label: 'Disfraces',
    icon: 'theater_comedy',
    active: false,
  },
  {
    label: 'Dulces',
    icon: 'bakery_dining',
    active: false,
  },
  {
    label: 'Eventos',
    icon: 'celebration',
    active: false,
  },
  {
    label: 'Familias',
    icon: 'family_restroom',
    active: false,
  },
]
</script>

<template>
  <section class="gallery-filters" aria-label="Filtros de galería">
    <button
      v-for="filter in filters"
      :key="filter.label"
      class="gallery-filters__chip"
      :class="{ 'gallery-filters__chip--active': filter.active }"
      type="button"
    >
      <span class="material-symbols-outlined">{{ filter.icon }}</span>
      <small>{{ filter.label }}</small>
    </button>
  </section>
</template>
