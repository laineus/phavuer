<template>
  <div />
</template>

<script>
import { inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    const object = new Phaser.GameObjects.Sprite(scene, props.x || 0, props.y || 0, props.texture)
    initGameObject(object, props, context)
    return { object }
  },
  props: [
    'tween',
    'visible',
    'x', 'y',
    'rotation',
    'origin', 'originX', 'originY',
    'scale', 'scaleX', 'scaleY',
    'depth',
    'alpha', 'blendMode', 'pipeline',
    'texture', 'frame',
    'tint',
    'flipX', 'flipY'
  ]
}
</script>
