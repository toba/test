/**
 * Published library source code folder.
 */
const libFolder = 'src';
/**
 * Mono-repo packages folder.
 */
const pkgFolder = 'packages';

/**
 * Normal module file types.
 */
const codeTypes = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];
/**
 * CSS style types.
 */
const styleTypes = ['css', 'less', 'scss'];
const assetTypes = [
   'jpg',
   'jpeg',
   'png',
   'gif',
   'eot',
   'otf',
   'webp',
   'svg',
   'ttf',
   'woff',
   'woff2',
   'mp4',
   'webm',
   'wav',
   'mp3',
   'm4a',
   'aac',
   'oga'
];

/**
 * Modules that are published as TypeScript or ES6 modules rather than as
 * CommonJS must be excluded from the `transformIgnorePatterns` so that they
 * *are* transformed for testing.
 *
 * @see https://github.com/kulshekhar/ts-jest/issues/588
 * @see https://github.com/kulshekhar/ts-jest/issues/439
 */
const typeScriptModuleScopes = ['toba', 'trailimage'];
/**
 * Path that should *not* be transformed is everything except TypeScript or ES6
 * module paths which *should* be transformed for tests.
 */
const transformPath = `/node_modules/(?!@(${typeScriptModuleScopes.join(
   '|'
)}))`;

/**
 * Relative path from Jest working directory.
 */
const root = __dirname.includes('node_modules')
   ? './node_modules/@toba/test/'
   : './';

/**
 * Create pattern that matches any of the given file types.
 */
const match = (types: string[]) => `\\.(${types.join('|')})$`;

/**
 * Default Jest configuration.
 */
module.exports = {
   automock: false,
   testURL: 'http://localhost/',
   setupFiles: [root + 'jest/setup.js'],
   collectCoverage: false,
   collectCoverageFrom: [
      `${pkgFolder}/**/*.ts`,
      `${libFolder}/**/*.ts`,
      `!${libFolder}/**/*.d.ts`,
      `!${libFolder}/**/types.ts`,
      `!${pkgFolder}/**/*.d.ts`,
      `!${pkgFolder}/**/types.ts`
   ],
   cache: true,
   coverageReporters: ['lcov'],
   transformIgnorePatterns: [
      `<rootDir>${transformPath}`,
      `<rootDir>/${pkgFolder}/[-a-z0-9]+${transformPath}`
   ],
   testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
   moduleFileExtensions: codeTypes,
   /**
    * Allow style and asset `import`s to be recognized but process them with
    * no-op methods.
    * @see https://jestjs.io/docs/en/webpack#mocking-css-modules
    */
   moduleNameMapper: {
      [match(assetTypes)]: `<rootDir>${root}jest/stub.js`,
      [match(styleTypes)]: `<rootDir>${root}jest/echo-proxy.js`
   }
} as Partial<jest.DefaultOptions>;
