const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  presets: [
    ['@babel/env', { modules: false }],
    ['@babel/typescript', { isTSX: true, allExtensions: true }],
    ['@babel/react', { development: !isProduction }],
    '@emotion/css-prop',
  ],

  plugins: [
    'react-hot-loader/babel',
    '@babel/transform-runtime',
    '@babel/syntax-dynamic-import',
    ['@babel/proposal-decorators', { legacy: true }],
    ['@babel/proposal-class-properties', { loose: true }],
  ],

  env: {
    test: {
      presets: [
        ['@babel/env', { modules: 'cjs', targets: { node: 'current' } }],
      ],
      plugins: ['dynamic-import-node'],
    },
  },
};
