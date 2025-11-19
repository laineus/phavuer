import type { Meta, StoryObj } from '@storybook/vue3'
import { Game, Rectangle, Scene } from '../../'
import { referPhaserVersion, take } from './utils'
import 'phaser'

type Story = StoryObj<typeof Rectangle>

const description = `
The Rectangle Shape is a Game Object that can be added to a Scene, Group or Container.  
You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics.  
It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.

This shape supports both fill and stroke colors.

You can change the size of the rectangle by changing the width and height properties.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Rectangle :width="100" :height="100" :fillColor="0xFFFFFF" />
  </Scene>
</Game>
\`\`\`

See also: [Phaser.GameObjects.Rectangle](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.GameObjects.Rectangle)
`

const meta: Meta<typeof Rectangle> = {
  title: 'GameObjects/Rectangle',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: Rectangle as any,
  tags: ['autodocs'],
  args: {
    active: true,
    visible: true,
    x: 30,
    y: 30,
    width: 100,
    height: 100,
    radius: 5,
    fillColor: '0x42B883' as unknown as number,
    fillAlpha: 1,
    lineWidth: 2,
    strokeColor: '0xFFFFFF' as unknown as number,
    strokeAlpha: 1,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    origin: 0,
    originX: 0,
    originY: 0,
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
      'radius',
      'fillColor',
      'fillAlpha',
      'lineWidth',
      'strokeColor',
      'strokeAlpha',
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
      'drop',
    ),
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Rectangle },
    setup() {
      return { args }
    },
    template: `
      <Game :config="{ width: 400, height: 225 }">
        <Scene name="Scene">
          <Rectangle
            :visible="args.visible"
            :x="args.x"
            :y="args.y"
            :width="args.width"
            :height="args.height"
            :radius="args.radius"
            :fillColor="Number(args.fillColor)"
            :fillAlpha="args.fillAlpha"
            :lineWidth="args.lineWidth"
            :strokeColor="Number(args.strokeColor)"
            :strokeAlpha="args.strokeAlpha"
            :scaleX="args.scaleX"
            :scaleY="args.scaleY"
            :originX="args.originX"
            :originY="args.originY"
            :alpha="args.alpha"
            :rotation="args.rotation"
            />
        </Scene>
      </Game>`,
  }),
}

export default meta
