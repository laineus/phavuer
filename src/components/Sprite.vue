<template>
  <slot />
</template>

<script>
import { defineComponent, provide, inject, getCurrentInstance } from 'vue'
import { initGameObject, InjectionKeys } from '../index.js'
import { gameObjectProps, mapProps } from '../props.js'
import { gameObjectEmits } from '../emits.js'
const SPRITE_EMITS = [
  { attr: 'onAnimationstart', emit: 'animationstart' },
  { attr: 'onAnimationupdate', emit: 'animationupdate' },
  { attr: 'onAnimationrepeat', emit: 'animationrepeat' },
  { attr: 'onAnimationcomplete', emit: 'animationcomplete' },
  { attr: 'onAnimationstop', emit: 'animationstop' },
  { attr: 'onAnimationrestart', emit: 'animationrestart' }
]
export default defineComponent({
  emits: [
    ...gameObjectEmits,
    ...SPRITE_EMITS.map(v => v.emit)
  ],
  props: {
    ...gameObjectProps,
    ...mapProps(
      'texture', 'frame',
      'tint',
      'flipX', 'flipY'
    ),
    play: { type: [String, Object] }
  },
  setup (props, context) {
    const scene = inject(InjectionKeys.Scene)
    const object = new Phaser.GameObjects.Sprite(scene, props.x || 0, props.y || 0, props.texture)
    const currentInstance = getCurrentInstance()
    const definedProps = currentInstance.vnode.props || []
    SPRITE_EMITS.filter(v => v.attr in definedProps).forEach(v => {
      object.on(v.emit, (...args) => {
        context.emit(v.emit, ...args)
      })
    })
    initGameObject(object, props, context)
    provide(InjectionKeys.GameObject, object)
    return { object }
  }
})
</script>
