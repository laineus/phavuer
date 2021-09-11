<template>
  <div />
</template>

<script>
import { defineComponent, inject } from 'vue'
import { initGameObject } from '../index.js'
export default defineComponent({
  setup (props, context) {
    const scene = inject('scene')
    const gameObject = inject('gameObject')
    const body = scene.physics.add.existing(gameObject, Phaser.Physics.Arcade.STATIC_BODY).body
    initGameObject(body, props, context)
  },
  props: [
    'width', 'height',
    'offsetX', 'offsetY',
    'enable'
  ]
})
</script>
