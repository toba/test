import './';
import { MemoryStream } from './';
import { loadStream } from './index';

test('recieves stream', done => {
   const stream = new MemoryStream();
   loadStream('helpers.ts')
      .on('end', () => {
         expect(stream.text.includes('ExpectResponse')).toBe(true);
         done();
      })
      .pipe(stream);
});
