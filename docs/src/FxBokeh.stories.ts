import type { Meta, StoryObj } from '@storybook/vue3'
import { FxBokeh, Game, Image, Scene } from '../../'
import { referPhaserVersion } from './utils'
import 'phaser'

type Story = StoryObj<typeof FxBokeh>

const description = `
Adds a Bokeh effect.

Bokeh refers to a visual effect that mimics the photographic technique of creating a shallow depth of field. This effect is used to emphasize the game's main subject or action, by blurring the background or foreground elements, resulting in a more immersive and visually appealing experience. It is achieved through rendering techniques that simulate the out-of-focus areas, giving a sense of depth and realism to the game's graphics. See also Tilt Shift.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Rectangle :width="100" :height="100" :fillColor="0xFF0000">
      <FxBokeh :radius="0.5" :amount="1" :contrast="0.2" />
    </Rectangle>
  </Scene>
</Game>
\`\`\`

See also: [Phaser.FX.Bokeh](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.FX.Bokeh)
`

const meta: Meta<typeof FxBokeh> = {
  title: 'FX/FxBokeh',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: FxBokeh,
  tags: ['autodocs'],
  args: {
    radius: 0.5,
    amount: 1,
    contrast: 0.2,
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
    radius: {
      description: 'The radius of the bokeh effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0.5' },
      },
    },
    amount: {
      description: 'The amount of the bokeh effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    contrast: {
      description: 'The color contrast of the bokeh effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0.2' },
      },
    },
    // @ts-expect-error - create is not a prop
    create: {
      name: '@create',
      control: 'none',
      description: '**Parameters:**<br>bokeh: `Phaser.FX.Bokeh`',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, FxBokeh },
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
        backgroundColor: 0x34495e
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
            <FxBokeh
              :post="true"
              :radius="args.radius"
              :amount="args.amount"
              :contrast="args.contrast"
            />
          </Image>
        </Scene>
      </Game>`,
  }),
}

export default meta