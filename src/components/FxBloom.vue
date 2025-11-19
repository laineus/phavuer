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
    color: {
      type: Number,
    },
    ...mapProps(
      'offsetX',
      'offsetY',
      'blurStrength',
      'strength',
      'steps',
    ),
  },
  emits: ['create'],
  setup(props, context) {
    const gameObject = inject(InjectionKeys.GameObject)
    const fxController = props.post ? gameObject.postFX : gameObject.preFX
    if (!fxController) {
      throw new Error(`${props.post ? 'post' : 'pre'}FX is not available. Make sure the game object supports FX and WebGL renderer is enabled.`)
    }
    const bloom = fxController.addBloom(props.color, props.offsetX, props.offsetY, props.blurStrength, props.strength, props.steps)
    initGameObject(bloom, props, context, { isFx: true })
    onUnmounted(() => fxController.remove(bloom))
  },
})
</script>
