import type { Meta, StoryObj } from '@storybook/vue3'
import { Game, Gradient, Scene } from '../../'
import { referPhaserVersion, take } from './utils'
import 'phaser'

type Story = StoryObj<typeof Gradient>

const description = `
A Gradient Game Object renders a GPU-based gradient rectangle using a WebGL shader.  
It supports multiple gradient shapes (linear, radial, conic) and animated offsets.

Unlike the fill gradient available on shapes like Rectangle, this object uses a \`ColorRamp\` for its color data, allowing much more complex multi-color gradients.

> **Note:** This Game Object requires WebGL. It will not render in Canvas mode.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Gradient
      :x="100"
      :y="100"
      :width="200"
      :height="200"
      :bands="[{ colorStart: '#42b883', colorEnd: '#1a1a2e' }]"
      :shape-mode="0"
    />
  </Scene>
</Game>
\`\`\`

See also: [Phaser.GameObjects.Gradient](https://docs.phaser.io/api-documentation/class/gameobjects-gradient) (Phaser ${referPhaserVersion})
`

const meta: Meta<typeof Gradient> = {
  title: 'GameObjects/Gradient',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: Gradient as any,
  tags: ['autodocs'],
  args: {
    active: true,
    visible: true,
    x: 30,
    y: 30,
    width: 200,
    height: 120,
    offset: 0,
    repeatMode: 0,
    shapeMode: 0,
    dither: false,
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
      'bands',
      'length',
      'direction',
      'offset',
      'repeatMode',
      'shapeMode',
      'dither',
      'start',
      'shape',
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

const defaultBands = [{ colorStart: '#42b883', colorEnd: '#1a1a2e' }]

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Gradient },
    setup() {
      return { args, defaultBands }
    },
    template: `
      <Game :config="{ width: 400, height: 225, backgroundColor: '#334455' }">
        <Scene name="Scene">
          <Gradient
            :visible="args.visible"
            :x="args.x"
            :y="args.y"
            :origin="0"
            :width="args.width"
            :height="args.height"
            :bands="defaultBands"
            :offset="args.offset"
            :repeatMode="args.repeatMode"
            :shapeMode="args.shapeMode"
            :dither="args.dither"
            :scaleX="args.scaleX"
            :scaleY="args.scaleY"
            :alpha="args.alpha"
            :rotation="args.rotation"
          />
        </Scene>
      </Game>`,
  }),
}

export default meta
