import type { Meta, StoryObj } from '@storybook/vue3'
import { Game, NineSlice, RenderTexture, Scene, Text } from '../../'
import messageWindow from './assets/window.png'
import { take } from './utils'
import 'phaser'

type Story = StoryObj<typeof RenderTexture>

const description = `
A Render Texture is a combination of Dynamic Texture and an Image Game Object, that uses the Dynamic Texture to display itself with.

A Dynamic Texture is a special texture that allows you to draw textures, frames and most kind of Game Objects directly to it.

You can take many complex objects and draw them to this one texture, which can then be used as the base texture for other Game Objects, such as Sprites. Should you then update this texture, all Game Objects using it will instantly be updated as well, reflecting the changes immediately.

It's a powerful way to generate dynamic textures at run-time that are WebGL friendly and don't invoke expensive GPU uploads on each change.

In versions of Phaser before 3.60 a Render Texture was the only way you could create a texture like this, that had the ability to be drawn on. But in 3.60 we split the core functions out to the Dynamic Texture class as it made a lot more sense for them to reside in there. As a result, the Render Texture is now a light-weight shim that sits on-top of an Image Game Object and offers proxy methods to the features available from a Dynamic Texture.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <RenderTexture :width="100" :height="100">
      <GameObject />
      <GameObject />
      <GameObject />
    </RenderTexture>
  </Scene>
</Game>
\`\`\`

See also: [Phaser.GameObjects.RenderTexture](https://docs.phaser.io/api-documentation/class/gameobjects-rendertexture)
`

const meta: Meta<typeof RenderTexture> = {
  title: 'GameObjects/RenderTexture',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: RenderTexture as any,
  tags: ['autodocs'],
  args: {
    active: true,
    visible: true,
    x: 30,
    y: 30,
    width: 200,
    height: 100,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    origin: 0,
    originX: 0,
    originY: 0,
    depth: 0,
    alpha: 1,
    rotation: 0,
  },
  argTypes: {
    ...take(
      'default',
      'active',
      'visible',
      'x',
      'y',
      'width',
      'height',
      'scale',
      'scaleX',
      'scaleY',
      'origin',
      'originX',
      'originY',
      'depth',
      'alpha',
      'rotation',
      'blendMode',
      'scrollFactor',
      'scrollFactorX',
      'scrollFactorY',
      'displayWidth',
      'displayHeight',
      'displayOriginX',
      'displayOriginY',
      'dropZone',
      'pipeline',
      'tween',
      'tweens',
      'timeline',
      'create',
      'pointerdown',
      'pointermove',
      'pointerup',
      'pointerout',
      'pointerover',
      'wheel',
      'dragstart',
      'drag',
      'dragend',
      'dragenter',
      'dragover',
      'dragleave',
      'drop',
    ),
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, RenderTexture, NineSlice, Text },
    setup() {
      const preload = (scene: Phaser.Scene) => {
        scene.load.image('window', messageWindow)
      }
      const style = { fontFamily: 'Helvetica, Arial', color: '#213547', fontSize: '20px', fontStyle: 'bold' }
      return { args, preload, style }
    },
    template: `
      <Game :config="{ width: 400, height: 225 }">
        <Scene name="Scene" @preload="preload">
          <RenderTexture
            :visible="args.visible"
            :x="args.x"
            :y="args.y"
            :width="args.width"
            :height="args.height"
            :scaleX="args.scaleX"
            :scaleY="args.scaleY"
            :originX="args.originX"
            :originY="args.originY"
            :alpha="args.alpha"
            :rotation="args.rotation"
          >
            <NineSlice
              texture="window"
              :origin="0"
              :width="160"
              :height="80"
              :leftWidth="30"
              :rightWidth="27"
              :topHeight="23"
              :bottomHeight="34"
              />
            <Text
              text="Phavuer"
              :style="style"
              :x="38"
              :y="26"
              />
          </RenderTexture>
        </Scene>
      </Game>`,
  }),
}

export default meta
