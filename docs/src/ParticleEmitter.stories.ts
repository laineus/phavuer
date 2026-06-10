import type { Meta, StoryObj } from '@storybook/vue3'
import { Game, ParticleEmitter, Scene } from '../../'
import { referPhaserVersion, take } from './utils'
import light from './assets/light.png'
import { computed } from 'vue'
import 'phaser'

interface StoryArgs {
  x: number
  y: number
  visible: boolean
  rotation: number
  scaleX: number
  scaleY: number
  depth: number
  alpha: number
  lighting: boolean
  emitting: boolean
  config?: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig
  onComplete?: (...args: any[]) => void
  onStart?: (...args: any[]) => void
  onStop?: (...args: any[]) => void
  onExplode?: (...args: any[]) => void
  onDeathzone?: (...args: any[]) => void
  // Config
  frequency: number
  quantity: number
  lifespan: number
  gravityX: number
  gravityY: number
  'speed.min': number
  'speed.max': number
  'angle.min': number
  'angle.max': number
  'alpha.start': number
  'alpha.end': number
  'scale.start': number
  'scale.end': number
  tint: string
}

type Story = StoryObj<StoryArgs>

const description = `
A Particle Emitter Game Object that produces a stream of particles based on a configuration.

Particles can simulate fire, rain, explosions, sparkles, or any other particle-based visual effect.

\`\`\`html
<Game>
  <Scene name="SceneName" @preload="preload" v-slot="{ preloaded }">
    <ParticleEmitter
      v-if="preloaded"
      texture="particle"
      :x="200"
      :y="112"
      :emitting="true"
      :config="{ lifespan: 1500, speed: { min: 50, max: 120 }, quantity: 2 }"
    />
  </Scene>
</Game>
\`\`\`

See also: [Phaser.GameObjects.Particles.ParticleEmitter](https://docs.phaser.io/api-documentation/class/gameobjects-particles-particleemitter) (Phaser ${referPhaserVersion})
`

