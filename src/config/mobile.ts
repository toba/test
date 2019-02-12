const baseConfig: Partial<jest.DefaultOptions> = require('./');

/**
 * Configuration for testing React Native components depends on `react-native`
 * having been installed.
 *
 * @see https://github.com/expo/expo/issues/2595
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
