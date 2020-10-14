<template>
  <div><slot v-if="show" /></div>
</template>

<script>
import { provide, inject, ref } from 'vue'
import { initGameObject } from '../index.js'
export default {
  props: {
    name: { type: String, require: true },
    autoStart: { type: Boolean, default: true }
  },
  setup (props, context) {
    const show = ref(true)
    const Scene = class extends Phaser.Scene {
      init (data) {
        show.value = true
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
    scene.events.on('shutdown', () => show.value = false)
    provide('scene', scene)
    return { scene, show }
  }
}
</script>
