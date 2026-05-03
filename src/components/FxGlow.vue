<script lang="ts" setup>
import type { FxEmits } from '../lib/emits'
import { inject, onBeforeUnmount, onUnmounted } from 'vue'
import { makeReactive } from '../lib/componentBuilder'
import commonProps from '../lib/props'
import { InjectionKeys } from '../lib/provider'

const props = defineProps({
  external: {
    type: Boolean,
    default: false,
  },
  color: commonProps.color,
  outerStrength: commonProps.outerStrength,
  innerStrength: commonProps.innerStrength,
  scale: commonProps.scale,
  knockout: commonProps.knockout,
  // Static props
  distance: commonProps.distance,
  quality: commonProps.quality,
})
const emit = defineEmits<FxEmits>()

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const filter = fxController.addGlow(props.color, props.outerStrength, props.innerStrength, props.scale, props.knockout, props.quality, props.distance)

makeReactive(row => [
  row('color', () => props.color!, (v: number) => filter.color = v),
  row('outerStrength', () => props.outerStrength!, (v: number) => filter.outerStrength = v),
  row('innerStrength', () => props.innerStrength!, (v: number) => filter.innerStrength = v),
  row('scale', () => props.scale!, (v: number) => filter.scale = v),
  row('knockout', () => props.knockout!, (v: boolean) => filter.knockout = v),
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
