import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'Phavuer',
      fileName: format => `phavuer.${format}.js`,
      formats: ['umd', 'es'],
    },
    rollupOptions: {
      external: ['vue', 'phaser'],
      output: {
        globals: {
          vue: 'Vue',
          phaser: 'Phaser',
        },
      },
    },
    outDir: 'dist',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
