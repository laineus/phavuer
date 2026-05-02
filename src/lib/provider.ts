import type { InjectionKey } from 'vue'
import type { UpdateEventHandler } from './components/Scene.vue'

export const InjectionKeys = {
  Game: Symbol('phavuer_game') as InjectionKey<Phaser.Game>,
  Scene: Symbol('phavuer_scene') as InjectionKey<Phaser.Scene | undefined>,
  GameObject: Symbol('phavuer_gameObject') as InjectionKey<Phaser.GameObjects.GameObject | undefined>,
  Container: Symbol('phavuer_container') as InjectionKey<Phaser.GameObjects.Container | undefined>,
}

export const PrivateInjectionKeys = {
  RenderTextureRenderList: Symbol('phavuer_renderTextureRenderList') as InjectionKey<Phaser.GameObjects.GameObject[] | undefined>,
  PreUpdateEvents: Symbol('phavuer_preUpdateEvents') as InjectionKey<UpdateEventHandler[]>,
  PostUpdateEvents: Symbol('phavuer_postUpdateEvents') as InjectionKey<UpdateEventHandler[]>,
}
