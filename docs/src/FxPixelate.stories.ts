import type { Meta, StoryObj } from '@storybook/vue3'
import { FxPixelate, Game, Image, Scene } from '../../'
import { referPhaserVersion } from './utils'
import 'phaser'

type Story = StoryObj<typeof FxPixelate>

const description = `
Adds a Pixelate effect.

The pixelate effect is a visual technique that deliberately reduces the resolution or detail of an image, creating a blocky or mosaic appearance composed of large, visible pixels. This effect can be used for stylistic purposes, as a homage to retro gaming, or as a means to obscure certain elements within the game, such as during a transition or to censor specific content.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Rectangle :width="100" :height="100" :fillColor="0xFF0000">
      <FxPixelate :amount="4" />
    </Rectangle>
  </Scene>
</Game>
\`\`\`

See also: [Phaser.FX.Pixelate](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.FX.Pixelate)
`

const meta: Meta<typeof FxPixelate> = {
  title: 'FX/FxPixelate',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: FxPixelate,
  tags: ['autodocs'],
  args: {
    amount: 4,
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
    amount: {
      description: 'Amount of pixelation to apply.',
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
      description: '**Parameters:**<br>pixelate: `Phaser.FX.Pixelate`',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, FxPixelate },
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
            <FxPixelate
              :post="true"
              :amount="args.amount"
            />
          </Image>
        </Scene>
      </Game>`,
  }),
}

export default meta
