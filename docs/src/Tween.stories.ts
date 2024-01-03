import 'phaser'
import { Game, Scene, Rectangle } from '../../'
import type { Meta, StoryObj } from '@storybook/vue3'
import { referPhaserVersion } from './utils'
import { ref, watch } from 'vue'

type Story = StoryObj<typeof Rectangle>

const description = `
各GameObjectのtween propにTweenConfigをセットすると、tweenが再生されます。
v-modelも有効で、再生が完了した際に値が自動的にunsetされます。

空の値をセットしたり、別のTweenConfigをセットすると、前回のtweenの再生は停止されます。

同じ設定でも、異なるObjectがセットされた場合、Tweenは新しく再生されます。
そのため、template内に直接TweenConfigObjectを書くと、VueのライフサイクルによってViewが更新された際にTweenが再度再生されてしまうことに注意してください。

Phaserの型定義の代わりに\`Phavuer.TweenConfig\`、\`Phavuer.TimelineConfig\`を使ってください。
Phaserの設定では、Tweenを適用する対象として\`targets\`プロパティを設定しますが、\`Phavuer.TweenConfig\`では対象のコンポーネントのGameObjectが自動でセットされます。

tween:

\`\`\`html
<script setup>
const tween = ref({
  props: {
    x: { getStart: () => 0, getEnd: () => 100 },
    y: { getStart: () => 0, getEnd: () => 100 }
  },
  repeat: -1,
  yoyo: true,
  duration: 1000
})
</script>

<Game>
  <Scene name="SceneName">
    <Rectangle :width="100" :height="100" :fillColor="0xFFFFFF" v-model:tween="tween" />
  </Scene>
</Game>
\`\`\`

tweens:

\`\`\`html
<script setup>
const tweens = ref([
  {
    props: {
      x: { getStart: () => 0, getEnd: () => 100 }
    },
    duration: 1000
  }
  {
    props: {
      y: { getStart: () => 0, getEnd: () => 100 }
    },
    duration: 1000
  }
])
</script>

<Game>
  <Scene name="SceneName">
    <Rectangle :width="100" :height="100" :fillColor="0xFFFFFF" v-model:tweens="tweens" />
  </Scene>
</Game>
\`\`\`

timeline:

\`\`\`html
<script setup>
const timeline = ref([
  {
    at: 0,
    tween: {
      props: {
        x: { getStart: () => 0, getEnd: () => 100 }
      },
      duration: 1000
    }
  }
  {
    at: 500,
    tween: {
      props: {
        y: { getStart: () => 0, getEnd: () => 100 }
      },
      duration: 1000
    }
  }
])
</script>

<Game>
  <Scene name="SceneName">
    <Rectangle :width="100" :height="100" :fillColor="0xFFFFFF" v-model:timeline="timeline" />
  </Scene>
</Game>
\`\`\`

See also: [Phaser.Types.Tweens.TweenDataConfig](https://newdocs.phaser.io/docs/${referPhaserVersion}/Phaser.Types.Tweens.TweenDataConfig)  
See also: [Phaser.Time.Timeline](https://newdocs.phaser.io/docs/3.70.0/Phaser.Time.Timeline)
`

const meta: Meta<typeof Rectangle> = {
  title: 'Tween/Examples',
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  tags: ['autodocs'],
  args: {
    'props.x.getStart()': 30,
    'props.x.getEnd()': 230,
    'props.y.getStart()': 30,
    'props.y.getEnd()': 100,
    duration: 1000,
    yoyo: true,
    repeat: 0
  },
  // @ts-ignore
  argTypes: {
  }
}

export const Tween: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Rectangle },
    setup () {
      const getTween = () => {
        return {
          props: {
            x: { getStart: () => args['props.x.getStart()'], getEnd: () => args['props.x.getEnd()'] },
            y: { getStart: () => args['props.y.getStart()'], getEnd: () => args['props.y.getEnd()'] }
          },
          duration: args.duration,
          yoyo: args.yoyo,
          repeat: args.repeat
        }
      }
      const tween = ref(getTween())
      watch(args, () => {
        tween.value = getTween()
      })
      return { args, tween }
    },
    template: `
      <Game :config="{ width: 400, height: 225 }">
        <Scene name="Scene">
          <Rectangle
            :x="30"
            :y="30"
            :width="100"
            :height="100"
            :fillColor="0x42B883"
            :lineWidth="2"
            :strokeColor="0xFFFFFF"
            :origin="0"
            v-model:tween="tween"
            />
        </Scene>
      </Game>
      <div>tween: {{ tween }}</div>`
  })
}
export const Tweens: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Rectangle },
    setup () {
      const getTweens = () => {
        return [
          {
            props: {
              x: { getStart: () => args['props.x.getStart()'], getEnd: () => args['props.x.getEnd()'] },
              y: { getStart: () => 30, getEnd: 30 }
            },
            duration: args.duration,
            yoyo: args.yoyo,
            repeat: args.repeat
          },
          {
            props: {
              y: { getStart: () => args['props.y.getStart()'], getEnd: () => args['props.y.getEnd()'] }
            },
            duration: args.duration,
            yoyo: args.yoyo,
            repeat: args.repeat
          }
        ]
      }
      const tweens = ref(getTweens())
      watch(args, () => {
        tweens.value = getTweens()
      })
      return { args, tweens }
    },
    template: `
      <Game :config="{ width: 400, height: 225 }">
        <Scene name="Scene">
          <Rectangle
            :x="30"
            :y="30"
            :width="100"
            :height="100"
            :fillColor="0x42B883"
            :lineWidth="2"
            :strokeColor="0xFFFFFF"
            :origin="0"
            v-model:tweens="tweens"
            />
        </Scene>
      </Game>
      <div>tweens: {{ tweens }}</div>`
  })
}
export const Timeline: Story = {
  render: (args: any) => ({
    components: { Game, Scene, Rectangle },
    setup () {
      const getTimeline = () => {
        return [
          {
            at: 0,
            tween: {
              props: {
                x: { getStart: () => args['props.x.getStart()'], getEnd: () => args['props.x.getEnd()'] },
                y: { getStart: () => 30, getEnd: 30 }
              },
              duration: args.duration,
              yoyo: args.yoyo,
              repeat: args.repeat
            }
          },
          {
            at: args.duration / 2,
            tween: {
              props: {
                y: { getStart: () => args['props.y.getStart()'], getEnd: () => args['props.y.getEnd()'] }
              },
              duration: args.duration,
              yoyo: args.yoyo,
              repeat: args.repeat
            }
          }
        ]
      }
      const timeline = ref(getTimeline())
      watch(args, () => {
        timeline.value = getTimeline()
      })
      return { args, timeline }
    },
    template: `
      <Game :config="{ width: 400, height: 225 }">
        <Scene name="Scene">
          <Rectangle
            :x="30"
            :y="30"
            :width="100"
            :height="100"
            :fillColor="0x42B883"
            :lineWidth="2"
            :strokeColor="0xFFFFFF"
            :origin="0"
            v-model:timeline="timeline"
            />
        </Scene>
      </Game>
      <div>timeline: {{ timeline }}</div>`
  })
}

export default meta