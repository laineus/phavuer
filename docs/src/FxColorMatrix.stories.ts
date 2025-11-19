import type { Meta, StoryObj } from '@storybook/vue3'
import { FxColorMatrix, Game, Image, Scene } from '../../'
import { referPhaserVersion } from './utils'
import 'phaser'

type Story = StoryObj<typeof FxColorMatrix>

const description = `
Adds a ColorMatrix effect.

The color matrix effect is a visual technique that involves manipulating the colors of an image or scene using a mathematical matrix. This process can adjust hue, saturation, brightness, and contrast, allowing developers to create various stylistic appearances or mood settings within the game. Common applications include simulating different lighting conditions, applying color filters, or achieving a specific visual style.

**Note:** To apply multiple ColorMatrix effects, use separate FxColorMatrix components:

\`\`\`html
<Game>
  <Scene name="SceneName">
    <Image :texture="'logo'">
      <FxColorMatrix :brightness="0.8" />
      <FxColorMatrix :sepia="true" />
    </Image>
  </Scene>
</Game>
\`\`\`

See also: [Phaser.FX.ColorMatrix](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.FX.ColorMatrix)
`

const meta: Meta<typeof FxColorMatrix> = {
  title: 'FX/FxColorMatrix',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: FxColorMatrix as any,
  tags: ['autodocs'],
  args: {
    brightness: 1.5,
    saturate: 0,
    desaturate: 0,
    hue: 0,
    grayscale: 0,
    blackWhite: false,
    contrast: 0,
    negative: false,
    desaturateLuminance: false,
    sepia: false,
    night: 0,
    lsd: false,
    brown: false,
    vintagePinhole: false,
    kodachrome: false,
    technicolor: false,
    polaroid: false,
    shiftToBGR: false,
  },
  argTypes: {
    post: {
      description: 'Use postFX (true) or preFX (false).',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    brightness: {
      description: 'Changes the brightness of this ColorMatrix. 0(black)~1.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    saturate: {
      description: 'Changes the saturation of this ColorMatrix.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    desaturate: {
      description: 'Desaturates this ColorMatrix (removes color from it).',
      table: {
        category: 'Props',
        type: { summary: 'number' },
      },
    },
    hue: {
      description: 'Rotates the hues of this ColorMatrix by the value given in degrees.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    grayscale: {
      description: 'Sets this ColorMatrix to be grayscale. 0(black)~1.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    blackWhite: {
      description: 'Sets this ColorMatrix to be black and white.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    contrast: {
      description: 'Change the contrast of this ColorMatrix.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    negative: {
      description: 'Converts this ColorMatrix to have negative values.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    desaturateLuminance: {
      description: 'Apply a desaturated luminance to this ColorMatrix.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    sepia: {
      description: 'Applies a sepia tone to this ColorMatrix.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    night: {
      description: 'Applies a night vision tone to this ColorMatrix.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0.1' },
      },
    },
    lsd: {
      description: 'Applies a trippy color tone to this ColorMatrix.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    brown: {
      description: 'Applies a brown tone to this ColorMatrix.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    vintagePinhole: {
      description: 'Applies a vintage pinhole color effect to this ColorMatrix.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    kodachrome: {
      description: 'Applies a kodachrome color effect to this ColorMatrix.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    technicolor: {
      description: 'Applies a technicolor color effect to this ColorMatrix.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    polaroid: {
      description: 'Applies a polaroid color effect to this ColorMatrix.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    shiftToBGR: {
      description: 'Shifts the values of this ColorMatrix into BGR order.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
  },
}

export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Image, FxColorMatrix },
    setup() {
      const preload = (scene: Phaser.Scene) => {
        scene.load.image('logo', '/logo.png')
      }
      return { args, preload }
    },
    template: `
      <Game :config="{ 
        width: 400, 
        height: 225,
        type: 2,
        backgroundColor: 0x2c3e50
      }">
        <Scene name="Scene" @preload="preload">
          <Image
            :x="200"
            :y="112"
            :texture="'logo'"
            :originX="0.5"
            :originY="0.5"
            :scale="0.6"
          >
            <!-- Multiple FxColorMatrix components for layered effects -->
            <FxColorMatrix
              v-if="args.brightness"
              :post="true"
              :brightness="args.brightness"
            />
            <FxColorMatrix
              v-if="args.saturate"
              :post="true"
              :saturate="args.saturate"
            />
            <FxColorMatrix
              v-if="args.desaturate"
              :post="true"
              :desaturate="args.desaturate"
            />
            <FxColorMatrix
              v-if="args.hue"
              :post="true"
              :hue="args.hue"
            />
            <FxColorMatrix
              v-if="args.grayscale"
              :post="true"
              :grayscale="args.grayscale"
            />
            <FxColorMatrix
              v-if="args.blackWhite"
              :post="true"
              :blackWhite="true"
            />
            <FxColorMatrix
              v-if="args.contrast"
              :post="true"
              :contrast="args.contrast"
            />
            <FxColorMatrix
              v-if="args.negative"
              :post="true"
              :negative="true"
            />
            <FxColorMatrix
              v-if="args.desaturateLuminance"
              :post="true"
              :desaturateLuminance="true"
            />
            <FxColorMatrix
              v-if="args.sepia"
              :post="true"
              :sepia="true"
            />
            <FxColorMatrix
              v-if="args.night"
              :post="true"
              :night="args.night"
            />
            <FxColorMatrix
              v-if="args.lsd"
              :post="true"
              :lsd="true"
            />
            <FxColorMatrix
              v-if="args.brown"
              :post="true"
              :brown="true"
            />
            <FxColorMatrix
              v-if="args.vintagePinhole"
              :post="true"
              :vintagePinhole="true"
            />
            <FxColorMatrix
              v-if="args.kodachrome"
              :post="true"
              :kodachrome="true"
            />
            <FxColorMatrix
              v-if="args.technicolor"
              :post="true"
              :technicolor="true"
            />
            <FxColorMatrix
              v-if="args.polaroid"
              :post="true"
              :polaroid="true"
            />
            <FxColorMatrix
              v-if="args.shiftToBGR"
              :post="true"
              :shiftToBGR="true"
            />
          </Image>
        </Scene>
      </Game>`,
  }),
}

export default meta
