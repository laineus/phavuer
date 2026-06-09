<script lang="ts" setup>
import type { PropType } from 'vue'
import type { GameObjectEmits } from '../../lib/emits'
import * as Phaser from 'phaser'
import { inject, watch } from 'vue'
import { defineGameObject, makeGameObjectReactive, makeReactive } from '../../lib/componentBuilder'
import commonProps, { gameObjectProps } from '../../lib/props'
import { InjectionKeys } from '../../lib/provider'
import setters from '../../lib/setters'

type ColorBands = Phaser.Types.Display.ColorBandConfig | Phaser.Display.ColorBand | (Phaser.Types.Display.ColorBandConfig | Phaser.Display.ColorBand)[]

const props = defineProps({
  ...gameObjectProps,
  // Construction-time only
  bands: { type: [Object, Array] as PropType<ColorBands> },
  length: { type: Number },
  direction: { type: Number },
  // Reactive
  width: commonProps.width,
  height: commonProps.height,
  offset: { type: Number },
  repeatMode: { type: Number },
  shapeMode: { type: Number },
  dither: { type: Boolean },
  start: { type: Object as PropType<Phaser.Types.Math.Vector2Like> },
  shape: { type: Object as PropType<Phaser.Types.Math.Vector2Like> },
})
defineEmits<GameObjectEmits<Phaser.GameObjects.Gradient>>()

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.Gradient(scene, { bands: props.bands, length: props.length, direction: props.direction }, props.x || 0, props.y || 0, props.width, props.height)

watch(() => props.bands, () => {
  console.warn('[phavuer] Gradient: "bands" cannot be changed reactively. Use :key to remount.')
}, { deep: true })
watch(() => props.length, () => {
  console.warn('[phavuer] Gradient: "length" cannot be changed reactively. Use :key to remount.')
})
watch(() => props.direction, () => {
  console.warn('[phavuer] Gradient: "direction" cannot be changed reactively. Use :key to remount.')
})

makeGameObjectReactive(props, object)
makeReactive(row => [
  row('width', () => props.width!, setters.width(object)),
  row('height', () => props.height!, setters.height(object)),
  row('offset', () => props.offset!, (v) => { object.offset = v }),
  row('repeatMode', () => props.repeatMode!, (v) => { object.repeatMode = v }),
  row('shapeMode', () => props.shapeMode!, (v) => { object.shapeMode = v }),
  row('dither', () => props.dither!, (v) => { object.dither = v }),
  row('start', () => props.start!, (v) => { object.start = v }),
  row('shape', () => props.shape!, (v) => { object.shape = v }),
])

defineGameObject(object, props)

defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
