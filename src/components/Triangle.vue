<script lang="ts" setup>
import * as Phaser from 'phaser'
import { inject, provide } from 'vue'
import { gameObjectEmits } from '../emits'
import { initGameObject, InjectionKeys } from '../index'
import commonProps, { gameObjectProps } from '../props'

const props = defineProps({
  ...gameObjectProps,
  x1: commonProps.x1,
  y1: commonProps.y1,
  x2: commonProps.x2,
  y2: commonProps.y2,
  x3: commonProps.x3,
  y3: commonProps.y3,
  fillColor: commonProps.fillColor,
  fillAlpha: commonProps.fillAlpha,
  lineWidth: commonProps.lineWidth,
  strokeColor: commonProps.strokeColor,
  strokeAlpha: commonProps.strokeAlpha,
})
const emit = defineEmits(gameObjectEmits)

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.Triangle(scene, props.x || 0, props.y || 0, props.x1 ?? 0, props.y1 ?? 0, props.x2 ?? 0, props.y2 ?? 0, props.x3 ?? 0, props.y3 ?? 0)
initGameObject(object, props, emit)
provide(InjectionKeys.GameObject, object)
</script>

<template>
  <slot />
</template>
