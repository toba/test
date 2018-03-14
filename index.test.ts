import { lipsum } from './index';
import * as JestConfig from './jest/';

test('helpers are defined', () => {
   expect(lipsum).toBeDefined();
   expect(typeof lipsum).toBe('string');
});

test('common Jest configuration', () => {
   expect(JestConfig).toBeDefined();
   // enabling coverage breaks VSCode debugging
   // intead use --coverage when running
   expect(JestConfig).toHaveProperty('collectCoverage', false);
   expect(JestConfig).toHaveProperty('coverageReporters');
});
