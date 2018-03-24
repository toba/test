import { ServerResponse, IncomingMessage } from 'http';
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
   referer: string;
   accepts: string;
   /** Querystring parameters */
   params: { [key: string]: string };
   headers: { [key: string]: string };
   connection: MockSocket;

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

   header(name: string): string {
      return this.headers[name];
   }

   reset(): MockRequest {
      this.referer = null;
      this.params = {};
      this.headers = {};
      this.connection.reset();
      this.body = { selected: [] };
      return this;
   }
}
