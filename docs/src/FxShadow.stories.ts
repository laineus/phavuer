import type { Meta, StoryObj } from '@storybook/vue3'
import { FxShadow, Game, Image, Scene } from '../../'
import { referPhaserVersion } from './utils'
import 'phaser'

type Story = StoryObj<typeof FxShadow>

const description = `
Adds a Shadow effect.

The shadow effect is a visual technique used to create the illusion of depth and realism by adding darker, offset silhouettes or shapes beneath game objects, characters, or environments. These simulated shadows help to enhance the visual appeal and immersion, making the 2D game world appear more dynamic and three-dimensional.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Rectangle :width="100" :height="100" :fillColor="0xFF0000">
      <FxShadow :x="5" :y="5" :color="0x000000" :decay="0.1" />
    </Rectangle>
  </Scene>
</Game>
\`\`\`

See also: [Phaser.FX.Shadow](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.FX.Shadow)
`

const meta: Meta<typeof FxShadow> = {
  title: 'FX/FxShadow',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: FxShadow,
  tags: ['autodocs'],
  args: {
    x: 5,
    y: 5,
    decay: 0.1,
    power: 1,
    color: 0x000000,
    samples: 6,
    intensity: 1,
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
    x: {
      description: 'Horizontal offset of shadow effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    y: {
      description: 'Vertical offset of shadow effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    decay: {
      description: 'Amount of decay for shadow effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0.1' },
      },
    },
    power: {
      description: 'Power of the shadow effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    color: {
      description: 'Color of the shadow.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0x000000' },
      },
    },
    samples: {
      description: 'Number of samples (integer between 1-12).',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '6' },
      },
    },
    intensity: {
      description: 'Intensity of shadow effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    // @ts-expect-error - create is not a prop
    create: {
      name: '@create',
      control: 'none',
      description: '**Parameters:**<br>shadow: `Phaser.FX.Shadow`',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, FxShadow },
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
        backgroundColor: 0xF0F0F0
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
            <FxShadow
              :post="true"
              :x="args.x"
              :y="args.y"
              :decay="args.decay"
              :power="args.power"
              :color="args.color"
              :samples="args.samples"
              :intensity="args.intensity"
            />
          </Image>
        </Scene>
      </Game>`,
  }),
}

export default meta
