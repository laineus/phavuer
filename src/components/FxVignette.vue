<script>
import { defineComponent, inject, onUnmounted } from 'vue'
import { initGameObject, InjectionKeys } from '../index.js'
import { mapProps } from '../props.js'

export default defineComponent({
  props: {
    post: {
      type: Boolean,
      default: true,
    },
    ...mapProps(
      'x',
      'y',
      'radius',
      'strength',
    ),
  },
  emits: ['create'],
  setup(props, context) {
    const gameObject = inject(InjectionKeys.GameObject)
    const fxController = props.post ? gameObject.postFX : gameObject.preFX
    if (!fxController) {
      throw new Error(`${props.post ? 'post' : 'pre'}FX is not available. Make sure the game object supports FX and WebGL renderer is enabled.`)
    }
    const vignette = fxController.addVignette(props.x, props.y, props.radius, props.strength)
    initGameObject(vignette, props, context, { isFx: true })
    onUnmounted(() => fxController.remove(vignette))
  },
})
</script>

<template>
  <slot />
</template>
