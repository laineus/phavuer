import type { TimelineConfig, TweenConfig } from '../types'
import { getCurrentInstance } from 'vue'
import { getDefinedPropKeys } from './componentBuilder'

type GameObject = Phaser.GameObjects.GameObject
export type HasSize = Phaser.GameObjects.Components.Size | Phaser.GameObjects.Components.ComputedSize | Phaser.GameObjects.Rectangle
export type HasDisplaySize = Phaser.GameObjects.Components.Size | Phaser.GameObjects.Components.ComputedSize | Phaser.GameObjects.Line | Phaser.GameObjects.Triangle | Phaser.GameObjects.Polygon | Phaser.GameObjects.Arc
export type HasAlpha = Phaser.GameObjects.Rectangle | Phaser.GameObjects.Components.Alpha | Phaser.GameObjects.Line | Phaser.GameObjects.Triangle | Phaser.GameObjects.Polygon | Phaser.GameObjects.NineSlice | Phaser.GameObjects.Arc | Phaser.GameObjects.Container

export const GAME_OBJECT_EVENTS = [
  { attr: 'onPointerdown', emit: 'pointerdown', eventIndex: 3 },
  { attr: 'onPointermove', emit: 'pointermove', eventIndex: 3 },
  { attr: 'onPointerup', emit: 'pointerup', eventIndex: 3 },
  { attr: 'onPointerout', emit: 'pointerout', eventIndex: 1 },
  { attr: 'onPointerover', emit: 'pointerover', eventIndex: 3 },
  { attr: 'onWheel', emit: 'wheel', eventIndex: 4 },
  { attr: 'onDragstart', emit: 'dragstart', drag: true },
  { attr: 'onDrag', emit: 'drag', drag: true },
  { attr: 'onDragend', emit: 'dragend', drag: true },
  { attr: 'onDragenter', emit: 'dragenter', drag: true },
  { attr: 'onDragover', emit: 'dragover', drag: true },
  { attr: 'onDragleave', emit: 'dragleave', drag: true },
  { attr: 'onDrop', emit: 'drop', drag: true },
]
function fixSize(object: (GameObject & Phaser.GameObjects.Components.Size) | (GameObject | Phaser.GameObjects.Components.Origin)) {
  if ('updateDisplayOrigin' in object) {
    object.updateDisplayOrigin()
  }
  if ('input' in object && 'width' in object) {
    object.input?.hitArea.setSize(object.width, object.height)
  }
  // @ts-expect-error _events is private
  else if ('setInteractive' in object && object._events && GAME_OBJECT_EVENTS.some(v => v.emit in object._events)) {
    object.setInteractive()
  }
}

function getVmodelEmit(key: string) {
  const definedPropKeys = getDefinedPropKeys()
  const vModelKeys = definedPropKeys.filter(key => key.startsWith('onUpdate:')).map(key => key.split(':')[1])
  if (!vModelKeys.includes(key))
    return undefined
  const currentInstance = getCurrentInstance()!
  const emit = currentInstance.emit.bind(currentInstance)
  return emit
}

function defineVModelProperty<T>(target: any, key: string, property?: string) {
  const emit = getVmodelEmit(key)
  if (!emit)
    return undefined
  property = property ?? key
  let rawValue = target[property]
  Object.defineProperty(target, property, {
    get() {
      return rawValue
    },
    set(v) {
      if (rawValue !== v)
        emit(`update:${key}`, v)
    },
  })
  return (v: T) => rawValue = v
}

