<script lang="ts" setup>
import * as Phaser from 'phaser'
import { inject } from 'vue'
import { gameObjectEmits } from '../emits'
import { initGameObject, InjectionKeys } from '../index'
import commonProps, { gameObjectProps } from '../props'

const props = defineProps({
  tween: gameObjectProps.tween,
  tweens: gameObjectProps.tweens,
  timeline: gameObjectProps.timeline,
  active: gameObjectProps.active,
  visible: gameObjectProps.visible,
  x: gameObjectProps.x,
  y: gameObjectProps.y,
  rotation: gameObjectProps.rotation,
  origin: gameObjectProps.origin,
  originX: gameObjectProps.originX,
  originY: gameObjectProps.originY,
  displayOriginX: gameObjectProps.displayOriginX,
  displayOriginY: gameObjectProps.displayOriginY,
  scale: gameObjectProps.scale,
  scaleX: gameObjectProps.scaleX,
  scaleY: gameObjectProps.scaleY,
  displayWidth: gameObjectProps.displayWidth,
  displayHeight: gameObjectProps.displayHeight,
  scrollFactor: gameObjectProps.scrollFactor,
  scrollFactorX: gameObjectProps.scrollFactorX,
  scrollFactorY: gameObjectProps.scrollFactorY,
  dropZone: gameObjectProps.dropZone,
  depth: gameObjectProps.depth,
  lighting: gameObjectProps.lighting,
  width: commonProps.width,
  height: commonProps.height,
})
const emit = defineEmits(gameObjectEmits)

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.Zone(scene, props.x || 0, props.y || 0, props.width, props.height)
initGameObject(object, props, emit)
</script>

<template>
  <slot />
</template>
