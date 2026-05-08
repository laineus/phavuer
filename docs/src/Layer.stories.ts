import type { Meta, StoryObj } from '@storybook/vue3'
import { Game, Layer, Rectangle, Scene } from '../../'
import { referPhaserVersion, take } from './utils'
import 'phaser'

type Story = StoryObj<typeof Layer>

const description = `
A Layer is a special type of Game Object that acts as a Display List. You can add any type of Game Object to a Layer, just as you would to a Scene. Layers can be used to visually group together 'layers' of Game Objects.

The Layer class also offers many different methods for manipulating the list, such as the methods \`moveUp\`, \`moveDown\`, \`sendToBack\`, \`bringToTop\` and so on.

Layers have no position or size within the Scene. This means you cannot enable a Layer for physics or input, or change the position, rotation or scale of a Layer.

However, you can set the Alpha, Blend Mode, Depth, Mask and Visible state of a Layer. These settings will impact all children being rendered by the Layer.

If you need those kind of features then you should use a Container instead.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Layer>
      <GameObject />
      <GameObject />
    </Layer>
  </Scene>
</Game>
\`\`\`

See also: [Phaser.GameObjects.Layer](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.GameObjects.Layer)
`

const meta: Meta<typeof Layer> = {
  title: 'GameObjects/Layer',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: Layer as any,
  tags: ['autodocs'],
  args: {
    active: true,
    visible: true,
    depth: 0,
    alpha: 1,
  },
  argTypes: {
    ...take(
      'active',
      'visible',
      'depth',
      'alpha',
      'blendMode',
      'create',
    ),
  },
}

export default meta

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Layer, Rectangle },
    setup() {
      return { args }
    },
    template: `
      <Game :config="{ width: 400, height: 225 }">
        <Scene name="Scene">
          <Layer
            :visible="args.visible"
            :alpha="args.alpha"
            >
            <Rectangle :x="100" :y="112" :width="100" :height="100" :fillColor="0x42B883" />
            <Rectangle :x="220" :y="112" :width="100" :height="100" :fillColor="0x35495E" />
          </Layer>
        </Scene>
      </Game>`,
  }),
}
