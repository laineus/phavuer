<script lang="ts" setup>
import type * as Phaser from 'phaser'
import type { CreateOnlyEmits } from '../../lib/emits'
import { inject, onBeforeUnmount } from 'vue'
import { makeReactive } from '../../lib/componentBuilder'
import commonProps from '../../lib/props'
import { InjectionKeys } from '../../lib/provider'
import setters from '../../lib/setters'

const props = defineProps({
  visible: commonProps.visible,
  x: commonProps.x,
  y: commonProps.y,
  radius: commonProps.radius,
  color: commonProps.color,
  intensity: commonProps.intensity,
  z: { type: Number },
})
const emit = defineEmits<CreateOnlyEmits<Phaser.GameObjects.Light>>()

const scene = inject(InjectionKeys.Scene)!
if (!scene.lights.active)
  scene.lights.enable()
const light = scene.lights.addLight(props.x || 0, props.y || 0, props.radius ?? 0, props.color ?? 0xffffff, props.intensity ?? 1, props.z)

makeReactive(row => [
  row('visible', () => props.visible!, setters.visible(light)),
  row('x', () => props.x!, setters.x(light)),
  row('y', () => props.y!, setters.y(light)),
  row('radius', () => props.radius!, setters.radius(light)),
  row('color', () => props.color!, setters.color(light)),
  row('intensity', () => props.intensity!, setters.intensity(light)),
  row('z', () => props.z!, (v: number) => light.z = v),
])

emit('create', light)
onBeforeUnmount(() => scene.lights.removeLight(light))

defineExpose({ phaserInstance: light })
</script>

<template>
  <slot />
</template>
