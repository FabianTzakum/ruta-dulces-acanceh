<script setup lang="ts">
import { computed } from 'vue'
import type { PointCategory } from '@/types/point.types'

const props = defineProps<{
  category: PointCategory
}>()

const icon = computed(() => {
  const icons: Record<PointCategory, string> = {
    business: 'storefront',
    house: 'cottage',
    institution: 'account_balance',
    event: 'festival',
  }

  return icons[props.category]
})
</script>

<template>
  <span class="point-category" :class="`point-category--${category}`">
    <span class="material-symbols-outlined">{{ icon }}</span>
  </span>
</template>
