<template>
  <div />
</template>

<script>
import { inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    const object = new Phaser.GameObjects.Sprite(scene, props.x, props.y, props.texture)
    initGameObject(object, props, context)
    return { object }
  },
  props: [
    'visible',
    'x', 'y',
    'origin', 'originX', 'originY',
    'scale', 'scaleX', 'scaleY',
    'depth',
    'alpha',
    'texture'
  ]
}
</script>
