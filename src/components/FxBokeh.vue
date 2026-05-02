<script lang="ts" setup>
import type { FxEmits } from '../lib/emits'
import { inject, onUnmounted } from 'vue'
import { initFilter } from '../lib/initComponent'
import commonProps from '../lib/props'
import { InjectionKeys } from '../lib/provider'

const props = defineProps({
  external: {
    type: Boolean,
    default: false,
  },
  radius: commonProps.radius,
  amount: commonProps.amount,
  contrast: commonProps.contrast,
})
defineEmits<FxEmits>()

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const bokeh = fxController.addBokeh(props.radius, props.amount, props.contrast)
initFilter(bokeh, props)
onUnmounted(() => {
  if (gameObject.filters)
    fxController.remove(bokeh)
})
defineExpose({ phaserInstance: bokeh })
</script>

<template>
  <slot />
</template>
