import './';
import { MemoryStream } from './';
import { loadStream } from './index';

test('recieves stream', done => {
   const stream = new MemoryStream();
   expect(stream.writeWasCalled).toBe(false);
   expect(stream.receivedData).toBe(false);

   loadStream('./LICENSE')
      .on('end', () => {
         expect(stream.text.includes('Copyright')).toBe(true);
         expect(stream.writeWasCalled).toBe(true);
         expect(stream.receivedData).toBe(true);
         done();
      })
      .pipe(stream);
});
