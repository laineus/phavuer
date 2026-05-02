<script lang="ts" setup>
import type { FxEmits } from '../emits'
import { inject, onUnmounted } from 'vue'
import { initGameObject } from '../index'
import commonProps from '../props'
import { InjectionKeys } from '../provider'

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
defineEmits<FxEmits>()

const gameObject = inject(InjectionKeys.GameObject)!
gameObject.enableFilters()
const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
if (!fxController) {
  throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
}
const displacement = fxController.addDisplacement(props.texture, props.x, props.y)
initGameObject(displacement, props, { isFx: true })
onUnmounted(() => {
  if (gameObject.filters)
    fxController.remove(displacement)
})
</script>

<template>
  <slot />
</template>
