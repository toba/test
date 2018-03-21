export class MockRequest {
   referer: string;
   accepts: string;
   /** Querystring parameters */
   params: { [key: string]: string };
   headers: { [key: string]: string };
   clientIP: string;

   connection: {
      remoteAddress: string;
   };

   // added by Express body parser
   body: { selected: string[] };

   constructor() {
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
      this.connection = { remoteAddress: '' };
      this.body = { selected: [] };
      return this;
   }
}
