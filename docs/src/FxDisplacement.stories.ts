import type { Meta, StoryObj } from '@storybook/vue3'
import { FxDisplacement, Game, Image, Scene } from '../../'
import { referPhaserVersion } from './utils'
import 'phaser'

type Story = StoryObj<typeof FxDisplacement>

const description = `
Adds a Displacement effect.

The displacement effect is a visual technique that alters the position of pixels in an image or texture based on the values of a displacement map. This effect is used to create the illusion of depth, surface irregularities, or distortion in otherwise flat elements. It can be applied to characters, objects, or backgrounds to enhance realism, convey movement, or achieve various stylistic appearances.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Rectangle :width="100" :height="100" :fillColor="0xFF0000">
      <FxDisplacement texture="__WHITE" :x="0.005" :y="0.005" />
    </Rectangle>
  </Scene>
</Game>
\`\`\`

See also: [Phaser.FX.Displacement](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.FX.Displacement)
`

const meta: Meta<typeof FxDisplacement> = {
  title: 'FX/FxDisplacement',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: FxDisplacement,
  tags: ['autodocs'],
  args: {
    texture: 'logo',
    x: 0.005,
    y: 0.005,
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
    texture: {
      description: 'The unique string-based key of the texture to use for displacement, which must exist in the Texture Manager.',
      table: {
        category: 'Props',
        type: { summary: 'string' },
        defaultValue: { summary: '__WHITE' },
      },
    },
    x: {
      description: 'The amount of horizontal displacement to apply. A very small float number, such as 0.005.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0.005' },
      },
    },
    y: {
      description: 'The amount of vertical displacement to apply. A very small float number, such as 0.005.',
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
      description: '**Parameters:**<br>displacement: `Phaser.FX.Displacement`',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, FxDisplacement },
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
            <FxDisplacement
              :post="true"
              :texture="args.texture"
              :x="args.x"
              :y="args.y"
            />
          </Image>
        </Scene>
      </Game>`,
  }),
}

export default meta
