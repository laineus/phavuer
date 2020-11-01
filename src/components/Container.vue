<template>
  <div><slot /></div>
</template>

<script>
import { provide, inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    class Container extends Phaser.GameObjects.Container {
      preUpdate (...arg) {
        if (context.attrs.onPreUpdate) context.emit('preUpdate', this, ...arg)
      }
    }
    const object = new Container(scene)
    initGameObject(object, props, context)
    provide('container', object)
    return { object }
  },
  props: [
    'visible',
    'width', 'height',
    'rotation',
    'x', 'y',
    'depth',
    'alpha'
  ]
}
</script>
