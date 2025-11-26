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
      'brightness',
      'saturate',
      'desaturate',
      'hue',
      'grayscale',
      'blackWhite',
      'contrast',
      'negative',
      'desaturateLuminance',
      'sepia',
      'night',
      'lsd',
      'brown',
      'vintagePinhole',
      'kodachrome',
      'technicolor',
      'polaroid',
      'shiftToBGR',
    ),
  },
  emits: ['create'],
  setup(props, context) {
    const gameObject = inject(InjectionKeys.GameObject)
    const fxController = props.post ? gameObject.postFX : gameObject.preFX
    if (!fxController) {
      throw new Error(`${props.post ? 'post' : 'pre'}FX is not available. Make sure the game object supports FX and WebGL renderer is enabled.`)
    }
    const colorMatrix = fxController.addColorMatrix()
    initGameObject(colorMatrix, props, context, { isFx: true })
    onUnmounted(() => {
      if (fxController.gameObject)
        fxController.remove(colorMatrix)
    })
  },
})
</script>

<template>
  <slot />
</template>
