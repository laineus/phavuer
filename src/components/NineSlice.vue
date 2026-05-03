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
  width: commonProps.width,
  height: commonProps.height,
  leftWidth: commonProps.leftWidth,
  rightWidth: commonProps.rightWidth,
  topHeight: commonProps.topHeight,
  bottomHeight: commonProps.bottomHeight,
  texture: commonProps.texture,
  frame: commonProps.frame,
  tint: commonProps.tint,
})
defineEmits<GameObjectEmits<Phaser.GameObjects.NineSlice>>()

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.NineSlice(scene, props.x || 0, props.y || 0, props.texture!, props.frame, props.width, props.height, props.leftWidth, props.rightWidth, props.topHeight, props.bottomHeight)

makeGameObjectReactive(props, object)
makeReactive(row => [
  row('width', () => props.width!, setters.width(object)),
  row('height', () => props.height!, setters.height(object)),
  row('leftWidth', () => props.leftWidth!, setters.leftWidth(object)),
  row('rightWidth', () => props.rightWidth!, setters.rightWidth(object)),
  row('topHeight', () => props.topHeight!, setters.topHeight(object)),
  row('bottomHeight', () => props.bottomHeight!, setters.bottomHeight(object)),
  row('texture', () => props.texture!, setters.texture(object)),
  row('frame', () => props.frame!, setters.frame(object)),
  row('tint', () => props.tint!, setters.tint(object)),
])

defineGameObject(object, props)

defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
