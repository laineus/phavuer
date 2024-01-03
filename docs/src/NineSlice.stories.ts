import 'phaser'
import { Game, Scene, NineSlice } from '../../'
import type { Meta, StoryObj } from '@storybook/vue3'
import { referPhaserVersion, take } from './utils'
import messageWindow from './assets/window.png'

type Story = StoryObj<typeof NineSlice>

const description = `
A Nine Slice Game Object allows you to display a texture-based object that can be stretched both horizontally and vertically, but that retains fixed-sized corners.  
The dimensions of the corners are set via the parameters to this class.

This is extremely useful for UI and button like elements, where you need them to expand to accommodate the content without distorting the texture.

You can also create a 3 slice Game Object.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <!-- 9 slice -->
    <NineSlice
      :texture="'window'"
      :leftWidth="10"
      :rightWidth="10"
      :topHeight="10"
      :bottomHeight="10"
      :width="100"
      :height="100" />
    <!-- 3 slice -->
    <NineSlice
      :texture="'window'"
      :leftWidth="10"
      :rightWidth="10"
      :width="100"
      :height="100" />
  </Scene>
</Game>
\`\`\`

See also: [Phaser.GameObjects.NineSlice](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.GameObjects.NineSlice)
`

const meta: Meta<typeof NineSlice> = {
  title: 'GameObjects/NineSlice',
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  component: NineSlice,
  tags: ['autodocs'],
  args: {
    active: true,
    visible: true,
    x: 30,
    y: 30,
    width: 160,
    height: 100,
    leftWidth: 30,
    rightWidth: 27,
    topHeight: 23,
    bottomHeight: 34,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    origin: 0,
    originX: 0,
    originY: 0,
    depth: 0,
    alpha: 1,
    rotation: 0
  },
  // @ts-ignore
  argTypes: {
    ...take(
      'default',
      'active',
      'visible',
      'x',
      'y',
      'width',
      'height'
    ),
    leftWidth: {
      control: 'none',
      description: 'The size of the left vertical column.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 10 }
      }
    },
    rightWidth: {
      control: 'none',
      description: 'The size of the right vertical column.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 10 }
      }
    },
    topHeight: {
      control: 'none',
      description: 'The size of the top horiztonal column.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 0 }
      }
    },
    bottomHeight: {
      control: 'none',
      description: 'The size of the bottom horiztonal column.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 0 }
      }
    },
    ...take(
      'scale',
      'scaleX',
      'scaleY',
      'origin',
      'originX',
      'originY',
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
      'drop'
    )
  }
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, NineSlice },
    setup() {
      const preload = (scene: Phaser.Scene) => {
        scene.load.image('window', messageWindow)
      }
      return { args, preload }
    },
    template: `
      <Game :config="{ width: 400, height: 225 }">
        <Scene name="Scene" @preload="preload">
          <NineSlice
            :texture="'window'"
            :visible="args.visible"
            :x="args.x"
            :y="args.y"
            :leftWidth="args.leftWidth"
            :rightWidth="args.rightWidth"
            :topHeight="args.topHeight"
            :bottomHeight="args.bottomHeight"
            :width="args.width"
            :height="args.height"
            :scaleX="args.scaleX"
            :scaleY="args.scaleY"
            :originX="args.originX"
            :originY="args.originY"
            :alpha="args.alpha"
            :rotation="args.rotation"
            />
        </Scene>
      </Game>`
  })
}

export default meta