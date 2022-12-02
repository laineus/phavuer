import * as Phaser from 'phaser'
import { DefineComponent, PropType, App, ComponentPublicInstance, Ref, SetupContext } from 'vue'

export function createPhavuerApp (phaserGameInstance: Phaser.Game, vueAppInstance: App): Promise<ComponentPublicInstance>
export function refTo<T> (value: T, key: string): Ref<T>
export function refObj<T extends Phaser.GameObjects.GameObject> (value: T | null): Ref<T | null>
export function refScene (value: Phaser.Scene | null): Ref<Phaser.Scene | null>
export function useGame (): Phaser.Game
export function useScene (): Phaser.Scene
export function onPreUpdate (callback: (time: number, delta: number) => any): void
export function onPostUpdate (callback: (time: number, delta: number) => any): void
export function initGameObject (object: Phaser.GameObjects.GameObject, props: Readonly, context: SetupContext): void

declare namespace Phavuer {
  interface TweenConfig extends Partial<Phaser.Types.Tweens.TweenBuilderConfig> {
    targets?: any
  }
  interface AnimationProps {
    tween?: Phavuer.TweenConfig
    tweens?: PropType<Phavuer.TweenConfig[]>
    timeline?: Phaser.Types.Tweens.TimelineBuilderConfig
  }
  interface GameObjectProps {
    visible?: boolean
    x?: number
    y?: number
    tween?: Phavuer.TweenConfig
    tweens?: PropType<Phavuer.TweenConfig[]>
    timeline?: Phaser.Types.Tweens.TimelineBuilderConfig
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
    pipeline?: Phaser.Renderer.WebGL.WebGLPipeline
  }
}

interface GameObjectEmits {
  pointerdown: (pointer: Phaser.Input.Pointer) => void
  pointermove: (pointer: Phaser.Input.Pointer) => void
  pointerup: (pointer: Phaser.Input.Pointer) => void
  pointerout: (pointer: Phaser.Input.Pointer) => void
  pointerover: (pointer: Phaser.Input.Pointer) => void
  wheel: (pointer: Phaser.Input.Pointer) => void
}

export const Scene: DefineComponent<{
  name?: string
  autoStart?: boolean
}, {}, {}, {}, {}, {}, {}, {
  init: (scene: Phaser.Scene, data: object) => void
  create: (scene: Phaser.Scene, data: object) => void
  update: (scene: Phaser.Scene, time: number, delta: number) => void
  preload: (scene: Phaser.Scene) => void
}>
export const Container: DefineComponent<Phavuer.GameObjectProps, {}, {}, {}, {}, {}, {}, GameObjectEmits>
export const Rectangle: DefineComponent<Phavuer.GameObjectProps & {
  width?: number
  height?: number
  fillColor?: number
  fillAlpha?: number
  lineWidth?: number
  strokeColor?: number
  strokeAlpha?: number
}, {}, {}, {}, {}, {}, {}, GameObjectEmits>
export const RoundRectangle: DefineComponent<Phavuer.GameObjectProps & {
  width?: number
  height?: number
  radius?: number
  fillColor?: number
  fillAlpha?: number
  lineWidth?: number
  strokeColor?: number
  strokeAlpha?: number
}, {}, {}, {}, {}, {}, {}, GameObjectEmits>
export const Circle: DefineComponent<Phavuer.GameObjectProps & {
  radius?: number
  fillColor?: number
  fillAlpha?: number
  lineWidth?: number
  strokeColor?: number
  strokeAlpha?: number
}, {}, {}, {}, {}, {}, {}, GameObjectEmits>
export const Line: DefineComponent<Phavuer.GameObjectProps & {
  x1?: number
  y1?: number
  x2?: number
  y2?: number
  lineWidth?: number
  strokeColor?: number
  strokeAlpha?: number
}, {}, {}, {}, {}, {}, {}, GameObjectEmits>
export const Image: DefineComponent<Phavuer.GameObjectProps & {
  texture?: string | Phaser.Textures.Texture
  frame?: Phaser.Textures.Frame
  tint?: number
  flipX?: boolean
  flipY?: boolean
}, {}, {}, {}, {}, {}, {}, GameObjectEmits>
export const Sprite: DefineComponent<Phavuer.GameObjectProps & {
  texture?: string | Phaser.Textures.Texture
  frame?: Phaser.Textures.Frame
  tint?: number
  flipX?: boolean
  flipY?: boolean
}, {}, {}, {}, {}, {}, {}, GameObjectEmits>
export const Text: DefineComponent<Phavuer.GameObjectProps & {
  text?: string
  style?: Phaser.Types.GameObjects.Text.TextStyle
  lineSpacing?: number
  padding?: number | Phaser.Types.GameObjects.Text.TextPadding
}, {}, {}, {}, {}, {}, {}, GameObjectEmits>
export const TilemapLayer: DefineComponent<Phavuer.AnimationProps & {
  visible?: boolean
  x?: number
  y?: number
  width?: number
  height?: number
  depth?: number
  pipeline?: Phaser.Renderer.WebGL.WebGLPipeline
  collision?: number | number[]
  collisionByProperty?: any
  tilemap?: Phaser.Tilemaps.Tilemap
  layerIndex?: number
  tileset?: string | string[]
}>
export const Zone: DefineComponent<Phavuer.AnimationProps & {
  active?: boolean
  x?: number
  y?: number
  width?: number
  height?: number
  origin?: number
  originX?: number
  originY?: number
  displayOriginX?: number
  displayOriginY?: number
}>
export const Light: DefineComponent<Phavuer.AnimationProps & {
  visible?: boolean
  x?: number
  y?: number
  radius?: number
  color?: number
  intensity?: number
}>
export const StaticBody: DefineComponent<{
  width?: number
  height?: number
  offsetX?: number
  offsetY?: number
  enable?: boolean
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
}>
