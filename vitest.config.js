/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    browser: {
      enabled: true,
      name: 'chrome', // browser name is required
      providerOptions: {
        logLevel: 'silent', logLevels: { webdriver: 'silent' }
      },
    },
    setupFiles: [
      './vitest.setup.js',
    ],
  },
})
