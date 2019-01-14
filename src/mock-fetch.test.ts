import { HttpStatus } from '@toba/tools';
import { loadFileForFetch } from './index';

test('mocks fetch to read local file', async () => {
   const fetch = loadFileForFetch(_url => `${__dirname}/../README.md`);

   const res = await fetch('url');
   expect(res).toBeDefined();
   expect(res).toHaveProperty('status', HttpStatus.OK);

   const text = await res.text();
   expect(text).toBeDefined();
   expect(text.includes('# Usage')).toBe(true);

   const data = await res.buffer();
   expect(data).toBeDefined();
   expect(data.length).toBeWithin(900, 2000);
});
