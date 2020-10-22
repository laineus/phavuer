<template>
  <div />
</template>

<script>
import { inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    class Zone extends Phaser.GameObjects.Zone {
      preUpdate () {}
    }
    const object = new Zone(scene, props.x, props.y, props.width, props.height)
    initGameObject(object, props, context)
    return { object }
  },
  props: [
    'active',
    'x', 'y',
    'width', 'height',
    'origin', 'originX', 'originY',
  ]
}
</script>
