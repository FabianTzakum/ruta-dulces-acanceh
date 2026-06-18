<script setup lang="ts">
import { onMounted } from 'vue'

import { useRouteStore } from '@/app/stores/route.store'

const routeStore = useRouteStore()

onMounted(() => {
  void routeStore.bootstrap()
})
</script>

<template>
  <RouterView />
</template>
