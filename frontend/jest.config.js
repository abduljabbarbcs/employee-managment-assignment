module.exports = {
  moduleNameMapper: {
    '^(.*)\\.svg$': '<rootDir>/__mocks__/file.js',
    '^assets(.*)$': '<rootDir>/assets$1',
    '^app(.*)$': '<rootDir>/app$1',
    '^store(.*)$': '<rootDir>/store$1',
    '^styles(.*)$': '<rootDir>/styles$1',
    '^utils(.*)$': '<rootDir>/utils$1',
    '^settings(.*)$': '<rootDir>/settings$1',
  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!ramda).+\\.[jt]sx$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};
