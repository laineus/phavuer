<script>
import { defineComponent, inject, provide } from 'vue'
import { gameObjectEmits } from '../emits.js'
import { initGameObject, InjectionKeys } from '../index.js'
import { gameObjectProps, mapProps } from '../props.js'

export default defineComponent({
  props: {
    ...Object.fromEntries(
      Object.entries(gameObjectProps).filter(([k]) => !['origin', 'originX', 'originY', 'displayOriginX', 'displayOriginY'].includes(k)),
    ),
    ...mapProps(
      'width',
      'height',
    ),
  },
  emits: [...gameObjectEmits],
  setup(props, context) {
    const scene = inject(InjectionKeys.Scene)
    const object = new Phaser.GameObjects.Container(scene, props.x || 0, props.y || 0)
    initGameObject(object, props, context)
    provide(InjectionKeys.Container, object)
    provide(InjectionKeys.GameObject, object)
    provide(InjectionKeys.RenderTextureRenderList, undefined)
    return { object }
  },
})
</script>

<template>
  <slot />
</template>
