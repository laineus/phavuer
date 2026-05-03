import type { GameObjects } from 'phaser'
import type { ExtractPropTypes } from 'vue'
import type { gameObjectProps } from './props'
import type { HasAlpha, HasDisplaySize } from './setters'
import { getCurrentInstance, inject, onBeforeUnmount, provide, watch } from 'vue'
import { InjectionKeys } from './provider'
import setters, { GAME_OBJECT_EVENTS } from './setters'

type GameObjectProps = ExtractPropTypes<typeof gameObjectProps>

const camelize = (s: string) => s.replace(/-./g, x => x[1].toUpperCase())

function getDefinedPropKeys() {
  const currentInstance = getCurrentInstance()!
  return Object.entries(currentInstance.vnode.props ?? {}).map(([key]) => camelize(key))
}

type ReactiveConfigRow<T> = [string, () => T, (v: T) => void]
type RowBuilder = <T>(key: string, getter: () => T, setter: (v: T) => void) => ReactiveConfigRow<T>
function makeReactive(build: (row: RowBuilder) => ReactiveConfigRow<any>[]) {
  const list = build((key, getter, setter) => [key, getter, setter])
  const definedkeys = getDefinedPropKeys()
  const watchStoppers = list.filter(([key]) => definedkeys.includes(key)).map(([, getter, setter]) => {
    return watch(getter, setter, { immediate: true })
  })
  onBeforeUnmount(() => {
    watchStoppers.forEach(stop => stop())
  })
}

function defineGameObject(
  object: Phaser.GameObjects.GameObject,
  props: Readonly<Record<string, unknown>>,
) {
  const currentInstance = getCurrentInstance()!
  const emit = currentInstance.emit.bind(currentInstance)
  // Add to scene
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
  // Set interactive events
  const definedProps = getDefinedPropKeys()
  const events = GAME_OBJECT_EVENTS.filter(v => definedProps.includes(v.attr))
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
  // Lifecycle
  emit('create', object)
  onBeforeUnmount(() => object.destroy())
  provide(InjectionKeys.GameObject, object)
}

function checkIfOrigin(object: any): object is GameObjects.Components.Origin {
  return 'setOrigin' in object
}
function checkIfAlpha(object: any): object is HasAlpha {
  return 'setAlpha' in object
}
function checkIfBlendMode(object: any): object is GameObjects.Components.BlendMode {
  return 'setBlendMode' in object
}
function checkIfLighting(object: any): object is GameObjects.Components.Lighting {
  return 'setLighting' in object
}

function makeGameObjectReactive(
  props: GameObjectProps,
  object:
    GameObjects.GameObject
    & GameObjects.Components.Transform
    & GameObjects.Components.Depth
    & GameObjects.Components.ScrollFactor
    & HasDisplaySize
    & Partial<GameObjects.Components.Origin>
    & GameObjects.Components.Visible
    & Partial<HasAlpha>
    & Partial<GameObjects.Components.BlendMode>
    & Partial<GameObjects.Components.Lighting>,
) {
  makeReactive(row => [
    row('x', () => props.x!, setters.x(object)),
    row('y', () => props.y!, setters.y(object)),
    row('tween', () => props.tween!, setters.tween(object)),
    row('tweens', () => props.tweens!, setters.tweens(object)),
    row('timeline', () => props.timeline!, setters.timeline(object)),
    row('active', () => props.active!, setters.active(object)),
    row('visible', () => props.visible!, setters.visible(object)),
    row('rotation', () => props.rotation!, setters.rotation(object)),
    ...(checkIfOrigin(object)
      ? [
          row('origin', () => props.origin!, setters.origin(object)),
          row('originX', () => props.originX!, setters.origin(object)),
          row('originY', () => props.originY!, setters.origin(object)),
          row('displayOriginX', () => props.displayOriginX!, setters.origin(object)),
          row('displayOriginY', () => props.displayOriginY!, setters.origin(object)),
        ]
      : []),
    row('scale', () => props.scale!, setters.scale(object)),
    row('scaleX', () => props.scaleX!, setters.scaleX(object)),
    row('scaleY', () => props.scaleY!, setters.scaleY(object)),
    row('displayWidth', () => props.displayWidth!, setters.displayWidth(object)),
    row('displayHeight', () => props.displayHeight!, setters.displayHeight(object)),
    row('scrollFactor', () => props.scrollFactor!, setters.scrollFactor(object)),
    row('scrollFactorX', () => props.scrollFactorX!, setters.scrollFactorX(object)),
    row('scrollFactorY', () => props.scrollFactorY!, setters.scrollFactorY(object)),
    row('dropZone', () => props.dropZone!, setters.dropZone(object)),
    row('depth', () => props.depth!, setters.depth(object)),
    ...(checkIfAlpha(object) ? [row('alpha', () => props.alpha!, setters.alpha(object))] : []),
    ...(checkIfBlendMode(object) ? [row('blendMode', () => props.blendMode!, setters.blendMode(object))] : []),
    ...(checkIfLighting(object) ? [row('lighting', () => props.lighting!, setters.lighting(object))] : []),
  ])
}

export {
  defineGameObject,
  getDefinedPropKeys,
  makeGameObjectReactive,
  makeReactive,
}
