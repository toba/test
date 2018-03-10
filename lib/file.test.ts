import { readFile, readBigFile } from '../index';

test('reads file bytes', () =>
   readFile('fetch.ts').then(bytes => {
      expect(bytes).toBeDefined();
      expect(bytes).toBeInstanceOf(Buffer);
   }));

test('reads large files', () =>
   readBigFile('fetch.ts').then(content => {
      expect(content).toBeDefined();
      expect(typeof content).toBe('string');
      expect(content.includes('MockResponse')).toBe(true);
   }));
