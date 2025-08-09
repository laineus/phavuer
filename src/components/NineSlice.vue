<script>
import { defineComponent, inject, provide } from 'vue'
import { gameObjectEmits } from '../emits.js'
import { initGameObject, InjectionKeys } from '../index.js'
import { gameObjectProps, mapProps } from '../props.js'

export default defineComponent({
  props: {
    ...gameObjectProps,
    ...mapProps(
      'width',
      'height',
      'leftWidth',
      'rightWidth',
      'topHeight',
      'bottomHeight',
      'texture',
      'frame',
      'tint',
    ),
  },
  emits: [...gameObjectEmits],
  setup(props, context) {
    const scene = inject(InjectionKeys.Scene)
    const object = new Phaser.GameObjects.NineSlice(scene, props.x || 0, props.y || 0, props.texture, props.frame, props.width, props.height, props.leftWidth, props.rightWidth, props.topHeight, props.bottomHeight)
    initGameObject(object, props, context)
    provide(InjectionKeys.GameObject, object)
    return { object }
  },
})
</script>

<template>
  <slot />
</template>
