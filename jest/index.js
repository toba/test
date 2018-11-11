/**
 * Published library source code folder.
 */
const libFolder = 'lib';
/**
 * Mono-repo packages folder.
 */
const pkgFolder = 'packages';
/**
 * Modules that are published as TypeScript rather than as transpiled JavaScript
 * must be excluded from the `transformIgnorePatterns` so that they *are*
 * transformed for testing.
 *
 * @see https://github.com/kulshekhar/ts-jest/issues/588
 * @see https://github.com/kulshekhar/ts-jest/issues/439
 */
const typeScriptModuleScopes = ['toba', 'trailimage'];
/**
 * Path that should *not* be transformed is everything except TypeScript
 * module paths which *should* be transformed for tests.
 */
const transformPath = `/node_modules/(?!@(${typeScriptModuleScopes.join(
   '|'
)}))`;

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
      `${pkgFolder}/**/*.ts`,
      `${libFolder}/**/*.ts`,
      `!${libFolder}/**/*.d.ts`,
      `!${libFolder}/**/types.ts`,
      `!${pkgFolder}/**/*.d.ts`,
      `!${pkgFolder}/**/types.ts`
   ],
   coverageReporters: ['lcov'],
   transformIgnorePatterns: [
      `<rootDir>${transformPath}`,
      `<rootDir>/${pkgFolder}/[-a-z0-9]+${transformPath}`
   ],
   testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
   //resolver: require.resolve('jest-pnp-resolver')
};
