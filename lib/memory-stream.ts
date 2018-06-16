import { Duplex } from 'stream';
import { Encoding, is } from '@toba/tools';

/**
 * Duplex stream that can be used to test methods that expect streams.
 */
export class MemoryStream extends Duplex {
   text: string = '';

   _write(data: Buffer, encoding: Encoding, cb?: () => void) {
      if (encoding == Encoding.Buffer) {
         this.text += data.toString(Encoding.UTF8);
      } else {
         this.text += data;
      }

      if (is.callable(cb)) {
         cb();
      }
   }
}
