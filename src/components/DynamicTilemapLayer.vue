<template>
  <div />
</template>

<script>
import { inject } from 'vue'
import { initGameObject } from 'phavuer'
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
    class DynamicTilemapLayer extends Phaser.Tilemaps.DynamicTilemapLayer {
      preUpdate () {}
    }
    const object = new DynamicTilemapLayer(scene, props.tilemap, props.layerIndex, props.tileset, props.x, props.y)
    initGameObject(object, props, context)
    return { object }
  }
}
</script>
