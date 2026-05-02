import * as Phaser from 'phaser'
import { getCurrentInstance, inject, onBeforeUnmount, watch } from 'vue'
import { InjectionKeys, PrivateInjectionKeys } from '../lib/provider'
import setters, { deepProps, GAME_OBJECT_EVENTS, vModelProps } from './setters'

const camelize = (s: string) => s.replace(/-./g, x => x[1].toUpperCase())

function checkIsBody(object: any): object is Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody {
  return object && 'bounce' in object
}

function checkIsFx(_object: any, isFx: boolean): _object is Phaser.Filters.Controller {
  return isFx
}

function checkIsLight(object: any): object is Phaser.GameObjects.Light {
  return object.constructor === Phaser.GameObjects.Light
}

function initGameObject(
  object: Phaser.GameObjects.GameObject | Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | Phaser.Filters.Controller | Phaser.GameObjects.Light,
  props: Readonly<Record<string, unknown>>,
  options: { isFx?: boolean } = {},
) {
  const currentInstance = getCurrentInstance()!
  const emit = currentInstance.emit.bind(currentInstance)
  const isLight = checkIsLight(object)
  const isFx = checkIsFx(object, !!options.isFx)
  const isBody = checkIsBody(object)
  const isGameObject = !isLight && !isFx && !isBody
  const scene = inject(InjectionKeys.Scene)!
  const renderList = inject(PrivateInjectionKeys.RenderTextureRenderList)
  if (isLight) {
    if (!scene.lights.active)
      scene.lights.enable()
    scene.lights.lights.push(object)
  }
  else if (isBody) {
    // _
  }
  else if (isFx) {
    // FX objects don't need to be added to the scene
  }
  else if (renderList) {
    renderList.push(object)
    onBeforeUnmount(() => {
      const i = renderList.findIndex(v => v === object)
      renderList.splice(i, 1)
    })
  }
  else {
    scene.add.existing(object)
    // Append to parent container
    const container = inject(InjectionKeys.Container)
    if (container) {
      const i = container.list.findIndex((v) => {
        return ('depth' in v ? (v as Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Depth).depth : 0) > ((props.depth as number) ?? 0)
      })
      i === -1 ? container.add(object) : container.addAt(object, i)
    }
  }
  // Make it reactive
  const definedProps = Object.fromEntries(
    Object.entries(currentInstance.vnode.props ?? {}).map(([key, value]) => [camelize(key), value]),
  )
  const vModelKeys = Object.keys(definedProps).filter(key => key.startsWith('onUpdate:')).map(key => key.split(':')[1]).filter(key => vModelProps.includes(key))
  // @ts-expect-error ts(7053)
  const normalProps = Object.entries(definedProps).filter(([key]) => setters[key])
  const watchStoppers = normalProps.map(([key, value]) => {
    // @ts-expect-error ts(7053)
    const setter = setters[key](object, vModelKeys.includes(key) ? emit : undefined)
    setter(value)
    // TODO: Don't watch non dynamicProps
    return watch(() => props[key], setter, { deep: deepProps.includes(key) })
  }).filter(Boolean)
  // Set event
  if (definedProps.onCreate)
    emit('create', object)
  // Set interactive events
  const events = GAME_OBJECT_EVENTS.filter(v => v.attr in definedProps)
  if (isGameObject && events.length) {
    if (!object.input) {
      object.setInteractive()
    }
    if (events.some(v => v.drag)) {
      scene.input.setDraggable(object)
    }
    events.forEach((v) => {
      object.on(v.emit, (...args: any) => {
        if ('eventIndex' in v) {
          args[0].stopPropagation = args[v.eventIndex as number].stopPropagation
        }
        emit(v.emit, ...args)
      })
    })
  }
  // Destroy when unmounted
  onBeforeUnmount(() => {
    watchStoppers.forEach(stop => stop())
  })
  if (isLight) {
    onBeforeUnmount(() => scene.lights.removeLight(object))
  }
  else {
    onBeforeUnmount(() => object.destroy())
  }
  return object
}
export default initGameObject
