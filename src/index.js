import { createApp, inject, watch, onUnmounted } from 'vue'
import Container from './Container'
import Sprite from './Sprite'
import Text from './Text'
import Rectangle from './Rectangle'

export const createComponent = (scene, component) => {
  const app = createApp(component)
  app.provide('scene', scene)
  app.provide('container', null)
  app.component('Container', Container)
  app.component('Text', Text)
  app.component('Sprite', Sprite)
  app.component('Rectangle', Rectangle)
  const dummyElement = window.document.createElement('div')
  return app.mount(dummyElement)
}

const setters = {
  visible: object => v => object.setVisible(v),
  x: object => v => object.x = v,
  y: object => v => object.y = v,
  origin: object => v => object.setOrigin(v, v),
  originX: object => v => object.setOrigin(v, object.originY),
  originY: object => v => object.setOrigin(object.originX, v),
  scale: object => v => object.setScale(v, v),
  scaleX: object => v => object.setScale(v, object.scaleY),
  scaleY: object => v => object.setScale(object.scaleX, y),
  width: object => v => object.width = v,
  height: object => v => object.height = v,
  displayWidth: object => v => object.displayWidth = v,
  displayHeight: object => v => object.displayHeight = v,
  depth: object => v => object.setDepth(v),
  alpha: object => v => object.setAlpha(v),
  texture: object => v => object.setTexture(v),
  fill: object => v => object.setFillStyle(v),
  style: object => v => object.setStyle(v)
}

export const initGameObject = (object, props, context) => {
  const container = inject('container')
  if (container) container.add([object])
  if (context.attrs.onUpdate) object.preUpdate = (...arg) => context.emit('update', ...arg)
  if (context.attrs.onPointerdown || context.attrs.onPointerup) {
    object.setInteractive()
    if (context.attrs.onPointerdown) object.on('pointerdown', (...arg) => context.emit('pointerdown', ...arg))
    if (context.attrs.onPointerup) object.on('pointerup', (...arg) => context.emit('pointerup', ...arg))
  }
  Object.keys(props).forEach(key => {
    if (!setters[key]) return
    const setter = setters[key](object)
    setter(props[key])
    watch(() => props[key], setter)
  })
  onUnmounted(() => object.destroy())
  return object
}
