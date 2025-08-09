import vue from '@vitejs/plugin-vue'
/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  test: {
    browser: {
      /**
       * `name` is required
       */
      name: 'chrome',
      enabled: true,
      providerOptions: {
        logLevel: 'silent',
        logLevels: { webdriver: 'silent' },
      },
    },
    setupFiles: [
      './vitest.setup.ts',
    ],
  },
})
