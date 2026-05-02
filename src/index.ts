import type { InjectionKey } from 'vue'
import type { UpdateEventHandler } from './components/Scene.vue'
import { customRef, inject, onBeforeUnmount } from 'vue'
import Body from './components/Body.vue'
import Circle from './components/Circle.vue'
import Container from './components/Container.vue'
import FxBarrel from './components/FxBarrel.vue'
import FxBloom from './components/FxBloom.vue'
import FxBlur from './components/FxBlur.vue'
import FxBokeh from './components/FxBokeh.vue'
import FxCircle from './components/FxCircle.vue'
import FxColorMatrix from './components/FxColorMatrix.vue'
import FxDisplacement from './components/FxDisplacement.vue'
import FxGlow from './components/FxGlow.vue'
import FxGradient from './components/FxGradient.vue'
import FxPixelate from './components/FxPixelate.vue'
import FxShadow from './components/FxShadow.vue'
import FxShine from './components/FxShine.vue'
import FxVignette from './components/FxVignette.vue'
import FxWipe from './components/FxWipe.vue'
import Game from './components/Game.vue'
import Image from './components/Image.vue'
import Light from './components/Light.vue'
import Line from './components/Line.vue'
import NineSlice from './components/NineSlice.vue'
import Polygon from './components/Polygon.vue'
import Rectangle from './components/Rectangle.vue'
import RenderTexture from './components/RenderTexture.vue'
import RoundRectangle from './components/RoundRectangle.vue'
import Scene from './components/Scene.vue'
import Sprite from './components/Sprite.vue'
import StaticBody from './components/StaticBody.vue'
import Text from './components/Text.vue'
import TilemapLayer from './components/TilemapLayer.vue'
import Triangle from './components/Triangle.vue'
import Zone from './components/Zone.vue'
import { InjectionKeys, PrivateInjectionKeys } from './lib/provider'

function useInject<T>(key: InjectionKey<T>) {
  return () => {
    const obj = inject(key)
    if (!obj)
      throw new Error(`${String(key)} is not provided`)
    return obj
  }
}

const useGame = useInject(InjectionKeys.Game)
const useScene = useInject(InjectionKeys.Scene)

function refTo<T>(value: T, key: string) {
  return customRef<T>((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        if (value && newValue)
          return
        // @ts-expect-error ts(7053)
        value = newValue ? newValue[key] : null
        trigger()
      },
    }
  })
}
const refPhaserInstance = <T>(value: T | null) => refTo(value, 'phaserInstance')

function getRegisterUpdateEvent(symbol: InjectionKey<UpdateEventHandler[]>) {
  return (e: UpdateEventHandler) => {
    const eventList = inject(symbol)!
    eventList.push(e)
    onBeforeUnmount(() => {
      const i = eventList.findIndex(v => v === e)
      eventList.splice(i, 1)
    })
  }
}
const onPreUpdate = getRegisterUpdateEvent(PrivateInjectionKeys.PreUpdateEvents)
const onPostUpdate = getRegisterUpdateEvent(PrivateInjectionKeys.PostUpdateEvents)

export type { TimelineConfig, TweenConfig } from './types'
export * as Phavuer from './types'
export {
  Body,
  Circle,
  Container,
  FxBarrel,
  FxBloom,
  FxBlur,
  FxBokeh,
  FxCircle,
  FxColorMatrix,
  FxDisplacement,
  FxGlow,
  FxGradient,
  FxPixelate,
  FxShadow,
  FxShine,
  FxVignette,
  FxWipe,
  Game,
  Image,
  InjectionKeys,
  Light,
  Line,
  NineSlice,
  onPostUpdate,
  onPreUpdate,
  Polygon,
  Rectangle,
  refPhaserInstance,
  RenderTexture,
  RoundRectangle,
  Scene,
  Sprite,
  StaticBody,
  Text,
  TilemapLayer,
  Triangle,
  useGame,
  useScene,
  Zone,
}
