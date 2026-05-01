<script lang="ts" setup>
import type { PropType } from 'vue'
import * as Phaser from 'phaser'
import { inject } from 'vue'
import { initGameObject, InjectionKeys } from '../index.js'
import commonProps, { gameObjectProps } from '../props'

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
const emit = defineEmits(['create'] as string[])

const scene = inject(InjectionKeys.Scene)!
const object = new Phaser.Tilemaps.TilemapLayer(scene, props.tilemap, props.layerIndex, props.tileset, props.x || 0, props.y || 0)
initGameObject(object, props, emit)
</script>

<template>
  <slot />
</template>
