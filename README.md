# Phavuer

[![Phaser 3.x](https://img.shields.io/badge/Phaser-3.x-green.svg?style=for-the-badge)](https://github.com/photonstorm/phaser)
[![Vue 3.x](https://img.shields.io/badge/Vue-3.x-green.svg?style=for-the-badge)](https://github.com/vuejs/vue-next)
[![npm](https://img.shields.io/npm/v/phavuer.svg?style=for-the-badge)](https://www.npmjs.com/package/phavuer)
[![license](https://img.shields.io/github/license/laineus/phavuer.svg?style=for-the-badge&color=blue)](https://github.com/laineus/phavuer/blob/master/LICENSE)

![Phavuer](logo.png)

Phavuer is a wrapper library that integrates [Phaser 3](https://github.com/photonstorm/phaser) with [Vue 3](https://github.com/vuejs/vue-next).

It allows you to control Phaser, a JavaScript game engine, through Vue, and enables game development through declarative rendering.

```vue
<script setup>
import { Container, Game, Rectangle, Scene, Text } from 'phavuer'
import { ref } from 'vue'
import MyCustomComponent from './MyCustomComponent.vue'

const gameConfig = { /* ... */ }
const count = ref(1)
const onClick = () => count.value++
</script>

<template>
  <Game :config="gameConfig">
    <Scene name="MainScene">
      <Text text="Add a Rectangle" @pointerdown="onClick" />
      <Container v-for="(n, i) in count" :key="i" :x="i * 130" :y="30">
        <Rectangle :width="120" :height="30" :origin="0" :fill-color="0x333333" />
        <Text :x="60" :y="15" :origin="0.5" :text="`Rectangle-${n}`" />
        <MyCustomComponent />
      </Container>
    </Scene>
  </Game>
</template>
```

# Documentation

- Phavuer https://phavuer.laineus.com
- Phaser3 https://newdocs.phaser.io/docs/3.90.0

# Examples

- Usage samples
  - [Phavuer vs Phaser's plane API](https://codepen.io/laineus/pen/pobgxdE?editors=0010) - A comparison of implementing a sample UI with and without Phavuer.
  - [Phavuer Example Shooter](https://github.com/laineus/phavuer-example) - A simple shooter example.
  - [Phavuer RPG Example](https://github.com/laineus/phavuer-rpg-example) - An RPG-style usage example.
- Games
  - ["The Dream Libra had"](https://github.com/laineus/libra) - An RPG about a girl wandering through a near-death dreamworld.
  - ["Succubus Club"](https://github.com/thomasWajs/succubus-club) - A platform for playing "Vampire: The Eternal Struggle" card game in a web browser. (by [@thomasWajs](https://github.com/thomasWajs))

# Community

- [Discord server](https://discord.gg/W9xJNWQZQv)
