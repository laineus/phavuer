<template>
  <div />
</template>

<script>
import { inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    const object = new Phaser.GameObjects.Image(scene, props.x || 0, props.y || 0, props.texture)
    initGameObject(object, props, context)
    return { object }
  },
  props: [
    'tween',
    'visible',
    'x', 'y',
    'rotation',
    'origin', 'originX', 'originY',
    'displayOriginX', 'displayOriginY',
    'scale', 'scaleX', 'scaleY',
    'displayWidth', 'displayHeight',
    'depth',
    'alpha', 'blendMode', 'pipeline',
    'texture', 'frame',
    'tint',
    'flipX', 'flipY'
  ]
}
</script>
