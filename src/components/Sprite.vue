<template>
  <div />
</template>

<script>
import { inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    class Sprite extends Phaser.GameObjects.Sprite {
      preUpdate (...arg) {
        if (context.attrs.onPreUpdate) context.emit('preUpdate', this, ...arg)
      }
    }
    const object = new Sprite(scene, props.x || 0, props.y || 0, props.texture)
    initGameObject(object, props, context)
    return { object }
  },
  props: [
    'tween',
    'visible',
    'x', 'y',
    'rotation',
    'origin', 'originX', 'originY',
    'scale', 'scaleX', 'scaleY',
    'depth',
    'alpha', 'blendMode', 'pipeline',
    'texture', 'frame',
    'tint',
    'flipX', 'flipY'
  ]
}
</script>
