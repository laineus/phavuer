<script>
import * as Phaser from 'phaser'
import { defineComponent, inject, nextTick, onMounted, onUpdated, provide } from 'vue'
import { gameObjectEmits } from '../emits.js'
import { initGameObject, InjectionKeys } from '../index.js'
import { gameObjectProps, mapProps } from '../props.js'

export default defineComponent({
  props: {
    ...gameObjectProps,
    ...mapProps(
      'width',
      'height',
    ),
  },
  emits: [...gameObjectEmits],
  setup(props, context) {
    const scene = inject(InjectionKeys.Scene)
    const object = new Phaser.GameObjects.RenderTexture(scene, props.x || 0, props.y || 0, props.width, props.height)
    initGameObject(object, props, context)
    const renderList = []
    provide(InjectionKeys.RenderTextureRenderList, renderList)
    provide(InjectionKeys.GameObject, object)
    const render = object.beginDraw
      // Phaser v3
      ? () => {
          object.beginDraw()
          renderList.forEach(v => object.batchDraw(v))
          object.endDraw()
        }
      // Phaser v4
      : () => {
          renderList.forEach(v => object.draw(v))
          object.render()
        }
    onMounted(() => {
      render()
    })
    onUpdated(() => {
      object.clear()
      render()
    })
    return { object }
  },
})
</script>

<template>
  <slot />
</template>
