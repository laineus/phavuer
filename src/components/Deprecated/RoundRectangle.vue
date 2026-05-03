<script lang="ts" setup>
import Rectangle from '../GameObjects/Rectangle.vue'

defineOptions({ inheritAttrs: false })

console.warn('RoundRectangle component is deprecated. Use Rectangle component with radius prop instead.')
</script>

<template>
  <Rectangle v-bind="$attrs">
    <slot />
  </Rectangle>
</template>
