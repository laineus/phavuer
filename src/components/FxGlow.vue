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
    distance: {
      type: Number,
    },
    ...mapProps(
      'outerStrength',
      'innerStrength',
      'scale',
      'knockout',
      'quality',
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
    const glow = fxController.addGlow(props.color, props.outerStrength, props.innerStrength, props.scale, props.knockout, props.quality, props.distance)
    initGameObject(glow, props, context, { isFx: true })
    onUnmounted(() => {
      if (gameObject.filters)
        fxController.remove(glow)
    })
  },
})
</script>

<template>
  <slot />
</template>
