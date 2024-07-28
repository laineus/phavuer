import 'phaser'
import { Game, Scene, Image, Light } from '../../'
import type { Meta, StoryObj } from '@storybook/vue3'
import { referPhaserVersion, take } from './utils'

type Story = StoryObj<typeof Light>

const description = `
A 2D point light.

These are typically created by a Phaser.GameObjects.LightsManager, available from within a scene via this.lights.

Any Game Objects using the Light2D pipeline will then be affected by these Lights as long as they have a normal map.

They can also simply be used to represent a point light for your own purposes.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <GameObject :pipeline="'Light2D'" />
    <Light :radius="200" :color="0xFFFF00" :intensity="10" />
  </Scene>
</Game>
\`\`\`

See also: [Phaser.GameObjects.Light](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.GameObjects.Light)
`

const meta: Meta<typeof Light> = {
  title: 'GameObjects/Light',
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  component: Light,
  tags: ['autodocs'],
  args: {
    visible: true,
    x: 120,
    y: 30,
    radius: 256,
    color: '0x66AAFF' as unknown as number,
    intensity: 10
  },
  // @ts-ignore
  argTypes: {
    ...take(
      'visible',
      'x',
      'y',
      'radius'
    ),
    color: {
      control: 'text',
      description: 'The color of the light.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0xFFFFFF' }
      }
    },
    intensity: {
      description: 'The intensity of the light.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 1 }
      }
    },
    ...take(
      'tween',
      'tweens',
      'timeline',
      'create'
    )
  }
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, Light },
    setup() {
      const preload = (scene: Phaser.Scene) => {
        scene.load.image('logo', '/logo.png')
      }
      return { args, preload }
    },
    template: `
      <Game :config="{ width: 400, height: 225 }">
        <Scene name="Scene" @preload="preload">
          <Image
            :texture="'logo'"
            :x="30"
            :y="30"
            :scale="0.6"
            :originX="0"
            :originY="0"
            :pipeline="'Light2D'"
            />
          <Light
            :visible="args.visible"
            :x="args.x"
            :y="args.y"
            :radius="args.radius"
            :color="Number(args.color)"
            :intensity="args.intensity"
            />
        </Scene>
      </Game>`
  })
}

export default meta