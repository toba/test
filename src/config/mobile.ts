import * as baseConfig from './';

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

export = config;
