<script lang="ts" setup>
import type * as Phaser from 'phaser'
import type { BodyEmits } from '../../lib/emits'
import { inject, onBeforeUnmount } from 'vue'
import { makeReactive } from '../../lib/componentBuilder'
import commonProps from '../../lib/props'
import { InjectionKeys } from '../../lib/provider'
import setters from '../../lib/setters'

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
const emit = defineEmits<BodyEmits<Phaser.Physics.Arcade.Body>>()

const scene = inject(InjectionKeys.Scene)!
if (!scene.physics)
  throw new Error('Physics is not available. Add physics setting to your game config. e.g. `physics: { default: \'arcade\' }`')
const gameObject = inject(InjectionKeys.GameObject)!
const body = scene.physics.add.existing(gameObject, false).body as Phaser.Physics.Arcade.Body

makeReactive(row => [
  row('width', () => props.width!, v => body.setSize(v, body.height)),
  row('height', () => props.height!, v => body.setSize(body.width, v)),
  row('offsetX', () => props.offsetX!, setters.offsetX(body)),
  row('offsetY', () => props.offsetY!, setters.offsetY(body)),
  row('enable', () => props.enable!, setters.enable(body)),
  row('immovable', () => props.immovable!, setters.immovable(body)),
  row('moves', () => props.moves!, setters.moves(body)),
  row('bounceX', () => props.bounceX!, setters.bounceX(body)),
  row('bounceY', () => props.bounceY!, setters.bounceY(body)),
  row('drag', () => props.drag!, setters.drag(body)),
  row('dragX', () => props.dragX!, setters.dragX(body)),
  row('dragY', () => props.dragY!, setters.dragY(body)),
  row('gravityX', () => props.gravityX!, setters.gravityX(body)),
  row('gravityY', () => props.gravityY!, setters.gravityY(body)),
  row('frictionX', () => props.frictionX!, setters.frictionX(body)),
  row('frictionY', () => props.frictionY!, setters.frictionY(body)),
  row('velocityX', () => props.velocityX!, setters.velocityX(body)),
  row('velocityY', () => props.velocityY!, setters.velocityY(body)),
  row('maxVelocityX', () => props.maxVelocityX!, setters.maxVelocityX(body)),
  row('maxVelocityY', () => props.maxVelocityY!, setters.maxVelocityY(body)),
  row('accelerationX', () => props.accelerationX!, setters.accelerationX(body)),
  row('accelerationY', () => props.accelerationY!, setters.accelerationY(body)),
  row('collideWorldBounds', () => props.collideWorldBounds!, setters.collideWorldBounds(body)),
])

emit('create', body)
onBeforeUnmount(() => body.destroy())

defineExpose({ phaserInstance: body })
</script>

<template>
  <slot />
</template>
