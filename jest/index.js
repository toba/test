/**
 * Modules that are published as TypeScript rather than as transpiled JavaScript
 * must be excluded from the `transformIgnorePatterns` so that they *are*
 * transformed for testing.
 */
const typeScriptModuleScopes = ['toba', 'trailimage'];

/**
 * Default Jest configuration.
 * @type {jest.ProjectConfig}
 */
module.exports = {
   transform: {
      '^.+\\.tsx?$': 'ts-jest'
   },
   testURL: 'http://localhost/',
   collectCoverage: false,
   collectCoverageFrom: [
      'package/**/*.ts',
      'lib/**/*.ts',
      '!lib/**/*.d.ts',
      '!lib/**/types.ts',
      '!package/**/*.d.ts',
      '!package/**/types.ts'
   ],
   coverageReporters: ['lcov'],
   transformIgnorePatterns: [
      `<rootDir>/node_modules/(?!@(${typeScriptModuleScopes.join('|')}))`
   ],
   testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
   resolver: require.resolve('jest-pnp-resolver')
};
