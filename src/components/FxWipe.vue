<script lang="ts" setup>
import { inject, onUnmounted } from 'vue'
import { initGameObject } from '../index'
import commonProps from '../props'
import { InjectionKeys } from '../provider'

const props = defineProps({
  external: {
    type: Boolean,
    default: false,
  },
  progress: commonProps.progress,
  wipeWidth: commonProps.wipeWidth,
  direction: commonProps.direction,
  axis: commonProps.axis,
  reveal: commonProps.reveal,
})
const emit = defineEmits(['create'] as string[])

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const wipe = fxController.addWipe(props.wipeWidth, props.direction, props.axis, props.reveal)
initGameObject(wipe, props, emit, { isFx: true })
onUnmounted(() => {
  if (gameObject.filters)
    fxController.remove(wipe)
})
</script>

<template>
  <slot />
</template>
