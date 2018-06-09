import * as jestConfig from './index';

/**
 * Jest uses `<rootDir>` by convention.
 */
const modulePath = '<rootDir>/node_modules/';

test('transforms TypeScript modules and ignores others', () => {
   expect(jestConfig.transformIgnorePatterns).toBeInstanceOf(Array);
   const re = new RegExp(jestConfig.transformIgnorePatterns[0]);

   ['@toba', '@trailimage'].forEach(name => {
      expect(re.test(modulePath + name)).toBe(false);
   });

   ['react', 'jest', 'whatever'].forEach(name => {
      expect(re.test(modulePath + name)).toBe(true);
   });
});
