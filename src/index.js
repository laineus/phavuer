import { inject, watch, onBeforeUnmount, customRef, getCurrentInstance } from 'vue'
import { default as setters, deepProps, vModelProps, GAME_OBJECT_EVENTS } from './setters.js'
import Game from './components/Game.vue'
import Scene from './components/Scene.vue'
import Container from './components/Container.vue'
import Rectangle from './components/Rectangle.vue'
import RoundRectangle from './components/RoundRectangle.vue'
import Triangle from './components/Triangle.vue'
import Circle from './components/Circle.vue'
import Polygon from './components/Polygon.vue'
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

const createPhavuerApp = () => {
  console.error('Phavuer::createPhavuerApp() has been removed. Please use `<Game>` component instead. See: https://github.com/laineus/phavuer')
}

const camelize = s => s.replace(/-./g, x => x[1].toUpperCase())

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
  const definedProps = Object.fromEntries(
    Object.entries(currentInstance.vnode.props ?? {}).map(([key, value]) => [camelize(key), value])
  )
  const vModelKeys = Object.keys(definedProps).filter(key => key.startsWith('onUpdate:')).map(key => key.split(':')[1]).filter(key => vModelProps.includes(key))
  const normalProps = Object.entries(definedProps).filter(([key]) => setters[key])
  const watchStoppers = normalProps.map(([key, value]) => {
    const setter = setters[key](object, vModelKeys.includes(key) ? context.emit : undefined)
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
  Game,
  Scene,
  Container,
  Rectangle,
  RoundRectangle,
  Triangle,
  Circle,
  Polygon,
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
