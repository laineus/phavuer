<script>
import { defineComponent, inject, provide, ref } from 'vue'
import { InjectionKeys } from '../index'

export default defineComponent({
  props: {
    name: { type: String, required: true },
    autoStart: { type: Boolean, default: true },
  },
  emits: ['init', 'create', 'update', 'preload'],
  setup(props, context) {
    const show = ref(false)
    const preUpdateEvents = []
    const postUpdateEvents = []
    const Scene = class extends Phaser.Scene {
      init(data) {
        context.emit('init', this, data)
      }

      create(data) {
        show.value = true
        context.emit('create', this, data)
      }

      update(time, delta) {
        preUpdateEvents.forEach(e => e(time, delta))
        context.emit('update', this, time, delta)
        postUpdateEvents.forEach(e => e(time, delta))
      }

      preload() {
        context.emit('preload', this)
      }
    }
    const game = inject(InjectionKeys.Game)
    const scene = game.scene.add(props.name, Scene, props.autoStart)
    scene.events.on('shutdown', () => show.value = false)
    provide(InjectionKeys.Scene, scene)
    provide(InjectionKeys.PreUpdateEvents, preUpdateEvents)
    provide(InjectionKeys.PostUpdateEvents, postUpdateEvents)
    return { scene, show }
  },
})
</script>

<template>
  <slot v-if="show" />
</template>
