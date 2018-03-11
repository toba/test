export { mockFetch } from './lib/mock-fetch';
export { MockResponse } from './lib/mock-response';
export { MockRequest } from './lib/mock-request';
export { readFile, readBigFile, loadStream } from './lib/file';

import './lib/helpers';

import { ExpectResponse } from './lib/helpers';

/** http://www.lipsum.com/ */
export const lipsum =
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

// https://stackoverflow.com/questions/43667085/extending-third-party-module-that-is-globally-exposed
declare global {
   namespace jest {
      interface Matchers {
         toBeWithin: (min: number, max: number) => ExpectResponse;
         toHaveAllProperties: (...keys: string[]) => ExpectResponse;
         toBeLatLng: () => ExpectResponse;
      }
   }
}
