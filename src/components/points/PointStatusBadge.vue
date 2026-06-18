<script setup lang="ts">
import { computed } from 'vue'
import type { PointStatus } from '@/types/point.types'

const props = defineProps<{
  status: PointStatus
  label?: string
}>()

const readableLabel = computed(() => {
  const labels: Record<PointStatus, string> = {
    with_candies: 'Con dulces',
    few_candies: 'Pocos dulces',
    no_candies: 'Sin dulces',
  }

  return props.label || labels[props.status]
})

const icon = computed(() => {
  const icons: Record<PointStatus, string> = {
    with_candies: 'bakery_dining',
    few_candies: 'warning',
    no_candies: 'block',
  }

  return icons[props.status]
})
</script>

<template>
  <span class="point-status" :class="`point-status--${status}`">
    <span class="material-symbols-outlined point-status__icon">{{ icon }}</span>
    {{ readableLabel }}
  </span>
</template>
