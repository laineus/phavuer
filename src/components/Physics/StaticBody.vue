<script lang="ts" setup>
import type * as Phaser from 'phaser'
import type { CreateOnlyEmits } from '../../lib/emits'
import { inject, onBeforeUnmount } from 'vue'
import { makeReactive } from '../../lib/componentBuilder'
import { InjectionKeys } from '../../lib/provider'

const props = defineProps({
  enable: { type: Boolean },
  width: { type: Number },
  height: { type: Number },
  offsetX: { type: Number },
  offsetY: { type: Number },
})
const emit = defineEmits<CreateOnlyEmits<Phaser.Physics.Arcade.StaticBody>>()

const scene = inject(InjectionKeys.Scene)!
if (!scene.physics)
  throw new Error('Physics is not available. Add physics setting to your game config. e.g. `physics: { default: \'arcade\' }`')
const gameObject = inject(InjectionKeys.GameObject)!
const body = scene.physics.add.existing(gameObject, true).body as Phaser.Physics.Arcade.StaticBody

makeReactive(row => [
  row('width', () => props.width!, v => body.setSize(v, body.height)),
  row('height', () => props.height!, v => body.setSize(body.width, v)),
  row('offsetX', () => props.offsetX!, v => body.setOffset(v, body.offset.y)),
  row('offsetY', () => props.offsetY!, v => body.setOffset(body.offset.x, v)),
  row('enable', () => props.enable!, v => body.enable = v),
])

emit('create', body)
onBeforeUnmount(() => body.destroy())

defineExpose({ phaserInstance: body })
</script>

<template>
  <slot />
</template>
