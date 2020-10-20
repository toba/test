import { HttpStatus, MimeType, Encoding, Header, is } from '@toba/node-tools'
import * as util from 'util'
import { ServerResponse, IncomingMessage } from 'http'
import { MockRequest } from './index'

/**
 * Mock Node HTTP response with additional methods to capture end and redirect.
 */
export class MockResponse extends ServerResponse {
   httpStatus: HttpStatus
   /**
    * Method to call when response is complete. Can be assigned as test
    * middleware `next()` method so that `response.end()` and middelware
    * `next()` are both captured. It defaults to an empty Jest mock.
    */
   onEnd: () => void

   /**
    * Whether response should be ended after render is called. This can be used
    * to automatically trigger an `onEnd()` handler. However, if the rendered
    * output is compressed or otherwise post-processed before sending to the
    * client then making this `true` will short-circuit the handler.
    */
   endOnRender: boolean
   app: any
   ended: boolean
   headers: Map<string, string | null>
   content: string | null
   send: any
   jsonp: any
   locals: any
   charset: string
   rendered: {
      template: string | null
      context: { [key: string]: any } | null | undefined
      json: string | null
   }

   /**
    * Request that initiated the response.
    */
   forRequest: MockRequest

   /**
    * Whether response is for a `MockRequest`.
    */
   private isMockRequest = false

   /**
    * Capture redirection values.
    */
   redirected: {
      status: HttpStatus | null
      url: string | null
   }

   constructor(req: IncomingMessage = new MockRequest()) {
      super(req)
      this.reset(false)

      if (req instanceof MockRequest) {
         this.isMockRequest = true
         this.forRequest = req
      }
   }

   status(code: number): any {
      this.httpStatus = code
      return this
   }

   setHeader(key: string, value: string): MockResponse {
      this.headers.set(key, value)
      return this
   }

   /**
    * Set header value(s).
    */
   set(field: any): any
   set(field: string, value?: string): any
   set(
      keyOrHash: string | { [key: string]: string },
      value: string | null = null
   ) {
      if (is.text(keyOrHash)) {
         this.headers.set(keyOrHash, value)
      } else {
         for (const key in keyOrHash) {
            this.headers.set(key, keyOrHash[key])
         }
      }
   }

   sendStatus(_code: number): any {
      return null
   }

   links(_links: any): any {
      return null
   }

   redirect(url: string): void
   redirect(url: string, status: number): void
   redirect(status: HttpStatus, url: string): void
   redirect(first: string | number | HttpStatus, second?: string | number) {
      let status: HttpStatus
      let url: string

      if (is.number(first)) {
         status = first
         url = second as string
      } else {
         url = first
         if (is.number(second)) {
            status = second
         } else if (is.text(second)) {
            status = parseInt(second)
         } else {
            status = HttpStatus.PermanentRedirect
         }
      }
      this.redirected.status = status
      this.redirected.url = url
      this.end()
   }

   /**
    * Express method.
    */
   json(o: any): any {
      this.httpStatus = HttpStatus.OK
      this.rendered.json = o
      return this.setHeader(Header.Content.Type, MimeType.JSON).end()
   }

   /**
    * Express method. Serialize render options rather than actually rendering a
    * view.
    */
   render(
      template: string,
      context?: { [key: string]: any },
      callback?: (err: Error | any, output: string) => void
   ) {
      if (is.value<{ [key: string]: any }>(context)) {
         delete context['config']
      }
      this.rendered.template = template
      this.rendered.context = context

      if (is.callable(callback)) {
         // error cannot be null because the Express type definition does not
         // allow null
         callback(null, util.inspect(this.rendered))
      }
      if (this.endOnRender) this.end()
   }

   /**
    * @see https://nodejs.org/api/stream.html#stream_class_stream_writable
    */
   write(chunk: any, encodingOrCb?: string | Function, cb?: Function) {
      let encoding: string = Encoding.UTF8

      if (cb !== undefined) {
         encoding = encodingOrCb as BufferEncoding
      } else {
         cb = encodingOrCb as Function
      }

      const text = Buffer.isBuffer(chunk)
         ? chunk.toString(encoding as BufferEncoding)
         : chunk
      this.content = this.content === null ? text : this.content + text

      if (is.callable(cb)) cb()

      return true
   }

   end() {
      if (!this.ended) {
         this.ended = true
         if (is.callable(this.onEnd)) this.onEnd()
      }
      return this
   }

   reset(alsoResetRequest = true): MockResponse {
      this.httpStatus = HttpStatus.OK
      this.ended = false
      this.headers = new Map()
      this.content = null
      this.endOnRender = true
      this.rendered = {
         template: null,
         context: null,
         json: null,
      }
      this.redirected = {
         status: null,
         url: null,
      }

      if (alsoResetRequest && this.isMockRequest) {
         this.forRequest.reset()
      }
      return this
   }

   sendFile(path: string): void
   sendFile(path: string, options: any): void
   sendFile(path: string, fn: Function): void
   sendFile(_path: string, _options?: any, _fn?: Function): void {
      return
   }

   sendfile(path: string): void
   sendfile(path: string, options: any): void
   sendfile(path: string, fn: Function): void
   sendfile(_path: string, _options?: any, _fn?: Function): void {
      return
   }

   download(path: string): void
   download(path: string, filename: string): void
   download(path: string, fn: Function): void
   download(
      _path: string,
      _filename?: string | Function,
      _fn?: Function
   ): void {
      return
   }

   contentType(_type: string): any {
      return null
   }

   type(_type: string): any {
      return null
   }

   format(_obj: any): any {
      return null
   }

   attachment(_filename?: string): any {
      return null
   }

   /**
    * Retrieve header value.
    */
   header(field: string): any
   /**
    * Set header value.
    */
   header(field: string, value: string): any
   header(field: string, value?: string): any {
      if (is.value<string>(value)) {
         this.headers.set(field, value)
      } else {
         return this.headers.get(field)
      }
   }

   get(_field: string): string {
      return ''
   }

   cookie(name: string, val: any): any
   cookie(name: string, val: any, options: any): any
   cookie(_name: string, _val: any, _options?: any): any {
      return null
   }

   clearCookie(_name: string, _options?: any): any {
      return null
   }

   location(_url: string): any {
      return null
   }

   vary(_field: string): any {
      return null
   }

   append(_field: string, _value?: string[] | string): any {
      return null
   }
}
