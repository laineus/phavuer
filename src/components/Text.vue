<template>
  <div />
</template>

<script>
import { defineComponent, inject } from 'vue'
import { initGameObject } from '../index.js'
export default defineComponent({
  setup (props, context) {
    const scene = inject('scene')
    const object = new Phaser.GameObjects.Text(scene, props.x || 0, props.y || 0, props.text)
    initGameObject(object, props, context)
    return { object }
  },
  props: [
    'tween', 'tweens', 'timeline',
    'visible',
    'text',
    'rotation',
    'x', 'y',
    'origin', 'originX', 'originY',
    'displayOriginX', 'displayOriginY',
    'scale', 'scaleX', 'scaleY',
    'displayWidth', 'displayHeight',
    'depth',
    'alpha', 'blendMode', 'pipeline',
    'style', 'lineSpacing',
    'padding'
  ]
})
</script>
