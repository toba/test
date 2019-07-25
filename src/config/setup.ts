import 'jest-date-mock';
import 'fake-indexeddb/auto';
import 'jest-localstorage-mock';
import { advanceTo } from 'jest-date-mock';

// all tests will run as if it's March (zero-based) 2018
advanceTo(new Date(2018, 2, 15, 0, 0, 0));