export const deepProps = ['tween', 'tweens', 'timeline', 'style']
export { defineVModelProperty }
export default {
  active: (object: GameObject) => (v: boolean) => object.setActive(v),
  visible: (object: Phaser.GameObjects.Components.Visible) => (v: boolean) => object.setVisible(v),
  x: (object: Phaser.GameObjects.Components.Transform | Phaser.GameObjects.Light) => {
    return defineVModelProperty(object, 'x') ?? ((v: number) => object.x = v)
  },
  y: (object: Phaser.GameObjects.Components.Transform | Phaser.GameObjects.Light) => {
    return defineVModelProperty(object, 'y') ?? ((v: number) => object.y = v)
  },
  x1: (object: Phaser.GameObjects.Line | Phaser.GameObjects.Triangle) => (v: number) => object.geom.x1 = v,
  y1: (object: Phaser.GameObjects.Line | Phaser.GameObjects.Triangle) => (v: number) => object.geom.y1 = v,
  x2: (object: Phaser.GameObjects.Line | Phaser.GameObjects.Triangle) => (v: number) => object.geom.x2 = v,
  y2: (object: Phaser.GameObjects.Line | Phaser.GameObjects.Triangle) => (v: number) => object.geom.y2 = v,
  x3: (object: Phaser.GameObjects.Triangle) => (v: number) => object.geom.x3 = v,
  y3: (object: Phaser.GameObjects.Triangle) => (v: number) => object.geom.y3 = v,
  points: (object: Phaser.GameObjects.Polygon) => (v: Phaser.Types.Math.Vector2Like[]) => object.setTo(v),
  rotation: (object: Phaser.GameObjects.Components.Transform) => (v: number) => object.setRotation(v),
  origin: (object: Phaser.GameObjects.Components.Origin) => (v: number) => object.setOrigin(v, v),
  originX: (object: Phaser.GameObjects.Components.Origin) => (v: number) => object.setOrigin(v, object.originY),
  originY: (object: Phaser.GameObjects.Components.Origin) => (v: number) => object.setOrigin(object.originX, v),
  scale: (object: Phaser.GameObjects.Components.Transform) => (v: number) => object.setScale(v, v),
  scaleX: (object: Phaser.GameObjects.Components.Transform) => (v: number) => object.setScale(v, object.scaleY),
  scaleY: (object: Phaser.GameObjects.Components.Transform) => (v: number) => object.setScale(object.scaleX, v),
  width: (object: GameObject & HasSize) => (v: number) => {
    object.setSize(v, object.height)
    fixSize(object)
  },
  height: (object: GameObject & HasSize) => (v: number) => {
    object.setSize(object.width, v)
    fixSize(object)
  },
  leftWidth: (object: Phaser.GameObjects.NineSlice) => (v: number) => object.setSlices(object.width, object.height, v, object.rightWidth, object.topHeight, object.bottomHeight),
  rightWidth: (object: Phaser.GameObjects.NineSlice) => (v: number) => object.setSlices(object.width, object.height, object.leftWidth, v, object.topHeight, object.bottomHeight),
  topHeight: (object: Phaser.GameObjects.NineSlice) => (v: number) => object.setSlices(object.width, object.height, object.leftWidth, object.rightWidth, v, object.bottomHeight),
  bottomHeight: (object: Phaser.GameObjects.NineSlice) => (v: number) => object.setSlices(object.width, object.height, object.leftWidth, object.rightWidth, object.topHeight, v),
  radius: (object: Phaser.GameObjects.Rectangle | Phaser.GameObjects.Arc | Phaser.GameObjects.Light) => {
    if ('setRounded' in object)
      return (v: number) => (object as Phaser.GameObjects.Rectangle).setRounded(v)
    return (v: number) => (object as Phaser.GameObjects.Arc).radius = v
  },
  displayWidth: (object: HasDisplaySize) => (v: number) => object.setDisplaySize(v, object.displayHeight),
  displayHeight: (object: HasDisplaySize) => (v: number) => object.setDisplaySize(object.displayWidth, v),
  displayOriginX: (object: Phaser.GameObjects.Components.Origin) => (v: number) => object.setDisplayOrigin(v, object.displayOriginY),
  displayOriginY: (object: Phaser.GameObjects.Components.Origin) => (v: number) => object.setDisplayOrigin(object.displayOriginX, v),
  dropZone: (object: GameObject) => (v: boolean) => {
    if (v && !object.input)
      object.setInteractive()
    object.input!.dropZone = v
  },
  flipX: (object: Phaser.GameObjects.Components.Flip) => (v: boolean) => object.setFlipX(v),
  flipY: (object: Phaser.GameObjects.Components.Flip) => (v: boolean) => object.setFlipY(v),
  depth: (object: GameObject & Phaser.GameObjects.Components.Depth) => (v: number) => {
    object.setDepth(v)
    if (object.parentContainer) {
      const i = object.parentContainer.list.findIndex((v) => {
        return ('depth' in v ? (v as GameObject & Phaser.GameObjects.Components.Depth).depth : 0) > (object.depth ?? 0)
      })
      i === -1 ? object.parentContainer.bringToTop(object) : object.parentContainer.moveTo(object, Math.max(i - 1, 0))
    }
  },
  alpha: (object: HasAlpha) => {
    if (object.setAlpha)
      return (v: number) => object.setAlpha(v)
    return (v: number) => object.alpha = v
  },
  blendMode: (object: Phaser.GameObjects.Components.BlendMode) => {
    return (v: number | string) => object.setBlendMode(v)
  },
  lighting: (object: Phaser.GameObjects.Components.Lighting) => (v: boolean) => object.setLighting(v),
  intensity: (object: Phaser.GameObjects.Light) => (v: number) => object.setIntensity(v),
  tint: (object: Phaser.GameObjects.Components.Tint | Phaser.GameObjects.NineSlice) => (v?: number) => object.setTint(v),
  text: (object: Phaser.GameObjects.Text | Phaser.GameObjects.BitmapText) => (v: string | string[]) => object.setText(v),
  texture: (object: Phaser.GameObjects.Components.Texture) => {
    return (v: string | Phaser.Textures.Texture) => object.setTexture(v, object.frame && (object.frame as Phaser.Textures.Frame).name)
  },
  frame: (object: Phaser.GameObjects.Components.Texture) => (v: string | number) => object.setFrame(v),
  color: (object: Phaser.GameObjects.Light) => (v: number) => object.setColor(v),
  fillColor: (object: Phaser.GameObjects.Shape) => (v: number) => object.setFillStyle(v, object.fillAlpha),
  fillAlpha: (object: Phaser.GameObjects.Shape) => (v: number) => object.setFillStyle(object.fillColor, v),
  lineWidth: (object: Phaser.GameObjects.Shape | Phaser.GameObjects.Line) => {
    if ('setLineWidth' in object)
      return (v: number) => object.setLineWidth(v)
    if (object.setStrokeStyle)
      return (v: number) => object.setStrokeStyle(...(!v ? [] : [v, object.strokeColor, object.strokeAlpha]))
    return (v: number) => object.lineWidth = v
  },
  strokeColor: (object: Phaser.GameObjects.Shape) => (v: number) => object.setStrokeStyle(object.lineWidth, v, object.strokeAlpha),
  strokeAlpha: (object: Phaser.GameObjects.Shape) => (v: number) => object.setStrokeStyle(object.lineWidth, object.strokeColor, v),
  style: (object: Phaser.GameObjects.Text) => (v: Phaser.Types.GameObjects.Text.TextStyle) => object.setStyle(v),
  lineSpacing: (object: Phaser.GameObjects.Text) => (v: number) => object.setLineSpacing(v),
  padding: (object: Phaser.GameObjects.Text) => (v: number | Phaser.Types.GameObjects.Text.TextPadding) => object.setPadding(v),
  play: (object: Phaser.GameObjects.Sprite) => (v: string | Phaser.Animations.Animation | Phaser.Types.Animations.PlayAnimationConfig) => v ? object.play(v) : object.stop(),
  scrollFactor: (object: Phaser.GameObjects.Components.ScrollFactor) => (v: number) => object.setScrollFactor(v),
  scrollFactorX: (object: Phaser.GameObjects.Components.ScrollFactor) => (v: number) => object.setScrollFactor(v, object.scrollFactorY),
  scrollFactorY: (object: Phaser.GameObjects.Components.ScrollFactor) => (v: number) => object.setScrollFactor(object.scrollFactorX, v),
  // Tween
  tween: (object: GameObject) => {
    const emit = getVmodelEmit('tween')
    return makeTweenRepository((tweenConfig: TweenConfig) => {
      const tween = object.scene.add.tween(Object.assign({ targets: object }, tweenConfig))
      if (emit)
        tween.on('complete', () => emit('update:tween', undefined))
      return tween
    })
  },
  tweens: (object: GameObject) => {
    const emit = getVmodelEmit('tweens')
    return makeTweenRepository((tweenConfigs: TweenConfig[]) => {
      const infinitConfigIndex = tweenConfigs.findIndex(conf => conf.repeat === -1)
      const configs = tweenConfigs.slice(0, infinitConfigIndex === -1 ? undefined : infinitConfigIndex + 1)
      const timeline = object.scene.add.timeline(configs.map((tweenConfig, i) => {
        const at = configs.slice(0, i).reduce((sum, config) => {
          const duration = config.duration ?? 1000
          const yoyo = config.yoyo ?? false
          const count = (config.repeat ?? 0) + 1
          const hold = config.hold ?? 0
          const delay = typeof config.delay === 'number' ? config.delay : 0
          return sum + duration * (yoyo ? 2 : 1) * count + hold + (delay ?? 0)
        }, 0)
        return {
          at,
          tween: Object.assign({ targets: object }, tweenConfig),
        }
      })).play()
      if (emit)
        timeline.on('complete', () => emit('update:tweens', undefined))
      return timeline
    })
  },
  timeline: (object: GameObject) => {
    const emit = getVmodelEmit('timeline')
    return makeTweenRepository((timelineConfigs: TimelineConfig[]) => {
      const timeline = object.scene.add.timeline(timelineConfigs.map((timelineConfig) => {
        const copiedTimelineConfig = Object.assign({}, timelineConfig) as Phaser.Types.Time.TimelineEventConfig
        if (copiedTimelineConfig.tween) {
          copiedTimelineConfig.tween = Object.assign({ targets: object }, copiedTimelineConfig.tween)
        }
        return copiedTimelineConfig
      })).play()
      if (emit)
        timeline.on('complete', () => emit('update:timeline', undefined))
      return timeline
    })
  },
}
function makeTweenRepository<T>(callback: (data: T) => Phaser.Tweens.Tween | Phaser.Time.Timeline) {
  let prevTween: Phaser.Tweens.Tween | Phaser.Time.Timeline | undefined
  return (data: T | undefined) => {
    if (prevTween)
      prevTween.stop()
    prevTween = data ? callback(data) : undefined
  }
}
