<script lang="ts" setup>
import { inject, onUnmounted } from 'vue'
import { initGameObject } from '../index'
import commonProps from '../props'
import { InjectionKeys } from '../provider'

const props = defineProps({
  external: {
    type: Boolean,
    default: false,
  },
  color: commonProps.color,
  distance: commonProps.distance,
  outerStrength: commonProps.outerStrength,
  innerStrength: commonProps.innerStrength,
  scale: commonProps.scale,
  knockout: commonProps.knockout,
  quality: commonProps.quality,
})
const emit = defineEmits(['create'] as string[])

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const glow = fxController.addGlow(props.color, props.outerStrength, props.innerStrength, props.scale, props.knockout, props.quality, props.distance)
initGameObject(glow, props, emit, { isFx: true })
onUnmounted(() => {
  if (gameObject.filters)
    fxController.remove(glow)
})
</script>

<template>
  <slot />
</template>