const meta: Meta<StoryArgs> = {
  title: 'GameObjects/ParticleEmitter',
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  component: ParticleEmitter as any,
  tags: ['autodocs'],
  args: {
    x: 200,
    y: 112,
    visible: true,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    depth: 0,
    alpha: 1,
    lighting: false,
    emitting: true,
    // Config
    frequency: 0,
    quantity: 2,
    lifespan: 1500,
    gravityX: 0,
    gravityY: 150,
    'speed.min': 50,
    'speed.max': 120,
    'angle.min': 250,
    'angle.max': 290,
    'alpha.start': 1,
    'alpha.end': 0,
    'scale.start': 0.5,
    'scale.end': 0.1,
    tint: '#42B883',
  },
  argTypes: {
    ...take(
      'x',
      'y',
      'texture',
      'frame',
      'active',
      'visible',
      'rotation',
      'scale',
      'scaleX',
      'scaleY',
      'depth',
      'alpha',
      'blendMode',
      'lighting',
      'scrollFactor',
      'scrollFactorX',
      'scrollFactorY',
      'tween',
      'tweens',
      'timeline',
      'create',
    ),
    emitting: {
      control: 'boolean',
      description: 'Whether this emitter is currently emitting particles.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    config: {
      control: false,
      description: 'Particle emitter configuration. Changes trigger `updateConfig()` via deep watch.',
      table: {
        category: 'Props',
        type: { summary: 'Phaser.Types.GameObjects.Particles.ParticleEmitterConfig' },
      },
    },
    // Config controls
    frequency: {
      control: { type: 'number', min: 0, step: 10 },
      description: '`config.frequency` — ms between emissions. `0` = every frame.',
      table: { category: 'Config', type: { summary: 'number' }, defaultValue: { summary: '0' } },
    },
    quantity: {
      control: { type: 'number', min: 1, step: 1 },
      description: '`config.quantity` — Particles emitted per cycle.',
      table: { category: 'Config', type: { summary: 'number' }, defaultValue: { summary: '1' } },
    },
    lifespan: {
      control: { type: 'number', min: 100, step: 100 },
      description: '`config.lifespan` — Particle lifetime in ms.',
      table: { category: 'Config', type: { summary: 'number' }, defaultValue: { summary: '1000' } },
    },
    gravityX: {
      control: { type: 'number', step: 10 },
      description: '`config.gravityX` — Horizontal gravity in px/s².',
      table: { category: 'Config', type: { summary: 'number' }, defaultValue: { summary: '0' } },
    },
    gravityY: {
      control: { type: 'number', step: 10 },
      description: '`config.gravityY` — Vertical gravity in px/s².',
      table: { category: 'Config', type: { summary: 'number' }, defaultValue: { summary: '0' } },
    },
    'speed.min': {
      control: { type: 'number', min: 0, step: 10 },
      description: '`config.speed.min` — Minimum emit speed in px/s.',
      table: { category: 'Config', type: { summary: 'number' } },
    },
    'speed.max': {
      control: { type: 'number', min: 0, step: 10 },
      description: '`config.speed.max` — Maximum emit speed in px/s.',
      table: { category: 'Config', type: { summary: 'number' } },
    },
    'angle.min': {
      control: { type: 'number', min: 0, max: 360, step: 5 },
      description: '`config.angle.min` — Minimum emit angle in degrees.',
      table: { category: 'Config', type: { summary: 'number' } },
    },
    'angle.max': {
      control: { type: 'number', min: 0, max: 360, step: 5 },
      description: '`config.angle.max` — Maximum emit angle in degrees.',
      table: { category: 'Config', type: { summary: 'number' } },
    },
    'alpha.start': {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: '`config.alpha.start` — Particle alpha at birth.',
      table: { category: 'Config', type: { summary: 'number' }, defaultValue: { summary: '1' } },
    },
    'alpha.end': {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: '`config.alpha.end` — Particle alpha at death.',
      table: { category: 'Config', type: { summary: 'number' }, defaultValue: { summary: '0' } },
    },
    'scale.start': {
      control: { type: 'range', min: 0, max: 3, step: 0.05 },
      description: '`config.scale.start` — Particle scale at birth.',
      table: { category: 'Config', type: { summary: 'number' }, defaultValue: { summary: '1' } },
    },
    'scale.end': {
      control: { type: 'range', min: 0, max: 3, step: 0.05 },
      description: '`config.scale.end` — Particle scale at death.',
      table: { category: 'Config', type: { summary: 'number' }, defaultValue: { summary: '1' } },
    },
    tint: {
      control: 'color',
      description: '`config.tint` — Particle tint color.',
      table: { category: 'Config', type: { summary: 'number' } },
    },
    onComplete: {
      name: '@complete',
      control: false,
      description: 'Fired when the last particle emitted by a stopped emitter dies.<br>**Parameters:**<br>emitter: `Phaser.GameObjects.Particles.ParticleEmitter`',
      table: { category: 'Emits', type: { summary: 'function' } },
    },
    onStart: {
      name: '@start',
      control: false,
      description: 'Fired when the emitter starts emitting particles.<br>**Parameters:**<br>emitter: `Phaser.GameObjects.Particles.ParticleEmitter`',
      table: { category: 'Emits', type: { summary: 'function' } },
    },
    onStop: {
      name: '@stop',
      control: false,
      description: 'Fired when the emitter stops.<br>**Parameters:**<br>emitter: `Phaser.GameObjects.Particles.ParticleEmitter`',
      table: { category: 'Emits', type: { summary: 'function' } },
    },
    onExplode: {
      name: '@explode',
      control: false,
      description: 'Fired when `explode()` is called on the emitter.<br>**Parameters:**<br>emitter: `Phaser.GameObjects.Particles.ParticleEmitter`<br>particle: `Phaser.GameObjects.Particles.Particle | undefined`',
      table: { category: 'Emits', type: { summary: 'function' } },
    },
    onDeathzone: {
      name: '@deathzone',
      control: false,
      description: 'Fired when a particle is killed by a death zone.<br>**Parameters:**<br>emitter: `Phaser.GameObjects.Particles.ParticleEmitter`<br>particle: `Phaser.GameObjects.Particles.Particle`<br>zone: `Phaser.GameObjects.Particles.Zones.DeathZone`',
      table: { category: 'Emits', type: { summary: 'function' } },
    },
  },
}

// Fountain / flow emitter
export const Default: Story = {
  render: (args: any) => ({
    components: { Game, Scene, ParticleEmitter },
    setup() {
      const preload = (scene: Phaser.Scene) => {
        scene.load.image('light', light)
      }
      const config = computed(() => ({
        frequency: args.frequency,
        quantity: args.quantity,
        lifespan: args.lifespan,
        gravityX: args.gravityX,
        gravityY: args.gravityY,
        speed: { min: args['speed.min'], max: args['speed.max'] },
        angle: { min: args['angle.min'], max: args['angle.max'] },
        alpha: { start: args['alpha.start'], end: args['alpha.end'] },
        scale: { start: args['scale.start'], end: args['scale.end'] },
        tint: parseInt((args.tint as string).replace('#', ''), 16),
      }))
      return { args, preload, config }
    },
    template: `
      <Game :config="{ width: 400, height: 225, backgroundColor: '#001122' }">
        <Scene name="Scene" @preload="preload" v-slot="{ preloaded }">
          <ParticleEmitter
            v-if="preloaded"
            texture="light"
            :x="args.x"
            :y="args.y"
            :visible="args.visible"
            :rotation="args.rotation"
            :scaleX="args.scaleX"
            :scaleY="args.scaleY"
            :depth="args.depth"
            :alpha="args.alpha"
            :lighting="args.lighting"
            :emitting="args.emitting"
            :config="config"
          />
        </Scene>
      </Game>`,
  }),
}

export default meta
