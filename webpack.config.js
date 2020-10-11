const path = require('path')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: resolve('dist'),
    filename: 'phavuer.min.js',
    library: 'Phavuer',
    libraryTarget: 'umd',
    libraryExport: '',
    globalObject: 'this'
  },
  externals: {
    vue: 'vue'
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
  performance: { hints: false }
}
