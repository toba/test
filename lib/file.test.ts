import { readFile, readBigFile } from '../index';

test('reads file bytes', () =>
   readFile('helpers.ts').then(bytes => {
      expect(bytes).toBeDefined();
      expect(bytes).toBeInstanceOf(Buffer);
   }));

test('reads large files', () =>
   readBigFile('helpers.ts').then(content => {
      expect(content).toBeDefined();
      expect(typeof content).toBe('string');
      expect(content.includes('ExpectResponse')).toBe(true);
   }));
