import { Duplex } from 'stream';
import { Encoding, is } from '@toba/node-tools';

/**
 * Duplex stream that can be used to test methods that expect streams.
 */
export class MemoryStream extends Duplex {
   text: string = '';
   /**
    * Whether data (not `null` and not zero-length) was received.
    */
   receivedData: boolean = false;
   /**
    * Whether the `write()` method was called regardless of whether any data
    * was actually received.
    */
   writeWasCalled: boolean = false;

   _write(data: Buffer, encoding: Encoding, cb?: () => void) {
      if (encoding == Encoding.Buffer) {
         this.text += data.toString(Encoding.UTF8);
      } else {
         this.text += data;
      }
      this.writeWasCalled = true;

      if (data.length > 0) {
         this.receivedData = true;
      }

      if (is.callable(cb)) {
         cb();
      }
   }
}
