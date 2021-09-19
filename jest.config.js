module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'configs', 'app.js', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
