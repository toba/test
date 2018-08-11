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
   collectCoverageFrom: ['lib/**/*.ts', '!lib/**/*.d.ts', '!lib/**/types.ts'],
   coverageReporters: ['lcov'],
   transformIgnorePatterns: [
      `<rootDir>/node_modules/(?!@(${typeScriptModuleScopes.join('|')}))`
   ],
   testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
