// TypeScript interfaces for Vue component props
interface PropDefinition {
  type: any
}

interface PropsObject {
  active: PropDefinition
  visible: PropDefinition
  x: PropDefinition
  y: PropDefinition
  x1: PropDefinition
  y1: PropDefinition
  x2: PropDefinition
  y2: PropDefinition
  x3: PropDefinition
  y3: PropDefinition
  points: PropDefinition
  rotation: PropDefinition
  origin: PropDefinition
  originX: PropDefinition
  originY: PropDefinition
  scale: PropDefinition
  scaleX: PropDefinition
  scaleY: PropDefinition
  width: PropDefinition
  height: PropDefinition
  leftWidth: PropDefinition
  rightWidth: PropDefinition
  topHeight: PropDefinition
  bottomHeight: PropDefinition
  radius: PropDefinition
  displayWidth: PropDefinition
  displayHeight: PropDefinition
  displayOriginX: PropDefinition
  displayOriginY: PropDefinition
  dropZone: PropDefinition
  flipX: PropDefinition
  flipY: PropDefinition
  depth: PropDefinition
  alpha: PropDefinition
  blendMode: PropDefinition
  pipeline: PropDefinition
  intensity: PropDefinition
  tint: PropDefinition
  text: PropDefinition
  texture: PropDefinition
  frame: PropDefinition
  color: PropDefinition
  fillColor: PropDefinition
  fillAlpha: PropDefinition
  lineWidth: PropDefinition
  strokeColor: PropDefinition
  strokeAlpha: PropDefinition
  style: PropDefinition
  lineSpacing: PropDefinition
  padding: PropDefinition
  collision: PropDefinition
  collisionByProperty: PropDefinition
  play: PropDefinition
  scrollFactor: PropDefinition
  scrollFactorX: PropDefinition
  scrollFactorY: PropDefinition
  // Body
  enable: PropDefinition
  immovable: PropDefinition
  moves: PropDefinition
  bounceX: PropDefinition
  bounceY: PropDefinition
  drag: PropDefinition
  dragX: PropDefinition
  dragY: PropDefinition
  gravityX: PropDefinition
  gravityY: PropDefinition
  frictionX: PropDefinition
  frictionY: PropDefinition
  velocityX: PropDefinition
  velocityY: PropDefinition
  maxVelocityX: PropDefinition
  maxVelocityY: PropDefinition
  accelerationX: PropDefinition
  accelerationY: PropDefinition
  offsetX: PropDefinition
  offsetY: PropDefinition
  collideWorldBounds: PropDefinition
  // Tween
  tween: PropDefinition
  tweens: PropDefinition
  timeline: PropDefinition
}

const props: PropsObject = {
  active: { type: Boolean },
  visible: { type: Boolean },
  x: { type: Number },
  y: { type: Number },
  x1: { type: Number },
  y1: { type: Number },
  x2: { type: Number },
  y2: { type: Number },
  x3: { type: Number },
  y3: { type: Number },
  points: { type: Array },
  rotation: { type: Number },
  origin: { type: Number },
  originX: { type: Number },
  originY: { type: Number },
  scale: { type: Number },
  scaleX: { type: Number },
  scaleY: { type: Number },
  width: { type: Number },
  height: { type: Number },
  leftWidth: { type: Number },
  rightWidth: { type: Number },
  topHeight: { type: Number },
  bottomHeight: { type: Number },
  radius: { type: Number },
  displayWidth: { type: Number },
  displayHeight: { type: Number },
  displayOriginX: { type: Number },
  displayOriginY: { type: Number },
  dropZone: { type: Boolean },
  flipX: { type: Boolean },
  flipY: { type: Boolean },
  depth: { type: Number },
  alpha: { type: Number },
  blendMode: { type: [Number, String] },
  pipeline: { type: [String, Object] },
  intensity: { type: Number },
  tint: { type: Number },
  text: { type: [String, Number] },
  texture: { type: String },
  frame: { type: [Number, String] },
  color: { type: String },
  fillColor: { type: Number },
  fillAlpha: { type: Number },
  lineWidth: { type: Number },
  strokeColor: { type: Number },
  strokeAlpha: { type: Number },
  style: { type: Object },
  lineSpacing: { type: Number },
  padding: { type: [Number, Object] },
  collision: { type: [Number, Array] },
  collisionByProperty: { type: Object },
  play: { type: [String, Object] },
  scrollFactor: { type: Number },
  scrollFactorX: { type: Number },
  scrollFactorY: { type: Number },
  // Body
  enable: { type: Boolean },
  immovable: { type: Boolean },
  moves: { type: Boolean },
  bounceX: { type: Number },
  bounceY: { type: Number },
  drag: { type: Number },
  dragX: { type: Number },
  dragY: { type: Number },
  gravityX: { type: Number },
  gravityY: { type: Number },
  frictionX: { type: Number },
  frictionY: { type: Number },
  velocityX: { type: Number },
  velocityY: { type: Number },
  maxVelocityX: { type: Number },
  maxVelocityY: { type: Number },
  accelerationX: { type: Number },
  accelerationY: { type: Number },
  offsetX: { type: Number },
  offsetY: { type: Number },
  collideWorldBounds: { type: Boolean },
  // Tween
  tween: { type: Object },
  tweens: { type: Array },
  timeline: { type: Object },
}

const propsEntries: [string, PropDefinition][] = Object.entries(props)

export function mapProps(...names: string[]): Record<string, PropDefinition> {
  const nameSet = new Set(names)
  return Object.fromEntries(
    propsEntries.filter(([name]) => nameSet.has(name)),
  )
}

export const gameObjectProps: Record<string, PropDefinition> = mapProps(
  'tween',
  'tweens',
  'timeline',
  'active',
  'visible',
  'x',
  'y',
  'rotation',
  'origin',
  'originX',
  'originY',
  'displayOriginX',
  'displayOriginY',
  'scale',
  'scaleX',
  'scaleY',
  'displayWidth',
  'displayHeight',
  'scrollFactor',
  'scrollFactorX',
  'scrollFactorY',
  'dropZone',
  'depth',
  'alpha',
  'blendMode',
  'pipeline',
)
