import 'phaser'
import { Game, Scene, Text } from '../../'
import type { Meta, StoryObj } from '@storybook/vue3'
import { referPhaserVersion, take } from './utils'

type Story = StoryObj<typeof Text>

const description = `
A Text Game Object.

Text objects work by creating their own internal hidden Canvas and then renders text to it using the standard Canvas fillText API.  
It then creates a texture from this canvas which is rendered to your game during the render pass.

Because it uses the Canvas API you can take advantage of all the features this offers, such as applying gradient fills to the text, or strokes, shadows and more.  
You can also use custom fonts loaded externally, such as Google or TypeKit Web fonts.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Text
      :text="'Hello world'"
      :style="{
        fontFamily: 'Helvetica, Arial',
        color: '#42B883',
        fontSize: '26px',
        fontStyle: 'bold',
        strokeThickness: 8,
        stroke: '#213547'
      }" />
  </Scene>
</Game>
\`\`\`

See also: [Phaser.GameObjects.Text](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.GameObjects.Text)
`

const meta: Meta<typeof Text> = {
  title: 'GameObjects/Text',
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  component: Text,
  tags: ['autodocs'],
  args: {
    active: true,
    visible: true,
    x: 30,
    y: 30,
    text: 'Hello Phavuer\nHello Phaser\nHello Vue',
    style: { fontFamily: 'Helvetica, Arial', color: '#42B883', fontSize: '26px', fontStyle: 'bold', strokeThickness: 8, stroke: '#213547' },
    lineSpacing: 0,
    padding: { x: 0, y: 0, left: 0, right:0, top: 0, bottom: 0 },
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
    text: {
      description: 'The text this Text object will display.',
      table: {
        category: 'Props',
        type: { summary: 'string | string[]' }
      }
    },
    style: {
      description: 'The text style configuration object.',
      table: {
        category: 'Props',
        type: { summary: 'Phaser.Types.GameObjects.Text.TextStyle' }
      }
    },
    lineSpacing: {
      description: 'The line spacing value.',
      table: {
        category: 'Props',
        type: { summary: 'number' }
      }
    },
    padding: {
      description: 'Specify a padding value which is added to the line width and height when calculating the Text size.',
      table: {
        category: 'Props',
        type: { summary: 'Phaser.Types.GameObjects.Text.TextPadding' }
      }
    },
    ...take(
      'scale',
      'scaleX',
      'scaleY'
    ),
    origin: {
      control: 'none',
      description: 'The origin of this Game Object.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0' }
      }
    },
    originX: {
      control: { step: 0.1, max: 1, min: 0 },
      description: 'The horizontal origin of this Game Object.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0' }
      }
    },
    originY: {
      control: { step: 0.1, max: 1, min: 0 },
      description: 'The vertical origin of this Game Object.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0' }
      }
    },
    ...take(
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
    components: { Game, Scene, Text },
    setup() {
      return { args }
    },
    template: `
      <Game :config="{ width: 400, height: 225 }">
        <Scene name="Scene">
          <Text
            :visible="args.visible"
            :x="args.x"
            :y="args.y"
            :text="args.text"
            :style="args.style"
            :lineSpacing="args.lineSpacing"
            :padding:="args.padding"
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