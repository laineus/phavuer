<template>
  <slot />
</template>

<script>
import { defineComponent, inject } from 'vue'
import { initGameObject, InjectionKeys } from '../index.js'
import { mapProps, gameObjectProps } from '../props.js'
export default defineComponent({
  emits: ['create'],
  props: {
    ...gameObjectProps,
    ...mapProps('width', 'height', 'collision', 'collisionByProperty'),
    tilemap: { type: Object },
    layerIndex: { type: Number },
    tileset: { type: [Array, String] }
  },
  setup (props, context) {
    const scene = inject(InjectionKeys.Scene)
    const object = new Phaser.Tilemaps.TilemapLayer(scene, props.tilemap, props.layerIndex, props.tileset, props.x || 0, props.y || 0)
    initGameObject(object, props, context)
    return { object }
  }
})
</script>
