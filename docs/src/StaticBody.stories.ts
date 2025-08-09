import 'phaser'
import { Game, Scene, Image, StaticBody } from '../../'
import type { Meta, StoryObj } from '@storybook/vue3'
import { referPhaserVersion } from './utils'
import box from './assets/box.png'
import { ref, watch } from 'vue'

type Story = StoryObj<typeof StaticBody>

const description = `
A Static Arcade Physics Body.

A Static Body never moves, and isn't automatically synchronized with its parent Game Object. That means if you make any change to the parent's origin, position, or scale after creating or adding the body, you'll need to update the Static Body manually.

A Static Body can collide with other Bodies, but is never moved by collisions.

Physics is enabled by mounting it as a child of GameObject.

\`\`\`html
<Game :config="{ physics: { default: 'arcade', arcade: { debug: true } } }">
  <Scene name="SceneName">
    <GameObject>
      <Body />
    </GameObject>
  </Scene>
</Game>
\`\`\`

Physics must be enabled in gameConfig.

See also: [Phaser.Physics.Arcade.StaticBody](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.Physics.Arcade.StaticBody)
`

const meta: Meta<typeof StaticBody> = {
  title: 'Physics/StaticBody',
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  component: StaticBody,
  tags: ['autodocs'],
  args: {
    width: 100,
    height: 80,
    offsetX: 0,
    offsetY: 0,
    enable: true
  },
  argTypes: {
    // @ts-ignore
    width: {
      description: 'The width of the StaticBody.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 'Same as its Game Object\'s width' }
      }
    },
    height: {
      description: 'The height of the StaticBody.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 'Same as its Game Object\'s height' }
      }
    },
    offsetX: {
      description: 'The horizontal offset of the StaticBody\'s position from its Game Object\'s position.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    offsetY: {
      description: 'The vertical offset of the StaticBody\'s position from its Game Object\'s position.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    enable: {
      description: 'Whether this StaticBody is updated by the physics simulation.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' }
      }
    },
    create: {
      name: '@create',
      control: 'none',
      description: '**Parameters:**<br>pointer: `Phaser.Physics.Arcade.StaticBody`',
      table: {
        category: 'Emits',
        type: { summary: 'function' }
      }
    }
  }
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, StaticBody },
    setup() {
      const preload = (scene: Phaser.Scene) => {
        scene.load.image('box', box)
      }
      const version = ref(0)
      watch(args, () => {
        version.value++
      })
      return { args, preload, version }
    },
    template: `
    <Game :config="{ width: 400, height: 225, physics: { default: 'arcade', arcade: { debug: true } } }">
      <Scene name="Scene" @preload="preload">
        <Image
          :x="30"
          :y="30"
          :origin="0"
          :texture="'box'"
          :key="version"
          >
          <StaticBody
            :width="args.width"
            :height="args.height"
            :offsetX="args.offsetX"
            :offsetY="args.offsetY"
            :enable="args.enable"
            />
        </Image>
      </Scene>
    </Game>`
  })
}

export default meta