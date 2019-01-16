import 'jest-date-mock';
import * as idb from 'fake-indexeddb';
import * as keyRange from 'fake-indexeddb/lib/FDBKeyRange';
import { advanceTo } from 'jest-date-mock';

// all tests will run as if it's March (zero-based) 2018
advanceTo(new Date(2018, 2, 15, 0, 0, 0));

declare global {
   namespace NodeJS {
      interface Global {
         indexedDB: IDBFactory;
         IDBKeyRange: any;
      }
   }
}

global.indexedDB = idb;
global.IDBKeyRange = keyRange;
