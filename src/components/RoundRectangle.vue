<script lang="ts" setup>
import Rectangle from './Rectangle.vue'

defineOptions({ inheritAttrs: false })

console.warn('RoundRectangle component is deprecated. Use Rectangle component with radius prop instead.')
</script>

<template>
  <Rectangle v-bind="$attrs">
    <slot />
  </Rectangle>
</template>
