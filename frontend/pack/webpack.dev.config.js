const path = require('path');
const yargs = require('yargs');
const { EnvironmentPlugin, HotModuleReplacementPlugin } = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');
const { DEV_PORT, PATHS } = require('../settings');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const WebpackBar = require('webpackbar');
const { isNil } = require('ramda');


module.exports = merge.strategy({ plugins: 'prepend' })(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: PATHS.output,
    historyApiFallback: true,
    hot: true,
    overlay: true,
    staticOptions: { redirect: false },
    port: DEV_PORT,
    stats: 'minimal',
    noInfo: true,
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: true,
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:6]',
              modules: true,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackBar(),
    new HotModuleReplacementPlugin(),
    new EnvironmentPlugin({
      // * Explicitly setting the node environment for clarity
      NODE_ENV: 'development'
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
  ],
});
