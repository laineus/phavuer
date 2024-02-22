<template>
  <div data-phavuer-game>
    <div data-phavuer-canvas ref="canvasRoot" />
    <slot v-if="show" />
  </div>
</template>

<script>
import { defineComponent, provide, ref, onMounted } from 'vue'
import { InjectionKeys } from '../index'
import packageJson from '../../package.json'
export default defineComponent({
  emits: ['create', 'ready'],
  props: {
    config: { type: Object }
  },
  setup (props, context) {
    if (props.config?.banner !== false) {
      console.log(
        `%c %cPhavuer v${packageJson.version}%c https://github.com/laineus/phavuer`,
        'background-color: #42b883; padding: 2px 0;',
        'background-color: #213547; padding: 2px 8px; color: white; font-weight: bold;',
        ''
      )
    }
    const canvasRoot = ref(false)
    const show = ref(false)
    onMounted(() => {
      const game = new Phaser.Game(Object.assign({ parent: canvasRoot.value }, props.config))
      game.events.addListener('ready', () => {
        show.value = true
        context.emit('ready', game)
      })
      context.emit('create', game)
      provide(InjectionKeys.Game, game)
    })
    provide(InjectionKeys.Game, undefined)
    provide(InjectionKeys.Scene, undefined)
    provide(InjectionKeys.Container, undefined)
    return { canvasRoot, show }
  }
})
</script>
