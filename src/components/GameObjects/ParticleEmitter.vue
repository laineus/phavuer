<script lang="ts" setup>
import type { PropType } from 'vue'
import type { CreateOnlyEmits } from '../../lib/emits'
import type { TimelineConfig, TweenConfig } from '../../types'
import * as Phaser from 'phaser'
import { inject, watch } from 'vue'
import { defineGameObject, makeReactive } from '../../lib/componentBuilder'
import commonProps from '../../lib/props'
import { InjectionKeys } from '../../lib/provider'
import setters from '../../lib/setters'

const props = defineProps({
  // GameObjects common
  active: commonProps.active,
  visible: commonProps.visible,
  x: commonProps.x,
  y: commonProps.y,
  rotation: commonProps.rotation,
  scale: commonProps.scale,
  scaleX: commonProps.scaleX,
  scaleY: commonProps.scaleY,
  depth: commonProps.depth,
  alpha: commonProps.alpha,
  blendMode: commonProps.blendMode,
  scrollFactor: commonProps.scrollFactor,
  scrollFactorX: commonProps.scrollFactorX,
  scrollFactorY: commonProps.scrollFactorY,
  lighting: commonProps.lighting,
  tween: commonProps.tween,
  tweens: commonProps.tweens,
  timeline: commonProps.timeline,
  // ParticleEmitter specific
  texture: { type: [String, Object] as PropType<string | Phaser.Textures.Texture> },
  frame: { type: [String, Number] as PropType<string | number> },
  config: { type: Object as PropType<Phaser.Types.GameObjects.Particles.ParticleEmitterConfig> },
  emitting: { type: Boolean },
})

const emit = defineEmits<CreateOnlyEmits<Phaser.GameObjects.Particles.ParticleEmitter> & {
  'update:x': [value: number]
  'update:y': [value: number]
  'update:tween': [value: TweenConfig]
  'update:tweens': [value: TweenConfig[]]
  'update:timeline': [value: TimelineConfig[]]
  'complete': [emitter: Phaser.GameObjects.Particles.ParticleEmitter]
  'start': [emitter: Phaser.GameObjects.Particles.ParticleEmitter]
  'stop': [emitter: Phaser.GameObjects.Particles.ParticleEmitter]
  'explode': [emitter: Phaser.GameObjects.Particles.ParticleEmitter, particle: Phaser.GameObjects.Particles.Particle | undefined]
  'deathzone': [emitter: Phaser.GameObjects.Particles.ParticleEmitter, particle: Phaser.GameObjects.Particles.Particle, zone: Phaser.GameObjects.Particles.Zones.DeathZone]
}>()

const scene = inject(InjectionKeys.Scene)!

const object = new Phaser.GameObjects.Particles.ParticleEmitter(
  scene,
  props.x ?? 0,
  props.y ?? 0,
  props.texture!,
  props.config,
)

makeReactive(row => [
  row('active', () => props.active!, setters.active(object)),
  row('visible', () => props.visible!, setters.visible(object)),
  row('x', () => props.x!, setters.x(object)),
  row('y', () => props.y!, setters.y(object)),
  row('rotation', () => props.rotation!, setters.rotation(object)),
  row('scale', () => props.scale!, setters.scale(object)),
  row('scaleX', () => props.scaleX!, setters.scaleX(object)),
  row('scaleY', () => props.scaleY!, setters.scaleY(object)),
  row('depth', () => props.depth!, setters.depth(object)),
  row('alpha', () => props.alpha!, (v: number) => object.setAlpha(v)),
  row('blendMode', () => props.blendMode!, setters.blendMode(object)),
  row('scrollFactor', () => props.scrollFactor!, setters.scrollFactor(object)),
  row('scrollFactorX', () => props.scrollFactorX!, setters.scrollFactorX(object)),
  row('scrollFactorY', () => props.scrollFactorY!, setters.scrollFactorY(object)),
  row('lighting', () => props.lighting!, setters.lighting(object)),
  row('tween', () => props.tween!, setters.tween(object)),
  row('tweens', () => props.tweens!, setters.tweens(object)),
  row('timeline', () => props.timeline!, setters.timeline(object)),
  row('frame', () => props.frame!, (v: string | number) => object.setEmitterFrame(v)),
  row('emitting', () => props.emitting!, (v: boolean) => { object.emitting = v }),
])

// config は deep watch で updateConfig に渡す（即時実行不要 ＝ コンストラクタで適用済み）
watch(() => props.config, (v) => {
  if (v !== undefined)
    object.updateConfig(v)
}, { deep: true })

object.on('complete', () => emit('complete', object))
object.on('start', () => emit('start', object))
object.on('stop', () => emit('stop', object))
object.on('explode', (emitter: Phaser.GameObjects.Particles.ParticleEmitter, particle: Phaser.GameObjects.Particles.Particle | undefined) => emit('explode', emitter, particle))
object.on('deathzone', (emitter: Phaser.GameObjects.Particles.ParticleEmitter, particle: Phaser.GameObjects.Particles.Particle, zone: Phaser.GameObjects.Particles.Zones.DeathZone) => emit('deathzone', emitter, particle, zone))

defineGameObject(object, props)

defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
