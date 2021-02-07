<template>
  <div><slot /></div>
</template>

<script>
import { provide, inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    const object = new Phaser.GameObjects.Arc(scene, props.x || 0, props.y || 0, props.radius)
    initGameObject(object, props, context)
    provide('gameObject', object)
    return { object }
  },
  props: [
    'tween', 'tweens', 'timeline',
    'visible',
    'x', 'y',
    'rotation',
    'radius',
    'origin', 'originX', 'originY',
    'displayOriginX', 'displayOriginY',
    'scale', 'scaleX', 'scaleY',
    'displayWidth', 'displayHeight',
    'depth',
    'alpha',
    'fillColor', 'fillAlpha',
    'lineWidth', 'strokeColor', 'strokeAlpha'
  ]
}
</script>
