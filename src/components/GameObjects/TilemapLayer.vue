<script lang="ts" setup>
import type { PropType } from 'vue'
import type { CreateOnlyEmits } from '../../lib/emits'
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
  collision: { type: [Number, Array] },
  collisionByProperty: { type: Object },
  cullPadding: { type: Number },
  cullPaddingX: { type: Number },
  cullPaddingY: { type: Number },
  // Static props
  tilemap: { type: Object as PropType<Phaser.Tilemaps.Tilemap>, required: true },
  layerIndex: { type: Number, required: true },
  tileset: { type: [String, Array] as PropType<string | string[] | Phaser.Tilemaps.Tileset | Phaser.Tilemaps.Tileset[]>, required: true },
})
defineEmits<CreateOnlyEmits<Phaser.Tilemaps.TilemapLayer>>()

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.Tilemaps.TilemapLayer(scene, props.tilemap, props.layerIndex, props.tileset, props.x || 0, props.y || 0)

makeGameObjectReactive(props, object)
makeReactive(row => [
  row('width', () => props.width!, setters.width(object)),
  row('height', () => props.height!, setters.height(object)),
  row('collision', () => props.collision!, v => object.setCollision(v)),
  row('collisionByProperty', () => props.collisionByProperty!, v => object.setCollisionByProperty(v)),
  row('cullPadding', () => props.cullPadding!, v => object.setCullPadding(v, v)),
  row('cullPaddingX', () => props.cullPaddingX!, v => object.setCullPadding(v, object.cullPaddingY)),
  row('cullPaddingY', () => props.cullPaddingY!, v => object.setCullPadding(object.cullPaddingX, v)),
])

defineGameObject(object, props)

defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
