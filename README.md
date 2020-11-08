# Phavuer

[![Phaser 3.x](https://img.shields.io/badge/Phaser-3.x-brightgreen.svg)](https://github.com/photonstorm/phaser)
[![Vue 3.x](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/v2/guide/)
[![npm](https://img.shields.io/npm/v/phavuer.svg)](https://www.npmjs.com/package/phavuer)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/laineus/phavuer/blob/master/LICENSE)

![ScreenShot](ss.png)

Phavuer is reactive template engine based on [Vue 3](https://github.com/vuejs/vue-next) for [Phaser 3](https://github.com/photonstorm/phaser).  
It makes building components easier.

- [Phavuer vs Phaser's plane API](https://codepen.io/laineus/pen/pobgxdE?editors=0010) - Source code of an example UI that written in both of them.
- [Phavuer Example Game](https://github.com/laineus/phavuer-example) - Source code of simple shooter that written in Phavuer

\*\*\* **Attention** \*\*\*

- This is still WIP.
- I am not sure if this affect to the performance.
- If you use Phavuer, the source code is supposed to be quite different from plain Phaser.  
So please keep in mind that you can not switch the way easily.

However, I am keep going to use this for make my game.  
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
import MyCustomComponent from './MyCustomComponent'
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

How setting up a component is also same. ([doc](https://composition-api.vuejs.org/api.html#setup))

**index.js:**

```js
import { createPhavuerApp } from 'phavuer'
import MainScene from './MainScene'
new Phaser.Game({
  ..
  scene: {
    create () {
      createPhavuerApp(this.game, MainScene)
    }
  }
})
```
# Installation

## CDN

In addition to Phaser 3, Vue 3 is needed.  
Phavuer must be placed below them.

```html
<script src="https://unpkg.com/phaser@3.24.1/dist/phaser.min.js"></script>
<script src="https://unpkg.com/vue@3.0.0/dist/vue.global.prod.js"></script>
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
new Phaser.Game({
  ..
  scene: {
    create () {
      createPhavuerApp(this.game, MainScene)
    }
  }
})
```

## Webpack

Install Vue 3 and Phavuer:

```bash
$ yarn add vue@^3 phavuer
```

These packages are also necessary to compile:

```bash
$ yarn add -D @vue/compiler-sfc vue-loader@^16
```

Following option should be merged into your `webpack.config.js`:

```js
const { VueLoaderPlugin } = require('vue-loader')
module.exports = () => ({
  // Make webpack able to compile '.vue' files with 'vue-loader'
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  // Make webpack able to import '.vue' files without extension
  resolve: {
    extensions: ['.js', '.vue']
  },
  ...
})
```

# API

## Methods

### `createPhavuerApp(gameInstance, rootComponent)`

Parameters:

`gameInstance`: Game instance of Phaser
`rootComponent`: Root Vue component

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
- An event for `preUpdate` can be defined with `@update`
  - The arguments are `(GameObject, time, delta)`
- Almost all props names are following the property names of its GameObject

Currently Phavuer has following base components:

- Container
- Image
- Sprite
- Text
- Rectangle
- RoundRectangle
- Circle
- Zone
- StaticTilemapLayer
- DynamicTilemapLayer

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
- Able to set an event for its preUpdate with `@update`

Parameters:

- `gameObject`: Phaser 3 GameObject instance
- `props`: Vue 3 props
- `context`: Vue 3 context

It is used to define Base Components. ([like this](https://github.com/laineus/phavuer/tree/master/src/components/Sprite.js))

If you just want to use your component in your another component, you don't need this method.  
For such a case, you just need to relay props to default components.
