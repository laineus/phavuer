import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), dts({ tsconfigPath: './tsconfig.app.json' })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Phavuer',
      fileName: (format) => {
        switch (format) {
          case 'umd': return 'phavuer.min.js'
          case 'es': return 'phavuer.esm.min.js'
          default: return `phavuer.${format}.min.js`
        }
      },
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
