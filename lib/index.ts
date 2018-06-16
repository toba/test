import { log } from '@toba/logger';
// mockFetch must be imported before OAuth since OAuth may utilize a node-fetch mock
export { mockFetch } from './mock-fetch';
export {
   MockAuth,
   useOAuthGetter,
   oAuthGetWithFetch,
   OAuthGet,
   OAuthGetCallback
} from './mock-oauth';
export { MockResponse } from './mock-response';
export { MockRequest } from './mock-request';
export { MockExpressApp } from './mock-express';
export { readFile, readBigFile, loadStream, readFileText } from './file';
export { MemoryStream } from './memory-stream';

import './helpers';

import { ExpectResponse } from './helpers';

// disable color output for tests (messes up tips and console output)
log.update({ color: false });

/** http://www.lipsum.com/ */
export const lipsum =
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export const sleep = (ms: number) =>
   new Promise(resolve => setTimeout(resolve, ms));

// https://stackoverflow.com/questions/43667085/extending-third-party-module-that-is-globally-exposed
declare global {
   namespace jest {
      // These are only to supplement the type definitions and must be manually
      // synchronized with the concrete implementations in `helpers.ts`
      interface Matchers<R> {
         /**
          * Expect a number to be within or equal to bounding numbers.
          */
         toBeWithin: (min: number, max: number) => ExpectResponse;
         /**
          * Expect an object to have all named properties.
          */
         toHaveAllProperties: (...keys: string[]) => ExpectResponse;
         /**
          * Expect first two numbers in array to be valid latitude and longitude
          * values.
          */
         toBeLatLng: () => ExpectResponse;
         /**
          * Expect a `Set` or `Map` to contain all values.
          */
         toHaveValues: <T>(...values: T[]) => ExpectResponse;
         /**
          * Expect a `Map` to have all keys.
          */
         toHaveKeys: <T>(...keys: T[]) => ExpectResponse;
         /**
          * Expect a `Map` to have a particular key-value.
          */
         toHaveKeyValue: <K, V>(key: K, value: V) => ExpectResponse;
         /**
          * Expect `MockResponse` to have rendered a specific template.
          */
         toRenderTemplate: (name: string) => ExpectResponse;
         /**
          * Expect `MockResponse` to have redirected to a specific URL.
          */
         toRedirectTo: (url: string) => ExpectResponse;
      }
   }
}
