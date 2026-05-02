import type { InjectionKey } from 'vue'
import type { UpdateEventHandler } from '../components/Scene.vue'
import { customRef, inject, onBeforeUnmount } from 'vue'
import { InjectionKeys } from './provider'

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
const onPreUpdate = getRegisterUpdateEvent(InjectionKeys.PreUpdateEvents)
const onPostUpdate = getRegisterUpdateEvent(InjectionKeys.PostUpdateEvents)

export {
  onPostUpdate,
  onPreUpdate,
  refPhaserInstance,
  useGame,
  useScene,
}
