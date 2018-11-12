import { IncomingMessage } from 'http';
import { Socket } from 'net';

export class MockSocket extends Socket {
   /**
    * https://nodejs.org/api/net.html#net_socket_remoteaddress
    */
   mockRemoteAddress: string;

   get remoteAddress() {
      return this.mockRemoteAddress;
   }

   reset() {
      this.mockRemoteAddress = '';
   }
}

export class MockRequest extends IncomingMessage {
   referer: string | null;
   /** Querystring parameters */
   params: { [key: string]: string };
   headers: { [key: string]: string };
   protocol: string;
   secure: boolean;
   ip: string;
   ips: string[];
   connection: MockSocket;
   subdomains: string[];
   path: string;
   hostname: string;
   host: string;
   fresh: boolean;
   stale: boolean;
   xhr: boolean;
   cookies: any;
   method: string;
   query: { [key: string]: string };
   route: any;
   signedCookies: any;
   originalUrl: string;
   url: string;
   baseUrl: string;
   app: any;

   // added by Express body parser
   body: { selected: string[] };

   constructor() {
      super(new MockSocket());
      this.reset();
   }

   get(field: string): any {
      switch (field) {
         case 'referer':
            return this.referer;
         case 'params':
            return this.params;
         default:
            return null;
      }
   }

   header(name: 'set-cookie'): string[] | undefined;
   header(name: string): string | undefined;
   header(name: string | 'set-cookie'): string | string[] | undefined {
      return this.headers[name];
   }

   accepts(): string[];
   accepts(type: string): string | false;
   accepts(type: string[]): string | false;
   accepts(_type?: string | string[]): string | string[] | false {
      return false;
   }

   acceptsCharsets(): string[];
   acceptsCharsets(charset: string): string | false;
   acceptsCharsets(charset: string[]): string | false;
   acceptsCharsets(_charset?: string | string[]): string | string[] | false {
      return false;
   }

   acceptsEncodings(): string[];
   acceptsEncodings(encoding: string): string | false;
   acceptsEncodings(encoding: string[]): string | false;
   acceptsEncodings(_encoding?: string | string[]): string | string[] | false {
      return false;
   }

   acceptsLanguages(): string[];
   acceptsLanguages(lang: string): string | false;
   acceptsLanguages(lang: string[]): string | false;
   acceptsLanguages(_lang?: string | string[]): string | string[] | false {
      return false;
   }

   range(_size: number): any {
      return null;
   }

   param(_name: string, _defaultValue?: any): string | null {
      return null;
   }

   is(_type: string): string | false {
      return false;
   }

   clearCookie(_name: string, _options?: any): any {
      return null;
   }

   accepted: any[];

   reset(): MockRequest {
      this.referer = null;
      this.params = {};
      this.headers = {};
      this.query = {};
      this.connection.reset();
      this.body = { selected: [] };
      return this;
   }
}
