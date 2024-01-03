import 'phaser'
import { Game, Scene, Sprite } from '../../'
import type { Meta, StoryObj } from '@storybook/vue3'
import { referPhaserVersion, take } from './utils'
import player from './assets/player.png'

type Story = StoryObj<typeof Sprite>

const description = `
A Sprite Game Object.

A Sprite Game Object is used for the display of both static and animated images in your game.  
Sprites can have input events and physics bodies.  
They can also be tweened, tinted, scrolled and animated.

The main difference between a Sprite and an Image Game Object is that you cannot animate Images.  
As such, Sprites take a fraction longer to process and have a larger API footprint due to the Animation Component.  
If you do not require animation then you can safely use Images to replace Sprites in all cases.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Sprite :texture="'textureName'" />
    <Sprite :play="'animName'" />
  </Scene>
</Game>
\`\`\`

See also: [Phaser.GameObjects.Sprite](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.GameObjects.Sprite)
`

const meta: Meta<typeof Sprite> = {
  title: 'GameObjects/Sprite',
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  component: Sprite,
  tags: ['autodocs'],
  args: {
    active: true,
    visible: true,
    x: 30,
    y: 30,
    texture: undefined,
    frame: 1,
    play: 'none',
    tint: '0xFFFFFF' as unknown as number,
    flipX: false,
    flipY: false,
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
      'texture',
      'frame',
    ),
    play: {
      control: 'none',
      description: 'Start playing the given animation key on this Sprite.',
      table: {
        category: 'Props',
        type: { summary: '	string | Phaser.Animations.Animation | Phaser.Types.Animations.PlayAnimationConfig' }
      }
    },
    ...take(
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
      'animationstart',
      'animationupdate',
      'animationrepeat',
      'animationcomplete',
      'animationstop',
      'animationrestart'
    )
  }
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Sprite },
    setup() {
      const preload = (scene: Phaser.Scene) => {
        scene.load.spritesheet('player', player,  { frameWidth: 26, frameHeight: 41, startFrame: 0, endFrame: 2 })
      }
      const create = (scene: Phaser.Scene) => {
        scene.anims.create({
          key: 'player',
          frames: scene.anims.generateFrameNames('player', { end: 2 }),
          frameRate: 3,
          repeat: -1,
          yoyo: true
        })
      }
      return { args, create, preload }
    },
    template: `
      <Game :config="{ width: 400, height: 225 }">
        <Scene name="Scene" @preload="preload" @create="create">
          <Sprite
            :play="'player'"
            :visible="args.visible"
            :x="args.x"
            :y="args.y"
            :tint="args.tint"
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
      </Game>`
  })
}

export default meta