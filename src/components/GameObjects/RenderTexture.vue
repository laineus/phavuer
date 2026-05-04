<script lang="ts" setup>
import type { GameObjectEmits } from '../../lib/emits'
import * as Phaser from 'phaser'
import { inject, onMounted, onUpdated, provide } from 'vue'
import { defineGameObject, makeGameObjectReactive, makeReactive } from '../../lib/componentBuilder'
import commonProps, { gameObjectProps } from '../../lib/props'
import { InjectionKeys } from '../../lib/provider'
import setters from '../../lib/setters'

const props = defineProps({
  ...gameObjectProps,
  width: commonProps.width,
  height: commonProps.height,
})
defineEmits<GameObjectEmits<Phaser.GameObjects.RenderTexture>>()

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.RenderTexture(scene, props.x || 0, props.y || 0, props.width, props.height)

const renderList: Phaser.GameObjects.GameObject[] = []
provide(InjectionKeys.RenderTextureRenderList, renderList)
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
