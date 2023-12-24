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
      'width', 'height',
      'fillColor', 'fillAlpha',
      'lineWidth', 'strokeColor', 'strokeAlpha'
    )
  },
  setup (props, context) {
    const scene = inject(InjectionKeys.Scene)
    const object = new Phaser.GameObjects.Rectangle(scene, props.x || 0, props.y || 0, props.width, props.height)
    initGameObject(object, props, context)
    provide(InjectionKeys.GameObject, object)
    return { object }
  }
})
</script>
