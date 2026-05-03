<script lang="ts" setup>
import type { CreateOnlyEmits } from '../lib/emits'
import * as Phaser from 'phaser'
import { inject, onBeforeUnmount } from 'vue'
import { makeReactive } from '../lib/componentBuilder'
import commonProps from '../lib/props'
import { InjectionKeys } from '../lib/provider'
import setters from '../lib/setters'

const props = defineProps({
  visible: commonProps.visible,
  x: commonProps.x,
  y: commonProps.y,
  radius: commonProps.radius,
  color: commonProps.color,
  intensity: commonProps.intensity,
})
const emit = defineEmits<CreateOnlyEmits<Phaser.GameObjects.Light>>()

const { r, g, b } = Phaser.Display.Color.IntegerToRGB(props.color ?? 0xffffff)

const light = new Phaser.GameObjects.Light(props.x || 0, props.y || 0, props.radius ?? 0, r, g, b, props.intensity)

const scene = inject(InjectionKeys.Scene)!
if (!scene.lights.active)
  scene.lights.enable()
scene.lights.lights.push(light)

makeReactive(row => [
  row('visible', () => props.visible!, setters.visible(light)),
  row('x', () => props.x!, setters.x(light)),
  row('y', () => props.y!, setters.y(light)),
  row('radius', () => props.radius!, setters.radius(light)),
  row('color', () => props.color!, setters.color(light)),
  row('intensity', () => props.intensity!, setters.intensity(light)),
])

emit('create', light)
onBeforeUnmount(() => scene.lights.removeLight(light))

defineExpose({ phaserInstance: light })
</script>

<template>
  <slot />
</template>
