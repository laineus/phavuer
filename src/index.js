import { createApp, inject, watch, onUnmounted } from 'vue'
import components from './components'

export const Container = components.Container
export const Sprite = components.Sprite
export const Text = components.Text
export const Rectangle = components.Rectangle

export const createComponent = (scene, component) => {
  const app = createApp(component)
  app.provide('scene', scene)
  app.provide('container', null)
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
  scaleY: object => v => object.setScale(object.scaleX, v),
  width: object => v => object.setSize(v, object.height),
  height: object => v => object.setSize(object.width, v),
  displayWidth: object => v => object.setDisplaySize(v, object.displayHeight),
  displayHeight: object => v => object.setDisplaySize(object.displayWidth, v),
  displayOriginX: object => v => object.setDisplayOrigin(v, object.displayOriginY),
  displayOriginY: object => v => object.setDisplayOrigin(object.displayOriginX, v),
  depth: object => v => object.setDepth(v),
  alpha: object => v => object.setAlpha(v),
  texture: object => v => object.setTexture(v),
  fillColor: object => v => object.setFillStyle(v, object.fillAlpha),
  fillAlpha: object => v => object.setFillStyle(object.fillColor, v),
  lineWidth: object => v => object.setStrokeStyle(...(!v ? [] : [v, object.strokeColor, object.strokeAlpha])),
  strokeColor: object => v => object.setStrokeStyle(object.lineWidth, v, object.strokeAlpha),
  strokeAlpha: object => v => object.setStrokeStyle(object.lineWidth, object.strokeColor, v),
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
