<template>
  <div />
</template>

<script>
import { inject, watch } from 'vue'
import { initGameObject } from './index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    const getInnerText = () => context.slots.default()[0].children
    const object = new Phaser.GameObjects.Text(scene, props.x, props.y, getInnerText())
    console.log(object)
    watch(getInnerText, v => object.setText(v))
    initGameObject(object, props, context)
    return { object }
  },
  props: [
    'visible',
    'x', 'y',
    'origin', 'originX', 'originY',
    'depth',
    'style'
  ]
}
</script>
