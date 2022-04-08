<template>
  <div><slot /></div>
</template>

<script>
import { defineComponent, provide, inject } from 'vue'
import { initGameObject, InjectionKeys } from '../index.js'
import { gameObjectProps } from '../props.js'
export default defineComponent({
  props: {
    ...gameObjectProps
  },
  setup (props, context) {
    const scene = inject(InjectionKeys.Scene)
    const object = new Phaser.GameObjects.Container(scene, props.x || 0, props.y || 0)
    initGameObject(object, props, context)
    provide(InjectionKeys.Container, object)
    provide(InjectionKeys.GameObject, object)
    return { object }
  }
})
</script>
