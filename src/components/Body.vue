<script lang="ts" setup>
import type * as Phaser from 'phaser'
import { inject } from 'vue'
import { bodyEmits } from '../emits'
import { initGameObject, InjectionKeys } from '../index'
import commonProps from '../props'

const props = defineProps({
  width: commonProps.width,
  height: commonProps.height,
  offsetX: commonProps.offsetX,
  offsetY: commonProps.offsetY,
  enable: commonProps.enable,
  immovable: commonProps.immovable,
  moves: commonProps.moves,
  bounceX: commonProps.bounceX,
  bounceY: commonProps.bounceY,
  drag: commonProps.drag,
  dragX: commonProps.dragX,
  dragY: commonProps.dragY,
  gravityX: commonProps.gravityX,
  gravityY: commonProps.gravityY,
  frictionX: commonProps.frictionX,
  frictionY: commonProps.frictionY,
  velocityX: commonProps.velocityX,
  velocityY: commonProps.velocityY,
  maxVelocityX: commonProps.maxVelocityX,
  maxVelocityY: commonProps.maxVelocityY,
  accelerationX: commonProps.accelerationX,
  accelerationY: commonProps.accelerationY,
  collideWorldBounds: commonProps.collideWorldBounds,
})
const emit = defineEmits(bodyEmits)

const scene = inject(InjectionKeys.Scene)!
if (!scene.physics)
  throw new Error('Physics is not available. Add physics setting to your game config. e.g. `physics: { default: \'arcade\' }`')
const gameObject = inject(InjectionKeys.GameObject)!
const body = scene.physics.add.existing(gameObject, false).body as Phaser.Physics.Arcade.Body
initGameObject(body, props, emit)
</script>

<template>
  <slot />
</template>
