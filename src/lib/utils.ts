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

/** Returns the Phaser.Game instance injected from the parent Game component. Must be called inside a component setup context under `<Game>`. */
const useGame = useInject(InjectionKeys.Game)
/** Returns the Phaser.Scene instance injected from the parent Scene component. Must be called inside a component setup context under `<Scene>`. */
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
/** Returns a typed ref for accessing the underlying Phaser instance of a Phavuer component. Assign it to a component's `ref` attribute; after mount, `.value` holds the Phaser game object. */
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
/** Registers a handler to be called on each Scene `preupdate` event. The handler is automatically removed when the calling component is unmounted. */
const onPreUpdate = getRegisterUpdateEvent(InjectionKeys.PreUpdateEvents)
/** Registers a handler to be called on each Scene `postupdate` event. The handler is automatically removed when the calling component is unmounted. */
const onPostUpdate = getRegisterUpdateEvent(InjectionKeys.PostUpdateEvents)

export {
  onPostUpdate,
  onPreUpdate,
  refPhaserInstance,
  useGame,
  useScene,
}
