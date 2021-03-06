import { createApp, inject, watch, onBeforeUnmount, customRef } from 'vue'
import { default as setters, deepProps } from './setters'
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
  const watchStoppers = Object.keys(props).map(key => {
    if (!setters[key]) return
    const setter = setters[key](object)
    setter(props[key])
    return watch(() => props[key], setter, { deep: deepProps.includes(key) })
  })
  // Set event
  if (context.attrs.onCreate) context.emit('create', object)
  // Set interactive events
  const events = [
    { attr: 'onPointerdown', emit: 'pointerdown', eventIndex: 3 },
    { attr: 'onPointermove', emit: 'pointermove', eventIndex: 3 },
    { attr: 'onPointerup', emit: 'pointerup', eventIndex: 3 },
    { attr: 'onPointerout', emit: 'pointerout', eventIndex: 1 },
    { attr: 'onWheel', emit: 'wheel', eventIndex: 4 },
  ].filter(v => v.attr in context.attrs)
  if (events.length) {
    object.setInteractive()
    events.forEach(v => {
      object.on(v.emit, (...args) => {
        args[0].stopPropagation = args[v.eventIndex].stopPropagation
        context.emit(v.emit, ...args)
      })
    })
  }
  // Destroy when unmounted
  onBeforeUnmount(() => {
    if (object.tween) object.tween.stop()
    watchStoppers.forEach(stop => stop && stop())
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
