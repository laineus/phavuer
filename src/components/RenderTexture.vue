<script lang="ts" setup>
import * as Phaser from 'phaser'
import { inject, onMounted, onUpdated, provide } from 'vue'
import { gameObjectEmits } from '../emits'
import { initGameObject, InjectionKeys } from '../index'
import commonProps, { gameObjectProps } from '../props'

const props = defineProps({
  ...gameObjectProps,
  width: commonProps.width,
  height: commonProps.height,
})
const emit = defineEmits(gameObjectEmits)

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.GameObjects.RenderTexture(scene, props.x || 0, props.y || 0, props.width, props.height)
initGameObject(object, props, emit)
const renderList: Phaser.GameObjects.GameObject[] = []
provide(InjectionKeys.RenderTextureRenderList, renderList)
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
</script>

<template>
  <slot />
</template>
