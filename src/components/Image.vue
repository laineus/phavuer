<template>
  <div><slot /></div>
</template>

<script>
import { provide, inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    const object = new Phaser.GameObjects.Image(scene, props.x || 0, props.y || 0, props.texture)
    initGameObject(object, props, context)
    provide('gameObject', object)
    return { object }
  },
  props: [
    'tween', 'tweens', 'timeline',
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
