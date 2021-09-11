<template>
  <div><slot /></div>
</template>

<script>
import { defineComponent, provide, inject } from 'vue'
import { initGameObject } from '../index.js'
export default defineComponent({
  setup (props, context) {
    const scene = inject('scene')
    const object = new Phaser.GameObjects.Line(scene, props.x || 0, props.y || 0, props.x1, props.y1, props.x2, props.y2)
    initGameObject(object, props, context)
    provide('gameObject', object)
    return { object }
  },
  props: [
    'tween', 'tweens', 'timeline',
    'visible',
    'x', 'y',
    'x1', 'y1', 'x2', 'y2',
    'rotation',
    'width', 'height',
    'origin', 'originX', 'originY',
    'displayOriginX', 'displayOriginY',
    'scale', 'scaleX', 'scaleY',
    'displayWidth', 'displayHeight',
    'depth',
    'alpha',
    'lineWidth', 'strokeColor', 'strokeAlpha'
  ]
})
</script>
