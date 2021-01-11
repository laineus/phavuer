<template>
  <div />
</template>

<script>
import { inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    const object = new Phaser.GameObjects.Text(scene, props.x || 0, props.y || 0, props.text)
    initGameObject(object, props, context)
    return { object }
  },
  props: [
    'tween',
    'visible',
    'text',
    'rotation',
    'x', 'y',
    'origin', 'originX', 'originY',
    'displayOriginX', 'displayOriginY',
    'scale', 'scaleX', 'scaleY',
    'displayWidth', 'displayHeight',
    'depth',
    'alpha',
    'style', 'lineSpacing',
    'padding',
  ]
}
</script>
