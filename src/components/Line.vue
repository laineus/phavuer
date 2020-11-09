<template>
  <div />
</template>

<script>
import { inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    class Line extends Phaser.GameObjects.Line {
      preUpdate (...arg) {
        if (context.attrs.onPreUpdate) context.emit('preUpdate', this, ...arg)
      }
    }
    const object = new Line(scene, props.x, props.y, props.x1, props.y1, props.x2, props.y2)
    initGameObject(object, props, context)
    return { object }
  },
  props: [
    'visible',
    'x', 'y',
    'x1', 'y1', 'x2', 'y2',
    'rotation',
    'width', 'height',
    'origin', 'originX', 'originY',
    'displayOriginX', 'displayOriginY',
    'scale', 'scaleX', 'scaleY',
    'depth',
    'alpha',
    'lineWidth', 'strokeColor', 'strokeAlpha'
  ]
}
</script>
