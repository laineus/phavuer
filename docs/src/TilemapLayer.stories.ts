import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { Game, Scene, TilemapLayer } from '../../'
import roomJson from './assets/room.json'
import roomImage from './assets/room.png'
import { referPhaserVersion, take } from './utils'
import 'phaser'

type Story = StoryObj<typeof TilemapLayer>

const description = `
A Tilemap Layer is a Game Object that renders LayerData from a Tilemap when used in combination with one, or more, Tilesets.

\`\`\`html
<Game>
  <Scene name="SceneName">
    <TilemapLayer :tilemap="tilemap" :layerIndex="0" :tileset="tilesets" />
  </Scene>
</Game>
\`\`\`

See also: [Phaser.Tilemaps.TilemapLayer](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.Tilemaps.TilemapLayer)
`

const meta: Meta<typeof TilemapLayer> = {
  title: 'Tilemaps/TilemapLayer',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: TilemapLayer as any,
  tags: ['autodocs'],
  args: {
    active: true,
    visible: true,
    x: 0,
    y: 0,
    tilemap: undefined,
    layerIndex: undefined,
    tileset: undefined,
    cullPadding: undefined,
    cullPaddingX: 1,
    cullPaddingY: 1,
    collision: undefined,
    collisionByProperty: undefined,
    width: 0,
    height: 0,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
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
    ),
    tilemap: {
      control: 'none',
      description: 'The Tilemap this layer is a part of.',
      table: {
        category: 'Props',
        type: { summary: 'Phaser.Tilemaps.Tilemap' },
      },
    },
    layerIndex: {
      control: 'none',
      description: 'The index of the LayerData associated with this layer.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
      },
    },
    tileset: {
      control: 'none',
      description: 'The tileset, or an array of tilesets, used to render this layer. Can be a string or a Tileset object.',
      table: {
        category: 'Props',
        type: { summary: 'string | string[] | Phaser.Tilemaps.Tileset | Phaser.Tilemaps.Tileset[]' },
      },
    },
    collision: {
      control: 'none',
      description: 'Sets collision on the given tile or tiles within a layer by index.<br>You can pass in either a single numeric index or an array of indexes: [2, 3, 15, 20].<br>The collides parameter controls if collision will be enabled (true) or disabled (false).',
      table: {
        category: 'Props',
        type: { summary: 'number | number[]' },
      },
    },
    collisionByProperty: {
      control: 'none',
      description: `Sets collision on the tiles within a layer by checking tile properties.<br>If a tile has a property that matches the given properties object, its collision flag will be set.<br>The collides parameter controls if collision will be enabled (true) or disabled (false).<br>Passing in { collides: true } would update the collision flag on any tiles with a "collides" property that has a value of true.<br>Any tile that doesn't have "collides" set to true will be ignored.<br>You can also use an array of values, e.g. { types: ["stone", "lava", "sand" ] }.<br>If a tile has a "types" property that matches any of those values, its collision flag will be updated.`,
      table: {
        category: 'Props',
        type: { summary: 'any' },
      },
    },
    cullPadding: {
      control: 'none',
      description: 'The amount of extra tiles to add to the cull check padding.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    cullPaddingX: {
      description: 'The amount of extra horizontal tiles to add to the cull check padding.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    cullPaddingY: {
      description: 'The amount of extra vertical tiles to add to the cull check padding.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    ...take(
      'width',
      'height',
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
    components: { Game, Scene, TilemapLayer },
    setup() {
      const preload = (scene: Phaser.Scene) => {
        scene.load.image('room', roomImage)
        scene.load.tilemapTiledJSON('room', roomJson)
      }
      const tilemap = ref<Phaser.Tilemaps.Tilemap>()
      const tilesets = ref<Phaser.Tilemaps.Tileset[]>()
      const create = (scene: Phaser.Scene) => {
        tilemap.value = Phaser.Tilemaps.ParseToTilemap(scene, 'room')
        tilesets.value = tilemap.value.tilesets.map((tileset) => {
          return tilemap.value?.addTilesetImage(tileset.name, 'room', 32, 32) as Phaser.Tilemaps.Tileset
        })
      }
      return { args, create, preload, tilemap, tilesets }
    },
    template: `
      <Game :config="{ width: 32 * 13, height: 32 * 8 }">
        <Scene name="Scene" @preload="preload" @create="create">
          <TilemapLayer
            v-for="layer, i in tilemap.layers"
            :key="i"
            :tilemap="tilemap"
            :layerIndex="i"
            :tileset="tilesets"
            :cullPaddingX="args.cullPaddingX"
            :cullPaddingY="args.cullPaddingY"
            :visible="args.visible"
            :x="args.x"
            :y="args.y"
            :width="args.width"
            :height="args.height"
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
