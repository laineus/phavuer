import type { Meta, StoryObj } from '@storybook/vue3'
import { FxGradient, Game, Image, Scene } from '../../'
import { referPhaserVersion } from './utils'
import 'phaser'

type Story = StoryObj<typeof FxGradient>

const description = `
Adds a Gradient effect.

The gradient overlay effect is a visual technique where a smooth color transition is applied over Game Objects, such as sprites or UI components. This effect is used to enhance visual appeal, emphasize depth, or create stylistic and atmospheric variations. It can also be utilized to convey information, such as representing progress or health status through color changes.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Rectangle :width="100" :height="100" :fillColor="0xFF0000">
      <FxGradient :color1="0xff0000" :color2="0x00ff00" :alpha="0.2" />
    </Rectangle>
  </Scene>
</Game>
\`\`\`

See also: [Phaser.FX.Gradient](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.FX.Gradient)
`

const meta: Meta<typeof FxGradient> = {
  title: 'FX/FxGradient',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: FxGradient,
  tags: ['autodocs'],
  args: {
    color1: 0xff0000,
    color2: 0x00ff00,
    alpha: 0.2,
    fromX: 0,
    fromY: 0,
    toX: 0,
    toY: 1,
    size: 0,
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
    color1: {
      description: 'The first gradient color, given as a number value.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0xff0000' },
      },
    },
    color2: {
      description: 'The second gradient color, given as a number value.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0x00ff00' },
      },
    },
    alpha: {
      description: 'The alpha value of the gradient effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0.2' },
      },
    },
    fromX: {
      description: 'The horizontal position the gradient will start from. This value is normalized, between 0 and 1, and is not in pixels.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    fromY: {
      description: 'The vertical position the gradient will start from. This value is normalized, between 0 and 1, and is not in pixels.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    toX: {
      description: 'The horizontal position the gradient will end at. This value is normalized, between 0 and 1, and is not in pixels.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    toY: {
      description: 'The vertical position the gradient will end at. This value is normalized, between 0 and 1, and is not in pixels.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    size: {
      description: 'How many \'chunks\' the gradient is divided in to, as spread over the entire height of the texture. Leave this at zero for a smooth gradient, or set higher for a more retro chunky effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    // @ts-expect-error - create is not a prop
    create: {
      name: '@create',
      control: 'none',
      description: '**Parameters:**<br>gradient: `Phaser.FX.Gradient`',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, FxGradient },
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
            <FxGradient
              :post="true"
              :color1="args.color1"
              :color2="args.color2"
              :alpha="args.alpha"
              :fromX="args.fromX"
              :fromY="args.fromY"
              :toX="args.toX"
              :toY="args.toY"
              :size="args.size"
            />
          </Image>
        </Scene>
      </Game>`,
  }),
}

export default meta