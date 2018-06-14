import * as fs from 'fs';
import { Encoding } from '@toba/tools';

/**
 * Mock Fetch response.
 */
class MockResponse {
   data: Buffer;
   status: number;

   constructor(data: Buffer, status: number = 200) {
      this.data = data;
      this.status = status;
   }
   text(): Promise<string> {
      return Promise.resolve(this.data.toString(Encoding.UTF8));
   }

   buffer(): Promise<Buffer> {
      return Promise.resolve(this.data);
   }
}

/**
 * Mock `fetch` to return local files instead of remote resources.
 */
export function mockFetch(localPath: (url: string | Request) => string) {
   return (url: string | Request, _init?: RequestInit): Promise<MockResponse> =>
      new Promise((resolve, reject) => {
         const fileName = localPath(url);

         fs.readFile(fileName, (err, data) => {
            if (err === null) {
               resolve(new MockResponse(data));
            } else {
               reject(err);
            }
         });
      });
}
