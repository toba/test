import { HttpStatus, MimeType, Encoding, Header, is } from '@toba/tools';
import * as util from 'util';
import { ServerResponse, IncomingMessage } from 'http';

/**
 * Mock Node HTTP response with additional methods to capture end and redirect.
 */
export class MockResponse extends ServerResponse {
   httpStatus: HttpStatus;
   /**
    * Method to call when response is complete. Can be assigned as test
    * middleware next() method so that response.end() and middelware next()
    * are both captured. It defaults to an empty Jest mock.
    */
   onEnd: () => void;

   /** Whether response should be ended after render is called */
   endOnRender: boolean;
   app: any;
   ended: boolean;
   headers: Map<string, string>;
   content: string;
   send: any;
   jsonp: any;
   locals: any;
   charset: string;
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

   status(code: number): any {
      this.httpStatus = code;
      return this;
   }

   setHeader(key: string, value: string): MockResponse {
      this.headers.set(key, value);
      return this;
   }

   /**
    * Set header value(s).
    */
   set(field: any): any;
   set(field: string, value?: string): any;
   set(keyOrHash: string | { [key: string]: string }, value: string = null) {
      if (is.text(keyOrHash)) {
         this.headers.set(keyOrHash, value);
      } else {
         for (const key in keyOrHash) {
            this.headers.set(key, keyOrHash[key]);
         }
      }
   }

   sendStatus(_code: number): any {
      return null;
   }

   links(_links: any): any {
      return null;
   }

   redirect(url: string): void;
   redirect(url: string, status: number): void;
   redirect(status: HttpStatus, url: string): void;
   redirect(first: string | number | HttpStatus, second?: string | number) {
      let status: HttpStatus;
      let url: string;
      if (is.number(first)) {
         status = first;
         url = second as string;
      } else {
         status = second as number;
         url = first;
      }
      this.redirected.status = status;
      this.redirected.url = url;
      this.end();
   }

   /**
    * Express method.
    */
   json(o: any): any {
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
         if (is.callable(this.onEnd)) {
            this.onEnd();
         }
      }
      return this;
   }

   reset(): MockResponse {
      this.httpStatus = HttpStatus.OK;
      this.ended = false;
      this.headers = new Map();
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

      return this;
   }

   sendFile(path: string): void;
   sendFile(path: string, options: any): void;
   sendFile(path: string, fn: Function): void;
   sendFile(_path: string, _options?: any, _fn?: Function): void {
      return;
   }

   sendfile(path: string): void;
   sendfile(path: string, options: any): void;
   sendfile(path: string, fn: Function): void;
   sendfile(_path: string, _options?: any, _fn?: Function): void {
      return;
   }

   download(path: string): void;
   download(path: string, filename: string): void;
   download(path: string, fn: Function): void;
   download(
      _path: string,
      _filename?: string | Function,
      _fn?: Function
   ): void {
      return;
   }

   contentType(_type: string): any {
      return null;
   }

   type(_type: string): any {
      return null;
   }

   format(_obj: any): any {
      return null;
   }

   attachment(_filename?: string): any {
      return null;
   }

   header(field: any): any;
   header(_field: string, _value?: string): any {
      return null;
   }

   get(_field: string): string {
      return null;
   }

   cookie(name: string, val: any): any;
   cookie(name: string, val: any, options: any): any;
   cookie(_name: string, _val: any, _options?: any): any {
      return null;
   }

   clearCookie(_name: string, _options?: any): any {
      return null;
   }

   location(_url: string): any {
      return null;
   }

   vary(_field: string): any {
      return null;
   }

   append(_field: string, _value?: string[] | string): any {
      return null;
   }
}
