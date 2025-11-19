import type { Meta, StoryObj } from '@storybook/vue3'
import { FxBlur, Game, Image, Scene } from '../../'
import { referPhaserVersion } from './utils'
import 'phaser'

type Story = StoryObj<typeof FxBlur>

const description = `
Adds a Blur effect.

A Gaussian blur is the result of blurring an image by a Gaussian function. It is a widely used effect, typically to reduce image noise and reduce detail. The visual effect of this blurring technique is a smooth blur resembling that of viewing the image through a translucent screen, distinctly different from the bokeh effect produced by an out-of-focus lens or the shadow of an object under usual illumination.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Image :texture="'logo'">
      <FxBlur :quality="1" :strength="2" :color="0xFFFFFF" />
    </Image>
  </Scene>
</Game>
\`\`\`

See also: [Phaser.FX.Blur](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.FX.Blur)
`

const meta: Meta<typeof FxBlur> = {
  title: 'FX/FxBlur',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: FxBlur,
  tags: ['autodocs'],
  args: {
    quality: 1,
    x: 2,
    y: 2,
    strength: 1,
    color: 0xFFFFFF,
    steps: 4,
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
    quality: {
      description: 'Quality of blur effect. 0=Low, 1=Medium, 2=High.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    x: {
      description: 'Horizontal offset of the blur effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
    y: {
      description: 'Vertical offset of the blur effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
    strength: {
      description: 'Strength of the blur effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    color: {
      description: 'Color of the blur as hex value.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0xFFFFFF' },
      },
    },
    steps: {
      description: 'Number of steps to run blur effect (integer).',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    // @ts-expect-error - create is not a prop
    create: {
      name: '@create',
      control: 'none',
      description: '**Parameters:**<br>blur: `Phaser.FX.Blur`',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, FxBlur },
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
            <FxBlur
              :post="true"
              :quality="args.quality"
              :x="args.x"
              :y="args.y"
              :strength="args.strength"
              :color="args.color"
              :steps="args.steps"
            />
          </Image>
        </Scene>
      </Game>`,
  }),
}

export default meta
