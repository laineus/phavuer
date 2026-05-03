<script lang="ts" setup>
import type { GameObjectEmits } from '../lib/emits'
import * as Phaser from 'phaser'
import { inject } from 'vue'
import { defineGameObject, makeGameObjectReactive, makeReactive } from '../lib/componentBuilder'
import commonProps, { gameObjectProps } from '../lib/props'
import { InjectionKeys } from '../lib/provider'
import setters from '../lib/setters'

const props = defineProps({
  ...gameObjectProps,
  x1: commonProps.x1,
  y1: commonProps.y1,
  x2: commonProps.x2,
  y2: commonProps.y2,
  lineWidth: commonProps.lineWidth,
  strokeColor: commonProps.strokeColor,
  strokeAlpha: commonProps.strokeAlpha,
})
defineEmits<GameObjectEmits<Phaser.GameObjects.Line>>()

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.Line(scene, props.x || 0, props.y || 0, props.x1 ?? 0, props.y1 ?? 0, props.x2 ?? 0, props.y2 ?? 0)

makeGameObjectReactive(props, object)
makeReactive(row => [
  row('x1', () => props.x1!, setters.x1(object)),
  row('y1', () => props.y1!, setters.y1(object)),
  row('x2', () => props.x2!, setters.x2(object)),
  row('y2', () => props.y2!, setters.y2(object)),
  row('lineWidth', () => props.lineWidth!, setters.lineWidth(object)),
  row('strokeColor', () => props.strokeColor!, setters.strokeColor(object)),
  row('strokeAlpha', () => props.strokeAlpha!, setters.strokeAlpha(object)),
])

defineGameObject(object, props)

defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
