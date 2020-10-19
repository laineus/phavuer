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
    'tilemap', 'layerIndex', 'tileset', 'collision'
  ],
  setup (props, context) {
    const scene = inject('scene')
    class StaticTilemapLayer extends Phaser.Tilemaps.StaticTilemapLayer {
      preUpdate () {}
    }
    const object = new StaticTilemapLayer(scene, props.tilemap, props.layerIndex, props.tileset, props.x, props.y)
    initGameObject(object, props, context)
    return { object }
  }
}
</script>
