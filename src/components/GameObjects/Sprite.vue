<script lang="ts">
import type { PropType } from 'vue'
import type { GameObjectEmits } from '../../lib/emits'
import * as Phaser from 'phaser'
import { getCurrentInstance, inject } from 'vue'
import { defineGameObject, makeGameObjectReactive, makeReactive } from '../../lib/componentBuilder'
import commonProps, { gameObjectProps } from '../../lib/props'
import { InjectionKeys } from '../../lib/provider'
import setters from '../../lib/setters'

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
  play: { type: [String, Object] as PropType<string | Phaser.Animations.Animation | Phaser.Types.Animations.PlayAnimationConfig> },
})

const emit = defineEmits<GameObjectEmits<Phaser.GameObjects.Sprite> & {
  animationstart: [animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: Phaser.GameObjects.Sprite, frameKey: string]
  animationupdate: [animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: Phaser.GameObjects.Sprite, frameKey: string]
  animationrepeat: [animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: Phaser.GameObjects.Sprite, frameKey: string]
  animationcomplete: [animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: Phaser.GameObjects.Sprite, frameKey: string]
  animationstop: [animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: Phaser.GameObjects.Sprite, frameKey: string]
  animationrestart: [animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: Phaser.GameObjects.Sprite, frameKey: string]
}>()

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.Sprite(scene, props.x || 0, props.y || 0, props.texture!)

const currentInstance = getCurrentInstance()
const definedProps = currentInstance!.vnode.props || []
SPRITE_EMITS.filter(v => v.attr in definedProps).forEach((v) => {
  object.on(v.emit, (...args: unknown[]) => {
    ;(emit as (event: string, ...args: unknown[]) => void)(v.emit, ...args)
  })
})

makeGameObjectReactive(props, object)
makeReactive(row => [
  row('texture', () => props.texture!, setters.texture(object)),
  row('frame', () => props.frame!, setters.frame(object)),
  row('tint', () => props.tint!, setters.tint(object)),
  row('flipX', () => props.flipX!, setters.flipX(object)),
  row('flipY', () => props.flipY!, setters.flipY(object)),
  row('play', () => props.play!, setters.play(object)),
])

defineGameObject(object, props)

defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
