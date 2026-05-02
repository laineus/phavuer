<script lang="ts" setup>
import type { FxEmits } from '../lib/emits'
import { inject, onUnmounted } from 'vue'
import initGameObject from '../lib/initGameObject'
import commonProps from '../lib/props'
import { InjectionKeys } from '../lib/provider'

const props = defineProps({
  external: {
    type: Boolean,
    default: false,
  },
  x: commonProps.x,
  y: commonProps.y,
  radius: commonProps.radius,
  strength: commonProps.strength,
  color: commonProps.color,
  blendMode: {
    type: Number,
  },
})
defineEmits<FxEmits>()

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const vignette = fxController.addVignette(props.x, props.y, props.radius, props.strength, props.color, props.blendMode)
initGameObject(vignette, props, { isFx: true })
onUnmounted(() => {
  if (gameObject.filters)
    fxController.remove(vignette)
})
defineExpose({ phaserInstance: vignette })
</script>

<template>
  <slot />
</template>
