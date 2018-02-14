/**
 * Default Jest configuration.
 * @type {jest.ProjectConfig}
 */
module.exports = {
   transform: {
      '^.+\\.tsx?$': 'ts-jest'
   },
   collectCoverage: true,
   collectCoverageFrom: ['lib/*.ts'],
   coverageReporters: ['lcov'],
   transformIgnorePatterns: ['<rootDir>/node_modules/(?!@toba)'],
   testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
