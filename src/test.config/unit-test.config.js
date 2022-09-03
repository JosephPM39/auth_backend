const baseConfig = require('../../jest.config');

module.exports = {
  ...baseConfig,
  rootDir: '../',
  testRegex: '.*\\.test\\.ts',
  testPathIgnorePatterns: ['.*\\.fake.test\\.ts'],
};
