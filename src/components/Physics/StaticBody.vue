<script lang="ts" setup>
import type * as Phaser from 'phaser'
import type { BodyEmits } from '../../lib/emits'
import { inject, onBeforeUnmount } from 'vue'
import { makeReactive } from '../../lib/componentBuilder'
import commonProps from '../../lib/props'
import { InjectionKeys } from '../../lib/provider'
import setters from '../../lib/setters'

const props = defineProps({
  width: commonProps.width,
  height: commonProps.height,
  offsetX: commonProps.offsetX,
  offsetY: commonProps.offsetY,
  enable: commonProps.enable,
})
const emit = defineEmits<BodyEmits<Phaser.Physics.Arcade.StaticBody>>()

const scene = inject(InjectionKeys.Scene)!
if (!scene.physics)
  throw new Error('Physics is not available. Add physics setting to your game config. e.g. `physics: { default: \'arcade\' }`')
const gameObject = inject(InjectionKeys.GameObject)!
const body = scene.physics.add.existing(gameObject, true).body as Phaser.Physics.Arcade.StaticBody

makeReactive(row => [
  row('width', () => props.width!, v => body.setSize(v, body.y)),
  row('height', () => props.height!, v => body.setSize(body.x, v)),
  row('offsetX', () => props.offsetX!, setters.offsetX(body)),
  row('offsetY', () => props.offsetY!, setters.offsetY(body)),
  row('enable', () => props.enable!, setters.enable(body)),
])

emit('create', body)
onBeforeUnmount(() => body.destroy())

defineExpose({ phaserInstance: body })
</script>

<template>
  <slot />
</template>
