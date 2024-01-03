import 'phaser'
import { Game, Scene, Triangle } from '../../'
import type { Meta, StoryObj } from '@storybook/vue3'
import { referPhaserVersion, take } from './utils'

type Story = StoryObj<typeof Triangle>

const description = `
The Triangle Shape is a Game Object that can be added to a Scene, Group or Container.  
You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics.  
It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.

This shape supports both fill and stroke colors.

The Triangle consists of 3 lines, joining up to form a triangular shape.  
You can control the position of each point of these lines.  
The triangle is always closed and cannot have an open face.  
If you require that, consider using a Polygon instead.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Triangle :x1="0" :y1="128" :x2="64" :y2="0" :x3="128" :y3="128" :fillColor="0xFFFFFF" />
  </Scene>
</Game>
\`\`\`

See also: [Phaser.GameObjects.Triangle](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.GameObjects.Triangle)
`

const meta: Meta<typeof Triangle> = {
  title: 'GameObjects/Triangle',
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  component: Triangle,
  tags: ['autodocs'],
  args: {
    active: true,
    visible: true,
    x: 30,
    y: 30,
    x1: 0,
    y1: 104,
    x2: 60,
    y2: 0,
    x3: 120,
    y3: 104,
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
      description: 'The horizontal position of the first point in the triangle.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 0 }
      }
    },
    y1: {
      description: 'The vertical position of the first point in the triangle.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 128 }
      }
    },
    x2: {
      description: 'The horizontal position of the second point in the triangle.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 64 }
      }
    },
    y2: {
      description: 'The vertical position of the second point in the triangle.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 0 }
      }
    },
    x3: {
      description: 'The horizontal position of the third point in the triangle.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 128 }
      }
    },
    y3: {
      description: 'The vertical position of the third point in the triangle.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 128 }
      }
    },
    ...take(
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
      'drop'
    )
  }
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Triangle },
    setup() {
      return { args }
    },
    template: `
      <Game :config="{ width: 400, height: 225 }">
        <Scene name="Scene">
          <Triangle
            :visible="args.visible"
            :x="args.x"
            :y="args.y"
            :x1="args.x1"
            :y1="args.y1"
            :x2="args.x2"
            :y2="args.y2"
            :x3="args.x3"
            :y3="args.y3"
            :fillColor="args.fillColor"
            :fillAlpha="args.fillAlpha"
            :lineWidth="args.lineWidth"
            :strokeColor="args.strokeColor"
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