<script lang="ts">
import type { GameObjectEmits } from '../../lib/emits'
import * as Phaser from 'phaser'
import { inject, provide } from 'vue'
import { defineGameObject, makeGameObjectReactive, makeReactive } from '../../lib/componentBuilder'
import commonProps, { gameObjectProps } from '../../lib/props'
import { InjectionKeys } from '../../lib/provider'
import setters from '../../lib/setters'

const { origin, originX, originY, displayOriginX, displayOriginY, ...containerGameObjectProps } = gameObjectProps
</script>

<script lang="ts" setup>
const props = defineProps({
  ...containerGameObjectProps,
  width: commonProps.width,
  height: commonProps.height,
})
defineEmits<GameObjectEmits<Phaser.GameObjects.Container>>()

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.Container(scene, props.x || 0, props.y || 0)

makeGameObjectReactive(props, object)
makeReactive(row => [
  row('width', () => props.width!, setters.width(object)),
  row('height', () => props.height!, setters.height(object)),
])

defineGameObject(object, props)

provide(InjectionKeys.Container, object)
provide(InjectionKeys.RenderTextureRenderList, undefined)
defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
