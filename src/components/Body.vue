<template>
  <div />
</template>

<script>
import { provide, inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    const gameObject = inject('gameObject')
    const body = scene.physics.add.existing(gameObject, Phaser.Physics.Arcade.DYNAMIC_BODY).body
    initGameObject(body, props, context)
  },
  props: [
    'width', 'height',
    'offsetX', 'offsetY',
    'enable',
    'immovable', 'moves',
    'bounceX', 'bounceY',
    'drag', 'dragX', 'dragY',
    'gravityX', 'gravityY',
    'frictionX', 'frictionY',
    'velocityX', 'velocityY',
    'maxVelocityX', 'maxVelocityY',
    'accelerationX', 'accelerationY'
  ]
}
</script>
