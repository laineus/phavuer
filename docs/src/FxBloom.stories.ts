import type { Meta, StoryObj } from '@storybook/vue3'
import { FxBloom, Game, Image, Scene } from '../../'
import { referPhaserVersion } from './utils'
import 'phaser'

type Story = StoryObj<typeof FxBloom>

const description = `
Adds a Bloom effect.

Bloom is an effect used to reproduce an imaging artifact of real-world cameras. The effect produces fringes of light extending from the borders of bright areas in an image, contributing to the illusion of an extremely bright light overwhelming the camera or eye capturing the scene.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Rectangle :width="100" :height="100" :fillColor="0xFF0000">
      <FxBloom :color="0xFFFFFF" :strength="1" :blurStrength="1" />
    </Rectangle>
  </Scene>
</Game>
\`\`\`

See also: [Phaser.FX.Bloom](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.FX.Bloom)
`

const meta: Meta<typeof FxBloom> = {
  title: 'FX/FxBloom',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: FxBloom,
  tags: ['autodocs'],
  args: {
    color: 0xFFFFFF,
    offsetX: 1,
    offsetY: 1,
    blurStrength: 1,
    strength: 1,
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
    color: {
      description: 'Color of the bloom as hex value.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
      },
    },
    offsetX: {
      description: 'Horizontal offset of bloom effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    offsetY: {
      description: 'Vertical offset of bloom effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    blurStrength: {
      description: 'Strength of blur process of bloom.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    strength: {
      description: 'Strength of blend process of bloom.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    steps: {
      description: 'Number of steps to run bloom effect (integer).',
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
      description: '**Parameters:**<br>bloom: `Phaser.FX.Bloom`',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, FxBloom },
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
        backgroundColor: 0x000000
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
            <FxBloom
              :post="true"
              :color="args.color"
              :offsetX="args.offsetX"
              :offsetY="args.offsetY"
              :blurStrength="args.blurStrength"
              :strength="args.strength"
              :steps="args.steps"
            />
          </Image>
        </Scene>
      </Game>`,
  }),
}

export default meta
