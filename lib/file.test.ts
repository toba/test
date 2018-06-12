import * as path from 'path';
import { readFile, readBigFile, readFileText } from './index';
import { normalizePath } from './file';

test('normalizes file path', () => {
   expect(normalizePath('file/name')).toBe('file/name');
   expect(normalizePath('file\\name')).toBe('file\\name');
   expect(normalizePath('name')).toBe(path.join(__dirname, 'name'));
});

test('reads file bytes', async () => {
   const bytes = await readFile('helpers.ts');
   expect(bytes).toBeDefined();
   expect(bytes).toBeInstanceOf(Buffer);
});

test('reads file text', async () => {
   const text = await readFileText('helpers.ts');
   expect(typeof text).toBe('string');
   expect(text.includes('ExpectResponse')).toBe(true);
});

test('reads large files', async () => {
   const text = await readBigFile('helpers.ts');
   expect(text).toBeDefined();
   expect(typeof text).toBe('string');
   expect(text.includes('ExpectResponse')).toBe(true);
});
