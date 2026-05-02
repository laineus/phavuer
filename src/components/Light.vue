<script lang="ts" setup>
import type { CreateOnlyEmits } from '../emits'
import * as Phaser from 'phaser'
import { initGameObject } from '../index'
import commonProps from '../props'

const props = defineProps({
  tween: commonProps.tween,
  tweens: commonProps.tweens,
  timeline: commonProps.timeline,
  visible: commonProps.visible,
  x: commonProps.x,
  y: commonProps.y,
  radius: commonProps.radius,
  color: commonProps.color,
  intensity: commonProps.intensity,
})
defineEmits<CreateOnlyEmits<Phaser.GameObjects.Light>>()

const { r, g, b } = Phaser.Display.Color.IntegerToRGB(props.color ?? 0xffffff)

const object = new Phaser.GameObjects.Light(props.x || 0, props.y || 0, props.radius ?? 0, r, g, b, props.intensity)
initGameObject(object, props)
</script>

<template>
  <slot />
</template>
