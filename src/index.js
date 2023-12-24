import { inject, watch, onBeforeUnmount, customRef, getCurrentInstance } from 'vue'
import { default as setters, deepProps, GAME_OBJECT_EVENTS } from './setters.js'
import Scene from './components/Scene.vue'
import Container from './components/Container.vue'
import Rectangle from './components/Rectangle.vue'
import RoundRectangle from './components/RoundRectangle.vue'
import Triangle from './components/Triangle.vue'
import Circle from './components/Circle.vue'
import Line from './components/Line.vue'
import Image from './components/Image.vue'
import NineSlice from './components/NineSlice.vue'
import Sprite from './components/Sprite.vue'
import Text from './components/Text.vue'
import TilemapLayer from './components/TilemapLayer.vue'
import Zone from './components/Zone.vue'
import Light from './components/Light.vue'
import StaticBody from './components/StaticBody.vue'
import Body from './components/Body.vue'

const createPhavuerApp = (game, app) => {
  app.provide(InjectionKeys.Game, game)
  app.provide(InjectionKeys.Scene, null)
  app.provide(InjectionKeys.Container, null)
  const mount = () => {
    const dummyElement = window.document.createElement('phavuer-app')
    game.canvas.parentElement.appendChild(dummyElement)
    return app.mount(dummyElement)
  }
  return new Promise((resolve) => {
    if (game.isRunning) {
      return resolve(mount())
    }
    game.events.addListener('ready', () => {
      resolve(mount())
    })
  })
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
  const scene = inject(InjectionKeys.Scene)
  if (isLight) {
    if (!scene.lights.active) scene.lights.enable()
    scene.lights.lights.push(object)
  } else if (isBody) {
    // _
  } else {
    scene.add.existing(object)
    // Append to parent container
    const container = inject(InjectionKeys.Container)
    if (container) {
      const i = container.list.findIndex(v => v.depth > (props.depth ?? 0))
      i === -1 ? container.add(object) : container.addAt(object, i)
    }
  }
  // Make it reactive
  const definedProps = currentInstance.vnode.props || []
  const dynamicProps = currentInstance.vnode.dynamicProps || []
  const vModelKeys = Object.keys(definedProps).filter(key => key.startsWith('onUpdate:')).map(key => key.split(':')[1]).filter(key => setters[`_${key}`])
  vModelKeys.forEach(key => defineVModelProperty(object, key, context.emit))
  const normalProps = Object.entries(definedProps).filter(([key]) => setters[key])
  const watchStoppers = normalProps.map(([key, value]) => {
    const setterKey = vModelKeys.includes(key) ? `_${key}` : key
    const setter = setters[setterKey](object)
    setter(value)
    // TODO: Don't watch non dynamicProps
    return watch(() => props[key], setter, { deep: deepProps.includes(key) })
  }).filter(Boolean)
  // Set event
  if (definedProps.onCreate) context.emit('create', object)
  // Set interactive events
  const events = GAME_OBJECT_EVENTS.filter(v => v.attr in definedProps)
  if (events.length) {
    if (!object.input) {
      object.setInteractive()
    }
    if (events.some(v => v.drag)) {
      scene.input.setDraggable(object)
    }
    events.forEach(v => {
      object.on(v.emit, (...args) => {
        if ('eventIndex' in v) {
          args[0].stopPropagation = args[v.eventIndex].stopPropagation
        }
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

// TODO: should be Symbol
const InjectionKeys = {
  Game: 'phavuer_game',
  Scene: 'phavuer_scene',
  GameObject: 'phavuer_gameObject',
  Container: 'phavuer_container',
  PreUpdateEvents: 'phavuer_preUpdateEvents',
  PostUpdateEvents: 'phavuer_postUpdateEvents'
}

const useInject = key => () => {
  const obj = inject(key)
  if (!obj) throw new Error(`${key.description} is not provided`)
  return obj
}

const useGame = useInject(InjectionKeys.Game)
const useScene = useInject(InjectionKeys.Scene)

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

const getRegisterUpdateEvent = symbol => e => {
  const eventList = inject(symbol)
  eventList.push(e)
  onBeforeUnmount(() => {
    const i = eventList.findIndex(v => v === e)
    eventList.splice(i, 1)
  })
}
const onPreUpdate = getRegisterUpdateEvent(InjectionKeys.PreUpdateEvents)
const onPostUpdate = getRegisterUpdateEvent(InjectionKeys.PostUpdateEvents)

export {
  createPhavuerApp,
  initGameObject,
  refTo,
  refObj,
  refScene,
  InjectionKeys,
  useGame,
  useScene,
  onPreUpdate,
  onPostUpdate,
  Scene,
  Container,
  Rectangle,
  RoundRectangle,
  Triangle,
  Circle,
  Line,
  Image,
  NineSlice,
  Sprite,
  Text,
  TilemapLayer,
  Zone,
  Light,
  StaticBody,
  Body
}
