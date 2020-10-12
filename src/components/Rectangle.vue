<template>
  <div />
</template>

<script>
import { inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    class Rectangle extends Phaser.GameObjects.Rectangle {
      preUpdate () {}
    }
    const object = new Rectangle(scene, props.x, props.y, props.width, props.height)
    initGameObject(object, props, context)
    return { object }
  },
  props: [
    'visible',
    'x', 'y',
    'width', 'height',
    'origin', 'originX', 'originY',
    'scale', 'scaleX', 'scaleY',
    'depth',
    'alpha',
    'fillColor', 'fillAlpha',
    'lineWidth', 'strokeColor', 'strokeAlpha'
  ]
}
</script>
