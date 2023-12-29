<template>
  <slot />
</template>

<script>
import { defineComponent, provide, inject } from 'vue'
import { initGameObject, InjectionKeys } from '../index.js'
import { gameObjectProps, mapProps } from '../props.js'
import { gameObjectEmits } from '../emits.js'
export default defineComponent({
  emits: [...gameObjectEmits],
  props: {
    ...gameObjectProps,
    ...mapProps(
      'points',
      'fillColor', 'fillAlpha',
      'lineWidth', 'strokeColor', 'strokeAlpha',
      'points'
    )
  },
  setup (props, context) {
    const scene = inject(InjectionKeys.Scene)
    const object = new Phaser.GameObjects.Polygon(scene, props.x || 0, props.y || 0, props.points)
    initGameObject(object, props, context)
    provide(InjectionKeys.GameObject, object)
    return { object }
  }
})
</script>
