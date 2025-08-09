<script>
import { defineComponent, onMounted, provide, ref } from 'vue'
import packageJson from '../../package.json'
import { InjectionKeys } from '../index'

export default defineComponent({
  props: {
    config: { type: Object },
  },
  emits: ['create', 'ready'],
  setup(props, context) {
    if (props.config?.banner !== false) {
      // eslint-disable-next-line no-console
      console.log(
        `%c %cPhavuer v${packageJson.version}%c https://github.com/laineus/phavuer`,
        'background-color: #42b883; padding: 2px 0;',
        'background-color: #213547; padding: 2px 8px; color: white; font-weight: bold;',
        '',
      )
    }
    const canvasRoot = ref(false)
    const show = ref(false)
    const tmpParent = document.createElement('div')
    const game = new Phaser.Game(Object.assign({ parent: tmpParent }, props.config))
    provide(InjectionKeys.Game, game)
    provide(InjectionKeys.Scene, undefined)
    provide(InjectionKeys.Container, undefined)
    provide(InjectionKeys.RenderTextureRenderList, undefined)
    game.events.addListener('ready', () => {
      show.value = true
      context.emit('ready', game)
    })
    context.emit('create', game)
    onMounted(() => {
      // May be null if parent is overwritten in props.config
      const canvas = tmpParent.firstChild
      if (canvas) {
        canvasRoot.value.appendChild(canvas)
        game.scale.getParent({ ...game.config, parent: canvasRoot.value })
        game.scale.refresh()
      }
    })
    return { canvasRoot, show }
  },
})
</script>

<template>
  <div data-phavuer-game>
    <div ref="canvasRoot" data-phavuer-canvas />
    <slot v-if="show" />
  </div>
</template>
