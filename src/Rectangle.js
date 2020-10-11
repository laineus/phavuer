import { inject } from 'vue'
import { initGameObject } from './index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    const object = new Phaser.GameObjects.Rectangle(scene, props.x, props.y, props.width, props.height)
    initGameObject(object, props, context)
    return { object }
  },
  template: '<div />',
  props: [
    'visible',
    'x', 'y',
    'width', 'height',
    'origin', 'originX', 'originY',
    'depth',
    'fill'
  ]
}
