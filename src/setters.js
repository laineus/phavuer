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
function fixSize(object) {
  if (object.updateDisplayOrigin) {
    object.updateDisplayOrigin()
  }
  if (object.input) {
    object.input.hitArea.setSize(object.width, object.height)
  }
  else if (object._events && GAME_OBJECT_EVENTS.some(v => v.emit in object._events)) {
    object.setInteractive()
  }
}

function defineVModelProperty(gameObject, key, emit) {
  let rawValue = gameObject[key]
  Object.defineProperty(gameObject, key, {
    get() {
      return rawValue
    },
    set(v) {
      if (rawValue !== v)
        emit(`update:${key}`, v)
    },
  })
  return v => rawValue = v
}

export const deepProps = ['tween', 'tweens', 'timeline', 'style']
export const vModelProps = ['x', 'y', 'tweens', 'tween', 'timeline']
export default {
  active: object => v => object.setActive(v),
  visible: object => v => object.setVisible(v),
  x: (object, emit) => {
    if (emit) {
      return defineVModelProperty(object, 'x', emit)
    }
    else {
      return v => object.x = v
    }
  },
  y: (object, emit) => {
    if (emit) {
      return defineVModelProperty(object, 'y', emit)
    }
    else {
      return v => object.y = v
    }
  },
  x1: object => v => object.geom.x1 = v,
  y1: object => v => object.geom.y1 = v,
  x2: object => v => object.geom.x2 = v,
  y2: object => v => object.geom.y2 = v,
  x3: object => v => object.geom.x3 = v,
  y3: object => v => object.geom.y3 = v,
  points: object => v => object.setTo(v),
  rotation: object => v => object.setRotation(v),
  origin: object => v => object.setOrigin(v, v),
  originX: object => v => object.setOrigin(v, object.originY),
  originY: object => v => object.setOrigin(object.originX, v),
  scale: (object) => {
    if (object.setScale)
      return v => object.setScale(v, v)
    return v => object.scale = v
  },
  scaleX: object => v => object.setScale(v, object.scaleY),
  scaleY: object => v => object.setScale(object.scaleX, v),
  width: object => (v) => {
    object.setSize(v, object.height)
    fixSize(object)
  },
  height: object => (v) => {
    object.setSize(object.width, v)
    fixSize(object)
  },
  leftWidth: object => v => object.setSlices(object.width, object.height, v, object.rightWidth, object.topHeight, object.bottomHeight),
  rightWidth: object => v => object.setSlices(object.width, object.height, object.leftWidth, v, object.topHeight, object.bottomHeight),
  topHeight: object => v => object.setSlices(object.width, object.height, object.leftWidth, object.rightWidth, v, object.bottomHeight),
  bottomHeight: object => v => object.setSlices(object.width, object.height, object.leftWidth, object.rightWidth, object.topHeight, v),
  radius: (object) => {
    if (object.setRounded)
      return v => object.setRounded(v)
    if (object.setRounded)
      return v => object.setRounded(v)
    return v => object.radius = v
  },
  displayWidth: object => v => object.setDisplaySize(v, object.displayHeight),
  displayHeight: object => v => object.setDisplaySize(object.displayWidth, v),
  displayOriginX: object => v => object.setDisplayOrigin(v, object.displayOriginY),
  displayOriginY: object => v => object.setDisplayOrigin(object.displayOriginX, v),
  dropZone: object => (v) => {
    if (!v)
      return
    if (!object.input)
      object.setInteractive()
    object.input.dropZone = v
  },
  flipX: object => v => object.setFlipX(v),
  flipY: object => v => object.setFlipY(v),
  depth: object => (v) => {
    object.setDepth(v)
    if (object.parentContainer) {
      const i = object.parentContainer.list.findIndex(v => v.depth > (object.depth ?? 0))
      i === -1 ? object.parentContainer.bringToTop(object) : object.parentContainer.moveTo(object, Math.max(i - 1, 0))
    }
  },
  alpha: (object) => {
    if (object.setAlpha)
      return v => object.setAlpha(v)
    return v => object.alpha = v
  },
  blendMode: object => v => object.setBlendMode(v),
  pipeline: object => v => object.setPipeline(v),
  intensity: (object) => {
    if (object.setIntensity)
      return v => object.setIntensity(v)
    return v => object.intensity = v
  },
  tint: object => v => object.setTint(v),
  text: object => v => object.setText(v),
  texture: (object) => {
    if (object.setTexture)
      return v => object.setTexture(v, object.frame && object.frame.name)
    return v => object.texture = v
  },
  frame: object => v => object.setFrame(v),
  color: (object) => {
    if (object.setColor)
      return v => object.setColor(v)
    return v => object.color = v
  },
  fillColor: object => v => object.setFillStyle(v, object.fillAlpha),
  fillAlpha: object => v => object.setFillStyle(object.fillColor, v),
  lineWidth: (object) => {
    if (object.setLineWidth)
      return (start, end) => object.setLineWidth(start, end)
    if (object.setStrokeStyle)
      return v => object.setStrokeStyle(...(!v ? [] : [v, object.strokeColor, object.strokeAlpha]))
    return v => object.lineWidth = v
  },
  strokeColor: object => v => object.setStrokeStyle(object.lineWidth, v, object.strokeAlpha),
  strokeAlpha: object => v => object.setStrokeStyle(object.lineWidth, object.strokeColor, v),
  style: object => v => object.setStyle(v),
  lineSpacing: object => v => object.setLineSpacing(v),
  padding: object => v => object.setPadding(v),
  collision: object => v => object.setCollision(v),
  collisionByProperty: object => v => object.setCollisionByProperty(v),
  play: object => v => v ? object.play(v) : object.stop(),
  scrollFactor: object => v => object.setScrollFactor(v),
  scrollFactorX: object => v => object.setScrollFactor(v, object.scrollFactorY),
  scrollFactorY: object => v => object.setScrollFactor(object.scrollFactorX, v),
  cullPadding: object => v => object.setCullPadding(v, v),
  cullPaddingX: object => v => object.setCullPadding(v, object.cullPaddingY),
  cullPaddingY: object => v => object.setCullPadding(object.cullPaddingX, v),
  // Body
  enable: body => v => body.enable = v,
  immovable: body => v => body.setImmovable(v),
  moves: body => v => body.moves = v,
  bounceX: body => v => body.setBounceX(v),
  bounceY: body => v => body.setBounceY(v),
  drag: body => v => body.setDrag(v),
  dragX: body => v => body.setDragX(v),
  dragY: body => v => body.setDragY(v),
  gravityX: body => v => body.setGravityX(v),
  gravityY: body => v => body.setGravityY(v),
  frictionX: body => v => body.setFrictionX(v),
  frictionY: body => v => body.setFrictionY(v),
  velocityX: body => v => body.setVelocityX(v),
  velocityY: body => v => body.setVelocityY(v),
  maxVelocityX: body => v => body.setMaxVelocityX(v),
  maxVelocityY: body => v => body.setMaxVelocityY(v),
  accelerationX: body => v => body.setAccelerationX(v),
  accelerationY: body => v => body.setAccelerationY(v),
  offsetX: (object) => {
    if (object.setOffset)
      return v => object.setOffset(v, object.offset.x)
    return v => object.offsetX = v
  },
  offsetY: (object) => {
    if (object.setOffset)
      return v => object.setOffset(v, object.offset.y)
    return v => object.offsetY = v
  },
  collideWorldBounds: body => v => body.collideWorldBounds = v,
  // Tween
  tween: (object, emit) => {
    return makeTweenRepository((tweenConfig) => {
      const tween = object.scene.add.tween(Object.assign({ targets: object }, tweenConfig))
      if (emit)
        tween.on('complete', () => emit('update:tween', undefined))
      return tween
    })
  },
  tweens: (object, emit) => {
    return makeTweenRepository((tweenConfigs) => {
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
  timeline: (object, emit) => {
    return makeTweenRepository((timelineConfigs) => {
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
  // FX setters
  quality: object => v => object.quality = v,
  steps: object => v => object.steps = v,
  strength: object => v => object.strength = v,
  distance: object => v => object.distance = v,
  outerStrength: object => v => object.outerStrength = v,
  innerStrength: object => v => object.innerStrength = v,
  knockout: object => v => object.knockout = v,
  blurStrength: object => v => object.blurStrength = v,
  decay: object => v => object.decay = v,
  power: object => v => object.power = v,
  samples: object => v => object.samples = v,
  amount: object => v => object.amount = v,
  contrast: object => v => object.contrast = v,
  thickness: object => v => object.thickness = v,
  backgroundColor: object => v => object.backgroundColor = v,
  feather: object => v => object.feather = v,
  color1: object => v => object.color1 = v,
  color2: object => v => object.color2 = v,
  fromX: object => v => object.fromX = v,
  fromY: object => v => object.fromY = v,
  toX: object => v => object.toX = v,
  toY: object => v => object.toY = v,
  size: object => v => object.size = v,
  speed: object => v => object.speed = v,
  gradient: object => v => object.gradient = v,
  reveal: object => v => object.reveal = v,
  wipeWidth: object => v => object.wipeWidth = v,
  direction: object => v => object.direction = v,
  axis: object => v => object.axis = v,
  // ColorMatrix methods
  brightness: object => v => v !== undefined && object.brightness(v, false),
  saturate: object => v => v !== undefined && object.saturate(v, false),
  desaturate: object => v => v !== undefined && object.desaturate(v, false),
  hue: object => v => v !== undefined && object.hue(v, false),
  grayscale: object => v => v !== undefined && object.grayscale(v, false),
  blackWhite: object => v => v && object.blackWhite(false),
  negative: object => v => v && object.negative(false),
  desaturateLuminance: object => v => v && object.desaturateLuminance(false),
  sepia: object => v => v && object.sepia(false),
  night: object => v => v !== undefined && object.night(v, false),
  lsd: object => v => v && object.lsd(false),
  brown: object => v => v && object.brown(false),
  vintagePinhole: object => v => v && object.vintagePinhole(false),
  kodachrome: object => v => v && object.kodachrome(false),
  technicolor: object => v => v && object.technicolor(false),
  polaroid: object => v => v && object.polaroid(false),
  shiftToBGR: object => v => v && object.shiftToBGR(false),
}
function makeTweenRepository(callback) {
  let prevTween
  return (data) => {
    if (prevTween)
      prevTween.stop()
    prevTween = data ? callback(data) : undefined
  }
}
