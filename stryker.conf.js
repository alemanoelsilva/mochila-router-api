module.exports = (config) => {
  config.set({
    files: [
      {
        pattern: 'api/**/**/*.js',
        mutated: true,
        included: false
      },
      'middlewares/*.js',
      'config/*.js',
      '*.js',
      'test/setup.js',
      'test/helpers/*.js',
      'test/unit/**/*.js',
      'test/integration/**/*.js',
    ],
    testRunner: 'jest',
    mutator: 'javascript',
    transpilers: [],
    reporter: ['clear-text', 'progress'],
    coverageAnalysis: 'perTest',
    logLevel: 'trace',
    thresholds: { high: 90, low: 90, break: 90 },
    maxConcurrentTestRunners: 5,
  });
};
