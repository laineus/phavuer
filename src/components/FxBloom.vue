<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    throw new Error('FxBloom is not supported in Phaser v4. Use Phaser.Actions.AddEffectBloom() instead.')
  },
})
</script>

<template>
  <slot />
</template>
