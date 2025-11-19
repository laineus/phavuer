import type { Meta, StoryObj } from '@storybook/vue3'
import { Container, Game, NineSlice, Scene, Text } from '../../'
import messageWindow from './assets/window.png'
import { referPhaserVersion, take } from './utils'
import 'phaser'

type Story = StoryObj<typeof Container>

const description = `
A Container Game Object.

A Container, as the name implies, can 'contain' other types of Game Object. When a Game Object is added to a Container, the Container becomes responsible for the rendering of it. By default it will be removed from the Display List and instead added to the Containers own internal list.

The position of the Game Object automatically becomes relative to the position of the Container.

The transform point of a Container is 0x0 (in local space) and that cannot be changed. The children you add to the Container should be positioned with this value in mind. I.e. you should treat 0x0 as being the center of the Container, and position children positively and negative around it as required.

When the Container is rendered, all of its children are rendered as well, in the order in which they exist within the Container. Container children can be repositioned using methods such as MoveUp, MoveDown and SendToBack.

If you modify a transform property of the Container, such as Container.x or Container.rotation then it will automatically influence all children as well.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Container>
      <GameObject />
      <GameObject />
      <GameObject />
    </Container>
  </Scene>
</Game>
\`\`\`

See also: [Phaser.GameObjects.Container](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.GameObjects.Container)
`

const meta: Meta<typeof Container> = {
  title: 'GameObjects/Container',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: Container as any,
  tags: ['autodocs'],
  args: {
    active: true,
    visible: true,
    x: 30,
    y: 30,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    depth: 0,
    alpha: 1,
    rotation: 0,
  },
  argTypes: {
    ...take(
      'default',
      'active',
      'visible',
      'x',
      'y',
      'width',
      'height',
      'scale',
      'scaleX',
      'scaleY',
      'depth',
      'alpha',
      'rotation',
      'blendMode',
      'scrollFactor',
      'scrollFactorX',
      'scrollFactorY',
      'displayWidth',
      'displayHeight',
      'displayOriginX',
      'displayOriginY',
      'dropZone',
      'pipeline',
      'tween',
      'tweens',
      'timeline',
      'create',
      'pointerdown',
      'pointermove',
      'pointerup',
      'pointerout',
      'pointerover',
      'wheel',
      'dragstart',
      'drag',
      'dragend',
      'dragenter',
      'dragover',
      'dragleave',
      'drop',
    ),
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Container, NineSlice, Text },
    setup() {
      const preload = (scene: Phaser.Scene) => {
        scene.load.image('window', messageWindow)
      }
      const style = { fontFamily: 'Helvetica, Arial', color: '#213547', fontSize: '20px', fontStyle: 'bold' }
      return { args, preload, style }
    },
    template: `
      <Game :config="{ width: 400, height: 225 }">
      <Scene name="Scene" @preload="preload">
          <Container
            :visible="args.visible"
            :x="args.x"
            :y="args.y"
            :scaleX="args.scaleX"
            :scaleY="args.scaleY"
            :alpha="args.alpha"
            :rotation="args.rotation"
            >
            <NineSlice
              texture="window"
              :origin="0"
              :width="160"
              :height="80"
              :leftWidth="30"
              :rightWidth="27"
              :topHeight="23"
              :bottomHeight="34"
              />
            <Text
              text="Phavuer"
              :style="style"
              :x="38"
              :y="26"
              />
          </Container>
        </Scene>
      </Game>`,
  }),
}

export default meta
