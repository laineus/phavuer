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
      preUpdate () {}
    }
    const object = new Container(scene)
    initGameObject(object, props, context)
    provide('container', object)
    return { object }
  },
  props: [
    'visible',
    'x', 'y',
    'depth',
    'alpha'
  ]
}
</script>
