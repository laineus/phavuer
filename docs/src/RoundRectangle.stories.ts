import 'phaser'
import { Game, Scene, RoundRectangle } from '../../'
import type { Meta, StoryObj } from '@storybook/vue3'
import { take } from './utils'

type Story = StoryObj<typeof RoundRectangle>

const description = `
The RoundRectangle Shape is a Game Object that can be added to a Scene, Group or Container.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <RoundRectangle :width="100" :height="100" :radius="10" :fillColor="0xFFFFFF" />
  </Scene>
</Game>
\`\`\`

This is Phavuer\'s unique Game Object
`

const meta: Meta<typeof RoundRectangle> = {
  title: 'GameObjects/RoundRectangle',
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  component: RoundRectangle,
  tags: ['autodocs'],
  args: {
    active: true,
    visible: true,
    x: 30,
    y: 30,
    width: 100,
    height: 100,
    radius: 20,
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
      'y',
      'width',
      'height',
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
    components: { Game, Scene, RoundRectangle },
    setup() {
      return { args }
    },
    template: `
      <Game :config="{ width: 400, height: 225 }">
        <Scene name="Scene">
          <RoundRectangle
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
      </Game>`
  })
}

export default meta