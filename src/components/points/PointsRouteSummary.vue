<script setup lang="ts">
import { useRouteStore } from '@/app/stores/route.store'

const routeStore = useRouteStore()
</script>

<template>
  <section class="points-summary-panel">
    <div class="points-summary-panel__header">
      <span class="material-symbols-outlined">route</span>

      <div>
        <p>Estado general</p>
        <h2>Ruta activa</h2>
      </div>
    </div>

    <div class="points-summary-panel__grid">
      <article>
        <strong>{{ routeStore.stats.withCandies }}</strong>
        <small>con dulces</small>
      </article>

      <article>
        <strong>{{ routeStore.stats.fewCandies }}</strong>
        <small>pocos dulces</small>
      </article>

      <article>
        <strong>{{ routeStore.stats.noCandies }}</strong>
        <small>sin dulces</small>
      </article>
    </div>
  </section>
</template>
