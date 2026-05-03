<script lang="ts" setup>
import type { FxEmits } from '../../lib/emits'
import { inject, onBeforeUnmount, onUnmounted } from 'vue'
import { makeReactive } from '../../lib/componentBuilder'
import { InjectionKeys } from '../../lib/provider'

const props = defineProps({
  external: { type: Boolean, default: false },
  brightness: { type: Number },
  saturate: { type: Number },
  desaturate: { type: Boolean },
  hue: { type: Number },
  grayscale: { type: Number },
  blackWhite: { type: Boolean },
  contrast: { type: Number },
  negative: { type: Boolean },
  desaturateLuminance: { type: Boolean },
  sepia: { type: Boolean },
  night: { type: Number },
  lsd: { type: Boolean },
  brown: { type: Boolean },
  vintagePinhole: { type: Boolean },
  kodachrome: { type: Boolean },
  technicolor: { type: Boolean },
  polaroid: { type: Boolean },
  shiftToBGR: { type: Boolean },
})
const emit = defineEmits<FxEmits>()

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const filter = fxController.addColorMatrix()

makeReactive(row => [
  row('brightness', () => props.brightness!, (v: number) => v !== undefined && filter.colorMatrix.brightness(v, false)),
  row('saturate', () => props.saturate!, (v: number) => v !== undefined && filter.colorMatrix.saturate(v, false)),
  row('desaturate', () => props.desaturate!, (v: boolean) => v && filter.colorMatrix.desaturate(false)),
  row('hue', () => props.hue!, (v: number) => v !== undefined && filter.colorMatrix.hue(v, false)),
  row('grayscale', () => props.grayscale!, (v: number) => v !== undefined && filter.colorMatrix.grayscale(v, false)),
  row('blackWhite', () => props.blackWhite!, (v: boolean) => v && filter.colorMatrix.blackWhite(false)),
  row('contrast', () => props.contrast!, (v: number) => v !== undefined && filter.colorMatrix.contrast(v, false)),
  row('negative', () => props.negative!, (v: boolean) => v && filter.colorMatrix.negative(false)),
  row('desaturateLuminance', () => props.desaturateLuminance!, (v: boolean) => v && filter.colorMatrix.desaturateLuminance(false)),
  row('sepia', () => props.sepia!, (v: boolean) => v && filter.colorMatrix.sepia(false)),
  row('night', () => props.night!, (v: number) => v !== undefined && filter.colorMatrix.night(v, false)),
  row('lsd', () => props.lsd!, (v: boolean) => v && filter.colorMatrix.lsd(false)),
  row('brown', () => props.brown!, (v: boolean) => v && filter.colorMatrix.brown(false)),
  row('vintagePinhole', () => props.vintagePinhole!, (v: boolean) => v && filter.colorMatrix.vintagePinhole(false)),
  row('kodachrome', () => props.kodachrome!, (v: boolean) => v && filter.colorMatrix.kodachrome(false)),
  row('technicolor', () => props.technicolor!, (v: boolean) => v && filter.colorMatrix.technicolor(false)),
  row('polaroid', () => props.polaroid!, (v: boolean) => v && filter.colorMatrix.polaroid(false)),
  row('shiftToBGR', () => props.shiftToBGR!, (v: boolean) => v && filter.colorMatrix.shiftToBGR(false)),
])

emit('create', filter)
onBeforeUnmount(() => filter.destroy())
onUnmounted(() => {
  if (gameObject.filters)
    fxController.remove(filter)
})

defineExpose({ phaserInstance: filter })
</script>

<template>
  <slot />
</template>
