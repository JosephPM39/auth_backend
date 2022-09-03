/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js'],
  rootDir: './src/',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
};
