<template>
  <div />
</template>

<script>
import { inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  props: [
    'visible',
    'x', 'y',
    'width', 'height',
    'depth',
    'pipeline',
    'tilemap', 'layerIndex', 'tileset', 'collision'
  ],
  setup (props, context) {
    const scene = inject('scene')
    class TilemapLayer extends Phaser.Tilemaps.TilemapLayer {
      preUpdate (...arg) {
        if (context.attrs.onPreUpdate) context.emit('preUpdate', this, ...arg)
      }
    }
    const object = new TilemapLayer(scene, props.tilemap, props.layerIndex, props.tileset, props.x || 0, props.y || 0)
    initGameObject(object, props, context)
    return { object }
  }
}
</script>
