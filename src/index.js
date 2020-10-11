import { createApp, inject, watch, onUnmounted } from 'vue'
import components from './components'
import setters from './setters'

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

export const initGameObject = (object, props, context) => {
  // Append to parent container
  const container = inject('container')
  if (container) container.add([object])
  // Set update event
  if (context.attrs.onUpdate) object.preUpdate = (...arg) => context.emit('update', ...arg)
  // Set interactive events
  if (context.attrs.onPointerdown || context.attrs.onPointerup) {
    object.setInteractive()
    if (context.attrs.onPointerdown) object.on('pointerdown', (...arg) => context.emit('pointerdown', ...arg))
    if (context.attrs.onPointerup) object.on('pointerup', (...arg) => context.emit('pointerup', ...arg))
  }
  // Make it reactive
  Object.keys(props).forEach(key => {
    if (!setters[key]) return
    const setter = setters[key](object)
    setter(props[key])
    watch(() => props[key], setter)
  })
  // Destroy when unmounted
  onUnmounted(() => object.destroy())
  return object
}
