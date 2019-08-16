import { is } from '@toba/node-tools';
export type OAuthGetCallback = (err: any, content: string | null) => void;
export type OAuthGet = (url: string, fn: OAuthGetCallback) => void;

/**
 * Match fetch type. Must include `any` because DOM `fetch` and Node `fetch`
 * use different types, albeit having the same names.
 */
type Fetch = (
   url: string | Request | any,
   init?: RequestInit | any
) => Promise<Response | any>;

let mockGetter: OAuthGet | null = null;

/**
 * Assign URL getter to use in the `OAuth.get()` method. This is more generic
 * than using `oAuthGetWithFetch()` since the fetch API is known.
 */
export function useOAuthGetter(getter: OAuthGet): void {
   mockGetter = getter;
}

/**
 * Assign fetch function to use in the `OAuth.get()` method.
 */
export function oAuthGetWithFetch(fetch: Fetch): void {
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

type OAuth1TokenCallback = (
   err: { statusCode: number; data?: any } | null,
   token: string,
   secret: string,
   parsedQueryString: any
) => any;

/**
 * Mock the OAuth client imported by `@toba/oauth` by adding an `oauth.ts` to
 * a `__mocks__` folder in the project root with
 *
 * `export { MockAuth as OAuth } from '@toba/test'`
 */
export class MockAuth {
   urls: { [key: string]: string };
   last: {
      accessToken: string | null;
      secret: string | null;
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
    * Respond to URL request with `mockGetter`. Call `useOAuthGetter()` or
    * `oAuthGetWithFetch()` to assign a custom `get`ter.
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

   getOAuthAccessToken(
      requestToken: string,
      secret: string,
      verifier: string,
      callback: OAuth1TokenCallback
   ): void;

   getOAuthAccessToken(
      requestToken: string,
      secret: string,
      callback: OAuth1TokenCallback
   ): void;

   getOAuthAccessToken(
      _requestToken: string,
      _secret: string,
      verifierOrCallback: string | OAuth1TokenCallback,
      callback?: OAuth1TokenCallback
   ): void {
      if (is.callable(verifierOrCallback)) {
         callback = verifierOrCallback;
      }

      callback!(
         null,
         'mock-access-token',
         'mock-access-secret',
         'mock-query-string'
      );
   }

   getOAuthRequestToken(params: any, callback: OAuth1TokenCallback): void;
   getOAuthRequestToken(callback: OAuth1TokenCallback): void;
   getOAuthRequestToken(
      paramsOrCallback: any,
      callback?: OAuth1TokenCallback
   ): void {
      if (!is.callable(callback)) {
         callback = paramsOrCallback;
      }
      callback!(
         null,
         'mock-request-token',
         'mock-request-secret',
         'mock-query-string'
      );
   }
}
