const { resolve } = require('path');

/**
 * General Settings
 */
const DEV_PORT = 8000;


/**
 * Directory Paths
 */
const ROOT = resolve(__dirname);
const OUTPUT = resolve(ROOT, 'dist');

const PATHS = {
  cache: resolve(ROOT, 'node_modules', '.cache'),
  configs: {
    babel: resolve(ROOT, 'babel.config.js'),
    tsconfig: resolve(ROOT, 'tsconfig.json'),
  },
  entry: resolve(ROOT, 'index.tsx'),
  favicon: resolve(ROOT, 'assets', 'icons', 'favicon.png'),
  index: {
    input: resolve(ROOT, 'index.html'),
    output: resolve(OUTPUT, 'index.html'),
  },
  src: {
    '@types': resolve(ROOT, '@types'),
    app: resolve(ROOT, 'app'),
    assets: resolve(ROOT, 'assets'),
    lib: resolve(ROOT, 'lib'),
    settings: resolve(ROOT, 'settings'),
    store: resolve(ROOT, 'store'),
    styles: resolve(ROOT, 'styles'),
    utils: resolve(ROOT, 'utils'),
  },
  root: ROOT,
  output: OUTPUT,
};

/**
 * Services
 */
const backend_url =
  process.env.BACKEND_URL || 'http://localhost:8080';

const SERVICES = {
  api: `${backend_url}/api`
};

module.exports = {
  DEV_PORT,
  PATHS,
  SERVICES,
};
