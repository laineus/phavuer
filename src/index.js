import { createApp, inject, watch, onBeforeUnmount, customRef } from 'vue'
import components from './components'
import setters from './setters'

export const Scene = components.Scene
export const Container = components.Container
export const Image = components.Image
export const Sprite = components.Sprite
export const Text = components.Text
export const Rectangle = components.Rectangle
export const Circle = components.Circle
export const Line = components.Line
export const TilemapLayer = components.TilemapLayer
export const Zone = components.Zone
export const RoundRectangle = components.RoundRectangle
export const Light = components.Light

export const createPhavuerApp = (game, component) => {
  const app = createApp(component)
  app.provide('game', game)
  app.provide('scene', null)
  app.provide('container', null)
  // mount Vue 3 app
  const dummyElement = window.document.createElement('div')
  document.body.appendChild(dummyElement)
  return app.mount(dummyElement)
}

export const initGameObject = (object, props, context) => {
  const isLight = object.constructor === Phaser.GameObjects.Light
  const scene = inject('scene')
  if (isLight) {
    if (!scene.lights.active) scene.lights.enable()
    scene.lights.lights.push(object)
  } else {
    scene.add.existing(object)
    // Append to parent container
    const container = inject('container')
    if (container) {
      container.add([object])
    }
  }
  // Make it reactive
  Object.keys(props).forEach(key => {
    if (!setters[key]) return
    const setter = setters[key](object)
    setter(props[key])
    watch(() => props[key], setter)
  })
  // Set event
  if (context.attrs.onCreate) context.emit('create', object)
  // Set interactive events
  if (context.attrs.onPointerdown || context.attrs.onPointerup) {
    object.setInteractive()
    if (context.attrs.onPointerdown) object.on('pointerdown', (...arg) => context.emit('pointerdown', ...arg))
    if (context.attrs.onPointerup) object.on('pointerup', (...arg) => context.emit('pointerup', ...arg))
  }
  // Destroy when unmounted
  if (isLight) {
    onBeforeUnmount(() => scene.lights.removeLight(object))
  } else {
    onBeforeUnmount(() => object.destroy())
  }
  return object
}

export const refTo = (value, key) => {
  return customRef((track, trigger) => {
    return {
      get () {
        track()
        return value
      },
      set (newValue) {
        if (value && newValue) return
        value = newValue ? newValue[key] : null
        trigger()
      }
    }
  })
}
export const refObj = value => refTo(value, 'object')
export const refScene = value => refTo(value, 'scene')
