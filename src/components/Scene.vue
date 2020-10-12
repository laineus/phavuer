<template>
  <div><slot /></div>
</template>

<script>
import { provide, inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  props: {
    name: { type: String, require: true },
    autoStart: { type: Boolean, default: true }
  },
  setup (props, context) {
    const Scene = class extends Phaser.Scene {
      init (data) {
        context.emit('init', this, data)
      }
      create (data) {
        context.emit('create', this, data)
      }
      update (time, delta) {
        context.emit('update', this, time, delta)
      }
      preload () {
        context.emit('preload', this)
      }
    }
    const game = inject('game')
    const scene = game.scene.add(props.name, Scene, props.autoStart)
    provide('scene', scene)
    return { scene }
  }
}
</script>
