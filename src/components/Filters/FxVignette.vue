<script lang="ts" setup>
import type { FxEmits } from '../../lib/emits'
import { inject, onBeforeUnmount, onUnmounted } from 'vue'
import { makeReactive } from '../../lib/componentBuilder'
import commonProps from '../../lib/props'
import { InjectionKeys } from '../../lib/provider'

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
const emit = defineEmits<FxEmits>()

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const filter = fxController.addVignette(props.x, props.y, props.radius, props.strength, props.color, props.blendMode)

makeReactive(row => [
  row('x', () => props.x!, (v: number) => filter.x = v),
  row('y', () => props.y!, (v: number) => filter.y = v),
  row('radius', () => props.radius!, (v: number) => filter.radius = v),
  row('strength', () => props.strength!, (v: number) => filter.strength = v),
  row('color', () => props.color!, (v: number) => filter.setColor(v)),
  row('blendMode', () => props.blendMode!, (v: number) => filter.blendMode = v),
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
