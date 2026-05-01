import type * as Phaser from 'phaser'
import type { ComponentObjectPropsOptions, DefineComponent, Ref, SetupContext } from 'vue'

export function refTo<T>(value: T, key: string): Ref<T>
export function refObj<T extends Phaser.GameObjects.GameObject>(value: T): Ref<T>
export function refObj<T extends Phaser.GameObjects.GameObject>(): Ref<T | undefined>
export function refScene(value: Phaser.Scene): Ref<Phaser.Scene>
export function refScene(): Ref<Phaser.Scene | undefined>
export function useGame(): Phaser.Game
export function useScene(): Phaser.Scene
export function onPreUpdate(callback: (time: number, delta: number) => any): void
export function onPostUpdate(callback: (time: number, delta: number) => any): void
export function initGameObject(object: Phaser.GameObjects.GameObject, props: Readonly<ComponentObjectPropsOptions>, context: SetupContext): void

type WithoutIndexSignature<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K]
}

declare namespace Phavuer {
  interface TweenConfig extends Omit<WithoutIndexSignature<Phaser.Types.Tweens.TweenBuilderConfig>, 'targets'> {
    [key: string]: any
  }
  interface TimelineConfig extends Omit<Phaser.Types.Time.TimelineEventConfig, 'tween'> {
    tween?: Phavuer.TweenConfig | Phaser.Types.Tweens.TweenChainBuilderConfig | Phaser.Tweens.Tween | Phaser.Tweens.TweenChain
  }
  interface AnimationProps {
    tween?: Phavuer.TweenConfig
    tweens?: Phavuer.TweenConfig[]
    timeline?: Phavuer.TimelineConfig[]
  }
  interface GameObjectProps {
    active?: boolean
    visible?: boolean
    x?: number
    y?: number
    dropZone?: boolean
    tween?: Phavuer.TweenConfig
    tweens?: Phavuer.TweenConfig[]
    timeline?: Phavuer.TimelineConfig[]
    rotation?: number
    origin?: number
    originX?: number
    originY?: number
    displayOriginX?: number
    displayOriginY?: number
    scale?: number
    scaleX?: number
    scaleY?: number
    displayWidth?: number
    displayHeight?: number
    depth?: number
    alpha?: number
    blendMode?: Phaser.BlendModes | string | number
    lighting?: boolean
    scrollFactor?: number
    scrollFactorX?: number
    scrollFactorY?: number
  }
}

