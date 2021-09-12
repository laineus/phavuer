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
      'width', 'height',
      'fillColor', 'fillAlpha',
      'lineWidth', 'strokeColor', 'strokeAlpha'
    )
  },
  setup (props, context) {
    const scene = inject('scene')
    const object = new Phaser.GameObjects.Rectangle(scene, props.x || 0, props.y || 0, props.width, props.height)
    initGameObject(object, props, context)
    provide('gameObject', object)
    return { object }
  }
})
</script>
