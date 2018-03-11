import { mockFetch } from '../index';

test('mocks fetch to read local file', () => {
   const fetch = mockFetch(url => `${__dirname}/../README.md`);
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
