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
    color1: {
      type: Number,
    },
    color2: {
      type: Number,
    },
    ...mapProps(
      'alpha',
      'fromX',
      'fromY',
      'toX',
      'toY',
      'size',
    ),
  },
  emits: ['create'],
  setup(props, context) {
    const gameObject = inject(InjectionKeys.GameObject)
    const fxController = props.post ? gameObject.postFX : gameObject.preFX
    if (!fxController) {
      throw new Error(`${props.post ? 'post' : 'pre'}FX is not available. Make sure the game object supports FX and WebGL renderer is enabled.`)
    }
    const gradient = fxController.addGradient(props.color1, props.color2, props.alpha, props.fromX, props.fromY, props.toX, props.toY, props.size)
    initGameObject(gradient, props, context, { isFx: true })
    onUnmounted(() => fxController.remove(gradient))
  },
})
</script>

<template>
  <slot />
</template>
