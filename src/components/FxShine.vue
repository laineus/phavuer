<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    throw new Error('FxShine is not supported in Phaser v4. Use Phaser.Actions.AddEffectShine() instead.')
  },
})
</script>

<template>
  <slot />
</template>
