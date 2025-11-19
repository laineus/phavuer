import type { Meta, StoryObj } from '@storybook/vue3'
import { FxWipe, Game, Image, Scene } from '../../'
import { referPhaserVersion } from './utils'
import 'phaser'

type Story = StoryObj<typeof FxWipe>

const description = `
Adds a Wipe effect.

The wipe or reveal effect is a visual technique that gradually uncovers or conceals elements in the game, such as images, text, or scene transitions. This effect is often used to create a sense of progression, reveal hidden content, or provide a smooth and visually appealing transition between game states.

You can set both the direction and the axis of the wipe effect. The following combinations are possible:

- left to right: direction 0, axis 0
- right to left: direction 1, axis 0
- top to bottom: direction 1, axis 1
- bottom to top: direction 1, axis 0

It is up to you to set the \`progress\` value yourself, i.e. via a Tween, in order to transition the effect.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Rectangle :width="100" :height="100" :fillColor="0xFF0000">
      <FxWipe :wipeWidth="0.1" :direction="0" :axis="0" />
    </Rectangle>
  </Scene>
</Game>
\`\`\`

See also: [Phaser.FX.Wipe](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.FX.Wipe)
`

const meta: Meta<typeof FxWipe> = {
  title: 'FX/FxWipe',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: FxWipe,
  tags: ['autodocs'],
  args: {
    wipeWidth: 0.1,
    direction: 0,
    axis: 0,
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
    wipeWidth: {
      description: 'The width of the wipe effect. This value is normalized in the range 0 to 1.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0.1' },
      },
    },
    direction: {
      description: 'The direction of the wipe effect. Either 0 or 1. Set in conjunction with the axis property.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    axis: {
      description: 'The axis of the wipe effect. Either 0 or 1. Set in conjunction with the direction property.',
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
      description: '**Parameters:**<br>wipe: `Phaser.FX.Wipe`<br><br>Note: You need to set the progress value manually via tweens to animate the wipe effect.',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, FxWipe },
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
            <FxWipe
              :post="true"
              :wipeWidth="args.wipeWidth"
              :direction="args.direction"
              :axis="args.axis"
            />
          </Image>
        </Scene>
      </Game>`,
  }),
}

export default meta