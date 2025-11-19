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
    const fxController = props.post ? gameObject.postFX : gameObject.preFX
    if (!fxController) {
      throw new Error(`${props.post ? 'post' : 'pre'}FX is not available. Make sure the game object supports FX and WebGL renderer is enabled.`)
    }
    const shadow = fxController.addShadow(props.x, props.y, props.decay, props.power, props.color, props.samples, props.intensity)
    initGameObject(shadow, props, context, { isFx: true })
    onUnmounted(() => fxController.remove(shadow))
  },
})
</script>

<template>
  <slot />
</template>
