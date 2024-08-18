const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { EnvironmentPlugin } = require('webpack');

const dev = {
  mode: 'development',
  stats: 'errors-warnings',
  devtool: 'eval',
  devServer: {
    open: true
  },
  plugins: [
    new EnvironmentPlugin({
      'process.env.NODE_ENV': 'development',
    })]
}

module.exports = merge(common, dev)
