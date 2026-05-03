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
  radius: commonProps.radius,
  amount: commonProps.amount,
  contrast: commonProps.contrast,
})
const emit = defineEmits<FxEmits>()

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const filter = fxController.addBokeh(props.radius, props.amount, props.contrast)

makeReactive(row => [
  row('radius', () => props.radius!, (v: number) => filter.radius = v),
  row('amount', () => props.amount!, (v: number) => filter.amount = v),
  row('contrast', () => props.contrast!, (v: number) => filter.contrast = v),
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
