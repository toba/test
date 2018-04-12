import fetch from 'node-fetch';

/**
 * Mock the OAuth client imported by `@toba/oauth` by adding an `oauth.ts` to
 * a `__mocks__` folder in the project root with
 *
 * `export { OAuth } from '@toba/test'`
 */
export class OAuth {
   urls: { [key: string]: string };
   last: {
      accessToken: string;
      secret: string;
   };

   constructor(
      requestTokenUrl: string,
      accessTokenUrl: string,
      _apiKey: string,
      _secret: string,
      _version: string,
      callbackUrl: string,
      _hashing: string
   ) {
      this.urls = {
         requestTokenUrl,
         accessTokenUrl,
         callbackUrl
      };
      this.last = {
         accessToken: null,
         secret: null
      };
   }

   /**
    * Get URL as basic fetch and record the token information. `node-fetch`
    * may also be mocked to return a local file.
    */
   get(
      url: string,
      accessToken: string,
      secret: string,
      callback: (err: any, body: string) => void
   ) {
      this.last.accessToken = accessToken;
      this.last.secret = secret;

      fetch(url)
         .then(res => res.text())
         .then(body => {
            callback(null, body);
         })
         .catch(err => {
            callback(err, null);
         });
   }
}
