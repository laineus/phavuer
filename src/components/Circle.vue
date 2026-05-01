<script lang="ts" setup>
import * as Phaser from 'phaser'
import { inject, provide } from 'vue'
import { gameObjectEmits } from '../emits'
import { initGameObject, InjectionKeys } from '../index'
import commonProps, { gameObjectProps } from '../props'

const props = defineProps({
  ...gameObjectProps,
  radius: commonProps.radius,
  fillColor: commonProps.fillColor,
  fillAlpha: commonProps.fillAlpha,
  lineWidth: commonProps.lineWidth,
  strokeColor: commonProps.strokeColor,
  strokeAlpha: commonProps.strokeAlpha,
})
const emit = defineEmits(gameObjectEmits)

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.Arc(scene, props.x || 0, props.y || 0, props.radius)
initGameObject(object, props, emit)
provide(InjectionKeys.GameObject, object)
</script>

<template>
  <slot />
</template>
