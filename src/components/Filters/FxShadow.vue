<script lang="ts" setup>
import type { FxEmits } from '../../lib/emits'
import { inject, onBeforeUnmount, onUnmounted } from 'vue'
import { makeReactive } from '../../lib/componentBuilder'
import { InjectionKeys } from '../../lib/provider'

const props = defineProps({
  external: { type: Boolean, default: false },
  color: { type: Number },
  x: { type: Number },
  y: { type: Number },
  decay: { type: Number },
  power: { type: Number },
  samples: { type: Number },
  intensity: { type: Number },
})
const emit = defineEmits<FxEmits>()

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const filter = fxController.addShadow(props.x, props.y, props.decay, props.power, props.color, props.samples, props.intensity)

makeReactive(row => [
  row('color', () => props.color!, (v: number) => filter.color = v),
  row('x', () => props.x!, (v: number) => filter.x = v),
  row('y', () => props.y!, (v: number) => filter.y = v),
  row('decay', () => props.decay!, (v: number) => filter.decay = v),
  row('power', () => props.power!, (v: number) => filter.power = v),
  row('samples', () => props.samples!, (v: number) => filter.samples = v),
  row('intensity', () => props.intensity!, (v: number) => filter.intensity = v),
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
