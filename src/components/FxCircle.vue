<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    throw new Error('FxCircle is not supported in Phaser v4. Use Phaser.Actions.AddMaskShape() instead.')
  },
})
</script>

<template>
  <slot />
</template>
