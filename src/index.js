import { inject, watch, onBeforeUnmount, customRef, getCurrentInstance } from 'vue'
import { default as setters, deepProps } from './setters.js'
import Scene from './components/Scene.vue'
import Container from './components/Container.vue'
import Rectangle from './components/Rectangle.vue'
import RoundRectangle from './components/RoundRectangle.vue'
import Circle from './components/Circle.vue'
import Line from './components/Line.vue'
import Image from './components/Image.vue'
import Sprite from './components/Sprite.vue'
import Text from './components/Text.vue'
import TilemapLayer from './components/TilemapLayer.vue'
import Zone from './components/Zone.vue'
import Light from './components/Light.vue'
import StaticBody from './components/StaticBody.vue'
import Body from './components/Body.vue'

const createPhavuerApp = (game, app) => {
  app.provide('game', game)
  app.provide('scene', null)
  app.provide('container', null)
  // mount Vue 3 app
  const dummyElement = window.document.createElement('div')
  document.body.appendChild(dummyElement)
  return app.mount(dummyElement)
}

const defineVModelProperty = (gameObject, key, emitter) => {
  const privateKey = `_${key}`
  const emitName = `update:${key}`
  gameObject[privateKey] = gameObject[key]
  Object.defineProperty(gameObject, key, {
    get () {
      return this[privateKey]
    },
    set (v) {
      if (this[privateKey] !== v) emitter(emitName, v)
    }
  })
}

const initGameObject = (object, props, context) => {
  const currentInstance = getCurrentInstance()
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
  const definedProps = currentInstance.vnode.props || []
  const vModelKeys = Object.keys(definedProps).filter(key => key.startsWith('onUpdate:')).map(key => key.split(':')[1]).filter(key => setters[`_${key}`])
  vModelKeys.forEach(key => defineVModelProperty(object, key, context.emit))
  const normalProps = Object.entries(definedProps).filter(([key]) => setters[key])
  const watchStoppers = normalProps.map(([key, value]) => {
    const setterKey = vModelKeys.includes(key) ? `_${key}` : key
    const setter = setters[setterKey](object)
    setter(value)
    return watch(() => props[key], setter, { deep: deepProps.includes(key) })
  }).filter(Boolean)
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
    watchStoppers.forEach(stop => stop())
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
