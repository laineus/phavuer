<script>
import { defineComponent } from 'vue'
import { initGameObject } from '../index.js'
import { mapProps } from '../props.js'

export default defineComponent({
  props: {
    ...mapProps(
      'tween',
      'tweens',
      'timeline',
      'visible',
      'x',
      'y',
      'radius',
      'color',
      'intensity',
    ),
  },
  emits: ['create'],
  setup(props, context) {
    const object = new Phaser.GameObjects.Light(props.x || 0, props.y || 0)
    initGameObject(object, props, context)
    return { object }
  },
})
</script>
