<script lang="ts">
import * as Phaser from 'phaser'
import { inject, provide, ref } from 'vue'
import { InjectionKeys, PrivateInjectionKeys } from '../provider'

export type UpdateEventHandler = (time: number, delta: number) => void
</script>

<script lang="ts" setup>
const props = defineProps({
  name: { type: String, required: true },
  autoStart: { type: Boolean, default: true },
})
const emit = defineEmits(['init', 'create', 'update', 'preload'])

const show = ref(false)
const created = ref(false)
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
    created.value = true
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
  created.value = false
})
provide(InjectionKeys.Scene, scene)
provide(PrivateInjectionKeys.PreUpdateEvents, preUpdateEvents)
provide(PrivateInjectionKeys.PostUpdateEvents, postUpdateEvents)
</script>

<template>
  <slot v-if="show" :created="created" :scene="scene" />
</template>
