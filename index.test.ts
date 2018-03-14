import { lipsum, sleep } from './index';
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

test('sleep', async () => {
   await sleep(10);
   expect(2).toBe(2);
});
