const baseConfig: Partial<jest.DefaultOptions> = require('./');

/**
 * Configuration for testing React Native components depends on `react-native`
 * having been installed.
 */
const config: Partial<jest.DefaultOptions> = {
   ...baseConfig,
   preset: 'react-native',
   setupFiles: [
      ...baseConfig.setupFiles!,
      '<rootDir>/node_modules/react-native/jest/setup.js'
   ]
};

module.exports = config;
