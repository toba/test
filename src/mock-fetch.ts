import * as fs from 'fs';
import { Encoding, HttpStatus } from '@toba/node-tools';
import { bindGlobal } from './mock-global';

/**
 * Mock Fetch response.
 */
export class MockResponse {
   data: Buffer;
   status: number;

   constructor(data: Buffer, status: number = 200) {
      this.data = data;
      this.status = status;
   }

   get ok() {
      return this.status == HttpStatus.OK;
   }

   text(): Promise<string> {
      return Promise.resolve(this.data.toString(Encoding.UTF8));
   }

   json(): Promise<any> {
      return this.text().then(text => JSON.parse(text));
   }

   buffer(): Promise<Buffer> {
      return Promise.resolve(this.data);
   }
}

export type MockFetch = (
   url: string | Request,
   init?: RequestInit
) => Promise<MockResponse>;

/**
 * Respond to URL by loading local file per mapping function.
 */
export const loadFileForFetch = (
   mapUrlToFile: (url: string | Request) => string
): MockFetch => (
   url: string | Request,
   _init?: RequestInit
): Promise<MockResponse> =>
   new Promise((resolve, reject) => {
      const fileName = mapUrlToFile(url);

      fs.readFile(fileName, (err, data) => {
         if (err === null) {
            resolve(new MockResponse(data));
         } else {
            reject(err);
         }
      });
   });

/**
 * Mock `window.fetch` so it loads a local file per the given mapping and
 * return the mock function for inspection.
 */
export function mockFetch(
   mapUrlToFile: (url: string | Request) => string
): jest.Mock<Promise<MockResponse>> {
   const fetch = jest.fn();
   fetch.mockImplementation(loadFileForFetch(mapUrlToFile));
   bindGlobal('fetch', fetch);
   return fetch;
}
