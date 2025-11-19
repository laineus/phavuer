import type { Meta, StoryObj } from '@storybook/vue3'
import { FxShine, Game, Image, Scene } from '../../'
import { referPhaserVersion } from './utils'
import 'phaser'

type Story = StoryObj<typeof FxShine>

const description = `
Adds a Shine effect.

The shine effect is a visual technique that simulates the appearance of reflective or glossy surfaces by passing a light beam across a Game Object. This effect is used to enhance visual appeal, emphasize certain features, and create a sense of depth or material properties.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Rectangle :width="100" :height="100" :fillColor="0xFF0000">
      <FxShine :speed="0.5" :lineWidth="0.5" :gradient="3" />
    </Rectangle>
  </Scene>
</Game>
\`\`\`

See also: [Phaser.FX.Shine](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.FX.Shine)
`

const meta: Meta<typeof FxShine> = {
  title: 'FX/FxShine',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: FxShine,
  tags: ['autodocs'],
  args: {
    speed: 0.5,
    lineWidth: 0.5,
    gradient: 3,
    reveal: false,
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
    speed: {
      description: 'The speed of the Shine effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0.5' },
      },
    },
    lineWidth: {
      description: 'The line width of the Shine effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0.5' },
      },
    },
    gradient: {
      description: 'The gradient of the Shine effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
    },
    reveal: {
      description: 'Does this Shine effect reveal or get added to its target?',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    // @ts-expect-error - create is not a prop
    create: {
      name: '@create',
      control: 'none',
      description: '**Parameters:**<br>shine: `Phaser.FX.Shine`',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, FxShine },
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
            <FxShine
              :post="true"
              :speed="args.speed"
              :lineWidth="args.lineWidth"
              :gradient="args.gradient"
              :reveal="args.reveal"
            />
          </Image>
        </Scene>
      </Game>`,
  }),
}

export default meta