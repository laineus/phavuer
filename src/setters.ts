// TypeScript interfaces for Phaser game objects and events
interface GameObjectEvent {
  attr: string
  emit: string
  eventIndex?: number
  drag?: boolean
}

interface PhaserGameObject {
  updateDisplayOrigin?: () => void
  input?: {
    hitArea: {
      setSize: (width: number, height: number) => void
    }
    dropZone?: any
  }
  _events?: Record<string, any>
  setInteractive?: () => void
  setSize: (width: number, height: number) => void
  width: number
  height: number
  x: number
  y: number
  geom?: {
    x1: number
    y1: number
    x2: number
    y2: number
    x3: number
    y3: number
  }
  setTo: (points: any) => void
  setRotation: (rotation: number) => void
  setOrigin: (x: number, y: number) => void
  originX: number
  originY: number
  setScale: (x: number, y: number) => void
  scaleX: number
  scaleY: number
  setRadius: (radius: number) => void
  setDisplaySize: (width: number, height: number) => void
  displayWidth: number
  displayHeight: number
  setDisplayOrigin: (x: number, y: number) => void
  displayOriginX: number
  displayOriginY: number
  setFlipX: (flip: boolean) => void
  setFlipY: (flip: boolean) => void
  setDepth: (depth: number) => void
  depth?: number
  parentContainer?: {
    list: Array<{ depth: number }>
    bringToTop: (object: any) => void
    moveTo: (object: any, index: number) => void
  }
  setAlpha: (alpha: number) => void
  setBlendMode: (blendMode: string) => void
  setPipeline: (pipeline: string) => void
  setIntensity: (intensity: number) => void
  setTint: (tint: number) => void
  setText: (text: string) => void
  setTexture: (texture: string, frame?: string) => void
  frame?: { name: string }
  setFrame: (frame: string) => void
  setColor: (color: number) => void
  setFillStyle: (color: number, alpha: number) => void
  fillColor: number
  fillAlpha: number
  setStrokeStyle: (width: number, color: number, alpha: number) => void
  strokeColor: number
  strokeAlpha: number
  setStyle: (style: any) => void
  setLineSpacing: (spacing: number) => void
  setPadding: (padding: number) => void
  setCollision: (collision: any) => void
  setCollisionByProperty: (property: any) => void
  play: (key: string) => void
  stop: () => void
  setScrollFactor: (x: number, y?: number) => void
  scrollFactorX: number
  scrollFactorY: number
  setCullPadding: (x: number, y: number) => void
  cullPaddingX: number
  cullPaddingY: number
  setActive: (active: boolean) => void
  setVisible: (visible: boolean) => void
  scene: {
    add: {
      tween: (config: any) => any
      timeline: (configs: any[]) => any
    }
  }
}

interface PhaserBody {
  enable: boolean
  setImmovable: (immovable: boolean) => void
  moves: boolean
  setBounceX: (bounce: number) => void
  setBounceY: (bounce: number) => void
  setDrag: (drag: number) => void
  setDragX: (drag: number) => void
  setDragY: (drag: number) => void
  setGravityX: (gravity: number) => void
  setGravityY: (gravity: number) => void
  setFrictionX: (friction: number) => void
  setFrictionY: (friction: number) => void
  setVelocityX: (velocity: number) => void
  setVelocityY: (velocity: number) => void
  setMaxVelocityX: (velocity: number) => void
  setMaxVelocityY: (velocity: number) => void
  setAccelerationX: (acceleration: number) => void
  setAccelerationY: (acceleration: number) => void
  setOffset: (x: number, y: number) => void
  offset: { x: number, y: number }
  collideWorldBounds: boolean
}

interface TweenConfig {
  targets?: any
  duration?: number
  yoyo?: boolean
  repeat?: number
  [key: string]: any
}

interface TimelineConfig {
  at?: number
  tween?: TweenConfig
  [key: string]: any
}

type TweenRepository = (data: any) => void

type EmitFunction = (event: string, value?: any) => void
type SetterFunction = (value: any) => void
type VModelSetterFunction = (value: any) => void

