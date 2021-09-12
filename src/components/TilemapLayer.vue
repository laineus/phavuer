<template>
  <div />
</template>

<script>
import { defineComponent, inject } from 'vue'
import { initGameObject } from '../index.js'
import { mapProps } from '../props.js'
export default defineComponent({
  props: {
    ...mapProps(
      'tween', 'tweens', 'timeline',
      'visible',
      'x', 'y',
      'width', 'height',
      'depth',
      'pipeline',
      'tilemap', 'layerIndex', 'tileset', 'collision', 'collisionByProperty'
    )
  },
  setup (props, context) {
    const scene = inject('scene')
    const object = new Phaser.Tilemaps.TilemapLayer(scene, props.tilemap, props.layerIndex, props.tileset, props.x || 0, props.y || 0)
    initGameObject(object, props, context)
    return { object }
  }
})
</script>
