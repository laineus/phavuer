<template>
</template>

<script>
import { defineComponent, inject } from 'vue'
import { initGameObject, InjectionKeys } from '../index.js'
import { gameObjectProps, mapProps } from '../props.js'
import { gameObjectEmits } from '../emits.js'
export default defineComponent({
  emits: [...gameObjectEmits],
  props: {
    ...Object.fromEntries(
      Object.entries(gameObjectProps).filter(([k]) => !['alpha', 'blendMode', 'pipeline'].includes(k))
    ),
    ...mapProps('width', 'height')
  },
  setup (props, context) {
    const scene = inject(InjectionKeys.Scene)
    const object = new Phaser.GameObjects.Zone(scene, props.x || 0, props.y || 0, props.width, props.height)
    initGameObject(object, props, context)
    return { object }
  }
})
</script>
