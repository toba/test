import { HttpStatus, MimeType, Encoding, Header, is } from '@toba/tools';
import * as util from 'util';
import { ServerResponse, IncomingMessage } from 'http';
import { Server } from 'net';

/**
 * Mock Node HTTP response with additional methods to capture end and redirect.
 */
export class MockResponse extends ServerResponse {
   httpStatus: HttpStatus;
   /**
    * Method to call when response is complete. Can be assigned as test
    * middleware next() method so that response.end() and middelware next()
    * are both captured
    */
   onEnd = jest.fn();

   /** Whether response should be ended after render is called */
   endOnRender: boolean;

   ended: boolean;
   headers: { [key: string]: string };
   content: string;
   rendered: {
      template: string;
      options: { [key: string]: any };
      json: string;
   };

   /**
    * Capture redirection values.
    */
   redirected: {
      status: HttpStatus;
      url: string;
   };

   constructor(req: IncomingMessage) {
      super(req);
      this.reset();
   }

   status(value: HttpStatus): MockResponse {
      this.httpStatus = value;
      return this;
   }

   setHeader(key: string, value: string): MockResponse {
      this.headers[key] = value;
      return this;
   }

   /**
    * Set header value(s)
    */
   set(keyOrHash: string | { [key: string]: string }, value: string = null) {
      if (typeof keyOrHash == is.Type.String) {
         this.headers[keyOrHash as string] = value;
      } else {
         Object.assign(this.headers, keyOrHash);
      }
   }

   redirect(status: HttpStatus, url: string) {
      this.redirected.status = status;
      this.redirected.url = url;
      this.end();
   }

   /**
    * Express method.
    */
   json(o: any) {
      this.httpStatus = HttpStatus.OK;
      this.rendered.json = o;
      return this.setHeader(Header.Content.Type, MimeType.JSON).end();
   }

   /**
    * Express method. Serialize render options rather than actually rendering a
    * view.
    */
   render(
      template: string,
      options: { [key: string]: any },
      callback?: (err: Error, output: string) => void
   ) {
      delete options['config'];
      this.rendered.template = template;
      this.rendered.options = options;

      if (is.callable(callback)) {
         callback(null, util.inspect(this.rendered));
      }
      if (this.endOnRender) {
         this.end();
      }
   }

   /**
    * https://nodejs.org/api/stream.html#stream_class_stream_writable
    */
   write(chunk: any, encodingOrCb?: string | Function, cb?: Function) {
      let encoding: string = Encoding.UTF8;

      if (cb !== undefined) {
         encoding = encodingOrCb as string;
      } else {
         cb = encodingOrCb as Function;
      }

      const text = Buffer.isBuffer(chunk) ? chunk.toString(encoding) : chunk;
      this.content = this.content === null ? text : this.content + text;

      if (is.callable(cb)) {
         cb();
      }
      return true;
   }

   end() {
      if (!this.ended) {
         this.ended = true;
         this.onEnd();
      }
      return this;
   }

   reset(): MockResponse {
      this.httpStatus = HttpStatus.OK;
      this.ended = false;
      this.headers = {};
      this.content = null;
      this.endOnRender = true;
      this.rendered = {
         template: null,
         options: null,
         json: null
      };
      this.redirected = {
         status: null,
         url: null
      };
      this.onEnd.mockClear();

      return this;
   }
}
