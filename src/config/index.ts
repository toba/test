import { defaults as tsJest } from 'ts-jest/presets';

/**
 * Published library source code folder.
 */
const srcFolder = 'src';
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
   transform: {
      ...tsJest.transform,
      // Custom transformer is actually the default Babel transformer, changed
      // only to use internal Babel configuration instead of requiring every
      // project to have a babel.config.js file.
      '^.+\\.jsx?$': `<rootDir>${root}jest/transformers.js`
   },
   testEnvironment: 'node',
   automock: false,
   testURL: 'http://localhost/',
   setupFiles: [root + 'jest/setup.js'],
   collectCoverage: false,
   collectCoverageFrom: [
      `${pkgFolder}/**/*.ts`,
      `${srcFolder}/**/*.ts`,
      `!${srcFolder}/**/*.d.ts`,
      `!${srcFolder}/**/types.ts`,
      `!${pkgFolder}/**/*.d.ts`,
      `!${pkgFolder}/**/types.ts`
   ],
   cache: true,
   coverageReporters: ['lcov'],
   transformIgnorePatterns: [
      `<rootDir>${transformPath}`,
      `<rootDir>/${pkgFolder}/[-a-z0-9]+${transformPath}`
   ],
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
