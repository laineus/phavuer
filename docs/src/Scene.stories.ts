import type { Meta, StoryObj } from '@storybook/vue3'
import { Game, Rectangle, Scene, Text } from '../../'
import { referPhaserVersion } from './utils'
import 'phaser'

type Story = StoryObj<typeof Scene>

const description = `
A base Phaser.Scene class which can be extended for your own use.

You can also define the optional methods init(), preload(), and create().

\`\`\`html
<Game>
  <Scene name="SceneName1" :autoStart="true">
    <GameObject />
    <GameObject />
  </Scene>
  <Scene name="SceneName2" :autoStart="false">
    <GameObject />
    <GameObject />
  </Scene>
</Game>
\`\`\`

See also: [Phaser.Scene](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.Scene)
`

const meta: Meta<typeof Scene> = {
  title: 'Core/Scene',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: Scene as any,
  tags: ['autodocs'],
  args: {
  },
  argTypes: {
    // @ts-expect-error - default is not a prop
    default: {
      control: 'none',
      table: {
        category: 'Slots',
        type: { summary: 'Phaser.GameObjects.GameObject' },
      },
    },
    name: {
      control: 'none',
      description: 'The unique key of this Scene. Must be unique within the entire Game instance.',
      table: {
        category: 'Props',
        type: { summary: 'string' },
      },
    },
    autoStart: {
      control: 'none',
      description: 'Whether to start this scene automatically.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    init: {
      name: '@init',
      control: 'none',
      description: 'Event of [Phaser.Types.Scenes.SceneInitCallback](Phaser.Types.Scenes.SceneInitCallback)<br>**Parameters:**<br>data: object',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
    preload: {
      name: '@preload',
      control: 'none',
      description: 'Event of [Phaser.Types.Scenes.ScenePreloadCallback](Phaser.Types.Scenes.ScenePreloadCallback)<br>**Parameters:**<br>none',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
    create: {
      name: '@create',
      control: 'none',
      description: 'Event of [Phaser.Types.Scenes.SceneCreateCallback](Phaser.Types.Scenes.SceneCreateCallback)<br>**Parameters:**<br>data: object',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
    update: {
      name: '@update',
      control: 'none',
      description: 'Event of [Phaser.Types.Scenes.SceneUpdateCallback](Phaser.Types.Scenes.SceneUpdateCallback)<br>**Parameters:**<br>time: Phaser.Game<br>delta: number',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Rectangle, Text },
    setup() {
      const style1 = { fontFamily: 'Helvetica, Arial', color: '#FFF', fontSize: '20px', fontStyle: 'bold' }
      const style2 = { fontFamily: 'Helvetica, Arial', color: '#42B883', fontSize: '16px' }
      const enableScene1 = (pointer: Phaser.Input.Pointer) => {
        pointer.manager.game.scene.start('Scene1')
        pointer.manager.game.scene.stop('Scene2')
      }
      const enableScene2 = (pointer: Phaser.Input.Pointer) => {
        pointer.manager.game.scene.start('Scene2')
        pointer.manager.game.scene.stop('Scene1')
      }
      return { args, style1, style2, enableScene1, enableScene2 }
    },
    template: `
      <Game :config="{ width: 400, height: 225 }">
        <Scene name="Scene1" :autoStart="true">
          <Text text="Scene1" :style="style1" :x="15" :y="15" />
          <Rectangle :x="200" :y="110" :width="135" :height="30" :strokeColor="0x42B883" :lineWidth="1" @pointerdown="enableScene2" />
          <Text text="Change Scene" :style="style2" :x="200" :y="110" :origin="0.5" />
        </Scene>
        <Scene name="Scene2" :autoStart="false">
          <Text text="Scene2" :style="style1" :x="15" :y="15" />
          <Rectangle :x="200" :y="110" :width="135" :height="30" :strokeColor="0x42B883" :lineWidth="1" @pointerdown="enableScene1" />
          <Text text="Change Scene" :style="style2" :x="200" :y="110" :origin="0.5" />
        </Scene>
      </Game>`,
  }),
}

export default meta
