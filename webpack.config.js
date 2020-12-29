const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: resolve('dist'),
    filename: 'phavuer.min.js',
    library: 'Phavuer',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  externals: {
    vue: 'Vue'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ['.js', '.vue']
  }
}
