import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, watch } from 'vue'
import { Body, Game, Image, Scene } from '../../'
import box from './assets/box.png'
import { referPhaserVersion } from './utils'
import 'phaser'

type Story = StoryObj<typeof Game>

const description = `
The Phaser.Game instance is the main controller for the entire Phaser game.  
It is responsible for handling the boot process, parsing the configuration values, creating the renderer, and setting-up all of the global Phaser systems, such as sound and input.  
Once that is complete it will start the Scene Manager and then begin the main game loop.

You should generally avoid accessing any of the systems created by Game, and instead use those made available to you via the Phaser.Scene Systems class instead.

\`\`\`html
<Game :config="gameConfig">
  <Scene name="SceneName1" />
  <Scene name="SceneName2" />
</Game>
\`\`\`

See also: [Phaser.Game](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.Game)
`

const meta: Meta<typeof Game> = {
  title: 'Core/Game',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: Game as any,
  tags: ['autodocs'],
  args: {
    config: {
      width: 400,
      height: 225,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 100 },
        },
      },
    },
  },
  argTypes: {
    // @ts-expect-error - default is not a prop
    default: {
      control: 'none',
      table: {
        category: 'Slots',
        type: { summary: 'Phaser.Scene' },
      },
    },
    config: {
      description: 'The configuration object for your Phaser Game instance.<br>See: [Phaser.Types.Core.GameConfig](https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig)',
      table: {
        category: 'Props',
        type: { summary: 'Phaser.Types.Core.GameConfig' },
      },
    },
    create: {
      name: '@create',
      control: 'none',
      description: '**Parameters:**<br>game: `Phaser.Game`',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
    ready: {
      name: '@ready',
      control: 'none',
      description: '**Parameters:**<br>game: `Phaser.Game`',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, Body },
    setup() {
      const preload = (scene: Phaser.Scene) => {
        scene.load.image('box', box)
      }
      const version = ref(0)
      watch(() => args.config, () => {
        version.value++
      })
      return { args, version, preload }
    },
    template: `
      <Game :config="args.config" :key="version">
        <Scene name="SceneName" @preload="preload">
          <Image :x="200" :y="40" texture="box">
            <Body :collideWorldBounds="true" />
          </Image>
        </Scene>
      </Game>`,
  }),
}

export default meta
