<template>
  <div />
</template>

<script>
import { defineComponent, inject } from 'vue'
import { initGameObject } from '../index.js'
export default defineComponent({
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
})
</script>
