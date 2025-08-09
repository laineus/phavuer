import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Game from '../Game.vue'

describe('Game', () => {
  /**
   * @type {import('phaser').Types.Core.GameConfig}
   */
  const config = {
    /**
     * Prevent the Phaser & Phavuer banner from polluting the test logs
     */
    banner: false,
  };

  it('emits the create event', () => {
    const wrapper = mount(Game, {
      props: {
        config,
      },
    })
    expect(wrapper.emitted().create).toBeTruthy()
  })

  it('appends a canvas element to the [data-phavuer-canvas]', () => {
    const wrapper = mount(Game, {
      props: {
        config,
      },
    })
    expect(wrapper.find('[data-phavuer-canvas] > canvas').exists()).toBe(true)
  })

  it('emits the ready event', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Game, {
      props: {
        config,
      },
    })
    await vi.runOnlyPendingTimersAsync()
    expect(wrapper.emitted().ready).toBeTruthy()
  })
})
