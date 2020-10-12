<template>
  <div>
    <component ref="app" :is="name" v-for="name in componentNames" :key="name" :name="name" />
  </div>
</template>

<script>
import { ref, inject } from 'vue'
export default {
  setup () {
    return {
      componentNames: inject('componentNames'),
      app: ref(null)
    }
  }
}
</script>
