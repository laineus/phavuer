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
  quality: commonProps.quality,
  x: commonProps.x,
  y: commonProps.y,
  steps: commonProps.steps,
  strength: commonProps.strength,
})
const emit = defineEmits(['create'] as string[])

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const blur = fxController.addBlur(props.quality, props.x, props.y, props.strength, props.color, props.steps)
initGameObject(blur, props, emit, { isFx: true })
onUnmounted(() => {
  if (gameObject.filters)
    fxController.remove(blur)
})
</script>

<template>
  <slot />
</template>
