import { createApp, inject, watch, onBeforeUnmount, customRef } from 'vue'
import setters from './setters'
import Scene from './components/Scene'
import Container from './components/Container'
import Rectangle from './components/Rectangle'
import RoundRectangle from './components/RoundRectangle'
import Circle from './components/Circle'
import Line from './components/Line'
import Image from './components/Image'
import Sprite from './components/Sprite'
import Text from './components/Text'
import TilemapLayer from './components/TilemapLayer'
import Zone from './components/Zone'
import Light from './components/Light'
import StaticBody from './components/StaticBody'
import Body from './components/Body'

const createPhavuerApp = (game, component) => {
  const app = createApp(component)
  app.provide('game', game)
  app.provide('scene', null)
  app.provide('container', null)
  // mount Vue 3 app
  const dummyElement = window.document.createElement('div')
  document.body.appendChild(dummyElement)
  return app.mount(dummyElement)
}

const initGameObject = (object, props, context) => {
  const isBody = 'bounce' in object
  const isLight = object.constructor === Phaser.GameObjects.Light
  const scene = inject('scene')
  if (isLight) {
    if (!scene.lights.active) scene.lights.enable()
    scene.lights.lights.push(object)
  } else if (isBody) {
    // _
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
    watch(() => props[key], setter, { deep: true })
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
  onBeforeUnmount(() => {
    if (object.tween) object.tween.stop()
  })
  if (isLight) {
    onBeforeUnmount(() => scene.lights.removeLight(object))
  } else {
    onBeforeUnmount(() => object.destroy())
  }
  return object
}

const refTo = (value, key) => {
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
const refObj = value => refTo(value, 'object')
const refScene = value => refTo(value, 'scene')

const getRegisterUpdateEvent = listName => e => {
  const eventList = inject(listName)
  eventList.push(e)
  onBeforeUnmount(() => {
    const i = eventList.findIndex(v => v === e)
    eventList.splice(i, 1)
  })
}
const onPreUpdate = getRegisterUpdateEvent('preUpdateEvents')
const onPostUpdate = getRegisterUpdateEvent('postUpdateEvents')

export {
  createPhavuerApp,
  initGameObject,
  refTo,
  refObj,
  refScene,
  onPreUpdate,
  onPostUpdate,
  Scene,
  Container,
  Rectangle,
  RoundRectangle,
  Circle,
  Line,
  Image,
  Sprite,
  Text,
  TilemapLayer,
  Zone,
  Light,
  StaticBody,
  Body
}
