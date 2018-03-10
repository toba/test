import * as fs from 'fs';

/** http://www.lipsum.com/ */
export const lipsum =
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

class MockResponse {
   plainText: string;

   constructor(body: string) {
      this.plainText = body;
   }
   text(): Promise<string> {
      return Promise.resolve(this.plainText);
   }
}

/**
 * Mock `fetch` to return local files instead of remote resources.
 */
export function mockFetch(localPath: (url: string | Request) => string) {
   return (url: string | Request, init?: RequestInit): Promise<MockResponse> =>
      new Promise((resolve, reject) => {
         const fileName = localPath(url);

         console.info(`Substituting "${fileName}" for "${url}"`);

         fs.readFile(fileName, (err, data) => {
            if (err === null) {
               resolve(new MockResponse(data.toString()));
            } else {
               reject(err);
            }
         });
      });
}
