import { lipsum } from './index';
import * as JestConfig from './jest/'

test('helpers are defined', () => {
   expect(lipsum).toBeDefined();
   expect(typeof lipsum).toBe('string');
})

test('common Jest configuration', () => {
   expect(JestConfig).toBeDefined();
   expect(JestConfig).toHaveProperty('collectCoverage', true);
   expect(JestConfig).toHaveProperty('coverageReporters');
})