import * as fs from 'fs';

/**
 * Mock Fetch response.
 */
class MockResponse {
   plainText: string;
   status: number;

   constructor(body: string, status: number = 200) {
      this.plainText = body;
      this.status = status;
   }
   text(): Promise<string> {
      return Promise.resolve(this.plainText);
   }
}

/**
 * Mock `fetch` to return local files instead of remote resources.
 */
export function mockFetch(localPath: (url: string | Request) => string) {
   return (url: string | Request, _init?: RequestInit): Promise<MockResponse> =>
      new Promise((resolve, reject) => {
         const fileName = localPath(url);
         /* tslint:disable-next-line:no-console */
         // console.debug(`Substituting "${fileName}" for "${url}"`);

         fs.readFile(fileName, (err, data) => {
            if (err === null) {
               resolve(new MockResponse(data.toString()));
            } else {
               reject(err);
            }
         });
      });
}
