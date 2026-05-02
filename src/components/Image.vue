<script lang="ts" setup>
import type { GameObjectEmits } from '../emits'
import * as Phaser from 'phaser'
import { inject, provide } from 'vue'
import { initGameObject } from '../index'
import commonProps, { gameObjectProps } from '../props'
import { InjectionKeys } from '../provider'

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
</script>

<template>
  <slot />
</template>
