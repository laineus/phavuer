import type { Preview } from '@storybook/vue3'
import '../src/assets/style.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Home', 'Setup', 'Core', 'GameObjects', 'Physics', 'Tilemaps', 'Tween', 'Methods'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
