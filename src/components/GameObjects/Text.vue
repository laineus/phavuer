<script lang="ts" setup>
import type { GameObjectEmits } from '../../lib/emits'
import * as Phaser from 'phaser'
import { computed, inject } from 'vue'
import { defineGameObject, makeGameObjectReactive, makeReactive } from '../../lib/componentBuilder'
import commonProps, { gameObjectProps } from '../../lib/props'
import { InjectionKeys } from '../../lib/provider'
import setters from '../../lib/setters'

const props = defineProps({
  ...gameObjectProps,
  text: commonProps.text,
  style: commonProps.style,
  lineSpacing: commonProps.lineSpacing,
  padding: commonProps.padding,
})
defineEmits<GameObjectEmits<Phaser.GameObjects.Text>>()

const scene = inject(InjectionKeys.Scene)!
const text = computed(() => typeof props.text === 'number' ? String(props.text) : props.text)
const object = new Phaser.GameObjects.Text(scene, props.x || 0, props.y || 0, text.value, props.style ?? {})

makeGameObjectReactive(props, object)
makeReactive(row => [
  row('text', () => text.value, setters.text(object)),
  row('style', () => props.style!, setters.style(object)),
  row('lineSpacing', () => props.lineSpacing!, setters.lineSpacing(object)),
  row('padding', () => props.padding!, setters.padding(object)),
])

defineGameObject(object, props)

defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
