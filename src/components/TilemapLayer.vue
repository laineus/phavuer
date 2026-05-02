<script lang="ts" setup>
import type { PropType } from 'vue'
import type { CreateOnlyEmits } from '../lib/emits'
import * as Phaser from 'phaser'
import { inject } from 'vue'
import initGameObject from '../lib/initGameObject'
import commonProps, { gameObjectProps } from '../lib/props'
import { InjectionKeys } from '../lib/provider'

const props = defineProps({
  ...gameObjectProps,
  width: commonProps.width,
  height: commonProps.height,
  collision: commonProps.collision,
  collisionByProperty: commonProps.collisionByProperty,
  tilemap: { type: Object as PropType<Phaser.Tilemaps.Tilemap>, required: true },
  layerIndex: { type: Number, required: true },
  tileset: { type: [String, Array] as PropType<string | string[] | Phaser.Tilemaps.Tileset | Phaser.Tilemaps.Tileset[]>, required: true },
  cullPadding: { type: Number },
  cullPaddingX: { type: Number },
  cullPaddingY: { type: Number },
})
defineEmits<CreateOnlyEmits<Phaser.Tilemaps.TilemapLayer>>()

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.Tilemaps.TilemapLayer(scene, props.tilemap, props.layerIndex, props.tileset, props.x || 0, props.y || 0)
initGameObject(object, props)
defineExpose({ phaserInstance: object })
</script>

<template>
  <slot />
</template>
