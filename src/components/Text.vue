<script lang="ts" setup>
import type { GameObjectEmits } from '../emits'
import * as Phaser from 'phaser'
import { inject } from 'vue'
import initGameObject from '../lib/initGameObject'
import commonProps, { gameObjectProps } from '../props'
import { InjectionKeys } from '../provider'

const props = defineProps({
  ...gameObjectProps,
  text: commonProps.text,
  style: commonProps.style,
  lineSpacing: commonProps.lineSpacing,
  padding: commonProps.padding,
})
defineEmits<GameObjectEmits<Phaser.GameObjects.Text>>()

const scene = inject(InjectionKeys.Scene)!
const text = typeof props.text === 'number' ? String(props.text) : props.text
const object = new Phaser.GameObjects.Text(scene, props.x || 0, props.y || 0, text, props.style ?? {})
initGameObject(object, props)
defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
