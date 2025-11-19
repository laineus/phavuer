<script>
import { defineComponent, inject, onUnmounted } from 'vue'
import { initGameObject, InjectionKeys } from '../index.js'
import { mapProps } from '../props.js'

export default defineComponent({
  props: {
    post: {
      type: Boolean,
      default: true,
    },
    ...mapProps(
      'wipeWidth',
      'direction',
      'axis',
    ),
  },
  emits: ['create'],
  setup(props, context) {
    const gameObject = inject(InjectionKeys.GameObject)
    const fxController = props.post ? gameObject.postFX : gameObject.preFX
    if (!fxController) {
      throw new Error(`${props.post ? 'post' : 'pre'}FX is not available. Make sure the game object supports FX and WebGL renderer is enabled.`)
    }
    const wipe = fxController.addWipe(props.wipeWidth, props.direction, props.axis)
    initGameObject(wipe, props, context, { isFx: true })
    onUnmounted(() => fxController.remove(wipe))
  },
})
</script>