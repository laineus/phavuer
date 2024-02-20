/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
        logLevel: 'silent', logLevels: { webdriver: 'silent' }
      },
    },
    setupFiles: [
      './vitest.setup.mjs',
    ],
  },
})
