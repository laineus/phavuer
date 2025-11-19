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
    texture: {
      type: String,
    },
    ...mapProps(
      'x',
      'y',
    ),
  },
  emits: ['create'],
  setup(props, context) {
    const gameObject = inject(InjectionKeys.GameObject)
    const fxController = props.post ? gameObject.postFX : gameObject.preFX
    if (!fxController) {
      throw new Error(`${props.post ? 'post' : 'pre'}FX is not available. Make sure the game object supports FX and WebGL renderer is enabled.`)
    }
    const displacement = fxController.addDisplacement(props.texture, props.x, props.y)
    initGameObject(displacement, props, context, { isFx: true })
    onUnmounted(() => fxController.remove(displacement))
  },
})
</script>