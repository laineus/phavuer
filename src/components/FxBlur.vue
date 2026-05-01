<script>
import { defineComponent, inject, onUnmounted } from 'vue'
import { initGameObject, InjectionKeys } from '../index.js'
import { mapProps } from '../props.js'

export default defineComponent({
  props: {
    external: {
      type: Boolean,
      default: false,
    },
    color: {
      type: Number,
    },
    ...mapProps(
      'quality',
      'x',
      'y',
      'steps',
      'strength',
    ),
  },
  emits: ['create'],
  setup(props, context) {
    const gameObject = inject(InjectionKeys.GameObject)
    gameObject.enableFilters()
    const fxController = props.external ? gameObject.filters?.external : gameObject.filters?.internal
    if (!fxController) {
      throw new Error(`filters.${props.external ? 'external' : 'internal'} is not available. Make sure the game object supports filters and WebGL renderer is enabled.`)
    }
    const blur = fxController.addBlur(props.quality, props.x, props.y, props.strength, props.color, props.steps)
    initGameObject(blur, props, context, { isFx: true })
    onUnmounted(() => {
      if (gameObject.filters)
        fxController.remove(blur)
    })
  },
})
</script>

<template>
  <slot />
</template>
