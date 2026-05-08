<script lang="ts">
import type { CreateOnlyEmits } from '../../lib/emits'
import * as Phaser from 'phaser'
import { inject, provide } from 'vue'
import { defineGameObject, makeReactive } from '../../lib/componentBuilder'
import commonProps from '../../lib/props'
import { InjectionKeys } from '../../lib/provider'
import setters from '../../lib/setters'
</script>

<script lang="ts" setup>
const props = defineProps({
  name: { type: String },
  active: commonProps.active,
  visible: commonProps.visible,
  depth: commonProps.depth,
  alpha: commonProps.alpha,
  blendMode: commonProps.blendMode,
})
defineEmits<CreateOnlyEmits<Phaser.GameObjects.Layer>>()

const gameObject = inject(InjectionKeys.GameObject)
if (gameObject)
  throw new Error('Layer cannot be nested inside another GameObject.')

const scene = inject(InjectionKeys.Scene)!
const layer = new Phaser.GameObjects.Layer(scene)

makeReactive(row => [
  row('name', () => props.name!, v => layer.setName(v)),
  row('active', () => props.active!, setters.active(layer)),
  row('visible', () => props.visible!, setters.visible(layer)),
  row('depth', () => props.depth!, setters.depth(layer)),
  row('alpha', () => props.alpha!, setters.alpha(layer)),
  row('blendMode', () => props.blendMode!, setters.blendMode(layer)),
])

defineGameObject(layer, props)

provide(InjectionKeys.Layer, layer)
defineExpose({ phaserInstance: layer })
</script>

<template>
  <slot />
</template>
