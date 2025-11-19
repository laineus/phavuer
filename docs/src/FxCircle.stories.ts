import type { Meta, StoryObj } from '@storybook/vue3'
import { FxCircle, Game, Image, Scene } from '../../'
import { referPhaserVersion } from './utils'
import 'phaser'

type Story = StoryObj<typeof FxCircle>

const description = `
Adds a Circle effect.

This effect will draw a circle around the texture of the Game Object, effectively masking off any area outside of the circle without the need for an actual mask. You can control the thickness of the circle, the color of the circle and the color of the background, should the texture be transparent. You can also control the feathering applied to the circle, allowing for a harsh or soft edge.

Please note that adding this effect to a Game Object will not change the input area or physics body of the Game Object, should it have one.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Rectangle :width="100" :height="100" :fillColor="0xFF0000">
      <FxCircle :thickness="8" :color="0xFFFFFF" :backgroundColor="0x000000" />
    </Rectangle>
  </Scene>
</Game>
\`\`\`

See also: [Phaser.FX.Circle](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.FX.Circle)
`

const meta: Meta<typeof FxCircle> = {
  title: 'FX/FxCircle',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: FxCircle,
  tags: ['autodocs'],
  args: {
    thickness: 8,
    color: 0xfeedb6,
    backgroundColor: 0xff0000,
    scale: 1,
    feather: 0.005,
  },
  argTypes: {
    post: {
      description: 'Use postFX (true) or preFX (false).',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    thickness: {
      description: 'The width of the circle around the texture, in pixels.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '8' },
      },
    },
    color: {
      description: 'The color of the circular ring, given as a number value.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0xfeedb6' },
      },
    },
    backgroundColor: {
      description: 'The color of the background, behind the texture, given as a number value.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0xff0000' },
      },
    },
    scale: {
      description: 'The scale of the circle. The default scale is 1, which is a circle the full size of the underlying texture.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    feather: {
      description: 'The amount of feathering to apply to the circle from the ring.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0.005' },
      },
    },
    // @ts-expect-error - create is not a prop
    create: {
      name: '@create',
      control: 'none',
      description: '**Parameters:**<br>circle: `Phaser.FX.Circle`',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, FxCircle },
    setup() {
      const preload = (scene: Phaser.Scene) => {
        scene.load.image('logo', '/logo.png')
      }
      return { args, preload }
    },
    template: `
      <Game :config="{ 
        width: 400, 
        height: 225,
        type: 2,
        backgroundColor: 0x2c3e50
      }">
        <Scene name="Scene" @preload="preload">
          <Image
            :x="200"
            :y="112"
            :texture="'logo'"
            :originX="0.5"
            :originY="0.5"
            :scale="0.6"
          >
            <FxCircle
              :post="true"
              :thickness="args.thickness"
              :color="args.color"
              :backgroundColor="args.backgroundColor"
              :scale="args.scale"
              :feather="args.feather"
            />
          </Image>
        </Scene>
      </Game>`,
  }),
}

export default meta