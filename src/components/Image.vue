<script lang="ts" setup>
import type { GameObjectEmits } from '../lib/emits'
import * as Phaser from 'phaser'
import { inject, provide } from 'vue'
import initGameObject from '../lib/initGameObject'
import commonProps, { gameObjectProps } from '../lib/props'
import { InjectionKeys } from '../lib/provider'

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
const object = new Phaser.GameObjects.Image(scene, props.x || 0, props.y || 0, props.texture)
initGameObject(object, props)
provide(InjectionKeys.GameObject, object)
defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
