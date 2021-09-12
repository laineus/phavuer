<template>
  <div><slot v-if="show" /></div>
</template>

<script>
import { defineComponent, provide, inject, ref } from 'vue'
export default defineComponent({
  props: {
    name: { type: String, required: true },
    autoStart: { type: Boolean, default: true }
  },
  setup (props, context) {
    const show = ref(true)
    const preUpdateEvents = []
    const postUpdateEvents = []
    const Scene = class extends Phaser.Scene {
      init (data) {
        show.value = true
        context.emit('init', this, data)
      }
      create (data) {
        context.emit('create', this, data)
      }
      update (time, delta) {
        preUpdateEvents.forEach(e => e(time, delta))
        context.emit('update', this, time, delta)
        postUpdateEvents.forEach(e => e(time, delta))
      }
      preload () {
        context.emit('preload', this)
      }
    }
    const game = inject('game')
    const scene = game.scene.add(props.name, Scene, props.autoStart)
    scene.events.on('shutdown', () => show.value = false)
    provide('scene', scene)
    provide('preUpdateEvents', preUpdateEvents)
    provide('postUpdateEvents', postUpdateEvents)
    return { scene, show }
  }
})
</script>
