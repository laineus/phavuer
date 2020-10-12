# Phavuer

[![Phaser 3.x](https://img.shields.io/badge/Phaser-3.x-brightgreen.svg)](https://github.com/photonstorm/phaser)
[![Vue 3.x](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/v2/guide/)
[![npm](https://img.shields.io/npm/v/phavuer.svg)](https://www.npmjs.com/package/phavuer)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/laineus/phavuer/blob/master/LICENSE)

Phavuer is reactive template engine based on Vue 3 for Phaser 3.  
It makes building components of Phaser 3's GameObjects easier.

[Phavuer vs Phaser's plane API](TODO)

# Usage example

**MainScene.vue:**

```vue
<template>
  <Scene name="MainScene">
    <Text @pointerdown="onClick">Add a Rectangle</Text>
    <Container v-for="(n, i) in count" :key="i" :x="i * 130" :y="30">
      <Rectangle :width="120" :height="30" :origin="0" :fillColor="0x333333" />
      <Text :x="60" :y="15" :origin="0.5">Rectangle-{{ n }}</Text>
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
      createPhavuerApp(this.game, { MainScene })
    }
  }
})
```
# Setup

## CDN

In addition to Phaser 3, Vue 3 is needed.  
Phavuer must be placed below them.

```html
<script src="https://unpkg.com/phaser@3.24.1/dist/phaser.min.js"></script>
<script src="https://unpkg.com/vue@3.0.0/dist/vue.global.prod.js"></script>
<script src="TODO"></script>
```

```js
const { Container } = Phavuer
const MainScene = {
  components: { Container },
  template: '<Container>...</Container>',
  setup () {
    return {}
  }
}
new Phaser.Game({
  ..
  scene: {
    create () {
      createPhavuerApp(this.game, { MainScene })
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

These option should be added into `webpack.config.js`:

```js
const { VueLoaderPlugin } = require('vue-loader')
module.exports = () => ({
  // Compile 'phaser' and 'vue' into vendor file
  entry: {
    app: './src/index.js',
    vendor: ['phaser', 'vue']
  },
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

### `createPhavuerApp(gameInstance, sceneComponents)`

Parameters:

`gameInstance`: Game instance of Phaser
`components`: Object of Vue components for each scene

Return value:

`Object` Instance of Vue component

### `initGameObject(gameObject, props, context)`

This method gives following features to the given gameObject:

- Has reactivity for given props such as `x`, `y` or `depth` ([see all](https://github.com/laineus/phavuer/tree/master/src/setters.js))
- Appended to the parent Container automatically if it exists
- Appended to the Scene automatically if parent Container not exists
- Destroyedautomatically when the component is unmounted
- Able to set interactive events such as `@pointerup`
- Able to set an event for its preUpdate with `@update`

Parameters:

- `gameObject`: Phaser 3 GameObject instance
- `props`: Vue 3 props
- `context`: Vue 3 context

It is used for define Base Components. ([like this](https://github.com/laineus/phavuer/tree/master/src/components/Sprite.js))

You don't need this method in most cases.

Even when you use your component in your another component,
You just need to relay props to default components like this:

```
<!-- YourParentComponent: -->
<template>
  <YourCustomContainer :x="n * 100" :y="10" v-for="n in count">
</template>
```

```
<!-- YourCustomContainer: -->
<template>
  <Container ref="root" :x="props.x" :y="props.y">
</template>
```

### `Scene` component

`Scene` component is used for make your scene component.

Props:

- `name`: (String) Scene name. It must be same as the Object's key name given to second argument of the `createPhavuerApp`.
- `autoStart`: (Boolean) Scene is started immediately if `true`

The name can be received from props, so you can use it as is: `<Scene :name="props.name">`

Events:

- `init (scene, data)`
- `create (scene, data)`
- `update (scene, time, delta)`
- `preload (scene)`

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
  - Text of `Text` component is should be written inside of the tag like this: `<Text>Hi</Text>`

Currently Phavuer has following base components:

- Container
- Sprite
- Text
- Rectangle

If you want to use another GameObjects, plase make an issue or MR.  
Also you can make base components just in your project. ([refer](https://github.com/laineus/phavuer/tree/master/src/components))
