import { lipsum, sleep } from './index';
import * as config from './config';

test('helpers are defined', () => {
   expect(lipsum).toBeDefined();
   expect(typeof lipsum).toBe('string');
});

test('common Jest configuration', () => {
   expect(config).toBeDefined();
   // enabling coverage breaks VSCode debugging
   // intead use --coverage when running
   expect(config).toHaveProperty('collectCoverage', false);
   expect(config).toHaveProperty('coverageReporters');
});

test('sleep', async () => {
   await sleep(10);
   expect(2).toBe(2);
});
