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
      'x',
      'y',
      'decay',
      'power',
      'samples',
      'intensity',
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
    const shadow = fxController.addShadow(props.x, props.y, props.decay, props.power, props.color, props.samples, props.intensity)
    initGameObject(shadow, props, context, { isFx: true })
    onUnmounted(() => {
      if (gameObject.filters)
        fxController.remove(shadow)
    })
  },
})
</script>

<template>
  <slot />
</template>
