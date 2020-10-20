<template>
  <div />
</template>

<script>
import { inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    class Text extends Phaser.GameObjects.Text {}
    if (context.attrs.onUpdate) Text.prototype.preUpdate = (...arg) => context.emit('update', object, ...arg)
    const object = new Text(scene, props.x, props.y, props.text)
    initGameObject(object, props, context)
    return { object }
  },
  props: [
    'visible',
    'text',
    'x', 'y',
    'origin', 'originX', 'originY',
    'scale', 'scaleX', 'scaleY',
    'depth',
    'alpha',
    'style'
  ]
}
</script>
