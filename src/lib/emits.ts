import type * as Phaser from 'phaser'
import type { TimelineConfig, TweenConfig } from '../types'

export interface CreateOnlyEmits<T> {
  create: [gameObject: T]
}

export interface FxEmits<T = Phaser.Filters.Controller> {
  create: [fx: T]
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
