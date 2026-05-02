<script lang="ts" setup>
import type * as Phaser from 'phaser'
import type { BodyEmits } from '../lib/emits'
import { inject } from 'vue'
import initGameObject from '../lib/initGameObject'
import commonProps from '../lib/props'
import { InjectionKeys } from '../lib/provider'

const props = defineProps({
  width: commonProps.width,
  height: commonProps.height,
  offsetX: commonProps.offsetX,
  offsetY: commonProps.offsetY,
  enable: commonProps.enable,
})
defineEmits<BodyEmits<Phaser.Physics.Arcade.StaticBody>>()

const scene = inject(InjectionKeys.Scene)!
if (!scene.physics)
  throw new Error('Physics is not available. Add physics setting to your game config. e.g. `physics: { default: \'arcade\' }`')
const gameObject = inject(InjectionKeys.GameObject)!
const body = scene.physics.add.existing(gameObject, true).body as Phaser.Physics.Arcade.StaticBody
initGameObject(body, props)
defineExpose({ phaserInstance: body })
</script>

<template>
  <slot />
</template>
