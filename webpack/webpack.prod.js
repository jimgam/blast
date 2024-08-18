const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { InjectManifest } = require('workbox-webpack-plugin')
const WebpackObfuscator = require('webpack-obfuscator')
const { EnvironmentPlugin } = require('webpack');

const prod = {
  mode: 'production',
  stats: 'eval-source-map', //errors-warnings
  output: {
    // filename: '[name].[contenthash].bundle.js',
    // chunkFilename: '[name].[contenthash].chunk.js'
    filename: '[name].bundle.js?hash=[contenthash]',
    chunkFilename: '[name].chunk.js?hash=[contenthash]'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          // filename: '[name].[contenthash].bundle.js'
          filename: '[name].bundle.js?hash=[contenthash]'
        }
      }
    },
  },
  plugins: [
    new EnvironmentPlugin({
      'process.env.NODE_ENV': 'production',
    }),
    new WebpackObfuscator(
      {
        rotateStringArray: true,
        stringArray: true,
        stringArrayThreshold: 0.75
      },
      ['vendors.*.js', 'sw.js']
    ),
    new InjectManifest({
      swSrc: path.resolve(__dirname, '../pwa/sw.js'),
      swDest: 'sw.js'
    })
  ]
}

module.exports = merge(common, prod)
