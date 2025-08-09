<script>
import { defineComponent, inject } from 'vue'
import { initGameObject, InjectionKeys } from '../index.js'
import { gameObjectProps, mapProps } from '../props.js'

export default defineComponent({
  props: {
    ...gameObjectProps,
    ...mapProps('width', 'height', 'collision', 'collisionByProperty'),
    tilemap: { type: Object },
    layerIndex: { type: Number },
    tileset: { type: [Array, String] },
    cullPadding: { type: Number },
    cullPaddingX: { type: Number },
    cullPaddingY: { type: Number },
  },
  emits: ['create'],
  setup(props, context) {
    const scene = inject(InjectionKeys.Scene)
    const object = new Phaser.Tilemaps.TilemapLayer(scene, props.tilemap, props.layerIndex, props.tileset, props.x || 0, props.y || 0)
    initGameObject(object, props, context)
    return { object }
  },
})
</script>

<template>
  <slot />
</template>
