import './index';
import * as config from './index';

/**
 * Jest uses `<rootDir>` by convention.
 */
const modulePath = '<rootDir>/node_modules/';

test('transforms TypeScript modules and ignores others', () => {
   expect(config.transformIgnorePatterns).toBeInstanceOf(Array);
   const re = new RegExp(config.transformIgnorePatterns[0]);

   ['@toba', '@trailimage'].forEach(name => {
      expect(re.test(modulePath + name)).toBe(false);
   });

   ['react', 'jest', 'whatever'].forEach(name => {
      expect(re.test(modulePath + name)).toBe(true);
   });

   expect(Object.keys(config.moduleNameMapper)).toHaveLength(2);
});
