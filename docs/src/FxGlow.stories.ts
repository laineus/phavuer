import type { Meta, StoryObj } from '@storybook/vue3'
import { FxGlow, Game, Image, Scene } from '../../'
import { referPhaserVersion } from './utils'
import 'phaser'

type Story = StoryObj<typeof FxGlow>

const description = `
Adds a Glow effect.

The glow effect is a visual technique that creates a soft, luminous halo around game objects, characters, or UI elements. This effect is used to emphasize importance, enhance visual appeal, or convey a sense of energy, magic, or otherworldly presence. The effect can also be set on the inside of the Game Object. The color and strength of the glow can be modified.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Rectangle :width="100" :height="100" :fillColor="0xFF0000">
      <FxGlow :color="0x00FFFF" :outerStrength="4" :innerStrength="2" />
    </Rectangle>
  </Scene>
</Game>
\`\`\`

See also: [Phaser.FX.Glow](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.FX.Glow)
`

const meta: Meta<typeof FxGlow> = {
  title: 'FX/FxGlow',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: FxGlow,
  tags: ['autodocs'],
  args: {
    color: 0x00FFFF,
    outerStrength: 4,
    innerStrength: 0,
    knockout: false,
    quality: 0.1,
    distance: 10,
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
      description: 'Color of the glow effect as number value.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0xFFFFFF' },
      },
    },
    outerStrength: {
      description: 'Strength of glow outward from edge.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    innerStrength: {
      description: 'Strength of glow inward from edge.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    knockout: {
      description: 'If true, only glow is drawn, not texture.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    quality: {
      description: 'Quality of glow effect (PostFX only).',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0.1' },
      },
    },
    distance: {
      description: 'Distance of glow effect (PostFX only).',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    // @ts-expect-error - create is not a prop
    create: {
      name: '@create',
      control: 'none',
      description: '**Parameters:**<br>glow: `Phaser.FX.Glow`',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, FxGlow },
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
        backgroundColor: 0x1a1a1a
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
            <FxGlow
              :post="true"
              :color="args.color"
              :outerStrength="args.outerStrength"
              :innerStrength="args.innerStrength"
              :knockout="args.knockout"
              :quality="args.quality"
              :distance="args.distance"
            />
          </Image>
        </Scene>
      </Game>`,
  }),
}

export default meta
