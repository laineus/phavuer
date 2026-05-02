<script lang="ts" setup>
import type { FxEmits } from '../emits'
import { inject, onUnmounted } from 'vue'
import initGameObject from '../lib/initGameObject'
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
defineEmits<FxEmits>()

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const blur = fxController.addBlur(props.quality, props.x, props.y, props.strength, props.color, props.steps)
initGameObject(blur, props, { isFx: true })
onUnmounted(() => {
  if (gameObject.filters)
    fxController.remove(blur)
})
defineExpose({ phaserInstance: blur })
</script>

<template>
  <slot />
</template>
