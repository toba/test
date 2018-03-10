import { lipsum, mockFetch } from './index';
import * as JestConfig from './jest/';

test('helpers are defined', () => {
   expect(lipsum).toBeDefined();
   expect(typeof lipsum).toBe('string');
});

test('mocks fetch to read local file', () => {
   const fetch = mockFetch(url => `${__dirname}/README.md`);
   return fetch('url')
      .then(res => {
         expect(res).toBeDefined();
         expect(res).toHaveProperty('status', 200);
         return res.text();
      })
      .then(text => {
         expect(text).toBeDefined();
         expect(text.includes('# Usage')).toBe(true);
      });
});

test('common Jest configuration', () => {
   expect(JestConfig).toBeDefined();
   // enabling coverage breaks VSCode debugging
   // intead use --coverage when running
   expect(JestConfig).toHaveProperty('collectCoverage', false);
   expect(JestConfig).toHaveProperty('coverageReporters');
});