export const GAME_OBJECT_EVENTS: GameObjectEvent[] = [
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

function fixSize(object: PhaserGameObject): void {
  if (object.updateDisplayOrigin) {
    object.updateDisplayOrigin()
  }
  if (object.input) {
    object.input.hitArea.setSize(object.width, object.height)
  }
  else if (object._events && GAME_OBJECT_EVENTS.some(v => v.emit in object._events!)) {
    object.setInteractive?.()
  }
}

function defineVModelProperty(gameObject: PhaserGameObject, key: string, emit: EmitFunction): VModelSetterFunction {
  let rawValue: any = (gameObject as any)[key]
  Object.defineProperty(gameObject, key, {
    get() {
      return rawValue
    },
    set(v: any) {
      if (rawValue !== v)
        emit(`update:${key}`, v)
    },
  })
  return (v: any) => rawValue = v
}

export const deepProps: string[] = ['tween', 'tweens', 'timeline', 'style']
export const vModelProps: string[] = ['x', 'y', 'tweens', 'tween', 'timeline']

interface Setters {
  active: (object: PhaserGameObject) => SetterFunction
  visible: (object: PhaserGameObject) => SetterFunction
  x: (object: PhaserGameObject, emit?: EmitFunction) => VModelSetterFunction | SetterFunction
  y: (object: PhaserGameObject, emit?: EmitFunction) => VModelSetterFunction | SetterFunction
  x1: (object: PhaserGameObject) => SetterFunction
  y1: (object: PhaserGameObject) => SetterFunction
  x2: (object: PhaserGameObject) => SetterFunction
  y2: (object: PhaserGameObject) => SetterFunction
  x3: (object: PhaserGameObject) => SetterFunction
  y3: (object: PhaserGameObject) => SetterFunction
  points: (object: PhaserGameObject) => SetterFunction
  rotation: (object: PhaserGameObject) => SetterFunction
  origin: (object: PhaserGameObject) => SetterFunction
  originX: (object: PhaserGameObject) => SetterFunction
  originY: (object: PhaserGameObject) => SetterFunction
  scale: (object: PhaserGameObject) => SetterFunction
  scaleX: (object: PhaserGameObject) => SetterFunction
  scaleY: (object: PhaserGameObject) => SetterFunction
  width: (object: PhaserGameObject) => SetterFunction
  height: (object: PhaserGameObject) => SetterFunction
  leftWidth: (object: PhaserGameObject) => SetterFunction
  rightWidth: (object: PhaserGameObject) => SetterFunction
  topHeight: (object: PhaserGameObject) => SetterFunction
  bottomHeight: (object: PhaserGameObject) => SetterFunction
  radius: (object: PhaserGameObject) => SetterFunction
  displayWidth: (object: PhaserGameObject) => SetterFunction
  displayHeight: (object: PhaserGameObject) => SetterFunction
  displayOriginX: (object: PhaserGameObject) => SetterFunction
  displayOriginY: (object: PhaserGameObject) => SetterFunction
  dropZone: (object: PhaserGameObject) => SetterFunction
  flipX: (object: PhaserGameObject) => SetterFunction
  flipY: (object: PhaserGameObject) => SetterFunction
  depth: (object: PhaserGameObject) => SetterFunction
  alpha: (object: PhaserGameObject) => SetterFunction
  blendMode: (object: PhaserGameObject) => SetterFunction
  pipeline: (object: PhaserGameObject) => SetterFunction
  intensity: (object: PhaserGameObject) => SetterFunction
  tint: (object: PhaserGameObject) => SetterFunction
  text: (object: PhaserGameObject) => SetterFunction
  texture: (object: PhaserGameObject) => SetterFunction
  frame: (object: PhaserGameObject) => SetterFunction
  color: (object: PhaserGameObject) => SetterFunction
  fillColor: (object: PhaserGameObject) => SetterFunction
  fillAlpha: (object: PhaserGameObject) => SetterFunction
  lineWidth: (object: PhaserGameObject) => (start: any, end?: any) => void
  strokeColor: (object: PhaserGameObject) => SetterFunction
  strokeAlpha: (object: PhaserGameObject) => SetterFunction
  style: (object: PhaserGameObject) => SetterFunction
  lineSpacing: (object: PhaserGameObject) => SetterFunction
  padding: (object: PhaserGameObject) => SetterFunction
  collision: (object: PhaserGameObject) => SetterFunction
  collisionByProperty: (object: PhaserGameObject) => SetterFunction
  play: (object: PhaserGameObject) => SetterFunction
  scrollFactor: (object: PhaserGameObject) => SetterFunction
  scrollFactorX: (object: PhaserGameObject) => SetterFunction
  scrollFactorY: (object: PhaserGameObject) => SetterFunction
  cullPadding: (object: PhaserGameObject) => SetterFunction
  cullPaddingX: (object: PhaserGameObject) => SetterFunction
  cullPaddingY: (object: PhaserGameObject) => SetterFunction
  // Body
  enable: (body: PhaserBody) => SetterFunction
  immovable: (body: PhaserBody) => SetterFunction
  moves: (body: PhaserBody) => SetterFunction
  bounceX: (body: PhaserBody) => SetterFunction
  bounceY: (body: PhaserBody) => SetterFunction
  drag: (body: PhaserBody) => SetterFunction
  dragX: (body: PhaserBody) => SetterFunction
  dragY: (body: PhaserBody) => SetterFunction
  gravityX: (body: PhaserBody) => SetterFunction
  gravityY: (body: PhaserBody) => SetterFunction
  frictionX: (body: PhaserBody) => SetterFunction
  frictionY: (body: PhaserBody) => SetterFunction
  velocityX: (body: PhaserBody) => SetterFunction
  velocityY: (body: PhaserBody) => SetterFunction
  maxVelocityX: (body: PhaserBody) => SetterFunction
  maxVelocityY: (body: PhaserBody) => SetterFunction
  accelerationX: (body: PhaserBody) => SetterFunction
  accelerationY: (body: PhaserBody) => SetterFunction
  offsetX: (body: PhaserBody) => SetterFunction
  offsetY: (body: PhaserBody) => SetterFunction
  collideWorldBounds: (body: PhaserBody) => SetterFunction
  // Tween
  tween: (object: PhaserGameObject, emit?: EmitFunction) => TweenRepository
  tweens: (object: PhaserGameObject, emit?: EmitFunction) => TweenRepository
  timeline: (object: PhaserGameObject, emit?: EmitFunction) => TweenRepository
}

const defaultSetters: Setters = {
  active: (object: PhaserGameObject) => (v: boolean) => object.setActive(v),
  visible: (object: PhaserGameObject) => (v: boolean) => object.setVisible(v),
  x: (object: PhaserGameObject, emit?: EmitFunction) => {
    if (emit) {
      return defineVModelProperty(object, 'x', emit)
    }
    else {
      return (v: number) => object.x = v
    }
  },
  y: (object: PhaserGameObject, emit?: EmitFunction) => {
    if (emit) {
      return defineVModelProperty(object, 'y', emit)
    }
    else {
      return (v: number) => object.y = v
    }
  },
  x1: (object: PhaserGameObject) => (v: number) => object.geom!.x1 = v,
  y1: (object: PhaserGameObject) => (v: number) => object.geom!.y1 = v,
  x2: (object: PhaserGameObject) => (v: number) => object.geom!.x2 = v,
  y2: (object: PhaserGameObject) => (v: number) => object.geom!.y2 = v,
  x3: (object: PhaserGameObject) => (v: number) => object.geom!.x3 = v,
  y3: (object: PhaserGameObject) => (v: number) => object.geom!.y3 = v,
  points: (object: PhaserGameObject) => (v: any) => object.setTo(v),
  rotation: (object: PhaserGameObject) => (v: number) => object.setRotation(v),
  origin: (object: PhaserGameObject) => (v: number) => object.setOrigin(v, v),
  originX: (object: PhaserGameObject) => (v: number) => object.setOrigin(v, object.originY),
  originY: (object: PhaserGameObject) => (v: number) => object.setOrigin(object.originX, v),
  scale: (object: PhaserGameObject) => (v: number) => object.setScale(v, v),
  scaleX: (object: PhaserGameObject) => (v: number) => object.setScale(v, object.scaleY),
  scaleY: (object: PhaserGameObject) => (v: number) => object.setScale(object.scaleX, v),
  width: (object: PhaserGameObject) => (v: number) => {
    object.setSize(v, object.height)
    fixSize(object)
  },
  height: (object: PhaserGameObject) => (v: number) => {
    object.setSize(object.width, v)
    fixSize(object)
  },
  leftWidth: (object: PhaserGameObject) => (v: number) => (object as any).setSlices(object.width, object.height, v, (object as any).rightWidth, (object as any).topHeight, (object as any).bottomHeight),
  rightWidth: (object: PhaserGameObject) => (v: number) => (object as any).setSlices(object.width, object.height, (object as any).leftWidth, v, (object as any).topHeight, (object as any).bottomHeight),
  topHeight: (object: PhaserGameObject) => (v: number) => (object as any).setSlices(object.width, object.height, (object as any).leftWidth, (object as any).rightWidth, v, (object as any).bottomHeight),
  bottomHeight: (object: PhaserGameObject) => (v: number) => (object as any).setSlices(object.width, object.height, (object as any).leftWidth, (object as any).rightWidth, (object as any).topHeight, v),
  radius: (object: PhaserGameObject) => (v: number) => object.setRadius(v),
  displayWidth: (object: PhaserGameObject) => (v: number) => object.setDisplaySize(v, object.displayHeight),
  displayHeight: (object: PhaserGameObject) => (v: number) => object.setDisplaySize(object.displayWidth, v),
  displayOriginX: (object: PhaserGameObject) => (v: number) => object.setDisplayOrigin(v, object.displayOriginY),
  displayOriginY: (object: PhaserGameObject) => (v: number) => object.setDisplayOrigin(object.displayOriginX, v),
  dropZone: (object: PhaserGameObject) => (v: any) => {
    if (!v)
      return
    if (!object.input)
      object.setInteractive?.()
    object.input!.dropZone = v
  },
  flipX: (object: PhaserGameObject) => (v: boolean) => object.setFlipX(v),
  flipY: (object: PhaserGameObject) => (v: boolean) => object.setFlipY(v),
  depth: (object: PhaserGameObject) => (v: number) => {
    object.setDepth(v)
    if (object.parentContainer) {
      const i = object.parentContainer.list.findIndex(v => v.depth > (object.depth ?? 0))
      i === -1 ? object.parentContainer.bringToTop(object) : object.parentContainer.moveTo(object, Math.max(i - 1, 0))
    }
  },
  alpha: (object: PhaserGameObject) => (v: number) => object.setAlpha(v),
  blendMode: (object: PhaserGameObject) => (v: string) => object.setBlendMode(v),
  pipeline: (object: PhaserGameObject) => (v: string) => object.setPipeline(v),
  intensity: (object: PhaserGameObject) => (v: number) => object.setIntensity(v),
  tint: (object: PhaserGameObject) => (v: number) => object.setTint(v),
  text: (object: PhaserGameObject) => (v: string) => object.setText(v),
  texture: (object: PhaserGameObject) => (v: string) => object.setTexture(v, object.frame?.name),
  frame: (object: PhaserGameObject) => (v: string) => object.setFrame(v),
  color: (object: PhaserGameObject) => (v: number) => object.setColor(v),
  fillColor: (object: PhaserGameObject) => (v: number) => object.setFillStyle(v, object.fillAlpha),
  fillAlpha: (object: PhaserGameObject) => (v: number) => object.setFillStyle(object.fillColor, v),
  lineWidth: (object: PhaserGameObject) => (start: any, end?: any) => {
    if ((object as any).setLineWidth) {
      (object as any).setLineWidth(start, end)
    }
    else {
      (object as any).setStrokeStyle(...(!start ? [] : [start, (object as any).strokeColor, (object as any).strokeAlpha]))
    }
  },
  strokeColor: (object: PhaserGameObject) => (v: number) => (object as any).setStrokeStyle((object as any).lineWidth, v, (object as any).strokeAlpha),
  strokeAlpha: (object: PhaserGameObject) => (v: number) => (object as any).setStrokeStyle((object as any).lineWidth, (object as any).strokeColor, v),
  style: (object: PhaserGameObject) => (v: any) => object.setStyle(v),
  lineSpacing: (object: PhaserGameObject) => (v: number) => object.setLineSpacing(v),
  padding: (object: PhaserGameObject) => (v: number) => object.setPadding(v),
  collision: (object: PhaserGameObject) => (v: any) => object.setCollision(v),
  collisionByProperty: (object: PhaserGameObject) => (v: any) => object.setCollisionByProperty(v),
  play: (object: PhaserGameObject) => (v: any) => v ? object.play(v) : object.stop(),
  scrollFactor: (object: PhaserGameObject) => (v: number) => object.setScrollFactor(v),
  scrollFactorX: (object: PhaserGameObject) => (v: number) => object.setScrollFactor(v, object.scrollFactorY),
  scrollFactorY: (object: PhaserGameObject) => (v: number) => object.setScrollFactor(object.scrollFactorX, v),
  cullPadding: (object: PhaserGameObject) => (v: number) => object.setCullPadding(v, v),
  cullPaddingX: (object: PhaserGameObject) => (v: number) => object.setCullPadding(v, object.cullPaddingY),
  cullPaddingY: (object: PhaserGameObject) => (v: number) => object.setCullPadding(object.cullPaddingX, v),
  // Body
  enable: (body: PhaserBody) => (v: boolean) => body.enable = v,
  immovable: (body: PhaserBody) => (v: boolean) => body.setImmovable(v),
  moves: (body: PhaserBody) => (v: boolean) => body.moves = v,
  bounceX: (body: PhaserBody) => (v: number) => body.setBounceX(v),
  bounceY: (body: PhaserBody) => (v: number) => body.setBounceY(v),
  drag: (body: PhaserBody) => (v: number) => body.setDrag(v),
  dragX: (body: PhaserBody) => (v: number) => body.setDragX(v),
  dragY: (body: PhaserBody) => (v: number) => body.setDragY(v),
  gravityX: (body: PhaserBody) => (v: number) => body.setGravityX(v),
  gravityY: (body: PhaserBody) => (v: number) => body.setGravityY(v),
  frictionX: (body: PhaserBody) => (v: number) => body.setFrictionX(v),
  frictionY: (body: PhaserBody) => (v: number) => body.setFrictionY(v),
  velocityX: (body: PhaserBody) => (v: number) => body.setVelocityX(v),
  velocityY: (body: PhaserBody) => (v: number) => body.setVelocityY(v),
  maxVelocityX: (body: PhaserBody) => (v: number) => body.setMaxVelocityX(v),
  maxVelocityY: (body: PhaserBody) => (v: number) => body.setMaxVelocityY(v),
  accelerationX: (body: PhaserBody) => (v: number) => body.setAccelerationX(v),
  accelerationY: (body: PhaserBody) => (v: number) => body.setAccelerationY(v),
  offsetX: (body: PhaserBody) => (v: number) => body.setOffset(v, body.offset.y),
  offsetY: (body: PhaserBody) => (v: number) => body.setOffset(body.offset.x, v),
  collideWorldBounds: (body: PhaserBody) => (v: boolean) => body.collideWorldBounds = v,
  // Tween
  tween: (object: PhaserGameObject, emit?: EmitFunction) => {
    return makeTweenRepository((tweenConfig: TweenConfig) => {
      const tween = object.scene.add.tween(Object.assign({ targets: object }, tweenConfig))
      if (emit)
        tween.on('complete', () => emit('update:tween', undefined))
      return tween
    })
  },
  tweens: (object: PhaserGameObject, emit?: EmitFunction) => {
    return makeTweenRepository((tweenConfigs: TweenConfig[]) => {
      const infinitConfigIndex = tweenConfigs.findIndex(conf => conf.repeat === -1)
      const configs = tweenConfigs.slice(0, infinitConfigIndex === -1 ? undefined : infinitConfigIndex + 1)
      const timeline = object.scene.add.timeline(configs.map((tweenConfig, i) => {
        const at = configs.slice(0, i).reduce((sum, config) => {
          const duration = config.duration ?? 1000
          const yoyo = config.yoyo ?? false
          const count = (config.repeat ?? 0) + 1
          return sum + duration * (yoyo ? 2 : 1) * count
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
  timeline: (object: PhaserGameObject, emit?: EmitFunction) => {
    return makeTweenRepository((timelineConfigs: TimelineConfig[]) => {
      const timeline = object.scene.add.timeline(timelineConfigs.map((timelineConfig) => {
        const copiedTimelineConfig = Object.assign({}, timelineConfig)
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

function makeTweenRepository<T>(callback: (data: T) => any): (data: T | undefined) => void {
  let prevTween: any
  return (data: T | undefined) => {
    if (prevTween)
      prevTween.stop()
    prevTween = data ? callback(data) : undefined
  }
}

export default defaultSetters
