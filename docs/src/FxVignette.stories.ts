import type { Meta, StoryObj } from '@storybook/vue3'
import { FxVignette, Game, Image, Scene } from '../../'
import { referPhaserVersion } from './utils'
import 'phaser'

type Story = StoryObj<typeof FxVignette>

const description = `
Adds a Vignette effect.

The vignette effect is a visual technique where the edges of the screen, or a Game Object, gradually darken or blur, creating a frame-like appearance. This effect is used to draw the player's focus towards the central action or subject, enhance immersion, and provide a cinematic or artistic quality to the game's visuals.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Rectangle :width="100" :height="100" :fillColor="0xFF0000">
      <FxVignette :radius="0.5" :strength="0.5" />
    </Rectangle>
  </Scene>
</Game>
\`\`\`

See also: [Phaser.FX.Vignette](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.FX.Vignette)
`

const meta: Meta<typeof FxVignette> = {
  title: 'FX/FxVignette',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: FxVignette,
  tags: ['autodocs'],
  args: {
    x: 0.5,
    y: 0.5,
    radius: 0.5,
    strength: 0.5,
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
      description: 'Horizontal offset (normalized 0-1).',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0.5' },
      },
    },
    y: {
      description: 'Vertical offset (normalized 0-1).',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0.5' },
      },
    },
    radius: {
      description: 'Radius of vignette effect (normalized 0-1).',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0.5' },
      },
    },
    strength: {
      description: 'Strength of vignette effect.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0.5' },
      },
    },
    // @ts-expect-error - create is not a prop
    create: {
      name: '@create',
      control: 'none',
      description: '**Parameters:**<br>vignette: `Phaser.FX.Vignette`',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, FxVignette },
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
        backgroundColor: 0x87CEEB
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
            <FxVignette
              :post="true"
              :x="args.x"
              :y="args.y"
              :radius="args.radius"
              :strength="args.strength"
            />
          </Image>
        </Scene>
      </Game>`,
  }),
}

export default meta
