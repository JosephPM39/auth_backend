const baseConfig = require('../../jest.config');

module.exports = {
  ...baseConfig,
  rootDir: '../',
  testRegex: '.*\\.fake.test\\.ts',
};
