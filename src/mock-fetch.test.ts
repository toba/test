import path from 'path';
import { HttpStatus } from '@toba/tools';
import { loadFileForFetch, mockFetch } from './index';

test('allows mock fetch to be defined', () => {
   mockFetch(url => path.join(__dirname, url.toString()));
   expect(fetch).toBeDefined();
});

test('mocks fetch to read local file', async () => {
   const fetch = loadFileForFetch(_url => `${__dirname}/../README.md`);

   const res = await fetch('url');
   expect(res).toBeDefined();
   expect(res).toHaveProperty('status', HttpStatus.OK);
   expect(res.ok).toBe(true);

   const text = await res.text();
   expect(text).toBeDefined();
   expect(text.includes('# Usage')).toBe(true);

   const data = await res.buffer();
   expect(data).toBeDefined();
   expect(data.length).toBeWithin(900, 2000);
});

test('mocks fetch to read JSON', async () => {
   const fetch = loadFileForFetch(_url => `${__dirname}/../package.json`);

   const res = await fetch('url');
   expect(res.ok).toBe(true);

   const json = await res.json();
   expect(json).toBeDefined();
   expect(json).toHaveProperty('name', '@toba/test');
});
