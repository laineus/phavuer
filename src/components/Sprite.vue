<script lang="ts">
import type { SpriteEmits } from '../emits'
import * as Phaser from 'phaser'
import { getCurrentInstance, inject, provide } from 'vue'
import { initGameObject } from '../index'
import commonProps, { gameObjectProps } from '../props'
import { InjectionKeys } from '../provider'

const SPRITE_EMITS = [
  { attr: 'onAnimationstart', emit: 'animationstart' },
  { attr: 'onAnimationupdate', emit: 'animationupdate' },
  { attr: 'onAnimationrepeat', emit: 'animationrepeat' },
  { attr: 'onAnimationcomplete', emit: 'animationcomplete' },
  { attr: 'onAnimationstop', emit: 'animationstop' },
  { attr: 'onAnimationrestart', emit: 'animationrestart' },
]
</script>

<script lang="ts" setup>
const props = defineProps({
  ...gameObjectProps,
  texture: commonProps.texture,
  frame: commonProps.frame,
  tint: commonProps.tint,
  flipX: commonProps.flipX,
  flipY: commonProps.flipY,
  play: { type: [String, Object] },
})
const emit = defineEmits<SpriteEmits<Phaser.GameObjects.Sprite>>()
const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.Sprite(scene, props.x || 0, props.y || 0, props.texture)
const currentInstance = getCurrentInstance()
const definedProps = currentInstance!.vnode.props || []
SPRITE_EMITS.filter(v => v.attr in definedProps).forEach((v) => {
  object.on(v.emit, (...args: unknown[]) => {
    ;(emit as (event: string, ...args: unknown[]) => void)(v.emit, ...args)
  })
})
initGameObject(object, props)
provide(InjectionKeys.GameObject, object)
defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
