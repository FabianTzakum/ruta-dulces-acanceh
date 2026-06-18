<script setup lang="ts">
import { useRouteStore } from '@/app/stores/route.store'

const routeStore = useRouteStore()
</script>

<template>
  <section class="home-bento">
    <RouterLink class="home-bento__card home-bento__card--map" to="/mapa">
      <img
        src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=70"
        alt="Mapa nocturno de la ruta"
        loading="lazy"
      />

      <div class="home-bento__shade"></div>

      <div class="home-bento__content">
        <span class="home-bento__live">En vivo</span>
        <h3>Ver mapa en vivo</h3>
        <p>{{ routeStore.stats.total }} puntos cargados</p>
      </div>
    </RouterLink>

    <RouterLink class="home-bento__card home-bento__card--gallery" to="/galeria">
      <span class="material-symbols-outlined">gallery_thumbnail</span>
      <h3>Galería comunitaria</h3>
      <p>Fotos, disfraces y momentos de la ruta.</p>
    </RouterLink>

    <RouterLink class="home-bento__card home-bento__card--guide" to="/puntos">
      <span class="material-symbols-outlined">family_restroom</span>
      <h3>Guía familiar</h3>
      <p>Consulta puntos, estados y recomendaciones.</p>
    </RouterLink>
  </section>
</template>
