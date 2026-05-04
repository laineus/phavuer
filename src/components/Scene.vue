<script lang="ts">
import * as Phaser from 'phaser'
import { inject, provide, ref } from 'vue'
import { InjectionKeys } from '../lib/provider'

export type UpdateEventHandler = (time: number, delta: number) => void
</script>

<script lang="ts" setup>
const props = defineProps({
  name: { type: String, required: true },
  autoStart: { type: Boolean, default: true },
})
const emit = defineEmits<{
  init: [scene: Phaser.Scene, data: object]
  create: [scene: Phaser.Scene, data: object]
  update: [scene: Phaser.Scene, time: number, delta: number]
  preload: [scene: Phaser.Scene]
}>()
defineSlots<{
  default: (props: { preloaded: boolean }) => any
}>()

const show = ref(false)
const preloaded = ref(false)
const preUpdateEvents: UpdateEventHandler[] = []
const postUpdateEvents: UpdateEventHandler[] = []
const Scene = class extends Phaser.Scene {
  init(data: object) {
    emit('init', this, data)
    show.value = true
  }

  preload() {
    emit('preload', this)
  }

  create(data: object) {
    preloaded.value = true
    emit('create', this, data)
  }

  update(time: number, delta: number) {
    preUpdateEvents.forEach(e => e(time, delta))
    emit('update', this, time, delta)
    postUpdateEvents.forEach(e => e(time, delta))
  }
}
const game = inject(InjectionKeys.Game)!
const scene = game.scene.add(props.name, Scene, props.autoStart)!
scene.events.on('shutdown', () => {
  show.value = false
  preloaded.value = false
})
provide(InjectionKeys.Scene, scene)
provide(InjectionKeys.PreUpdateEvents, preUpdateEvents)
provide(InjectionKeys.PostUpdateEvents, postUpdateEvents)
defineExpose({ phaserInstance: scene })
</script>

<template>
  <slot v-if="show" :preloaded="preloaded" />
</template>
