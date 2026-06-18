<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import DesktopHeader from '@/components/layout/DesktopHeader.vue'
import MobileBottomNav from '@/components/layout/MobileBottomNav.vue'
import MobileTopBar from '@/components/layout/MobileTopBar.vue'

const route = useRoute()

const isFullscreen = computed(() => route.meta.fullscreen === true)
</script>

<template>
  <div class="app-shell" :class="{ 'app-shell--fullscreen': isFullscreen }">
    <MobileTopBar />
    <DesktopHeader />

    <main class="app-shell__main" :class="{ 'app-shell__main--fullscreen': isFullscreen }">
      <slot />
    </main>

    <MobileBottomNav />
  </div>
</template>
