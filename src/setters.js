export default {
  active: object => v => object.setActive(v),
  visible: object => v => object.setVisible(v),
  x: object => v => object.setPosition(v, object.y),
  y: object => v => object.setPosition(object.x, v),
  origin: object => v => object.setOrigin(v, v),
  originX: object => v => object.setOrigin(v, object.originY),
  originY: object => v => object.setOrigin(object.originX, v),
  scale: object => v => object.setScale(v, v),
  scaleX: object => v => object.setScale(v, object.scaleY),
  scaleY: object => v => object.setScale(object.scaleX, v),
  width: object => v => {
    object.setSize(v, object.height)
    if (object.input) object.input.hitArea.setSize(v, object.height)
    if (object.body) object.body.setSize(v, object.height)
  },
  height: object => v => {
    object.setSize(object.width, v)
    if (object.input) object.input.hitArea.setSize(object.width, v)
    if (object.body) object.body.setSize(object.width, v)
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
  tint: object => v => object.setTint(v),
  text: object => v => object.setText(v),
  texture: object => v => object.setTexture(v),
  frame: object => v => object.setFrame(v),
  fillColor: object => v => object.setFillStyle(v, object.fillAlpha),
  fillAlpha: object => v => object.setFillStyle(object.fillColor, v),
  lineWidth: object => v => object.setStrokeStyle(...(!v ? [] : [v, object.strokeColor, object.strokeAlpha])),
  strokeColor: object => v => object.setStrokeStyle(object.lineWidth, v, object.strokeAlpha),
  strokeAlpha: object => v => object.setStrokeStyle(object.lineWidth, object.strokeColor, v),
  style: object => v => object.setStyle(v),
  collision: object => v => object.setCollision(v)
}
