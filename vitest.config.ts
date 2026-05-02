import vue from '@vitejs/plugin-vue'
/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig(async () => {
  const { webdriverio } = await import('@vitest/browser-webdriverio')

  return {
    plugins: [vue()],
    test: {
      browser: {
        enabled: true,
        provider: webdriverio({
          logLevel: 'silent',
          logLevels: { webdriver: 'silent' },
        }),
        instances: [
          {
            browser: 'chrome',
          },
        ],
      },
      setupFiles: [
        './vitest.setup.ts',
      ],
    },
  }
})
