<script lang="ts" setup>
import type { GameObjectEmits } from '../emits'
import * as Phaser from 'phaser'
import { inject, onMounted, onUpdated, provide } from 'vue'
import { initGameObject } from '../index'
import commonProps, { gameObjectProps } from '../props'
import { InjectionKeys, PrivateInjectionKeys } from '../provider'

const props = defineProps({
  ...gameObjectProps,
  width: commonProps.width,
  height: commonProps.height,
})
defineEmits<GameObjectEmits<Phaser.GameObjects.RenderTexture>>()

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.RenderTexture(scene, props.x || 0, props.y || 0, props.width, props.height)
initGameObject(object, props)
const renderList: Phaser.GameObjects.GameObject[] = []
provide(PrivateInjectionKeys.RenderTextureRenderList, renderList)
provide(InjectionKeys.GameObject, object)
function render() {
  renderList.forEach(v => object.draw(v))
  object.render()
}
onMounted(() => {
  render()
})
onUpdated(() => {
  object.clear()
  render()
})
defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
