export type OAuthGetCallback = (err: any, content: string) => void;
export type OAuthGet = (url: string, fn: OAuthGetCallback) => void;

let mockGetter: OAuthGet = null;

/**
 * Assign URL getter to be used by the mock OAuth class.
 */
export function useGetter(getter: OAuthGet): void {
   mockGetter = getter;
}

export function useFetch(fetch: (url: string) => Promise<Response>): void {
   mockGetter = (url: string, callback: OAuthGetCallback) => {
      fetch(url)
         .then(res => res.text())
         .then(body => {
            callback(null, body);
         })
         .catch(err => {
            callback(err, null);
         });
   };
}

/**
 * Mock the OAuth client imported by `@toba/oauth` by adding an `oauth.ts` to
 * a `__mocks__` folder in the project root with
 *
 * `export { MockAuth as OAuth } from '@toba/test'`
 */
export class MockAuth {
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
    * Respond to URL request with `mockGetter`.
    */
   get(
      url: string,
      accessToken: string,
      secret: string,
      callback: OAuthGetCallback
   ) {
      this.last.accessToken = accessToken;
      this.last.secret = secret;

      if (mockGetter !== null) {
         mockGetter(url, callback);
      }
   }
}
