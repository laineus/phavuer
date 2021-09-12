<template>
  <div />
</template>

<script>
import { defineComponent, inject } from 'vue'
import { initGameObject } from '../index.js'
import { mapProps } from '../props.js'
export default defineComponent({
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
      'accelerationX', 'accelerationY'
    )
  },
  setup (props, context) {
    const scene = inject('scene')
    const gameObject = inject('gameObject')
    const body = scene.physics.add.existing(gameObject, Phaser.Physics.Arcade.DYNAMIC_BODY).body
    initGameObject(body, props, context)
  }
})
</script>
