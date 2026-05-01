<script lang="ts" setup>
import * as Phaser from 'phaser'
import { inject, provide } from 'vue'
import { gameObjectEmits } from '../emits'
import { initGameObject } from '../index'
import commonProps, { gameObjectProps } from '../props'
import { InjectionKeys } from '../provider'

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
const emit = defineEmits(gameObjectEmits)

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.NineSlice(scene, props.x || 0, props.y || 0, props.texture!, props.frame, props.width, props.height, props.leftWidth, props.rightWidth, props.topHeight, props.bottomHeight)
initGameObject(object, props, emit)
provide(InjectionKeys.GameObject, object)
</script>

<template>
  <slot />
</template>
