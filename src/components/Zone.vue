<template>
  <div />
</template>

<script>
import { defineComponent, inject } from 'vue'
import { initGameObject, InjectionKeys } from '../index.js'
import { mapProps } from '../props.js'
export default defineComponent({
  props: {
    ...mapProps(
      'tween', 'tweens', 'timeline',
      'active',
      'dropArea',
      'x', 'y',
      'width', 'height',
      'origin', 'originX', 'originY',
      'displayOriginX', 'displayOriginY'
    )
  },
  setup (props, context) {
    const scene = inject(InjectionKeys.Scene)
    const object = new Phaser.GameObjects.Zone(scene, props.x || 0, props.y || 0, props.width, props.height)
    initGameObject(object, props, context)
    return { object }
  }
})
</script>
