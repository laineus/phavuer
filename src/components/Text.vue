<template>
  <div />
</template>

<script>
import { inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    class Text extends Phaser.GameObjects.Text {
      preUpdate (...arg) {
        if (context.attrs.onPreUpdate) context.emit('preUpdate', this, ...arg)
      }
    }
    const object = new Text(scene, props.x || 0, props.y || 0, props.text)
    initGameObject(object, props, context)
    return { object }
  },
  props: [
    'visible',
    'text',
    'rotation',
    'x', 'y',
    'origin', 'originX', 'originY',
    'scale', 'scaleX', 'scaleY',
    'depth',
    'alpha',
    'style', 'lineSpacing',
    'padding',
  ]
}
</script>
