<template>
</template>

<script>
import { defineComponent, inject } from 'vue'
import { initGameObject, InjectionKeys } from '../index.js'
import { mapProps } from '../props.js'
export default defineComponent({
  emits: ['create'],
  props: {
    ...mapProps(
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
      'accelerationX', 'accelerationY',
      'collideWorldBounds'
    )
  },
  setup (props, context) {
    const scene = inject(InjectionKeys.Scene)
    if (!scene.physics) throw Error("Physics is not available. Add physics setting to your game config. e.g. `physics: { default: 'arcade' }`")
    const gameObject = inject(InjectionKeys.GameObject)
    const body = scene.physics.add.existing(gameObject, Phaser.Physics.Arcade.DYNAMIC_BODY).body
    initGameObject(body, props, context)
  }
})
</script>
