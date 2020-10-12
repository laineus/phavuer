<template>
  <div />
</template>

<script>
import { inject, watch } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    const getInnerText = () => context.slots.default()[0].children
    class Text extends Phaser.GameObjects.Text {
      preUpdate () {}
    }
    const object = new Text(scene, props.x, props.y, getInnerText())
    watch(getInnerText, v => object.setText(v))
    initGameObject(object, props, context)
    return { object }
  },
  props: [
    'visible',
    'x', 'y',
    'origin', 'originX', 'originY',
    'scale', 'scaleX', 'scaleY',
    'depth',
    'alpha',
    'style'
  ]
}
</script>
