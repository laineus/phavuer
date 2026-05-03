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
  progress: commonProps.progress,
  wipeWidth: commonProps.wipeWidth,
  direction: commonProps.direction,
  axis: commonProps.axis,
  reveal: commonProps.reveal,
})
const emit = defineEmits<FxEmits>()

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const filter = fxController.addWipe(props.wipeWidth, props.direction, props.axis, props.reveal)

makeReactive(row => [
  row('progress', () => props.progress!, (v: number) => filter.progress = v),
  row('wipeWidth', () => props.wipeWidth!, (v: number) => filter.wipeWidth = v),
  row('direction', () => props.direction!, (v: number) => filter.direction = v),
  row('axis', () => props.axis!, (v: number) => filter.axis = v),
  row('reveal', () => props.reveal!, (v: number) => filter.reveal = v),
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
