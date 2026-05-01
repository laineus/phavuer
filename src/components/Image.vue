<script lang="ts" setup>
import * as Phaser from 'phaser'
import { inject, provide } from 'vue'
import { gameObjectEmits } from '../emits'
import { initGameObject, InjectionKeys } from '../index'
import commonProps, { gameObjectProps } from '../props'

const props = defineProps({
  ...gameObjectProps,
  texture: commonProps.texture,
  frame: commonProps.frame,
  tint: commonProps.tint,
  flipX: commonProps.flipX,
  flipY: commonProps.flipY,
})
const emit = defineEmits(gameObjectEmits)

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.Image(scene, props.x || 0, props.y || 0, props.texture)
initGameObject(object, props, emit)
provide(InjectionKeys.GameObject, object)
</script>

<template>
  <slot />
</template>
