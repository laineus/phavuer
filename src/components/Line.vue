<script lang="ts" setup>
import type { GameObjectEmits } from '../lib/emits'
import * as Phaser from 'phaser'
import { inject, provide } from 'vue'
import initGameObject from '../lib/initGameObject'
import commonProps, { gameObjectProps } from '../lib/props'
import { InjectionKeys } from '../lib/provider'

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
initGameObject(object, props)
provide(InjectionKeys.GameObject, object)
defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
