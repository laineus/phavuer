<template>
  <div />
</template>

<script>
import { provide, inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    const object = new Phaser.GameObjects.Light(props.x || 0, props.y || 0)
    initGameObject(object, props, context)
    return { object }
  },
  props: [
    'tween', 'tweens', 'timeline',
    'visible',
    'x', 'y',
    'radius',
    'color',
    'intensity'
  ]
}
</script>
