import type { Meta, StoryObj } from '@storybook/vue3'
import { reactive, ref } from 'vue'
import { Game, Image, Rectangle, Scene, Text, Zone } from '../../'
import box from './assets/box.png'
import { referPhaserVersion, take } from './utils'
import 'phaser'

type Story = StoryObj<typeof Zone>

const description = `
A Zone Game Object.

A Zone is a non-rendering rectangular Game Object that has a position and size.  
It has no texture and never displays, but does live on the display list and can be moved, scaled and rotated like any other Game Object.

Its primary use is for creating Drop Zones and Input Hit Areas and it has a couple of helper methods specifically for this.  
It is also useful for object overlap checks, or as a base for your own non-displaying Game Objects.  
The default origin is 0.5, the center of the Zone, the same as with Game Objects.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Zone :width="100" :height="100" />
  </Scene>
</Game>
\`\`\`

See also: [Phaser.GameObjects.Zone](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.GameObjects.Zone)
`

const meta: Meta<typeof Zone> = {
  title: 'GameObjects/Zone',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: Zone,
  tags: ['autodocs'],
  args: {
    active: true,
    x: 30,
    y: 30,
    width: 120,
    height: 120,
    origin: 0,
    originX: 0,
    originY: 0,
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
      'origin',
      'originX',
      'originY',
      'depth',
      'rotation',
      'scrollFactor',
      'scrollFactorX',
      'scrollFactorY',
      'displayWidth',
      'displayHeight',
      'displayOriginX',
      'displayOriginY',
      'dropZone',
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
    components: { Game, Scene, Image, Text, Rectangle, Zone },
    setup() {
      const preload = (scene: Phaser.Scene) => {
        scene.load.image('box', box)
      }
      const dropped = ref(false)
      const boxPosition = reactive({ x: 230, y: 50 })
      const drag = (_: Phaser.Input.Pointer, x: number, y: number) => {
        boxPosition.x = x
        boxPosition.y = y
        dropped.value = false
      }
      const drop = () => {
        dropped.value = true
      }
      return { args, preload, dropped, drag, drop, boxPosition }
    },
    template: `
    <Game :config="{ width: 400, height: 225, physics: { default: 'arcade', arcade: { debug: true } } }">
      <Scene name="Scene" @preload="preload">
        <Rectangle
          :x="args.x"
          :y="args.y"
          :width="args.width"
          :height="args.height"
          :originX="args.originX"
          :originY="args.originY"
          :strokeColor="dropped ? 0x42B883 : 0xFF0000"
          />
        <Text
          :text="dropped ? 'Dropped' : 'Drop here'"
          :style="{ fontFamily: 'Helvetica, Arial', color: dropped ? '#42B883' : '#F00', fontSize: '20px' }"
          :x="args.x + args.width / 2"
          :y="args.y + args.height / 2"
          :origin="0.5"
          />
        <Zone
          :x="args.x"
          :y="args.y"
          :width="args.width"
          :height="args.height"
          :originX="args.originX"
          :originY="args.originY"
          :dropZone="true"
          />
        <Image
          :x="boxPosition.x"
          :y="boxPosition.y"
          :origin="0"
          :texture="'box'"
          @drag="drag"
          @drop="drop"
          >
        </Image>
      </Scene>
    </Game>`,
  }),
}

export default meta
