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
      preUpdate (...arg) {
        if (context.attrs.onPreUpdate) context.emit('preUpdate', this, ...arg)
      }
    }
    const object = new Rectangle(scene, props.x || 0, props.y || 0, props.width, props.height)
    initGameObject(object, props, context)
    return { object }
  },
  props: [
    'tween',
    'visible',
    'x', 'y',
    'rotation',
    'width', 'height',
    'origin', 'originX', 'originY',
    'displayOriginX', 'displayOriginY',
    'scale', 'scaleX', 'scaleY',
    'depth',
    'alpha',
    'fillColor', 'fillAlpha',
    'lineWidth', 'strokeColor', 'strokeAlpha'
  ]
}
</script>
