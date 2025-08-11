<script>
import { defineComponent, inject, provide } from 'vue'
import { gameObjectEmits } from '../emits.js'
import { initGameObject, InjectionKeys } from '../index.js'
import { gameObjectProps, mapProps } from '../props.js'

export default defineComponent({
  props: {
    ...gameObjectProps,
    ...mapProps(
      'points',
      'fillColor',
      'fillAlpha',
      'lineWidth',
      'strokeColor',
      'strokeAlpha',
      'points',
    ),
  },
  emits: [...gameObjectEmits],
  setup(props, context) {
    const scene = inject(InjectionKeys.Scene)
    const object = new Phaser.GameObjects.Polygon(scene, props.x || 0, props.y || 0, props.points)
    initGameObject(object, props, context)
    provide(InjectionKeys.GameObject, object)
    return { object }
  },
})
</script>

<template>
  <slot />
</template>
