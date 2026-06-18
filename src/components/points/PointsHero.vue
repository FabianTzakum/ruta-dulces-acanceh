<script setup lang="ts">
import { useRouteStore } from '@/app/stores/route.store'

const routeStore = useRouteStore()
</script>

<template>
  <section class="points-hero">
    <div class="points-hero__sky">
      <span class="points-hero__moon"></span>
      <span class="points-hero__bat points-hero__bat--one">🦇</span>
      <span class="points-hero__bat points-hero__bat--two">🦇</span>
      <span class="points-hero__pumpkin">🎃</span>
    </div>

    <div class="points-hero__content">
      <p>Explora la ruta</p>

      <h1>
        Puntos
        <strong>participantes</strong>
      </h1>

      <span>
        {{ routeStore.stats.total }} puntos cargados entre negocios, casas, instituciones y eventos.
      </span>
    </div>
  </section>
</template>
