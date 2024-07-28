import 'phaser'
import { Game, Scene, Polygon } from '../../'
import type { Meta, StoryObj } from '@storybook/vue3'
import { referPhaserVersion, take } from './utils'

type Story = StoryObj<typeof Polygon>

const description = `
The Polygon Shape is a Game Object that can be added to a Scene, Group or Container.  
You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics.  
It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.

This shape supports both fill and stroke colors.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Polygon :fillColor="0xFFFFFF" :points="[[0, 0], [100, 10], [150, 100], [60, 110], [10, 70]]" />
  </Scene>
</Game>
\`\`\`

See also: [Phaser.GameObjects.Polygon](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.GameObjects.Polygon)
`

const meta: Meta<typeof Polygon> = {
  title: 'GameObjects/Polygon',
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  component: Polygon,
  tags: ['autodocs'],
  args: {
    active: true,
    visible: true,
    x: 30,
    y: 30,
    points: [[0, 0], [100, 10], [150, 100], [60, 110], [10, 70]],
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
    points: {
      description: 'The points that make up the polygon.',
      table: {
        category: 'Props',
        type: { summary: 'number[] | number[][] | Phaser.Math.Vector2[] | Phaser.Types.Math.Vector2Like[]' }
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
    components: { Game, Scene, Polygon },
    setup() {
      return { args }
    },
    template: `
      <Game :config="{ width: 400, height: 225 }">
        <Scene name="Scene">
          <Polygon
            :visible="args.visible"
            :x="args.x"
            :y="args.y"
            :points="args.points"
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
      </Game>`
  })
}

export default meta