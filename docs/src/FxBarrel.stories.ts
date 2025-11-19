import type { Meta, StoryObj } from '@storybook/vue3'
import { FxBarrel, Game, Image, Scene } from '../../'
import { referPhaserVersion } from './utils'
import 'phaser'

type Story = StoryObj<typeof FxBarrel>

const description = `
Adds a Barrel effect.

A barrel effect allows you to apply either a 'pinch' or 'expand' distortion to a Game Object. The amount of the effect can be modified in real-time.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Rectangle :width="100" :height="100" :fillColor="0xFF0000">
      <FxBarrel :amount="0.5" />
    </Rectangle>
  </Scene>
</Game>
\`\`\`

See also: [Phaser.FX.Barrel](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.FX.Barrel)
`

const meta: Meta<typeof FxBarrel> = {
  title: 'FX/FxBarrel',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: FxBarrel,
  tags: ['autodocs'],
  args: {
    amount: 1,
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
      description: 'The amount of distortion applied to the barrel effect. A value of 1 is no distortion. Typically keep this within +- 1.',
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
      description: '**Parameters:**<br>barrel: `Phaser.FX.Barrel`',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, FxBarrel },
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
            <FxBarrel
              :post="true"
              :amount="args.amount"
            />
          </Image>
        </Scene>
      </Game>`,
  }),
}

export default meta