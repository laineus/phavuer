import 'phaser'
import { Game, Scene, Line } from '../../'
import type { Meta, StoryObj } from '@storybook/vue3'
import { referPhaserVersion, take } from './utils'

type Story = StoryObj<typeof Line>

const description = `
The Line Shape is a Game Object that can be added to a Scene, Group or Container.  
You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics.  
It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.

This shape supports only stroke colors and cannot be filled.

A Line Shape allows you to draw a line between two points in your game.  
You can control the stroke color and thickness of the line. In WebGL only you can also specify a different thickness for the start and end of the line, allowing you to render lines that taper-off.

If you need to draw multiple lines in a sequence you may wish to use the Polygon Shape instead.

Be aware that as with all Game Objects the default origin is 0.5. If you need to draw a Line between two points and want the x1/y1 values to match the x/y values, then set the origin to 0.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Line :x1="0" :y1="0" :x2="100" :y2="100" :lineWidth="3" :strokeColor="0xFFFFFF" />
  </Scene>
</Game>
\`\`\`

See also: [Phaser.GameObjects.Line](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.GameObjects.Line)
`

const meta: Meta<typeof Line> = {
  title: 'GameObjects/Line',
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  component: Line,
  tags: ['autodocs'],
  args: {
    active: true,
    visible: true,
    x: 30,
    y: 30,
    x1: 0,
    y1: 0,
    x2: 128,
    y2: 0,
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
    rotation: 0
  },
  // @ts-ignore
  argTypes: {
    ...take(
      'default',
      'active',
      'visible',
      'x',
      'y'
    ),
    x1: {
      description: 'The horizontal position of the start of the line.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 0 }
      }
    },
    y1: {
      description: 'The vertical position of the start of the line.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 0 }
      }
    },
    x2: {
      description: 'The horizontal position of the end of the line.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 128 }
      }
    },
    y2: {
      description: 'The vertical position of the end of the line.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 0 }
      }
    },
    ...take(
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
      'drop'
    )
  }
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Line },
    setup() {
      return { args }
    },
    template: `
      <Game :config="{ width: 400, height: 225 }">
        <Scene name="Scene">
          <Line
            :visible="args.visible"
            :x="args.x"
            :y="args.y"
            :x1="args.x1"
            :y1="args.y1"
            :x2="args.x2"
            :y2="args.y2"
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
      </Game>`
  })
}

export default meta