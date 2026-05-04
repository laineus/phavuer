<script lang="ts" setup>
import type * as Phaser from 'phaser'
import { inject, onBeforeUnmount } from 'vue'
import { makeReactive } from '../../lib/componentBuilder'
import { InjectionKeys } from '../../lib/provider'
import { defineVModelProperty } from '../../lib/setters'

const props = defineProps({
  enable: { type: Boolean },
  width: { type: Number },
  height: { type: Number },
  offsetX: { type: Number },
  offsetY: { type: Number },
  immovable: { type: Boolean },
  moves: { type: Boolean },
  bounceX: { type: Number },
  bounceY: { type: Number },
  drag: { type: Number },
  dragX: { type: Number },
  dragY: { type: Number },
  gravityX: { type: Number },
  gravityY: { type: Number },
  frictionX: { type: Number },
  frictionY: { type: Number },
  velocityX: { type: Number },
  velocityY: { type: Number },
  maxVelocityX: { type: Number },
  maxVelocityY: { type: Number },
  accelerationX: { type: Number },
  accelerationY: { type: Number },
  collideWorldBounds: { type: Boolean },
})
const emit = defineEmits<{
  'create': [gameObject: Phaser.Physics.Arcade.Body]
  'update:velocityX': [value: number]
  'update:velocityY': [value: number]
}>()

const scene = inject(InjectionKeys.Scene)!
if (!scene.physics)
  throw new Error('Physics is not available. Add physics setting to your game config. e.g. `physics: { default: \'arcade\' }`')
const gameObject = inject(InjectionKeys.GameObject)!
const body = scene.physics.add.existing(gameObject, false).body as Phaser.Physics.Arcade.Body

makeReactive(row => [
  row('width', () => props.width!, v => body.setSize(v, body.height)),
  row('height', () => props.height!, v => body.setSize(body.width, v)),
  row('offsetX', () => props.offsetX!, v => body.setOffset(v, body.offset.y)),
  row('offsetY', () => props.offsetY!, v => body.setOffset(body.offset.x, v)),
  row('enable', () => props.enable!, v => body.enable = v),
  row('immovable', () => props.immovable!, v => body.setImmovable(v)),
  row('moves', () => props.moves!, v => body.moves = v),
  row('bounceX', () => props.bounceX!, v => body.setBounceX(v)),
  row('bounceY', () => props.bounceY!, v => body.setBounceY(v)),
  row('drag', () => props.drag!, v => body.setDrag(v)),
  row('dragX', () => props.dragX!, v => body.setDragX(v)),
  row('dragY', () => props.dragY!, v => body.setDragY(v)),
  row('gravityX', () => props.gravityX!, v => body.setGravityX(v)),
  row('gravityY', () => props.gravityY!, v => body.setGravityY(v)),
  row('frictionX', () => props.frictionX!, v => body.setFrictionX(v)),
  row('frictionY', () => props.frictionY!, v => body.setFrictionY(v)),
  row('velocityX', () => props.velocityX!, defineVModelProperty(body.velocity, 'velocityX', 'x') ?? (v => body.setVelocityX(v))),
  row('velocityY', () => props.velocityY!, defineVModelProperty(body.velocity, 'velocityY', 'y') ?? (v => body.setVelocityY(v))),
  row('maxVelocityX', () => props.maxVelocityX!, v => body.setMaxVelocityX(v)),
  row('maxVelocityY', () => props.maxVelocityY!, v => body.setMaxVelocityY(v)),
  row('accelerationX', () => props.accelerationX!, v => body.setAccelerationX(v)),
  row('accelerationY', () => props.accelerationY!, v => body.setAccelerationY(v)),
  row('collideWorldBounds', () => props.collideWorldBounds!, v => body.collideWorldBounds = v),
])

emit('create', body)
onBeforeUnmount(() => body.destroy())

defineExpose({ phaserInstance: body })
</script>

<template>
  <slot />
</template>
