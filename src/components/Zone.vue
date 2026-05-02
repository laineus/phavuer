<script lang="ts" setup>
import type { GameObjectEmits } from '../emits'
import * as Phaser from 'phaser'
import { inject } from 'vue'
import initGameObject from '../lib/initGameObject'
import commonProps, { gameObjectProps } from '../props'
import { InjectionKeys } from '../provider'

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
defineEmits<GameObjectEmits<Phaser.GameObjects.Zone>>()

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.Zone(scene, props.x || 0, props.y || 0, props.width, props.height)
initGameObject(object, props)
defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
