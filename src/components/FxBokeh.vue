<script lang="ts" setup>
import { inject, onUnmounted } from 'vue'
import { initGameObject, InjectionKeys } from '../index'
import commonProps from '../props'

const props = defineProps({
  external: {
    type: Boolean,
    default: false,
  },
  radius: commonProps.radius,
  amount: commonProps.amount,
  contrast: commonProps.contrast,
})
const emit = defineEmits(['create'] as string[])

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const bokeh = fxController.addBokeh(props.radius, props.amount, props.contrast)
initGameObject(bokeh, props, emit, { isFx: true })
onUnmounted(() => {
  if (gameObject.filters)
    fxController.remove(bokeh)
})
</script>

<template>
  <slot />
</template>
