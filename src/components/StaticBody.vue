<script lang="ts" setup>
import type * as Phaser from 'phaser'
import { inject } from 'vue'
import { initGameObject, InjectionKeys } from '../index'
import commonProps from '../props'

const props = defineProps({
  width: commonProps.width,
  height: commonProps.height,
  offsetX: commonProps.offsetX,
  offsetY: commonProps.offsetY,
  enable: commonProps.enable,
})
const emit = defineEmits(['create'] as string[])

const scene = inject(InjectionKeys.Scene)!
if (!scene.physics)
  throw new Error('Physics is not available. Add physics setting to your game config. e.g. `physics: { default: \'arcade\' }`')
const gameObject = inject(InjectionKeys.GameObject)!
const body = scene.physics.add.existing(gameObject, true).body as Phaser.Physics.Arcade.StaticBody
initGameObject(body, props, emit)
</script>

<template>
  <slot />
</template>
