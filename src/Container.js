import { provide, inject } from 'vue'
import { initGameObject } from './index.js'
export default {
  setup (props, context) {
    const scene = inject('scene')
    const object = new Phaser.GameObjects.Container(scene)
    initGameObject(object, props, context)
    provide('container', object)
    return { object }
  },
  template: '<div><slot /></div>',
  props: [
    'visible',
    'x', 'y',
    'depth'
  ]
}
