<script lang="ts" setup>
import * as Phaser from 'phaser'
import { onMounted, provide, ref } from 'vue'
import packageJson from '../../package.json'
import { InjectionKeys, PrivateInjectionKeys } from '../lib/provider'

const props = defineProps({
  config: { type: Object },
})
const emit = defineEmits(['create', 'ready'])

if (props.config?.banner !== false) {
  // eslint-disable-next-line no-console
  console.log(
    `%c %cPhavuer v${packageJson.version}%c https://github.com/laineus/phavuer`,
    'background-color: #42b883; padding: 2px 0;',
    'background-color: #213547; padding: 2px 8px; color: white; font-weight: bold;',
    '',
  )
}
const canvasRoot = ref<HTMLElement>()
const show = ref(false)
const tmpParent = document.createElement('div')
const game = new Phaser.Game(Object.assign({ parent: tmpParent }, props.config))
provide(InjectionKeys.Game, game)
provide(InjectionKeys.Scene, undefined)
provide(InjectionKeys.Container, undefined)
provide(PrivateInjectionKeys.RenderTextureRenderList, undefined)
game.events.addListener('ready', () => {
  show.value = true
  emit('ready', game)
})
emit('create', game)
onMounted(() => {
  // May be null if parent is overwritten in props.config
  const canvas = tmpParent.firstChild
  const parent = canvasRoot.value
  if (canvas && parent) {
    parent.appendChild(canvas)
    game.scale.getParent({ ...props.config, parent })
    game.scale.refresh()
  }
})
</script>

<template>
  <div data-phavuer-game>
    <div ref="canvasRoot" data-phavuer-canvas />
    <slot v-if="show" />
  </div>
</template>
