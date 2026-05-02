<script lang="ts">
import type { GameObjectEmits } from '../lib/emits'
import * as Phaser from 'phaser'
import { inject, provide } from 'vue'
import initGameObject from '../lib/initGameObject'
import commonProps, { gameObjectProps } from '../lib/props'
import { InjectionKeys } from '../lib/provider'

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
initGameObject(object, props)
provide(InjectionKeys.Container, object)
provide(InjectionKeys.GameObject, object)
provide(InjectionKeys.RenderTextureRenderList, undefined)
defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
