<script lang="ts" setup>
import type { GameObjectEmits } from '../emits'
import * as Phaser from 'phaser'
import { inject, provide } from 'vue'
import { initGameObject } from '../index'
import commonProps, { gameObjectProps } from '../props'
import { InjectionKeys } from '../provider'

const props = defineProps({
  ...gameObjectProps,
  points: commonProps.points,
  fillColor: commonProps.fillColor,
  fillAlpha: commonProps.fillAlpha,
  lineWidth: commonProps.lineWidth,
  strokeColor: commonProps.strokeColor,
  strokeAlpha: commonProps.strokeAlpha,
})
defineEmits<GameObjectEmits<Phaser.GameObjects.Polygon>>()

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.Polygon(scene, props.x || 0, props.y || 0, props.points)
initGameObject(object, props)
provide(InjectionKeys.GameObject, object)
</script>

<template>
  <slot />
</template>
