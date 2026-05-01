<script lang="ts">
import * as Phaser from 'phaser'
import { inject, provide } from 'vue'
import { gameObjectEmits } from '../emits'
import { initGameObject } from '../index'
import commonProps, { gameObjectProps } from '../props'
import { InjectionKeys, PrivateInjectionKeys } from '../provider'

const { origin, originX, originY, displayOriginX, displayOriginY, ...containerGameObjectProps } = gameObjectProps
</script>

<script lang="ts" setup>
const props = defineProps({
  ...containerGameObjectProps,
  width: commonProps.width,
  height: commonProps.height,
})
const emit = defineEmits(gameObjectEmits)

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.Container(scene, props.x || 0, props.y || 0)
initGameObject(object, props, emit)
provide(InjectionKeys.Container, object)
provide(InjectionKeys.GameObject, object)
provide(PrivateInjectionKeys.RenderTextureRenderList, undefined)
</script>

<template>
  <slot />
</template>
