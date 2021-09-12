<template>
  <div><slot /></div>
</template>

<script>
import { defineComponent, provide, inject } from 'vue'
import { initGameObject } from '../index.js'
import { gameObjectProps, mapProps } from '../props.js'
export default defineComponent({
  props: {
    ...gameObjectProps,
    ...mapProps(
      'x1', 'y1', 'x2', 'y2',
      'lineWidth', 'strokeColor', 'strokeAlpha'
    )
  },
  setup (props, context) {
    const scene = inject('scene')
    const object = new Phaser.GameObjects.Line(scene, props.x || 0, props.y || 0, props.x1, props.y1, props.x2, props.y2)
    initGameObject(object, props, context)
    provide('gameObject', object)
    return { object }
  }
})
</script>
