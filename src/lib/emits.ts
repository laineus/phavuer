import type * as Phaser from 'phaser'
import type { TimelineConfig, TweenConfig } from '../types'
import { GAME_OBJECT_EVENTS, vModelPropsBody, vModelPropsGameObject } from './setters'

const emits = GAME_OBJECT_EVENTS.map(v => v.emit)
const vModelEmits = vModelPropsGameObject.map(key => `update:${key}`)
export const gameObjectEmits = ['create', ...emits, ...vModelEmits]

const vModelEmitsBody = vModelPropsBody.map(key => `update:${key}`)
export const bodyEmits = ['create', ...vModelEmitsBody]

export interface CreateOnlyEmits<T> {
  create: [gameObject: T]
}

export interface BodyEmits<T extends Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody> {
  'create': [body: T]
  'update:velocityX': [value: number]
  'update:velocityY': [value: number]
}

export interface FxEmits<T = Phaser.Filters.Controller> {
  create: [fx: T]
}

export interface SpriteEmits<T extends Phaser.GameObjects.Sprite = Phaser.GameObjects.Sprite> extends GameObjectEmits<T> {
  animationstart: [animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: T, frameKey: string]
  animationupdate: [animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: T, frameKey: string]
  animationrepeat: [animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: T, frameKey: string]
  animationcomplete: [animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: T, frameKey: string]
  animationstop: [animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: T, frameKey: string]
  animationrestart: [animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: T, frameKey: string]
}

export interface GameObjectEmits<T extends Phaser.GameObjects.GameObject = Phaser.GameObjects.GameObject> {
  'create': [gameObject: T]
  'pointerdown': [pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData]
  'pointermove': [pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData]
  'pointerup': [pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData]
  'pointerout': [pointer: Phaser.Input.Pointer, event: Phaser.Types.Input.EventData]
  'pointerover': [pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData]
  'wheel': [pointer: Phaser.Input.Pointer, deltaX: number, deltaY: number, deltaZ: number, event: Phaser.Types.Input.EventData]
  'dragstart': [pointer: Phaser.Input.Pointer, dragX: number, dragY: number]
  'drag': [pointer: Phaser.Input.Pointer, dragX: number, dragY: number]
  'dragend': [pointer: Phaser.Input.Pointer, dragX: number, dragY: number]
  'dragenter': [pointer: Phaser.Input.Pointer, target: Phaser.GameObjects.GameObject]
  'dragover': [pointer: Phaser.Input.Pointer, target: Phaser.GameObjects.GameObject]
  'dragleave': [pointer: Phaser.Input.Pointer, target: Phaser.GameObjects.GameObject]
  'drop': [pointer: Phaser.Input.Pointer, target: Phaser.GameObjects.GameObject]
  'update:x': [value: number]
  'update:y': [value: number]
  'update:tween': [value: TweenConfig]
  'update:tweens': [value: TweenConfig[]]
  'update:timeline': [value: TimelineConfig[]]
}
