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
  brightness: commonProps.brightness,
  saturate: commonProps.saturate,
  desaturate: commonProps.desaturate,
  hue: commonProps.hue,
  grayscale: commonProps.grayscale,
  blackWhite: commonProps.blackWhite,
  contrast: commonProps.contrast,
  negative: commonProps.negative,
  desaturateLuminance: commonProps.desaturateLuminance,
  sepia: commonProps.sepia,
  night: commonProps.night,
  lsd: commonProps.lsd,
  brown: commonProps.brown,
  vintagePinhole: commonProps.vintagePinhole,
  kodachrome: commonProps.kodachrome,
  technicolor: commonProps.technicolor,
  polaroid: commonProps.polaroid,
  shiftToBGR: commonProps.shiftToBGR,
})
defineEmits<FxEmits>()

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const colorMatrix = fxController.addColorMatrix()
initGameObject(colorMatrix, props, { isFx: true })
onUnmounted(() => {
  if (gameObject.filters)
    fxController.remove(colorMatrix)
})
defineExpose({ phaserInstance: colorMatrix })
</script>

<template>
  <slot />
</template>
