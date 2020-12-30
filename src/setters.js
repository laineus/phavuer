const fixSize = object => {
  if (object.input) {
    object.input.hitArea.setSize(object.width, object.height)
  } else if (object._events.pointerdown || object._events.pointerup) {
    object.setInteractive()
  }
  if (object.body) object.body.setSize(object.width, object.height)
}
export default {
  active: object => v => object.setActive(v),
  visible: object => v => object.setVisible(v),
  x: object => v => object.setPosition(v, object.y),
  y: object => v => object.setPosition(object.x, v),
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
  tint: object => v => object.setTint(v),
  text: object => v => object.setText(v),
  texture: object => v => object.setTexture(v),
  frame: object => v => object.setFrame(v),
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
  collision: object => v => object.setCollision(v)
}
