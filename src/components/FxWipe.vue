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
  progress: commonProps.progress,
  wipeWidth: commonProps.wipeWidth,
  direction: commonProps.direction,
  axis: commonProps.axis,
  reveal: commonProps.reveal,
})
defineEmits<FxEmits>()

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const wipe = fxController.addWipe(props.wipeWidth, props.direction, props.axis, props.reveal)
initFilter(wipe, props)
onUnmounted(() => {
  if (gameObject.filters)
    fxController.remove(wipe)
})
defineExpose({ phaserInstance: wipe })
</script>

<template>
  <slot />
</template>
