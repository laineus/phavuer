import type { Meta, StoryObj } from '@storybook/vue3'
import { Game, Image, Scene } from '../../'
import { referPhaserVersion, take } from './utils'
import 'phaser'

type Story = StoryObj<typeof Image>

const description = `
An Image Game Object.

An Image is a light-weight Game Object useful for the display of static images in your game, such as logos, backgrounds, scenery or other non-animated elements.  
Images can have input events and physics bodies, or be tweened, tinted or scrolled.  
The main difference between an Image and a Sprite is that you cannot animate an Image as they do not have the Animation component.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Image :texture="'textureName'" />
  </Scene>
</Game>
\`\`\`

See also: [Phaser.GameObjects.Image](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.GameObjects.Image)
`

const meta: Meta<typeof Image> = {
  title: 'GameObjects/Image',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: Image as any,
  tags: ['autodocs'],
  args: {
    active: true,
    visible: true,
    x: 30,
    y: 30,
    texture: undefined,
    frame: 1,
    tint: '0xFFFFFF' as unknown as number,
    flipX: false,
    flipY: false,
    scale: 0.6,
    scaleX: 0.6,
    scaleY: 0.6,
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
      'texture',
      'frame',
      'tint',
      'flipX',
      'flipY',
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
    components: { Game, Scene, Image },
    setup() {
      const preload = (scene: Phaser.Scene) => {
        scene.load.image('logo', '/logo.png')
      }
      return { args, preload }
    },
    template: `
      <Game :config="{ width: 400, height: 225 }">
        <Scene name="Scene" @preload="preload">
          <Image
            :texture="'logo'"
            :visible="args.visible"
            :x="args.x"
            :y="args.y"
            :tint="Number(args.tint)"
            :flipX="args.flipX"
            :flipY="args.flipY"
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
