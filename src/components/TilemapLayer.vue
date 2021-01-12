<template>
  <div />
</template>

<script>
import { inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  props: [
    'tween',
    'visible',
    'x', 'y',
    'width', 'height',
    'depth',
    'pipeline',
    'tilemap', 'layerIndex', 'tileset', 'collision', 'collisionByProperty'
  ],
  setup (props, context) {
    const scene = inject('scene')
    const object = new Phaser.Tilemaps.TilemapLayer(scene, props.tilemap, props.layerIndex, props.tileset, props.x || 0, props.y || 0)
    initGameObject(object, props, context)
    return { object }
  }
}
</script>
