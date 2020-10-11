# Phavuer

[![Phaser 3.x](https://img.shields.io/badge/Phaser-3.x-brightgreen.svg)](https://github.com/photonstorm/phaser)
[![Vue 3.x](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/v2/guide/)
[![npm](https://img.shields.io/npm/v/phavuer.svg)](https://www.npmjs.com/package/phavuer)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/laineus/phavuer/blob/master/LICENSE)

Phavuer makes building components of Phaser 3's GameObjects easier with Vue 3 template engine.

# Usage example

SimpleCounter.vue

```vue
<template>
  <Container ref="root">
    <Text @pointerdown="onLick">Add a Rectangle</Text>
    <Container v-for="(n, i) in count" :key="i" :x="i * 130" :y="30">
      <Rectangle :width="120" :height="30" :origin="0" :fillColor="0x333333" />
      <Text :x="60" :y="15" :origin="0.5">Rectangle-{{ n }}</Text>
    </Container>
  </Container>
</template>

<script>
import { Container, Rectangle, Text } from 'phavuer'
import { ref } from 'vue'
export default {
  components: { Container, Rectangle, Text },
  setup () {
    const root = ref(null)
    const count = ref(1)
    const onLick = () => count.value++
    return { root, count, onLick }
  }
}
</script>
```

MainScene.js

```js
import { createComponent } from 'phavuer'
import SimpleCounter from './SimpleCounter'
export default {
  create () {
    const simpleCounter = createdComponent(this, SimpleCounter)
    this.add.existing(simpleCounter.root.object)
  }
}
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
const scene = {
  create () {
    const { Container } = Phavuer
    const myComponent = Phavuer.createComponent(this, {
      components: { Container },
      template: '<Container ref="root">...</Container>',
      setup () {
        return { root: Vue.ref(null) }
      }
    })
    this.add.existing(myComponent.root.object)
  }
}
```

## Webpack

Install Vue 3 and Phavuer:

```bash
$ yarn add vue@^3 phavuer
```

These packages are also necessary to compile:

```bash
$ yarn add -D @vue/compiler-sfc babel-loader
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

**createComponent(scene, component)**

Parameters:

`scene`: Phaser 3 scene instance
`component`: Vue 3 component Object

Return value:

`Object` Instance of Vue component

**initGameObject(gameObject, props, context)**

This method gives following features to the given gameObject:

- Has reactivity for given props such as `x`, `y` or `depth` ([see all](https://github.com/laineus/phavuer/tree/master/src/setters.js))
- Appended automatically if parent container exists
- Destroyedautomatically when the component is unmounted
- Able to set interactive events such as `@pointerup`
- Able to set an event for its preUpdate with `@update`

Parameters:

`gameObject`: Phaser 3 GameObject instance
`props`: Vue 3 props
`context`: Vue 3 context

It is used for define default objects. ([like this](https://github.com/laineus/phavuer/tree/master/src/components/Sprite.js))

You don't need this method in most cases.

Even when you want to use your custom component in your another component,
You just need to relay props to default components like this:

```
<!-- YourParentComponent: -->
<template>
  <YourCostomContainer :x="n * 100" :y="10" v-for="n in count">
</template>
```

```
<!-- YourCostomContainer: -->
<template>
  <Container ref="root" :x="props.x" :y="props.y">
</template>
```

**Default Components**

Currently Phavuer has following default components for each Phaser 3's GameObjects.

- Container
- Sprite
- Text
- Rectangle

If you want to use another GameObjects, plase make an issue or MR.
Also you can make default components just in your project. ([refer](https://github.com/laineus/phavuer/tree/master/src/components))
