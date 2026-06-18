<template>
  <section class="points-empty">
    <span class="points-empty__ghost">👻</span>

    <h2>No encontramos puntos</h2>

    <p>
      Prueba cambiar los filtros o limpiar la búsqueda para volver a ver los puntos participantes.
    </p>

    <button type="button" @click="$emit('clear')">
      Limpiar filtros
    </button>
  </section>
</template>
