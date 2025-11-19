<script>
import { defineComponent, inject } from 'vue'
import { initGameObject, InjectionKeys } from '../index.js'
import { mapProps } from '../props.js'

export default defineComponent({
  props: {
    ...mapProps(
      'width',
      'height',
      'offsetX',
      'offsetY',
      'enable',
    ),
  },
  emits: ['create'],
  setup(props, context) {
    const scene = inject(InjectionKeys.Scene)
    if (!scene.physics)
      throw new Error('Physics is not available. Add physics setting to your game config. e.g. `physics: { default: \'arcade\' }`')
    const gameObject = inject(InjectionKeys.GameObject)
    const body = scene.physics.add.existing(gameObject, Phaser.Physics.Arcade.STATIC_BODY).body
    initGameObject(body, props, context)
  },
})
</script>

<template>
  <slot />
</template>
