<template>
  <slot />
</template>

<script>
import { defineComponent, provide, inject, onUpdated, onMounted } from 'vue'
import { initGameObject, InjectionKeys } from '../index.js'
import { gameObjectProps, mapProps } from '../props.js'
import { gameObjectEmits } from '../emits.js'
export default defineComponent({
  emits: [...gameObjectEmits],
  props: {
    ...gameObjectProps,
    ...mapProps(
      'width', 'height'
    )
  },
  setup (props, context) {
    const scene = inject(InjectionKeys.Scene)
    const object = new Phaser.GameObjects.RenderTexture(scene, props.x || 0, props.y || 0, props.width, props.height)
    initGameObject(object, props, context)
    const renderList = []
    provide(InjectionKeys.RenderTextureRenderList, renderList)
    provide(InjectionKeys.GameObject, object)
    const render = () => {
      object.beginDraw()
      renderList.forEach((v) => object.batchDraw(v))
      object.endDraw()
    }
    onMounted(() => {
      render()
    })
    onUpdated(() => {
      object.clear()
      render()
    })
    return { object }
  }
})
</script>
