export const referPhaserVersion = '3.90.0'
export const argTypes = {
  default: {
    control: 'none',
    table: {
      category: 'Slots',
      type: { summary: 'Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody' },
    },
  },
  active: {
    control: 'none',
    description: 'The active property of this Game Object.<br>A Game Object with its active property set to true will be updated by the Scenes UpdateList.',
    table: {
      category: 'Props',
      type: { summary: 'boolean' },
      defaultValue: { summary: true },
    },
  },
  visible: {
    control: 'boolean',
    description: 'The visibility of this Game Object.<br>An invisible Game Object will skip rendering, but will still process update logic.',
    table: {
      category: 'Props',
      type: { summary: 'boolean' },
      defaultValue: { summary: true },
    },
  },
  x: {
    description: 'The horizontal position of this Game Object in the world.<br>`v-mode:x` is also available.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: 0 },
    },
  },
  y: {
    description: 'The vertical position of this Game Object in the world.<br>`v-mode:y` is also available.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: 0 },
    },
  },
  width: {
    control: { min: 0 },
    description: 'The width of the Game Object.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: 128 },
    },
  },
  height: {
    control: { min: 0 },
    description: 'The height of the Game Object.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: 128 },
    },
  },
  radius: {
    control: { min: 0 },
    description: 'The radius of the Game Object.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: 128 },
    },
  },
  scale: {
    control: 'none',
    description: 'The scale of this Game Object.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: '1.0' },
    },
  },
  scaleX: {
    control: { step: 0.1, min: 0 },
    description: 'The horizontal scale of this Game Object.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: '1.0' },
    },
  },
  scaleY: {
    control: { step: 0.1, min: 0 },
    description: 'The vertical scale of this Game Object.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: '1.0' },
    },
  },
  origin: {
    control: 'none',
    description: 'The origin of this Game Object.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: '0.5' },
    },
  },
  originX: {
    control: { step: 0.1, max: 1, min: 0 },
    description: 'The horizontal origin of this Game Object.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: '0.5' },
    },
  },
  originY: {
    control: { step: 0.1, max: 1, min: 0 },
    description: 'The vertical origin of this Game Object.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: '0.5' },
    },
  },
  depth: {
    control: 'none',
    description: 'The depth of this Game Object within the Scene. A Game Object with a higher depth value will always render in front of one with a lower value.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: 0 },
    },
  },
  alpha: {
    control: { step: 0.1, max: 1, min: 0 },
    description: 'The alpha value of the Game Object.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: '1.0' },
    },
  },
  rotation: {
    control: { step: Math.PI / 30, max: Math.PI, min: -Math.PI },
    description: 'The rotation of this Game Object.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: 0 },
    },
  },
  fillColor: {
    control: 'text',
    description: 'The color the Game Object will be filled with, i.e. 0xff0000 for red.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: '0x000000' },
    },
  },
  fillAlpha: {
    control: { step: 0.1, max: 1, min: 0 },
    description: 'The alpha the Game Object will be filled with.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: '1.0' },
    },
  },
  lineWidth: {
    control: { min: 0 },
    description: 'The stroke line width used by this Shape.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
    },
  },
  strokeColor: {
    control: 'text',
    description: 'The stroke color used by this Shape.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
    },
  },
  strokeAlpha: {
    control: { step: 0.1, max: 1, min: 0 },
    description: 'The stroke alpha value used by this Shape.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: '1.0' },
    },
  },
  texture: {
    control: 'none',
    description: 'The key, or instance of the Texture this Game Object will use to render with, as stored in the Texture Manager.',
    table: {
      category: 'Props',
      type: { summary: 'string | Phaser.Textures.Texture' },
    },
  },
  frame: {
    control: 'none',
    description: 'An optional frame from the Texture this Game Object is rendering with.',
    table: {
      category: 'Props',
      type: { summary: 'string | number' },
    },
  },
  tint: {
    control: 'text',
    description: 'The tint value being applied to the whole of the Game Object.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: 0xFFFFFF },
    },
  },
  flipX: {
    description: 'The horizontal flipped state.',
    table: {
      category: 'Props',
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
  },
  flipY: {
    description: 'The vertical flipped state.',
    table: {
      category: 'Props',
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
  },
  blendMode: {
    control: 'none',
    description: 'Blend Mode being used by this Game Object.',
    table: {
      category: 'Props',
      type: { summary: 'string | number | Phaser.BlendModes' },
      defaultValue: { summary: 'Phaser.BlendModes.NORMAL' },
    },
  },
  scrollFactor: {
    control: 'none',
    description: 'The scroll factor of this Game Object.<br>The scroll factor controls the influence of the movement of a Camera upon this Game Object.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: 1 },
    },
  },
  scrollFactorX: {
    control: 'none',
    description: 'The horizontal scroll factor of this Game Object.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: 1 },
    },
  },
  scrollFactorY: {
    control: 'none',
    description: 'The vertical scroll factor of this Game Object.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
      defaultValue: { summary: 1 },
    },
  },
  displayWidth: {
    control: 'none',
    description: 'The displayed width of this Game Object.<br>This value takes into account the scale factor.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
    },
  },
  displayHeight: {
    control: 'none',
    description: 'The displayed height of this Game Object.<br>This value takes into account the scale factor.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
    },
  },
  displayOriginX: {
    control: 'none',
    description: 'The horizontal display origin of this Game Object. This is a pixel value.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
    },
  },
  displayOriginY: {
    control: 'none',
    description: 'The vertical display origin of this Game Object. This is a pixel value.',
    table: {
      category: 'Props',
      type: { summary: 'number' },
    },
  },
  dropZone: {
    control: 'none',
    description: 'Should this Game Object be treated as a drop zone target?',
    table: {
      category: 'Props',
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
  },
  pipeline: {
    control: 'none',
    description: 'The main WebGL Pipeline of this Game Object.',
    table: {
      category: 'Props',
      type: { summary: 'string | Phaser.Renderer.WebGL.WebGLPipeline' },
    },
  },
  tween: {
    control: 'none',
    description: 'The tween to be applied on this Game Object.<br>`v-model:tween` unset the value after the tween is complete.',
    table: {
      category: 'Props',
      type: { summary: 'Phavuer.TweenConfig' },
    },
  },
  tweens: {
    control: 'none',
    description: 'The tweens to be applied on this Game Object.<br>`v-model:tweens` unset the value after the tween is complete.',
    table: {
      category: 'Props',
      type: { summary: 'Phavuer.TweenConfig[]' },
    },
  },
  timeline: {
    control: 'none',
    description: 'The timeline to be applied on this Game Object.<br>`v-model:timeline` unset the value after the tween is complete.',
    table: {
      category: 'Props',
      type: { summary: 'Phavuer.TimelineConfig[]' },
    },
  },
  create: {
    name: '@create',
    control: 'none',
    description: '**Parameters:**<br>pointer: `Phaser.GameObjects.GameObject`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  pointerdown: {
    name: '@pointerdown',
    control: 'none',
    description: '**Parameters:**<br>pointer: `Phaser.Input.Pointer`<br>localX: `number`<br>localY: `number`<br>event: `Phaser.Types.Input.EventData`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  pointermove: {
    name: '@pointermove',
    control: 'none',
    description: '**Parameters:**<br>pointer: `Phaser.Input.Pointer`<br>localX: `number`<br>localY: `number`<br>event: `Phaser.Types.Input.EventData`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  pointerup: {
    name: '@pointerup',
    control: 'none',
    description: '**Parameters:**<br>pointer: `Phaser.Input.Pointer`<br>localX: `number`<br>localY: `number`<br>event: `Phaser.Types.Input.EventData`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  pointerout: {
    name: '@pointerout',
    control: 'none',
    description: '**Parameters:**<br>pointer: `Phaser.Input.Pointer`<br>event: `Phaser.Types.Input.EventData`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  pointerover: {
    name: '@pointerover',
    control: 'none',
    description: '**Parameters:**<br>pointer: `Phaser.Input.Pointer`<br>localX: `number`<br>localY: `number`<br>event: `Phaser.Types.Input.EventData`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  wheel: {
    name: '@wheel',
    control: 'none',
    description: '**Parameters:**<br>pointer: `Phaser.Input.Pointer`<br>gameObject: `Phaser.GameObjects.GameObject`<br>deltaX: `number`<br>deltaY: `number`<br>deltaZ: `number`<br>event: `Phaser.Types.Input.EventData`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  dragstart: {
    name: '@dragstart',
    control: 'none',
    description: '**Parameters:**<br>pointer: `Phaser.Input.Pointer`<br>dragX: `number`<br>dragY: `number`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  drag: {
    name: '@drag',
    control: 'none',
    description: '**Parameters:**<br>pointer: `Phaser.Input.Pointer`<br>dragX: `number`<br>dragY: `number`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  dragend: {
    name: '@dragend',
    control: 'none',
    description: '**Parameters:**<br>pointer: `Phaser.Input.Pointer`<br>dragX: `number`<br>dragY: `number`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  dragenter: {
    name: '@dragenter',
    control: 'none',
    description: '**Parameters:**<br>pointer: `Phaser.Input.Pointer`<br>target: `Phaser.GameObjects.GameObject`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  dragover: {
    name: '@dragover',
    control: 'none',
    description: '**Parameters:**<br>pointer: `Phaser.Input.Pointer`<br>target: `Phaser.GameObjects.GameObject`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  dragleave: {
    name: '@dragleave',
    control: 'none',
    description: '**Parameters:**<br>pointer: `Phaser.Input.Pointer`<br>target: `Phaser.GameObjects.GameObject`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  drop: {
    name: '@drop',
    control: 'none',
    description: '**Parameters:**<br>pointer: `Phaser.Input.Pointer`<br>target: `Phaser.GameObjects.GameObject`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  animationstart: {
    name: '@animationstart',
    control: 'none',
    description: '**Parameters:**<br>animation: `Phaser.Animations.Animation`<br>frame: `Phaser.Animations.AnimationFrame`<br>gameObject: `Phaser.GameObjects.Sprite`<br>frameKey: `string`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  animationupdate: {
    name: '@animationupdate',
    control: 'none',
    description: '**Parameters:**<br>animation: `Phaser.Animations.Animation`<br>frame: `Phaser.Animations.AnimationFrame`<br>gameObject: `Phaser.GameObjects.Sprite`<br>frameKey: `string`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  animationrepeat: {
    name: '@animationrepeat',
    control: 'none',
    description: '**Parameters:**<br>animation: `Phaser.Animations.Animation`<br>frame: `Phaser.Animations.AnimationFrame`<br>gameObject: `Phaser.GameObjects.Sprite`<br>frameKey: `string`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  animationcomplete: {
    name: '@animationcomplete',
    control: 'none',
    description: '**Parameters:**<br>animation: `Phaser.Animations.Animation`<br>frame: `Phaser.Animations.AnimationFrame`<br>gameObject: `Phaser.GameObjects.Sprite`<br>frameKey: `string`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  animationstop: {
    name: '@animationstop',
    control: 'none',
    description: '**Parameters:**<br>animation: `Phaser.Animations.Animation`<br>frame: `Phaser.Animations.AnimationFrame`<br>gameObject: `Phaser.GameObjects.Sprite`<br>frameKey: `string`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
  animationrestart: {
    name: '@animationrestart',
    control: 'none',
    description: '**Parameters:**<br>animation: `Phaser.Animations.Animation`<br>frame: `Phaser.Animations.AnimationFrame`<br>gameObject: `Phaser.GameObjects.Sprite`<br>frameKey: `string`',
    table: {
      category: 'Emits',
      type: { summary: 'function' },
    },
  },
}
type ArgTypesKey = keyof typeof argTypes
export const take = (...keys: ArgTypesKey[]) => Object.fromEntries(keys.map(key => [key, argTypes[key]]))
