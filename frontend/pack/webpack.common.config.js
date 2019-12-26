const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const LicenseCheckerWebpackPlugin = require('license-checker-webpack-plugin');
const { NamedModulesPlugin, EnvironmentPlugin } = require('webpack');
const { PATHS } = require('../settings');


module.exports = {
  entry: { app: PATHS.entry },
  resolve: {
    alias: {
      '@types': PATHS.src['@types'],
      app: PATHS.src.app,
      assets: PATHS.src.assets,
        lib: PATHS.src.lib,
      settings: PATHS.src.settings,
      store: PATHS.src.store,
      styles: PATHS.src.styles,
      utils: PATHS.src.utils,
    },
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        // Don't babel anything outside of our project directory (for the --webkit option)
        include: [PATHS.root, PATHS.src['@types']],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: {
          loader: 'svg-url-loader',
          options: {
            limit: 8192,
            stripdeclarations: true,
            iesafe: true,
            encoding: 'base64',
          },
        },
      },
    ],
  },
  plugins: [
    new LicenseCheckerWebpackPlugin({
      allow:
        '(Apache-2.0 OR BSD-2-Clause OR BSD-3-Clause OR MIT OR ISC OR Unlicense)',
      ignore: [],
      emitError: true,
    }),
    new NamedModulesPlugin(),
    new HTMLWebpackPlugin({
      filename: PATHS.index.output,
      template: PATHS.index.input,
      favicon: PATHS.favicon,
    }),
    new CopyWebpackPlugin([
      {
        context: PATHS.src.assets,
        from: '**/*',
        to: 'assets/',
      },
    ]),
    new EnvironmentPlugin({
      //* Defaults in settings.js
      BACKEND_URL: null
    }),
  ],
  target: 'web',
  output: {
    path: PATHS.output,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/',
  },
};
