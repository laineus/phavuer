import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Game from '../Game.vue'

describe('Game', () => {
  /**
   * @type {import('phaser').Types.Core.GameConfig}
   */
  const config = {
    /**
     * Tell Phaser to skip the creation of the renderer
     */
    type: Phaser.HEADLESS,
    /**
     * Tell Phaser that it is running in a custom environment and to skip feature detection
     */
    customEnvironment: true,
    /**
     * Prevent the Phaser banner from polluting the test logs
     */
    banner: false,
    /**
     * Prevent the default behaviour of `canvas.focus()` which will result in a NotImplemented error from JSDOM
     */
    autoFocus: false,
  };

  it('emits the create event', () => {
    const wrapper = mount(Game, {
      props: {
        config,
      },
    });
    expect(wrapper.emitted().create).toBeTruthy();
  })

  it('appends a canvas element to the [data-phavuer-canvas]', () => {
    const wrapper = mount(Game, {
      props: {
        config,
      },
    });
    expect(wrapper.find('[data-phavuer-canvas] > canvas').exists()).toBe(true);
  })

  /**
   * The `game.boot` method is called when the DOM is ready. It will emit the `boot` event.
   * One issue is that the `boot` event is emitted synchronously when the DOMContentLoaded event has already fired.
   * https://newdocs.phaser.io/docs/3.70.0/focus/Phaser.Game-boot
   */
  it('emits the boot event', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Game, {
      props: {
        config,
      },
    });
    await vi.runOnlyPendingTimersAsync()
    expect(wrapper.emitted().boot).toBeTruthy();
  })

  it('emits the ready event', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Game, {
      props: {
        config,
      },
    });
    await vi.runOnlyPendingTimersAsync()
    expect(wrapper.emitted().ready).toBeTruthy();
  })
})