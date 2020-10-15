<template>
  <div />
</template>

<script>
import { inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    class Image extends Phaser.GameObjects.Image {
      preUpdate () {}
    }
    const object = new Image(scene, props.x, props.y, props.texture)
    initGameObject(object, props, context)
    return { object }
  },
  props: [
    'visible',
    'x', 'y',
    'origin', 'originX', 'originY',
    'scale', 'scaleX', 'scaleY',
    'depth',
    'alpha', 'blendMode',
    'texture', 'frame',
    'flipX', 'flipY'
  ]
}
</script>
