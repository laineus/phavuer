const eventNames = ['pointerdown', 'pointermove', 'pointerup', 'pointerout', 'wheel']
const fixSize = object => {
  if (object.updateDisplayOrigin) {
    object.updateDisplayOrigin()
  }
  if (object.input) {
    object.input.hitArea.setSize(object.width, object.height)
  } else if (object._events && eventNames.some(name => name in object._events)) {
    object.setInteractive()
  }
}

export const deepProps = ['tween', 'tweens', 'timeline', 'style']
export default {
  active: object => v => object.setActive(v),
  visible: object => v => object.setVisible(v),
  x: object => v => object.x = v,
  _x: object => v => object._x = v,
  y: object => v => object.y = v,
  _y: object => v => object._y = v,
  x1: object => v => object.x1 = v,
  y1: object => v => object.y1 = v,
  x2: object => v => object.x2 = v,
  y2: object => v => object.y2 = v,
  rotation: object => v => object.setRotation(v),
  origin: object => v => object.setOrigin(v, v),
  originX: object => v => object.setOrigin(v, object.originY),
  originY: object => v => object.setOrigin(object.originX, v),
  scale: object => v => object.setScale(v, v),
  scaleX: object => v => object.setScale(v, object.scaleY),
  scaleY: object => v => object.setScale(object.scaleX, v),
  width: object => v => {
    object.setSize(v, object.height)
    fixSize(object)
  },
  height: object => v => {
    object.setSize(object.width, v)
    fixSize(object)
  },
  radius: object => v => object.setRadius(v),
  displayWidth: object => v => object.setDisplaySize(v, object.displayHeight),
  displayHeight: object => v => object.setDisplaySize(object.displayWidth, v),
  displayOriginX: object => v => object.setDisplayOrigin(v, object.displayOriginY),
  displayOriginY: object => v => object.setDisplayOrigin(object.displayOriginX, v),
  flipX: object => v => object.setFlipX(v),
  flipY: object => v => object.setFlipY(v),
  depth: object => v => object.setDepth(v),
  alpha: object => v => object.setAlpha(v),
  blendMode: object => v => object.setBlendMode(v),
  pipeline: object => v => object.setPipeline(v),
  intensity: object => v => object.setIntensity(v),
  tint: object => v => object.setTint(v),
  text: object => v => object.setText(v),
  texture: object => v => object.setTexture(v, object.frame && object.frame.name),
  frame: object => v => object.setFrame(v),
  color: object => v => object.setColor(v),
  fillColor: object => v => object.setFillStyle(v, object.fillAlpha),
  fillAlpha: object => v => object.setFillStyle(object.fillColor, v),
  lineWidth: object => (start, end) => {
    if (object.setLineWidth) {
      object.setLineWidth(start, end)
    } else {
      object.setStrokeStyle(...(!start ? [] : [start, object.strokeColor, object.strokeAlpha]))
    }
  },
  strokeColor: object => v => object.setStrokeStyle(object.lineWidth, v, object.strokeAlpha),
  strokeAlpha: object => v => object.setStrokeStyle(object.lineWidth, object.strokeColor, v),
  style: object => v => object.setStyle(v),
  lineSpacing: object => v => object.setLineSpacing(v),
  padding: object => v => object.setPadding(v),
  collision: object => v => object.setCollision(v),
  collisionByProperty: object => v => object.setCollisionByProperty(v),
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
  offsetX: body => v => body.setOffset(v, body.offset.y),
  offsetY: body => v => body.setOffset(body.offset.x, v),
  // Tween
  tween: object => data => {
    if (object.tween) object.tween.stop()
    if (!data) return
    object.tween = object.scene.add.tween(Object.assign({ targets: object }, data))
  },
  tweens: object => data => {
    if (object.tween) object.tween.stop()
    if (!data) return
    object.tween = object.scene.tweens.timeline({ targets: object, tweens: data })
  },
  timeline: object => data => {
    if (object.tween) object.tween.stop()
    if (!data) return
    object.tween = object.scene.tweens.timeline(Object.assign({ targets: object }, data))
  }
}
