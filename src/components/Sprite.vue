<template>
  <div />
</template>

<script>
import { inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    class Sprite extends Phaser.GameObjects.Sprite {
      preUpdate () {}
    }
    const object = new Sprite(scene, props.x, props.y, props.texture)
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
