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
  x: commonProps.x,
  y: commonProps.y,
  decay: commonProps.decay,
  power: commonProps.power,
  samples: commonProps.samples,
  intensity: commonProps.intensity,
})
const emit = defineEmits(['create'] as string[])

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const shadow = fxController.addShadow(props.x, props.y, props.decay, props.power, props.color, props.samples, props.intensity)
initGameObject(shadow, props, emit, { isFx: true })
onUnmounted(() => {
  if (gameObject.filters)
    fxController.remove(shadow)
})
</script>

<template>
  <slot />
</template>
