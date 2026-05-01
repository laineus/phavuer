<script lang="ts" setup>
import * as Phaser from 'phaser'
import { inject } from 'vue'
import { gameObjectEmits } from '../emits'
import { initGameObject } from '../index'
import commonProps, { gameObjectProps } from '../props'
import { InjectionKeys } from '../provider'

const props = defineProps({
  ...gameObjectProps,
  text: commonProps.text,
  style: commonProps.style,
  lineSpacing: commonProps.lineSpacing,
  padding: commonProps.padding,
})
const emit = defineEmits(gameObjectEmits)

const scene = inject(InjectionKeys.Scene)!
const text = typeof props.text === 'number' ? String(props.text) : props.text
const object = new Phaser.GameObjects.Text(scene, props.x || 0, props.y || 0, text, props.style ?? {})
initGameObject(object, props, emit)
</script>

<template>
  <slot />
</template>
