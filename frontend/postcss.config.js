const { PATHS } = require('./settings');

module.exports = {
  plugins: [
    require('postcss-import')({ root: PATHS.root }),
    require('postcss-nested'),
    require('postcss-custom-properties')(),
    require('postcss-calc')(),
    require('postcss-preset-env')(),
  ],
};
