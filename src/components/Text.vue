<template>
  <div />
</template>

<script>
import { defineComponent, inject } from 'vue'
import { initGameObject, InjectionSymbols } from '../index.js'
import { gameObjectProps, mapProps } from '../props.js'
export default defineComponent({
  props: {
    ...gameObjectProps,
    ...mapProps(
      'text',
      'style', 'lineSpacing',
      'padding'
    )
  },
  setup (props, context) {
    const scene = inject(InjectionSymbols.Scene)
    const object = new Phaser.GameObjects.Text(scene, props.x || 0, props.y || 0, props.text)
    initGameObject(object, props, context)
    return { object }
  }
})
</script>
