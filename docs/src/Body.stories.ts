import 'phaser'
import { Game, Scene, Image, Body } from '../../'
import type { Meta, StoryObj } from '@storybook/vue3'
import { referPhaserVersion } from './utils'
import box from './assets/box.png'
import { ref, watch } from 'vue'

type Story = StoryObj<typeof Body>

const description = `
A Dynamic Arcade Body.

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

See also: [Phaser.Physics.Arcade.Body](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.Physics.Arcade.Body)
`

const meta: Meta<typeof Body> = {
  title: 'Physics/Body',
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  component: Body,
  tags: ['autodocs'],
  args: {
    width: 100,
    height: 80,
    offsetX: 0,
    offsetY: 0,
    enable: true,
    immovable: false,
    moves: true,
    collideWorldBounds: true,
    bounceX: 0,
    bounceY: 0,
    drag: 0,
    dragX: 25,
    dragY: 25,
    gravityX: 0,
    gravityY: 100,
    frictionX: 0,
    frictionY: 0,
    velocityX: 100,
    velocityY: -50,
    maxVelocityX: 500,
    maxVelocityY: 500,
    accelerationX: 0,
    accelerationY: 0
  },
  argTypes: {
    // @ts-ignore
    width: {
      description: 'The width of the Body.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 'Same as its Game Object\'s width' }
      }
    },
    height: {
      description: 'The height of the Body.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 'Same as its Game Object\'s height' }
      }
    },
    offsetX: {
      description: 'The horizontal offset of the Body\'s position from its Game Object\'s position.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    offsetY: {
      description: 'The vertical offset of the Body\'s position from its Game Object\'s position.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    enable: {
      description: 'Whether this Body is updated by the physics simulation.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' }
      }
    },
    immovable: {
      description: 'Whether this Body can be moved by collisions with another Body.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' }
      }
    },
    moves: {
      description: 'Whether the Body\'s position and rotation are affected by its velocity, acceleration, drag, and gravity.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' }
      }
    },
    collideWorldBounds: {
      description: 'Whether this Body interacts with the world boundary.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    bounceX: {
      description: 'The Body\'s horizontal bounce.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    bounceY: {
      description: 'The Body\'s vertical bounce.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    drag: {
      description: 'The Body\'s drag.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    dragX: {
      description: 'The Body\'s horizontal drag.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    dragY: {
      description: 'The Body\'s vertical drag.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    gravityX: {
      description: 'The Body\'s horizontal gravity.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    gravityY: {
      description: 'The Body\'s vertical gravity.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    frictionX: {
      description: 'The Body\'s horizontal friction.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    frictionY: {
      description: 'The Body\'s vertical friction.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    velocityX: {
      description: 'The Body\'s horizontal velocity.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    velocityY: {
      description: 'The Body\'s vertical velocity.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    maxVelocityX: {
      description: 'The Body\'s maximum horizontal velocity.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    maxVelocityY: {
      description: 'The Body\'s maximum vertical velocity.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    accelerationX: {
      description: 'The Body\'s horizontal acceleration.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    accelerationY: {
      description: 'The Body\'s vertical acceleration.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    create: {
      name: '@create',
      control: 'none',
      description: '**Parameters:**<br>pointer: `Phaser.Physics.Arcade.Body`',
      table: {
        category: 'Emits',
        type: { summary: 'function' }
      }
    }
  }
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, Body },
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
          <Body
            :collideWorldBounds="args.collideWorldBounds"
            :width="args.width"
            :height="args.height"
            :offsetX="args.offsetX"
            :offsetY="args.offsetY"
            :enable="args.enable"
            :immovable="args.immovable"
            :moves="args.moves"
            :bounceX="args.bounceX"
            :bounceY="args.bounceY"
            :dragX="args.dragX"
            :dragY="args.dragY"
            :gravityX="args.gravityX"
            :gravityY="args.gravityY"
            :frictionX="args.frictionX"
            :frictionY="args.frictionY"
            :velocityX="args.velocityX"
            :velocityY="args.velocityY"
            :maxVelocityX="args.maxVelocityX"
            :maxVelocityY="args.maxVelocityY"
            :accelerationX="args.accelerationX"
            :accelerationY="args.accelerationY"
            />
        </Image>
      </Scene>
    </Game>`
  })
}

export default meta