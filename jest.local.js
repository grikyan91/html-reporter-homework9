module.exports = {
  testEnvironment: 'node',
  reporters: [
    'default'],
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['**/specs/*.spec.*'],
  testRunner: 'jest-jasmine2',
  setupFilesAfterEnv: ['jest-allure/dist/setup'],
  globals: {
    testTimeout: 50000,
  },
  reporters: [
    'default',
    ['html-reporters', {
      filename: 'homework9-report.html',
      openReport: true,
    }],
  ],
  verbose: true,
};
