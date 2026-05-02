import { getCurrentInstance, inject, onBeforeUnmount, watch } from 'vue'
import { InjectionKeys } from './provider'
import setters, { deepProps, GAME_OBJECT_EVENTS, vModelProps } from './setters'

const camelize = (s: string) => s.replace(/-./g, x => x[1].toUpperCase())

function getDefinedProps() {
  const currentInstance = getCurrentInstance()!
  return Object.fromEntries(
    Object.entries(currentInstance.vnode.props ?? {}).map(([key, value]) => [camelize(key), value]),
  )
}

function makeReactive(object: any, props: Readonly<Record<string, unknown>>) {
  const currentInstance = getCurrentInstance()!
  const emit = currentInstance.emit.bind(currentInstance)
  const definedProps = getDefinedProps()
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
  onBeforeUnmount(() => {
    watchStoppers.forEach(stop => stop())
  })
}

function emitCreateEvent(object: any) {
  const currentInstance = getCurrentInstance()!
  const emit = currentInstance.emit.bind(currentInstance)
  emit('create', object)
}

function initGameObject(
  object: Phaser.GameObjects.GameObject,
  props: Readonly<Record<string, unknown>>,
) {
  const currentInstance = getCurrentInstance()!
  const emit = currentInstance.emit.bind(currentInstance)
  const scene = inject(InjectionKeys.Scene)!
  const renderList = inject(InjectionKeys.RenderTextureRenderList)
  if (renderList) {
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
  makeReactive(object, props)
  emitCreateEvent(object)
  // Set interactive events
  const definedProps = getDefinedProps()
  const events = GAME_OBJECT_EVENTS.filter(v => v.attr in definedProps)
  if (events.length) {
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
  onBeforeUnmount(() => object.destroy())
  return object
}

function initLight(
  light: Phaser.GameObjects.Light,
  props: Readonly<Record<string, unknown>>,
) {
  const scene = inject(InjectionKeys.Scene)!
  if (!scene.lights.active)
    scene.lights.enable()
  scene.lights.lights.push(light)
  makeReactive(light, props)
  emitCreateEvent(light)
  // Destroy when unmounted
  onBeforeUnmount(() => scene.lights.removeLight(light))
}

function initFilter(
  filter: Phaser.Filters.Controller,
  props: Readonly<Record<string, unknown>>,
) {
  makeReactive(filter, props)
  emitCreateEvent(filter)
  // Destroy when unmounted
  onBeforeUnmount(() => filter.destroy())
}

function initBody(
  body: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody,
  props: Readonly<Record<string, unknown>>,
) {
  makeReactive(body, props)
  emitCreateEvent(body)
  // Destroy when unmounted
  onBeforeUnmount(() => body.destroy())
}

export {
  initBody,
  initFilter,
  initGameObject,
  initLight,
}
