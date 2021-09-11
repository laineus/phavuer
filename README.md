# Phavuer

[![Phaser 3.x](https://img.shields.io/badge/Phaser-3.x-green.svg?style=for-the-badge)](https://github.com/photonstorm/phaser)
[![Vue 3.x](https://img.shields.io/badge/Vue-3.x-green.svg?style=for-the-badge)](https://github.com/vuejs/vue-next)
[![npm](https://img.shields.io/npm/v/phavuer.svg?style=for-the-badge)](https://www.npmjs.com/package/phavuer)
[![license](https://img.shields.io/github/license/laineus/phavuer.svg?style=for-the-badge&color=blue)](https://github.com/laineus/phavuer/blob/master/LICENSE)

![Phavuer](logo.png)  
![ScreenShot](ss.png)

Phavuer is a wrapper library for [Phaser 3](https://github.com/photonstorm/phaser) with [Vue 3](https://github.com/vuejs/vue-next).  
It makes able to develop games with declarative rendering.

- [Phavuer vs Phaser's plane API](https://codepen.io/laineus/pen/pobgxdE?editors=0010) - A Compilation by example UI.
- [Phavuer Example Shooter](https://github.com/laineus/phavuer-example) - A simple shooter that written in Phavuer.
- [Phavuer RPG Example](https://github.com/laineus/phavuer-rpg-example) - An RPG example (This is just a usage example. Not a completed Game.)
- ["The Dream Libra had"](https://github.com/laineus/libra) - An RPG made with Phavuer (Completed project and published on Steam).

\*\*\* **Attention** \*\*\*

- This is still WIP.
- I am not sure the performance, but it is never be faster than plain Phaser.
- If you use Phavuer, the source code will be quite different from plain Phaser. keep in mind that you can not switch the way easily.

However, I am keep going to use it for make own game.  
Feel free to contribute.

# Usage example

**MainScene.vue:**

```vue
<template>
  <Scene name="MainScene">
    <Text @pointerdown="onClick" text="Add a Rectangle" />
    <Container v-for="(n, i) in count" :key="i" :x="i * 130" :y="30">
      <Rectangle :width="120" :height="30" :origin="0" :fillColor="0x333333" />
      <Text :x="60" :y="15" :origin="0.5" :text="`Rectangle-${n}`" />
      <MyCustomComponent />
    </Container>
  </Container>
</template>

<script>
import { Scene, Container, Rectangle, Text } from 'phavuer'
import { ref } from 'vue'
import MyCustomComponent from './MyCustomComponent.vue'
export default {
  components: { Scene, Container, Rectangle, Text, MyCustomComponent },
  setup () {
    const count = ref(1)
    const onClick = () => count.value++
    return { count, onClick }
  }
}
</script>
```

The template syntax follows Vue 3 as it is. ([doc](https://v3.vuejs.org/guide/template-syntax.html))  
There are no orignal syntax.

Phaser3's GameObjects and its properties can be used as components and its props.
They are following the original names, [Phaser3's document](https://photonstorm.github.io/phaser3-docs/) can be used as is.

# Installation

## CDN

In addition to Phaser 3, Vue 3 is needed.  
Phavuer must be placed below them.

```html
<script src="https://unpkg.com/phaser@3.50.1/dist/phaser.min.js"></script>
<script src="https://unpkg.com/vue@3.0.4/dist/vue.global.prod.js"></script>
<script src="https://unpkg.com/phavuer/dist/phavuer.min.js"></script>
```

```js
const { Scene } = Phavuer
const MainScene = {
  components: { Scene },
  template: '<Scene>...</Scene>',
  setup () {
    return {}
  }
}
const vueApp = Vue.createApp(MainScene)
new Phaser.Game({
  ..
  scene: {
    create () {
      createPhavuerApp(this.game, vueApp)
    }
  }
})
```

## Vite

([Vite](https://github.com/vitejs/vite))

```bash
$ yarn add phavuer phaser vue@next
```

```bash
$ yarn add -D vite @vitejs/plugin-vue @vue/compiler-sfc @rollup/plugin-replace
```

`vite.config.js`

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import replace from '@rollup/plugin-replace'

export default defineConfig({
  plugins: [
    vue(),
    replace({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    })
  ]
})
```

`index.html`

```
..
<!-- Don't forget type="module" -->
<script type="module" src="./index.js"></script>
..
```

`index.js`

```js
import { createApp } from 'vue'
import { createPhavuerApp } from 'phavuer'
import MainScene from './MainScene.vue'
const vueApp = createApp(MainScene)
new Phaser.Game({
  ..
  scene: {
    create () {
      createPhavuerApp(this.game, vueApp)
    }
  }
})
```

# API

## Methods

### `createPhavuerApp(gameInstance, vueApp)`

Parameters:

`gameInstance`: Game instance of Phaser
`vueApp`: Vue application that generated from `createApp` of vue

Return value:

App instance of Vue

### `refTo(value, key)`

Parameters:

`value`: Initial value
`key`: Key string of what property of given new value should be set

Return value:

Instance of `CustomRefImpl`

Usage:

Can be used to get such as a GameObject easily.

```js
const rectangle = refTo(null, 'object')
```

```vue
<Rectangle ref="rectangle">
```

### `refObj(value)`

A sugar function for `refTo(value, 'object')`

### `refScene(value)`

A sugar function for `refTo(value, 'scene')`

### `onPreUpdate(event)`

A method to register an event on pre update of the scene.

### `onPostUpdate(event)`

A method to register an event on post update of the scene.

## Components

### `Scene`

`Scene` component is used for make your scene component.

Props:

- `name`: (String) Scene name
- `autoStart`: (Boolean) Scene is started immediately if `true`

The name can be received from props, so you can use it as is: `<Scene :name="props.name">`

Events:

- `init (scene, data)`
- `create (scene, data)`
- `update (scene, time, delta)`
- `preload (scene)`

Properties:

- `scene` Scene object

If you want to handle multi scenes, root component supposed to be like this:

```vue
<template>
  <GameScene />
  <UIScene />
</template>

<script>
import GameScene from './GameScene'
import UIScene from './UIScene'
export default {
  components: { GameScene, UIScene }
}
</script>
```

### Base Components

Base Components are basic components for each Phaser 3's GameObjects such as `Sprite` or `Rectangle`.

You can use them like this: `<Rectangle :x="0" :y="0" :width="10" :height="10" />`

- Basic components return instance of its GameObject in key name `object`
  - So you can get it with a ref like this: `<Rectangle ref="el" />` + `el.value.object` (from outside: `el.object`)
- An event for object created can be defined with `@create`
  - The argument is `(GameObject)`
- Almost all props names are following the property names of its GameObject
- A Tween for the object can be defined with `:tween`
  - `targets` of the options will be set automatically
  - The Tween will be removed automatically before the object destroyed

Currently Phavuer has following base components:

- Container
- Image
- Sprite
- Text
- Rectangle
- RoundRectangle
- Circle
- Line
- Zone
- TilemapLayer
- Light
- StaticBody
- Body

If you want to use another GameObjects, plase make an issue or MR.  
Also you can make base components just in your project. ([refer](https://github.com/laineus/phavuer/tree/master/src/components))

## Methods (for contributers)

### `initGameObject(gameObject, props, context)`

This method gives following features to the given gameObject:

- Having reactivity for given props such as `x` or `y` ([see all](https://github.com/laineus/phavuer/tree/master/src/setters.js))
- Appended to the parent Container automatically if it exists
- Appended to the Scene automatically if parent Container not exists
- Destroyedautomatically when the component is unmounted
- Able to set interactive events such as `@pointerup`
- Able to set an event for on create `@create`

Parameters:

- `gameObject`: Phaser 3 GameObject instance
- `props`: Vue 3 props
- `context`: Vue 3 context

It is used to define Base Components. ([like this](https://github.com/laineus/phavuer/tree/master/src/components/Sprite.js))

If you just want to use your component in your another component, you don't need this method.  
For such a case, you just need to relay props to default components.
