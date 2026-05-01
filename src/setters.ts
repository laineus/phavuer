import type { TimelineConfig, TweenConfig } from './types.js'

type GameObject = Phaser.GameObjects.GameObject
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
function isWritable(obj: object, key: string): boolean {
  const proto = Object.getPrototypeOf(obj)
  if (!proto)
    return true
  const desc = Object.getOwnPropertyDescriptor(proto, key)
  return desc ? !!desc.set : isWritable(proto, key)
}
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

function defineVModelProperty<T>(target: Phaser.GameObjects.GameObject | Phaser.Math.Vector2, key: string, emit: (event: string, value: T) => void, property?: string) {
  property = property ?? key
  // @ts-expect-error Define a getter and setter to emit update event when the property is changed outside
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
export const vModelPropsGameObject = ['x', 'y', 'tweens', 'tween', 'timeline']
export const vModelPropsBody = ['velocityX', 'velocityY']
export const vModelProps = [...vModelPropsGameObject, ...vModelPropsBody]
export default {
  active: (object: GameObject) => (v: boolean) => object.setActive(v),
  visible: (object: Phaser.GameObjects.Components.Visible) => (v: boolean) => object.setVisible(v),
  x: (object: GameObject & Phaser.GameObjects.Components.Transform, emit?: (event: string, value: number) => void) => {
    if (emit) {
      return defineVModelProperty(object, 'x', emit)
    }
    else {
      return (v: number) => object.x = v
    }
  },
  y: (object: GameObject & Phaser.GameObjects.Components.Transform, emit?: (event: string, value: number) => void) => {
    if (emit) {
      return defineVModelProperty(object, 'y', emit)
    }
    else {
      return (v: number) => object.y = v
    }
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
  scale: (object: Phaser.GameObjects.Components.Transform) => {
    if (object.setScale)
      return (v: number) => object.setScale(v, v)
    return (v: number) => object.scale = v
  },
  scaleX: (object: Phaser.GameObjects.Components.Transform) => (v: number) => object.setScale(v, object.scaleY),
  scaleY: (object: Phaser.GameObjects.Components.Transform) => (v: number) => object.setScale(object.scaleX, v),
  width: (object: GameObject & Phaser.GameObjects.Components.Size) => (v: number) => {
    object.setSize(v, object.height)
    fixSize(object)
  },
  height: (object: GameObject & Phaser.GameObjects.Components.Size) => (v: number) => {
    object.setSize(object.width, v)
    fixSize(object)
  },
  leftWidth: (object: Phaser.GameObjects.NineSlice) => (v: number) => object.setSlices(object.width, object.height, v, object.rightWidth, object.topHeight, object.bottomHeight),
  rightWidth: (object: Phaser.GameObjects.NineSlice) => (v: number) => object.setSlices(object.width, object.height, object.leftWidth, v, object.topHeight, object.bottomHeight),
  topHeight: (object: Phaser.GameObjects.NineSlice) => (v: number) => object.setSlices(object.width, object.height, object.leftWidth, object.rightWidth, v, object.bottomHeight),
  bottomHeight: (object: Phaser.GameObjects.NineSlice) => (v: number) => object.setSlices(object.width, object.height, object.leftWidth, object.rightWidth, object.topHeight, v),
  radius: (object: Phaser.GameObjects.Rectangle | Phaser.GameObjects.Arc) => {
    if ('setRounded' in object)
      return (v: number) => (object as Phaser.GameObjects.Rectangle).setRounded(v)
    return (v: number) => (object as Phaser.GameObjects.Arc).radius = v
  },
  displayWidth: (object: Phaser.GameObjects.Components.Size) => (v: number) => object.setDisplaySize(v, object.displayHeight),
  displayHeight: (object: Phaser.GameObjects.Components.Size) => (v: number) => object.setDisplaySize(object.displayWidth, v),
  displayOriginX: (object: Phaser.GameObjects.Components.Origin) => (v: number) => object.setDisplayOrigin(v, object.displayOriginY),
  displayOriginY: (object: Phaser.GameObjects.Components.Origin) => (v: number) => object.setDisplayOrigin(object.displayOriginX, v),
  dropZone: (object: GameObject) => (v: boolean) => {
    if (!v)
      return
    if (!object.input)
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
  alpha: (object: Phaser.GameObjects.Components.Alpha) => {
    if (object.setAlpha)
      return (v: number) => object.setAlpha(v)
    return (v: number) => object.alpha = v
  },
  blendMode: (object: (Phaser.GameObjects.Components.BlendMode) | Phaser.Filters.Vignette) => {
    if ('setBlendMode' in object)
      return (v: number) => object.setBlendMode(v)
    return (v: number) => object.blendMode = v
  },
  lighting: (object: Phaser.GameObjects.Components.Lighting) => (v: boolean) => object.setLighting(v),
  intensity: (object: Phaser.GameObjects.Light | Phaser.Filters.Shadow) => {
    if ('setIntensity' in object)
      return (v: number) => object.setIntensity(v)
    return (v: number) => object.intensity = v
  },
  tint: (object: Phaser.GameObjects.Components.Tint) => (v: number) => object.setTint(v),
  text: (object: Phaser.GameObjects.Text | Phaser.GameObjects.BitmapText) => (v: string | string[]) => object.setText(v),
  texture: (object: Phaser.GameObjects.Components.Texture) => {
    if (object.setTexture)
      return (v: string) => object.setTexture(v, object.frame && (object.frame as Phaser.Textures.Frame).name)
    return (v: string) => (object as any).texture = v
  },
  frame: (object: Phaser.GameObjects.Components.Texture) => (v: string | number) => object.setFrame(v),
  color: (object: Phaser.GameObjects.Light | Phaser.Filters.Vignette) => (v: number) => object.setColor(v),
  fillColor: (object: Phaser.GameObjects.Shape) => (v: number) => object.setFillStyle(v, object.fillAlpha),
  fillAlpha: (object: Phaser.GameObjects.Shape) => (v: number) => object.setFillStyle(object.fillColor, v),
  lineWidth: (object: Phaser.GameObjects.Shape | Phaser.GameObjects.Line) => {
    if ('setLineWidth' in object)
      return (start: number, end: number) => object.setLineWidth(start, end)
    if (object.setStrokeStyle)
      return (v: number) => object.setStrokeStyle(...(!v ? [] : [v, object.strokeColor, object.strokeAlpha]))
    return (v: number) => object.lineWidth = v
  },
  strokeColor: (object: Phaser.GameObjects.Shape) => (v: number) => object.setStrokeStyle(object.lineWidth, v, object.strokeAlpha),
  strokeAlpha: (object: Phaser.GameObjects.Shape) => (v: number) => object.setStrokeStyle(object.lineWidth, object.strokeColor, v),
  style: (object: Phaser.GameObjects.Text) => (v: Phaser.Types.GameObjects.Text.TextStyle) => object.setStyle(v),
  lineSpacing: (object: Phaser.GameObjects.Text) => (v: number) => object.setLineSpacing(v),
  padding: (object: Phaser.GameObjects.Text) => (v: number | Phaser.Types.GameObjects.Text.TextPadding) => object.setPadding(v),
  collision: (object: Phaser.Tilemaps.TilemapLayer) => (v: number | any[]) => object.setCollision(v),
  collisionByProperty: (object: Phaser.Tilemaps.TilemapLayer) => (v: object) => object.setCollisionByProperty(v),
  play: (object: Phaser.GameObjects.Sprite) => (v: string) => v ? object.play(v) : object.stop(),
  scrollFactor: (object: Phaser.GameObjects.Components.ScrollFactor) => (v: number) => object.setScrollFactor(v),
  scrollFactorX: (object: Phaser.GameObjects.Components.ScrollFactor) => (v: number) => object.setScrollFactor(v, object.scrollFactorY),
  scrollFactorY: (object: Phaser.GameObjects.Components.ScrollFactor) => (v: number) => object.setScrollFactor(object.scrollFactorX, v),
  cullPadding: (object: Phaser.Tilemaps.TilemapLayer) => (v: number) => object.setCullPadding(v, v),
  cullPaddingX: (object: Phaser.Tilemaps.TilemapLayer) => (v: number) => object.setCullPadding(v, object.cullPaddingY),
  cullPaddingY: (object: Phaser.Tilemaps.TilemapLayer) => (v: number) => object.setCullPadding(object.cullPaddingX, v),
  // Body
  enable: (body: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody) => (v: boolean) => body.enable = v,
  immovable: (body: Phaser.Physics.Arcade.Body) => (v: boolean) => body.setImmovable(v),
  moves: (body: Phaser.Physics.Arcade.Body) => (v: boolean) => body.moves = v,
  bounceX: (body: Phaser.Physics.Arcade.Body) => (v: number) => body.setBounceX(v),
  bounceY: (body: Phaser.Physics.Arcade.Body) => (v: number) => body.setBounceY(v),
  drag: (body: Phaser.Physics.Arcade.Body) => (v: number) => body.setDrag(v),
  dragX: (body: Phaser.Physics.Arcade.Body) => (v: number) => body.setDragX(v),
  dragY: (body: Phaser.Physics.Arcade.Body) => (v: number) => body.setDragY(v),
  gravityX: (body: Phaser.Physics.Arcade.Body) => (v: number) => body.setGravityX(v),
  gravityY: (body: Phaser.Physics.Arcade.Body) => (v: number) => body.setGravityY(v),
  frictionX: (body: Phaser.Physics.Arcade.Body) => (v: number) => body.setFrictionX(v),
  frictionY: (body: Phaser.Physics.Arcade.Body) => (v: number) => body.setFrictionY(v),
  velocityX: (body: Phaser.Physics.Arcade.Body, emit?: (event: string, value: number) => void) => {
    if (emit) {
      return defineVModelProperty(body.velocity, 'velocityX', emit, 'x')
    }
    else {
      return (v: number) => body.setVelocityX(v)
    }
  },
  velocityY: (body: Phaser.Physics.Arcade.Body, emit?: (event: string, value: number) => void) => {
    if (emit) {
      return defineVModelProperty(body.velocity, 'velocityY', emit, 'y')
    }
    else {
      return (v: number) => body.setVelocityY(v)
    }
  },
  maxVelocityX: (body: Phaser.Physics.Arcade.Body) => (v: number) => body.setMaxVelocityX(v),
  maxVelocityY: (body: Phaser.Physics.Arcade.Body) => (v: number) => body.setMaxVelocityY(v),
  accelerationX: (body: Phaser.Physics.Arcade.Body) => (v: number) => body.setAccelerationX(v),
  accelerationY: (body: Phaser.Physics.Arcade.Body) => (v: number) => body.setAccelerationY(v),
  offsetX: (object: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody) => {
    return (v: number) => object.setOffset(v, object.offset.y)
  },
  offsetY: (object: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody) => {
    return (v: number) => object.setOffset(object.offset.x, v)
  },
  collideWorldBounds: (body: Phaser.Physics.Arcade.Body) => (v: boolean) => body.collideWorldBounds = v,
  // Tween
  tween: (object: GameObject, emit?: (event: string, value: undefined) => void) => {
    return makeTweenRepository((tweenConfig: TweenConfig) => {
      const tween = object.scene.add.tween(Object.assign({ targets: object }, tweenConfig))
      if (emit)
        tween.on('complete', () => emit('update:tween', undefined))
      return tween
    })
  },
  tweens: (object: GameObject, emit?: (event: string, value: undefined) => void) => {
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
  timeline: (object: GameObject, emit?: (event: string, value: undefined) => void) => {
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
  // FX setters
  quality: (filter: Phaser.Filters.Blur | Phaser.Filters.Glow) => (v: number) => {
    isWritable(filter, 'quality') && ((filter as Phaser.Filters.Blur).quality = v)
  },
  steps: (filter: Phaser.Filters.Blur) => (v: number) => filter.steps = v,
  strength: (filter: Phaser.Filters.Blur | Phaser.Filters.Vignette) => (v: number) => filter.strength = v,
  outerStrength: (filter: Phaser.Filters.Glow) => (v: number) => filter.outerStrength = v,
  innerStrength: (filter: Phaser.Filters.Glow) => (v: number) => filter.innerStrength = v,
  knockout: (filter: Phaser.Filters.Glow) => (v: boolean) => filter.knockout = v,
  decay: (filter: Phaser.Filters.Shadow) => (v: number) => filter.decay = v,
  power: (filter: Phaser.Filters.Shadow) => (v: number) => filter.power = v,
  samples: (filter: Phaser.Filters.Shadow) => (v: number) => filter.samples = v,
  amount: (filter: Phaser.Filters.Barrel | Phaser.Filters.Bokeh | Phaser.Filters.Pixelate) => (v: number) => filter.amount = v,
  contrast: (filter: Phaser.Filters.Bokeh | Phaser.Filters.ColorMatrix) => {
    if ('colorMatrix' in filter)
      return (v: number) => filter.colorMatrix.contrast(v)
    return (v: number) => filter.contrast = v
  },
  progress: (filter: Phaser.Filters.Wipe) => (v: number) => filter.progress = v,
  reveal: (filter: Phaser.Filters.Wipe) => (v: number) => filter.reveal = v,
  wipeWidth: (filter: Phaser.Filters.Wipe) => (v: number) => filter.wipeWidth = v,
  direction: (filter: Phaser.Filters.Wipe) => (v: number) => filter.direction = v,
  axis: (filter: Phaser.Filters.Wipe) => (v: number) => filter.axis = v,
  // ColorMatrix methods
  brightness: (object: Phaser.Filters.ColorMatrix) => (v: number) => v !== undefined && object.colorMatrix.brightness(v, false),
  saturate: (object: Phaser.Filters.ColorMatrix) => (v: number) => v !== undefined && object.colorMatrix.saturate(v, false),
  desaturate: (object: Phaser.Filters.ColorMatrix) => (v: boolean) => v && object.colorMatrix.desaturate(false),
  hue: (object: Phaser.Filters.ColorMatrix) => (v: number) => v !== undefined && object.colorMatrix.hue(v, false),
  grayscale: (object: Phaser.Filters.ColorMatrix) => (v: number) => v !== undefined && object.colorMatrix.grayscale(v, false),
  blackWhite: (object: Phaser.Filters.ColorMatrix) => (v: boolean) => v && object.colorMatrix.blackWhite(false),
  negative: (object: Phaser.Filters.ColorMatrix) => (v: boolean) => v && object.colorMatrix.negative(false),
  desaturateLuminance: (object: Phaser.Filters.ColorMatrix) => (v: boolean) => v && object.colorMatrix.desaturateLuminance(false),
  sepia: (object: Phaser.Filters.ColorMatrix) => (v: boolean) => v && object.colorMatrix.sepia(false),
  night: (object: Phaser.Filters.ColorMatrix) => (v: number) => v !== undefined && object.colorMatrix.night(v, false),
  lsd: (object: Phaser.Filters.ColorMatrix) => (v: boolean) => v && object.colorMatrix.lsd(false),
  brown: (object: Phaser.Filters.ColorMatrix) => (v: boolean) => v && object.colorMatrix.brown(false),
  vintagePinhole: (object: Phaser.Filters.ColorMatrix) => (v: boolean) => v && object.colorMatrix.vintagePinhole(false),
  kodachrome: (object: Phaser.Filters.ColorMatrix) => (v: boolean) => v && object.colorMatrix.kodachrome(false),
  technicolor: (object: Phaser.Filters.ColorMatrix) => (v: boolean) => v && object.colorMatrix.technicolor(false),
  polaroid: (object: Phaser.Filters.ColorMatrix) => (v: boolean) => v && object.colorMatrix.polaroid(false),
  shiftToBGR: (object: Phaser.Filters.ColorMatrix) => (v: boolean) => v && object.colorMatrix.shiftToBGR(false),
}
function makeTweenRepository<T>(callback: (data: T) => Phaser.Tweens.Tween | Phaser.Time.Timeline) {
  let prevTween: Phaser.Tweens.Tween | Phaser.Time.Timeline | undefined
  return (data: T | undefined) => {
    if (prevTween)
      prevTween.stop()
    prevTween = data ? callback(data) : undefined
  }
}
