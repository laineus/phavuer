<script lang="ts" setup>
import type { GameObjectEmits } from '../../lib/emits'
import * as Phaser from 'phaser'
import { inject } from 'vue'
import { defineGameObject, makeGameObjectReactive, makeReactive } from '../../lib/componentBuilder'
import commonProps, { gameObjectProps } from '../../lib/props'
import { InjectionKeys } from '../../lib/provider'
import setters from '../../lib/setters'

const props = defineProps({
  ...gameObjectProps,
  width: commonProps.width,
  height: commonProps.height,
})
defineEmits<GameObjectEmits<Phaser.GameObjects.Zone>>()

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.Zone(scene, props.x || 0, props.y || 0, props.width, props.height)

makeGameObjectReactive(props, object)
makeReactive(row => [
  row('width', () => props.width!, setters.width(object)),
  row('height', () => props.height!, setters.height(object)),
])

defineGameObject(object, props)

defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
