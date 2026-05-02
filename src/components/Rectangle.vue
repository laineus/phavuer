<script lang="ts" setup>
import type { GameObjectEmits } from '../lib/emits'
import * as Phaser from 'phaser'
import { inject, provide } from 'vue'
import { initGameObject } from '../lib/initComponent'
import commonProps, { gameObjectProps } from '../lib/props'
import { InjectionKeys } from '../lib/provider'

const props = defineProps({
  ...gameObjectProps,
  width: commonProps.width,
  height: commonProps.height,
  fillColor: commonProps.fillColor,
  fillAlpha: commonProps.fillAlpha,
  lineWidth: commonProps.lineWidth,
  strokeColor: commonProps.strokeColor,
  strokeAlpha: commonProps.strokeAlpha,
  radius: commonProps.radius,
})
defineEmits<GameObjectEmits<Phaser.GameObjects.Rectangle>>()

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.Rectangle(scene, props.x || 0, props.y || 0, props.width, props.height)
initGameObject(object, props)
provide(InjectionKeys.GameObject, object)
defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