type GameObjectEmits<T> = string[] | {
  create: (gameObject: T) => void
  pointerdown: (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => void
  pointermove: (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => void
  pointerup: (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => void
  pointerout: (pointer: Phaser.Input.Pointer, event: Phaser.Types.Input.EventData) => void
  pointerover: (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => void
  wheel: (pointer: Phaser.Input.Pointer, deltaX: number, deltaY: number, deltaZ: number, event: Phaser.Types.Input.EventData) => void
  dragstart: (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => void
  drag: (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => void
  dragend: (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => void
  dragenter: (pointer: Phaser.Input.Pointer, target: Phaser.GameObjects.GameObject) => void
  dragover: (pointer: Phaser.Input.Pointer, target: Phaser.GameObjects.GameObject) => void
  dragleave: (pointer: Phaser.Input.Pointer, target: Phaser.GameObjects.GameObject) => void
  drop: (pointer: Phaser.Input.Pointer, target: Phaser.GameObjects.GameObject) => void
}

export const Game: DefineComponent<{
  config?: Phaser.Types.Core.GameConfig
}, {}, {}, {}, {}, {}, {}, {
  create: (game: Phaser.Game) => void
  ready: (game: Phaser.Game) => void
}>
export const Scene: DefineComponent<{
  name?: string
  autoStart?: boolean
}, {}, {}, {}, {}, {}, {}, {
  init: (scene: Phaser.Scene, data: object) => void
  create: (scene: Phaser.Scene, data: object) => void
  update: (scene: Phaser.Scene, time: number, delta: number) => void
  preload: (scene: Phaser.Scene) => void
}>
type ContainerProps = Omit<Phavuer.GameObjectProps, 'origin' | 'originX' | 'originY' | 'displayOriginX' | 'displayOriginY'> & {
  width?: number
  height?: number
}
export const Container: DefineComponent<ContainerProps, {}, {}, {}, {}, {}, {}, GameObjectEmits<Phaser.GameObjects.Container>>
export const Rectangle: DefineComponent<Phavuer.GameObjectProps & {
  width?: number
  height?: number
  radius?: number
  fillColor?: number
  fillAlpha?: number
  lineWidth?: number
  strokeColor?: number
  strokeAlpha?: number
}, {}, {}, {}, {}, {}, {}, GameObjectEmits<Phaser.GameObjects.Rectangle>>
export const RoundRectangle: DefineComponent<Phavuer.GameObjectProps & {
  width?: number
  height?: number
  radius?: number
  fillColor?: number
  fillAlpha?: number
  lineWidth?: number
  strokeColor?: number
  strokeAlpha?: number
}, {}, {}, {}, {}, {}, {}, GameObjectEmits<Phaser.GameObjects.Graphics>>
export const Triangle: DefineComponent<Phavuer.GameObjectProps & {
  x1?: number
  y1?: number
  x2?: number
  y2?: number
  x3?: number
  y3?: number
  fillColor?: number
  fillAlpha?: number
  lineWidth?: number
  strokeColor?: number
  strokeAlpha?: number
}, {}, {}, {}, {}, {}, {}, GameObjectEmits<Phaser.GameObjects.Triangle>>
export const Circle: DefineComponent<Phavuer.GameObjectProps & {
  radius?: number
  fillColor?: number
  fillAlpha?: number
  lineWidth?: number
  strokeColor?: number
  strokeAlpha?: number
}, {}, {}, {}, {}, {}, {}, GameObjectEmits<Phaser.GameObjects.Arc>>
export const Polygon: DefineComponent<Phavuer.GameObjectProps & {
  points?: number[] | number[][] | Phaser.Math.Vector2[] | Phaser.Types.Math.Vector2Like[]
  fillColor?: number
  fillAlpha?: number
  lineWidth?: number
  strokeColor?: number
  strokeAlpha?: number
}, {}, {}, {}, {}, {}, {}, GameObjectEmits<Phaser.GameObjects.Polygon>>
export const Line: DefineComponent<Phavuer.GameObjectProps & {
  x1?: number
  y1?: number
  x2?: number
  y2?: number
  lineWidth?: number
  strokeColor?: number
  strokeAlpha?: number
}, {}, {}, {}, {}, {}, {}, GameObjectEmits<Phaser.GameObjects.Line>>
export const Image: DefineComponent<Phavuer.GameObjectProps & {
  texture?: string | Phaser.Textures.Texture
  frame?: number | string
  tint?: number
  flipX?: boolean
  flipY?: boolean
}, {}, {}, {}, {}, {}, {}, GameObjectEmits<Phaser.GameObjects.Image>>
export const NineSlice: DefineComponent<Phavuer.GameObjectProps & {
  width?: number
  height?: number
  texture?: string | Phaser.Textures.Texture
  frame?: number | string
  tint?: number
  leftWidth?: number
  rightWidth?: number
  topHeight?: number
  bottomHeight?: number
}, {}, {}, {}, {}, {}, {}, GameObjectEmits<Phaser.GameObjects.NineSlice>>
export const Sprite: DefineComponent<Phavuer.GameObjectProps & {
  texture?: string | Phaser.Textures.Texture
  frame?: number | string
  tint?: number
  flipX?: boolean
  flipY?: boolean
  play?: string | Phaser.Animations.Animation | Phaser.Types.Animations.PlayAnimationConfig
}, {}, {}, {}, {}, {}, {}, GameObjectEmits<Phaser.GameObjects.Sprite> & {
  animationstart: (animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: Phaser.GameObjects.Sprite, frameKey: string) => void
  animationupdate: (animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: Phaser.GameObjects.Sprite, frameKey: string) => void
  animationrepeat: (animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: Phaser.GameObjects.Sprite, frameKey: string) => void
  animationcomplete: (animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: Phaser.GameObjects.Sprite, frameKey: string) => void
  animationstop: (animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: Phaser.GameObjects.Sprite, frameKey: string) => void
  animationrestart: (animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: Phaser.GameObjects.Sprite, frameKey: string) => void
}>
export const Text: DefineComponent<Phavuer.GameObjectProps & {
  text?: string
  style?: Phaser.Types.GameObjects.Text.TextStyle
  lineSpacing?: number
  padding?: number | Phaser.Types.GameObjects.Text.TextPadding
}, {}, {}, {}, {}, {}, {}, GameObjectEmits<Phaser.GameObjects.Text>>
export const TilemapLayer: DefineComponent<Phavuer.GameObjectProps & {
  width?: number
  height?: number
  collision?: number | number[]
  collisionByProperty?: any
  tilemap?: Phaser.Tilemaps.Tilemap
  layerIndex?: number
  tileset?: string | string[] | Phaser.Tilemaps.Tileset | Phaser.Tilemaps.Tileset[]
  cullPadding?: number
  cullPaddingX?: number
  cullPaddingY?: number
}, {}, {}, {}, {}, {}, {}, {
  create: (game: Phaser.Tilemaps.TilemapLayer) => void
}>
type ZoneProps = Omit<Phavuer.GameObjectProps, 'alpha' | 'blendMode'> & {
  width?: number
  height?: number
}
export const Zone: DefineComponent<ZoneProps, {}, {}, {}, {}, {}, {}, GameObjectEmits<Phaser.GameObjects.Text>>
export const Light: DefineComponent<Phavuer.AnimationProps & {
  visible?: boolean
  x?: number
  y?: number
  radius?: number
  color?: number
  intensity?: number
}, {}, {}, {}, {}, {}, {}, {
  create: (game: Phaser.GameObjects.Light) => void
}>
export const StaticBody: DefineComponent<{
  width?: number
  height?: number
  offsetX?: number
  offsetY?: number
  enable?: boolean
}, {}, {}, {}, {}, {}, {}, {
  create: (game: Phaser.Physics.Arcade.StaticBody) => void
}>
export const Body: DefineComponent<{
  width?: number
  height?: number
  offsetX?: number
  offsetY?: number
  enable?: boolean
  immovable?: boolean
  moves?: boolean
  bounceX?: number
  bounceY?: number
  drag?: number
  dragX?: number
  dragY?: number
  gravityX?: number
  gravityY?: number
  frictionX?: number
  frictionY?: number
  velocityX?: number
  velocityY?: number
  maxVelocityX?: number
  maxVelocityY?: number
  accelerationX?: number
  accelerationY?: number
  collideWorldBounds?: boolean
}, {}, {}, {}, {}, {}, {}, {
  create: (game: Phaser.Physics.Arcade.Body) => void
}>
export const FxBlur: DefineComponent<{
  external?: boolean
  quality?: number
  x?: number
  y?: number
  steps?: number
  strength?: number
  color?: number
}, {}, {}, {}, {}, {}, {}, {
  create: (blur: any) => void
}>
export const FxGlow: DefineComponent<{
  external?: boolean
  color?: number
  outerStrength?: number
  innerStrength?: number
  scale?: number
  knockout?: boolean
  quality?: number
  distance?: number
}, {}, {}, {}, {}, {}, {}, {
  create: (glow: any) => void
}>
export const FxShadow: DefineComponent<{
  external?: boolean
  color?: number
  x?: number
  y?: number
  decay?: number
  power?: number
  samples?: number
  intensity?: number
}, {}, {}, {}, {}, {}, {}, {
  create: (shadow: any) => void
}>
export const FxPixelate: DefineComponent<{
  external?: boolean
  amount?: number
}, {}, {}, {}, {}, {}, {}, {
  create: (pixelate: any) => void
}>
export const FxVignette: DefineComponent<{
  external?: boolean
  x?: number
  y?: number
  radius?: number
  strength?: number
  color?: number
  blendMode?: number
}, {}, {}, {}, {}, {}, {}, {
  create: (vignette: any) => void
}>
export const FxBarrel: DefineComponent<{
  external?: boolean
  amount?: number
}, {}, {}, {}, {}, {}, {}, {
  create: (barrel: any) => void
}>
export const FxBokeh: DefineComponent<{
  external?: boolean
  radius?: number
  amount?: number
  contrast?: number
}, {}, {}, {}, {}, {}, {}, {
  create: (bokeh: any) => void
}>
export const FxColorMatrix: DefineComponent<{
  external?: boolean
  brightness?: number
  saturate?: number
  desaturate?: number
  hue?: number
  grayscale?: number
  blackWhite?: boolean
  contrast?: number
  negative?: boolean
  desaturateLuminance?: boolean
  sepia?: boolean
  night?: number
  lsd?: boolean
  brown?: boolean
  vintagePinhole?: boolean
  kodachrome?: boolean
  technicolor?: boolean
  polaroid?: boolean
  shiftToBGR?: boolean
}, {}, {}, {}, {}, {}, {}, {
  create: (colorMatrix: any) => void
}>
export const FxDisplacement: DefineComponent<{
  external?: boolean
  texture?: string
  x?: number
  y?: number
}, {}, {}, {}, {}, {}, {}, {
  create: (displacement: any) => void
}>
export const FxWipe: DefineComponent<{
  external?: boolean
  progress?: number
  wipeWidth?: number
  direction?: number
  axis?: number
  reveal?: number
}, {}, {}, {}, {}, {}, {}, {
  create: (wipe: any) => void
}>
export const RenderTexture: DefineComponent<Phavuer.GameObjectProps & {
  width?: number
  height?: number
}, {}, {}, {}, {}, {}, {}, GameObjectEmits<Phaser.GameObjects.RenderTexture>>
