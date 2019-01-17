import * as baseConfig from './';

const config: Partial<jest.DefaultOptions> = {
   ...baseConfig,
   //preset: 'react-native',
   setupFiles: [
      ...baseConfig.setupFiles!,
      '<rootDir>/node_modues/react-native/jest/setup.js'
   ]
};

export = config;
