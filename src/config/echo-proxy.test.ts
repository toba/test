import '../jest/';
import echo from './echo-proxy';

test('something', () => {
   expect(echo).toBeDefined();
   expect(echo['thing']).toBe('thing');
   expect(echo[0]).toBe('0');
});
