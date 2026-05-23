<script lang="ts">
import type * as Phaser from 'phaser'
import { inject, onBeforeUnmount, provide, watch } from 'vue'
import { InjectionKeys } from '../lib/provider'

export type UpdateEventHandler = (time: number, delta: number) => void

export interface CameraContext {
  camera: Phaser.Cameras.Scene2D.Camera
  objects: Set<Phaser.GameObjects.GameObject>
  registerObject: (obj: Phaser.GameObjects.GameObject) => void
  unregisterObject: (obj: Phaser.GameObjects.GameObject) => void
}
</script>

<script lang="ts" setup>
const props = defineProps({
  main: { type: Boolean, default: false },
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  zoom: { type: Number, default: 1 },
  rotation: { type: Number, default: 0 },
  follow: { type: Object as () => Phaser.GameObjects.GameObject | null },
  followLerp: { type: Number, default: 1 },
  bounds: { type: Object as () => Phaser.Geom.Rectangle | null },
})
const emit = defineEmits<{
  create: [camera: Phaser.Cameras.Scene2D.Camera]
}>()
defineSlots<{
  default: (props: { camera: Phaser.Cameras.Scene2D.Camera, zoom: number }) => any
}>()

const scene = inject(InjectionKeys.Scene)!
const allCameraContexts = inject(InjectionKeys.CameraContexts)!

const camera = props.main
  ? scene.cameras.main
  : scene.cameras.add(0, 0, scene.scale.width, scene.scale.height)

camera.scrollX = props.x
camera.scrollY = props.y
camera.zoom = props.zoom
camera.setRotation(props.rotation)

if (props.bounds) {
  camera.setBounds(props.bounds.x, props.bounds.y, props.bounds.width, props.bounds.height)
}

if (props.follow) {
  camera.startFollow(props.follow, true, props.followLerp, props.followLerp)
}

const objects = new Set<Phaser.GameObjects.GameObject>()
const context: CameraContext = {
  camera,
  objects,
  registerObject: (obj) => { objects.add(obj) },
  unregisterObject: (obj) => { objects.delete(obj) },
}
allCameraContexts.push(context)

const preUpdateEvents = inject(InjectionKeys.PreUpdateEvents)!
const updateHandler: UpdateEventHandler = () => {
  camera.scrollX = props.x
  camera.scrollY = props.y
  camera.zoom = props.zoom
  camera.setRotation(props.rotation)

  const otherObjects = new Set<Phaser.GameObjects.GameObject>()
  for (const ctx of allCameraContexts) {
    if (ctx !== context) {
      for (const obj of ctx.objects) {
        otherObjects.add(obj)
      }
    }
  }
  camera.ignore(Array.from(otherObjects))
}
preUpdateEvents.push(updateHandler)

watch(() => props.follow, (newFollow) => {
  if (newFollow) {
    camera.startFollow(newFollow, true, props.followLerp, props.followLerp)
  }
  else {
    camera.stopFollow()
  }
})

watch(() => props.bounds, (newBounds) => {
  if (newBounds) {
    camera.setBounds(newBounds.x, newBounds.y, newBounds.width, newBounds.height)
  }
})

onBeforeUnmount(() => {
  const i = preUpdateEvents.indexOf(updateHandler)
  if (i !== -1) {
    preUpdateEvents.splice(i, 1)
  }
  const ci = allCameraContexts.indexOf(context)
  if (ci !== -1) {
    allCameraContexts.splice(ci, 1)
  }
  if (!props.main) {
    scene.cameras.remove(camera)
  }
})

emit('create', camera)
provide(InjectionKeys.Camera, camera)
provide(InjectionKeys.CameraContext, context)
defineExpose({ phaserInstance: camera })
</script>

<template>
  <slot :camera="camera" :zoom="camera.zoom" />
</template>
