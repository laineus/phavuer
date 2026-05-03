<script lang="ts" setup>
import type { GameObjectEmits } from '../../lib/emits'
import * as Phaser from 'phaser'
import { inject } from 'vue'
import { defineGameObject, makeGameObjectReactive, makeReactive } from '../../lib/componentBuilder'
import commonProps, { gameObjectProps } from '../../lib/props'
import { InjectionKeys } from '../../lib/provider'
import setters from '../../lib/setters'

const props = defineProps({
  ...gameObjectProps,
  texture: commonProps.texture,
  frame: commonProps.frame,
  tint: commonProps.tint,
  flipX: commonProps.flipX,
  flipY: commonProps.flipY,
})
defineEmits<GameObjectEmits<Phaser.GameObjects.Image>>()

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.Image(scene, props.x || 0, props.y || 0, props.texture!)

makeGameObjectReactive(props, object)
makeReactive(row => [
  row('texture', () => props.texture!, setters.texture(object)),
  row('frame', () => props.frame!, setters.frame(object)),
  row('tint', () => props.tint, setters.tint(object)),
  row('flipX', () => props.flipX, setters.flipX(object)),
  row('flipY', () => props.flipY, setters.flipY(object)),
])

defineGameObject(object, props)

defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
