import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, ref } from 'vue'
import { Camera, Circle, Game, Rectangle, Scene, Text } from '../../'
import { referPhaserVersion } from './utils'
import 'phaser'

type Story = StoryObj<typeof Camera>

const description = `
Use two decoupled cameras: one for the world (with zoom/scroll), one for the HUD (fixed, no zoom).
The Camera component automatically isolates objects between cameras using \`camera.ignore()\`.

\`\`\`html
<Camera :main="true" :zoom="zoom" :x="scrollX" :y="scrollY">
  <!-- World objects (affected by zoom/scroll) -->
  <Rectangle :x="500" :y="300" :width="100" :height="100" />
</Camera>
<Camera>
  <!-- HUD objects (always 1:1, unaffected by world camera) -->
  <Text text="Score: 100" :x="10" :y="10" />
</Camera>
\`\`\`
`

const meta: Meta<typeof Camera> = {
  title: 'Core/Camera',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: Camera as any,
  tags: ['autodocs'],
  args: {},
  argTypes: ({
    default: {
      control: false,
      table: {
        category: 'Slots',
        type: { summary: '{ camera: Phaser.Cameras.Scene2D.Camera, zoom: number }' },
      },
    },
    main: {
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    x: {
      table: {
        category: 'Props',
        type: { summary: 'number' },
      },
    },
    y: {
      table: {
        category: 'Props',
        type: { summary: 'number' },
      },
    },
    zoom: {
      table: {
        category: 'Props',
        type: { summary: 'number' },
      },
    },
    rotation: {
      table: {
        category: 'Props',
        type: { summary: 'number' },
      },
    },
    follow: {
      table: {
        category: 'Props',
        type: { summary: 'Phaser.GameObjects.GameObject' },
      },
    },
    bounds: {
      table: {
        category: 'Props',
        type: { summary: 'Phaser.Geom.Rectangle' },
      },
    },
    create: {
      name: '@create',
      control: false,
      description: '**Parameters:**<br>camera: `Phaser.Cameras.Scene2D.Camera`',
      table: {
        category: 'Emits',
        type: { summary: 'function' },
      },
    },
  }) as Meta<typeof Camera>['argTypes'],
}

const textStyle = { fontFamily: 'monospace', color: '#FFF', fontSize: '16px' }
const hudStyle = { fontFamily: 'monospace', color: '#42B883', fontSize: '14px' }

export const WorldAndHUD: Story = {
  render: () => ({
    components: { Game, Scene, Camera, Rectangle, Circle, Text },
    setup() {
      const zoom = ref(1)
      const scrollX = ref(0)
      const scrollY = ref(0)
      const playerX = ref(400)
      const playerY = ref(300)
      const moveSpeed = 200

      const update = (_scene: Phaser.Scene, _time: number, delta: number) => {
        const dt = delta / 1000
        if (keys.value['ArrowLeft'] || keys.value['a']) scrollX.value -= moveSpeed * dt
        if (keys.value['ArrowRight'] || keys.value['d']) scrollX.value += moveSpeed * dt
        if (keys.value['ArrowUp'] || keys.value['w']) scrollY.value -= moveSpeed * dt
        if (keys.value['ArrowDown'] || keys.value['s']) scrollY.value += moveSpeed * dt
      }

      const keys = ref<Record<string, boolean>>({})
      const onKeyDown = (e: KeyboardEvent) => { keys.value[e.key] = true }
      const onKeyUp = (e: KeyboardEvent) => { keys.value[e.key] = false }

      const zoomIn = () => { zoom.value = Math.min(zoom.value * 1.2, 5) }
      const zoomOut = () => { zoom.value = Math.max(zoom.value / 1.2, 0.2) }
      const resetCamera = () => { zoom.value = 1; scrollX.value = 0; scrollY.value = 0 }

      return { zoom, scrollX, scrollY, playerX, playerY, update, onKeyDown, onKeyUp, zoomIn, zoomOut, resetCamera, textStyle, hudStyle }
    },
    template: `
      <Game :config="{ width: 800, height: 500 }">
        <Scene name="Main" @update="update">
          <!-- World camera: handles zoom and scroll -->
          <Camera :main="true" :zoom="zoom" :x="scrollX" :y="scrollY">
            <!-- World grid -->
            <Rectangle v-for="i in 20" :key="'gx'+i" :x="i * 100" :y="500" :width="2" :height="1000" :fillColor="0x222244" />
            <Rectangle v-for="i in 20" :key="'gy'+i" :x="0" :y="i * 100" :width="2000" :height="2" :fillColor="0x222244" />

            <!-- World objects -->
            <Rectangle :x="300" :y="200" :width="80" :height="80" :fillColor="0xFF6B6B" :radius="4" />
            <Rectangle :x="600" :y="400" :width="120" :height="60" :fillColor="0x4ECDC4" :radius="4" />
            <Rectangle :x="150" :y="500" :width="60" :height="150" :fillColor="0xFFE66D" :radius="4" />
            <Circle :x="800" :y="200" :radius="40" :fillColor="0xA8E6CF" />
            <Circle :x="500" :y="600" :radius="60" :fillColor="0xFF8B94" />

            <!-- Player -->
            <Rectangle :x="playerX" :y="playerY" :width="32" :height="32" :fillColor="0xFFFFFF" />
          </Camera>

          <!-- HUD camera: fixed, no zoom, renders on top -->
          <Camera>
            <!-- HUD background -->
            <Rectangle :x="10" :y="10" :width="220" :height="120" :fillColor="0x000000" :fillAlpha="0.6" :radius="8" />
            <Text :text="'Camera HUD'" :x="20" :y="18" :style="{ ...hudStyle, fontSize: '18px', fontStyle: 'bold' }" />
            <Text :text="'Zoom: ' + zoom.toFixed(2) + 'x'" :x="20" :y="42" :style="hudStyle" />
            <Text :text="'Scroll X: ' + scrollX.toFixed(0)" :x="20" :y="62" :style="hudStyle" />
            <Text :text="'Scroll Y: ' + scrollY.toFixed(0)" :x="20" :y="82" :style="hudStyle" />
            <Text :text="'WASD/Arrows to scroll'" :x="20" :y="108" :style="{ ...hudStyle, fontSize: '12px', color: '#888' }" />

            <!-- HUD buttons -->
            <Rectangle :x="680" :y="10" :width="50" :height="30" :fillColor="0x42B883" :radius="4" @pointerdown="zoomIn" />
            <Text text="+" :x="705" :y="25" :style="{ ...textStyle, fontSize: '20px' }" :origin="0.5" />

            <Rectangle :x="740" :y="10" :width="50" :height="30" :fillColor="0xFF6B6B" :radius="4" @pointerdown="zoomOut" />
            <Text text="-" :x="765" :y="25" :style="{ ...textStyle, fontSize: '20px' }" :origin="0.5" />

            <Rectangle :x="680" :y="50" :width="110" :height="30" :fillColor="0x333" :radius="4" @pointerdown="resetCamera" />
            <Text text="Reset" :x="735" :y="65" :style="textStyle" :origin="0.5" />
          </Camera>
        </Scene>
      </Game>
    `,
    mounted() {
      window.addEventListener('keydown', this.onKeyDown)
      window.addEventListener('keyup', this.onKeyUp)
    },
    beforeUnmount() {
      window.removeEventListener('keydown', this.onKeyDown)
      window.removeEventListener('keyup', this.onKeyUp)
    },
  }),
}

export const FollowPlayer: Story = {
  render: () => ({
    components: { Game, Scene, Camera, Rectangle, Circle, Text },
    setup() {
      const zoom = ref(1.5)
      const playerRef = ref<any>(null)
      const playerX = ref(400)
      const playerY = ref(300)
      const moveSpeed = 200

      const update = (_scene: Phaser.Scene, _time: number, delta: number) => {
        const dt = delta / 1000
        if (keys.value['ArrowLeft'] || keys.value['a']) playerX.value -= moveSpeed * dt
        if (keys.value['ArrowRight'] || keys.value['d']) playerX.value += moveSpeed * dt
        if (keys.value['ArrowUp'] || keys.value['w']) playerY.value -= moveSpeed * dt
        if (keys.value['ArrowDown'] || keys.value['s']) playerY.value += moveSpeed * dt
      }

      const keys = ref<Record<string, boolean>>({})
      const onKeyDown = (e: KeyboardEvent) => { keys.value[e.key] = true }
      const onKeyUp = (e: KeyboardEvent) => { keys.value[e.key] = false }

      const onPlayerCreate = (obj: any) => { playerRef.value = obj }

      return { zoom, playerRef, playerX, playerY, update, onKeyDown, onKeyUp, onPlayerCreate, textStyle, hudStyle }
    },
    template: `
      <Game :config="{ width: 800, height: 500 }">
        <Scene name="Main" @update="update">
          <Camera :main="true" :zoom="zoom" :follow="playerRef" :followLerp="0.1">
            <!-- World -->
            <Rectangle v-for="i in 30" :key="'t'+i" :x="i * 120 - 200" :y="100 + Math.sin(i) * 80" :width="40" :height="40" :fillColor="0x2D5F2D" />
            <Rectangle v-for="i in 15" :key="'b'+i" :x="i * 200" :y="500 + Math.cos(i) * 60" :width="60" :height="60" :fillColor="0x4A7C59" />
            <Circle v-for="i in 10" :key="'c'+i" :x="i * 250 + 50" :y="300 + Math.sin(i * 2) * 100" :radius="25" :fillColor="0x8FBC8F" />

            <!-- Player -->
            <Rectangle :x="playerX" :y="playerY" :width="32" :height="32" :fillColor="0xFFFFFF" @create="onPlayerCreate" />
          </Camera>

          <!-- HUD -->
          <Camera>
            <Rectangle :x="10" :y="10" :width="200" :height="50" :fillColor="0x000000" :fillAlpha="0.6" :radius="8" />
            <Text :text="'WASD to move player'" :x="20" :y="22" :style="hudStyle" />
            <Text :text="'Camera follows with lerp'" :x="20" :y="42" :style="{ ...hudStyle, fontSize: '12px', color: '#888' }" />
          </Camera>
        </Scene>
      </Game>
    `,
    mounted() {
      window.addEventListener('keydown', this.onKeyDown)
      window.addEventListener('keyup', this.onKeyUp)
    },
    beforeUnmount() {
      window.removeEventListener('keydown', this.onKeyDown)
      window.removeEventListener('keyup', this.onKeyUp)
    },
  }),
}

export const BoundedCamera: Story = {
  render: () => ({
    components: { Game, Scene, Camera, Rectangle, Circle, Text },
    setup() {
      const playerRef = ref<any>(null)
      const playerX = ref(400)
      const playerY = ref(300)
      const moveSpeed = 200

      const worldBounds = { x: 0, y: 0, width: 1600, height: 1200 }

      const update = (_scene: Phaser.Scene, _time: number, delta: number) => {
        const dt = delta / 1000
        if (keys.value['ArrowLeft'] || keys.value['a']) playerX.value -= moveSpeed * dt
        if (keys.value['ArrowRight'] || keys.value['d']) playerX.value += moveSpeed * dt
        if (keys.value['ArrowUp'] || keys.value['w']) playerY.value -= moveSpeed * dt
        if (keys.value['ArrowDown'] || keys.value['s']) playerY.value += moveSpeed * dt
      }

      const keys = ref<Record<string, boolean>>({})
      const onKeyDown = (e: KeyboardEvent) => { keys.value[e.key] = true }
      const onKeyUp = (e: KeyboardEvent) => { keys.value[e.key] = false }

      const onPlayerCreate = (obj: any) => { playerRef.value = obj }

      return { playerRef, playerX, playerY, worldBounds, update, onKeyDown, onKeyUp, onPlayerCreate, textStyle, hudStyle }
    },
    template: `
      <Game :config="{ width: 800, height: 500 }">
        <Scene name="Main" @update="update">
          <Camera :main="true" :follow="playerRef" :followLerp="0.1" :bounds="worldBounds">
            <!-- World bounds outline -->
            <Rectangle :x="worldBounds.width / 2" :y="worldBounds.height / 2" :width="worldBounds.width" :height="worldBounds.height" :fillColor="0x1a1a2e" />
            <Rectangle :x="worldBounds.width / 2" :y="0" :width="4" :height="worldBounds.height" :fillColor="0xFF6B6B" />
            <Rectangle :x="worldBounds.width / 2" :y="worldBounds.height" :width="4" :height="worldBounds.height" :fillColor="0xFF6B6B" />
            <Rectangle :x="0" :y="worldBounds.height / 2" :width="worldBounds.width" :height="4" :fillColor="0xFF6B6B" />
            <Rectangle :x="worldBounds.width" :y="worldBounds.height / 2" :width="worldBounds.width" :height="4" :fillColor="0xFF6B6B" />

            <!-- World content inside bounds -->
            <Rectangle v-for="i in 12" :key="'t'+i" :x="i * 140" :y="100 + Math.sin(i) * 80" :width="40" :height="40" :fillColor="0x2D5F2D" />
            <Rectangle v-for="i in 8" :key="'b'+i" :x="i * 200 + 100" :y="800 + Math.cos(i) * 60" :width="60" :height="60" :fillColor="0x4A7C59" />
            <Circle v-for="i in 8" :key="'c'+i" :x="i * 200 + 50" :y="500 + Math.sin(i * 2) * 100" :radius="25" :fillColor="0x8FBC8F" />

            <!-- Player -->
            <Rectangle :x="playerX" :y="playerY" :width="32" :height="32" :fillColor="0xFFFFFF" @create="onPlayerCreate" />
          </Camera>

          <!-- HUD -->
          <Camera>
            <Rectangle :x="10" :y="10" :width="280" :height="70" :fillColor="0x000000" :fillAlpha="0.6" :radius="8" />
            <Text :text="'Bounded Camera Demo'" :x="20" :y="18" :style="{ ...hudStyle, fontSize: '16px', fontStyle: 'bold' }" />
            <Text :text="'WASD to move player'" :x="20" :y="40" :style="hudStyle" />
            <Text :text="'Camera stops at red bounds (1600x1200)'" :x="20" :y="60" :style="{ ...hudStyle, fontSize: '12px', color: '#888' }" />
          </Camera>
        </Scene>
      </Game>
    `,
    mounted() {
      window.addEventListener('keydown', this.onKeyDown)
      window.addEventListener('keyup', this.onKeyUp)
    },
    beforeUnmount() {
      window.removeEventListener('keydown', this.onKeyDown)
      window.removeEventListener('keyup', this.onKeyUp)
    },
  }),
}

export default meta
