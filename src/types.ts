import type * as Phaser from 'phaser'

type WithoutIndexSignature<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K]
}

export interface TweenConfig extends Omit<WithoutIndexSignature<Phaser.Types.Tweens.TweenBuilderConfig>, 'targets'> {
  [key: string]: any
}

export interface TimelineConfig extends Omit<Phaser.Types.Time.TimelineEventConfig, 'tween'> {
  tween?: TweenConfig | Phaser.Types.Tweens.TweenChainBuilderConfig | Phaser.Tweens.Tween | Phaser.Tweens.TweenChain
}
