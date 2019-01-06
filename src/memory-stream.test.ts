import './';
import { MemoryStream } from './';
import { loadStream } from './index';

test('recieves stream', done => {
   const stream = new MemoryStream();
   expect(stream.writeWasCalled).toBe(false);
   expect(stream.receivedData).toBe(false);

   loadStream('helpers.ts')
      .on('end', () => {
         expect(stream.text.includes('ExpectResponse')).toBe(true);
         expect(stream.writeWasCalled).toBe(true);
         expect(stream.receivedData).toBe(true);
         done();
      })
      .pipe(stream);
});
