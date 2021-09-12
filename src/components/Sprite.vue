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
      'texture', 'frame',
      'tint',
      'flipX', 'flipY'
    )
  },
  setup (props, context) {
    const scene = inject('scene')
    const object = new Phaser.GameObjects.Sprite(scene, props.x || 0, props.y || 0, props.texture)
    initGameObject(object, props, context)
    provide('gameObject', object)
    return { object }
  }
})
</script>
