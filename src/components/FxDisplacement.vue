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
  texture: {
    type: String,
  },
  x: commonProps.x,
  y: commonProps.y,
})
const emit = defineEmits<FxEmits>()

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const filter = fxController.addDisplacement(props.texture, props.x, props.y)

makeReactive(row => [
  row('texture', () => props.texture!, (v: string) => filter.setTexture(v)),
  row('x', () => props.x!, (v: number) => filter.x = v),
  row('y', () => props.y!, (v: number) => filter.y = v),
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
