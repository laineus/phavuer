<template>
  <div><slot /></div>
</template>

<script>
import { provide, inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    const object = new Phaser.GameObjects.Rectangle(scene, props.x || 0, props.y || 0, props.width, props.height)
    initGameObject(object, props, context)
    provide('gameObject', object)
    return { object }
  },
  props: [
    'tween', 'tweens', 'timeline',
    'visible',
    'x', 'y',
    'rotation',
    'width', 'height',
    'origin', 'originX', 'originY',
    'displayOriginX', 'displayOriginY',
    'scale', 'scaleX', 'scaleY',
    'displayWidth', 'displayHeight',
    'depth',
    'alpha', 'blendMode', 'pipeline',
    'fillColor', 'fillAlpha',
    'lineWidth', 'strokeColor', 'strokeAlpha'
  ]
}
</script>
